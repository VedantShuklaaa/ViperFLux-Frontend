import { useState, useEffect, useRef } from "react";
import { UnifiedData, unifiedCoinStats, unifiedOrderBook, unifiedTrades } from "@/lib/types";

interface BaseAdapter {
    connect: () => Promise<void>;
    subscribe: (callback: (data: UnifiedData) => void) => () => void;
    fetchCoinStat?: () => Promise<UnifiedData>;
    disconnect: () => void;
    destroy: () => void;
}

export const useExchangeStream = (
    exchange: string, 
    coinPair: string, 
    market: 'SPOT' | 'FUTURES' | 'PERPS'
) => {
    const [orderbook, setOrderBook] = useState<unifiedOrderBook | null>(null);
    const [lastTrades, setLastTrades] = useState<unifiedTrades[]>([]);
    const [coinStats, setCoinStats] = useState<unifiedCoinStats | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const adapterRef = useRef<BaseAdapter | null>(null);
    const unsubscribeRef = useRef<(() => void) | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadAdapter = async () => {
            try {
                setIsLoading(true);
                setError(null);

                if (unsubscribeRef.current) {
                    unsubscribeRef.current();
                    unsubscribeRef.current = null;
                }
                if (adapterRef.current) {
                    adapterRef.current.destroy();
                    adapterRef.current = null;
                }

                const AdapterModule = await import(`@/lib/exchanges/${exchange}/adapter`);
                const AdapterClass = AdapterModule.default;

                const adapter = new AdapterClass() as BaseAdapter;
                adapterRef.current = adapter;

                const unsubscribe = adapter.subscribe((data: UnifiedData) => {
                    if (!isMounted) return;

                    if (data.market !== market) return;

                    switch (data.type) {
                        case 'orderbook':
                            setOrderBook(data.data as unifiedOrderBook);
                            break;
                        case 'trade':
                            setLastTrades(prev => [
                                data.data as unifiedTrades, 
                                ...prev.slice(0, 49)
                            ]);
                            break;
                        case 'stats':
                            setCoinStats(data.data as unifiedCoinStats);
                            break;
                    }
                });

                unsubscribeRef.current = unsubscribe;

                await adapter.connect();

                if (adapter.fetchCoinStat) {
                    await adapter.fetchCoinStat();
                }

                if (isMounted) {
                    setIsLoading(false);
                }
            } catch (err) {
                console.error(`Failed to load ${exchange} adapter:`, err);
                if (isMounted) {
                    setError(`Failed to connect to ${exchange}`);
                    setIsLoading(false);
                }
            }
        };

        loadAdapter();

        return () => {
            isMounted = false;
            if (unsubscribeRef.current) {
                unsubscribeRef.current();
            }
            if (adapterRef.current) {
                adapterRef.current.destroy();
            }
        };
    }, [exchange, coinPair, market]);

    return { orderbook, lastTrades, coinStats, isLoading, error };
};