import { unifiedOrderBook, unifiedTrades, unifiedCoinStats, UnifiedData, Coins } from "@/lib/types";
import { binanceConfig } from "./config";
import { eventBus } from "@/lib/eventBus";
import axios from 'axios';
import { getSelectedCoinPair } from "@/lib/utils/utils";

const initialCoinPair = getSelectedCoinPair();
let coin = initialCoinPair.symbol;
let normalizedSymbol = coin.toLowerCase().replace('/usdt', 'usdt');

let spotObUrl = binanceConfig.wsUrls.ws1Url(normalizedSymbol) + binanceConfig.streams.spotOrderBook;
let futuresObUrl = binanceConfig.wsUrls.ws2Url(normalizedSymbol) + binanceConfig.streams.futuresOrderBook;
let PerpsObUrl = binanceConfig.wsUrls.ws2Url(normalizedSymbol) + binanceConfig.streams.perpsOrderBook;
let spotTrades = binanceConfig.wsUrls.ws1Url(normalizedSymbol) + binanceConfig.streams.spotTrades;
let perpsTrades = binanceConfig.wsUrls.ws2Url(normalizedSymbol) + binanceConfig.streams.perpsTrades;
let restApi = binanceConfig.restApi.baseUrl(coin.replace('/USDT', 'USDT'));

export default class BinanceAdapter {
    private wsPool: Map<string, WebSocket> = new Map();
    private unifiedCallbacks: ((data: UnifiedData) => void)[] = [];
    private coinPairUnsubscribe: (() => void) | null = null;

    constructor() {
        this.coinPairUnsubscribe = eventBus.subscribe('coinPairChanged', (newCoinPair: Coins) => {
            console.log('coin pair changed, reconnecting...');
            coin = newCoinPair?.symbol;
            normalizedSymbol = coin.toLowerCase().replace('/usdt', 'usdt');

            spotObUrl = binanceConfig.wsUrls.ws1Url(normalizedSymbol) + binanceConfig.streams.spotOrderBook;
            futuresObUrl = binanceConfig.wsUrls.ws2Url(normalizedSymbol) + binanceConfig.streams.futuresOrderBook;
            PerpsObUrl = binanceConfig.wsUrls.ws2Url(normalizedSymbol) + binanceConfig.streams.perpsOrderBook;
            spotTrades = binanceConfig.wsUrls.ws1Url(normalizedSymbol) + binanceConfig.streams.spotTrades;
            perpsTrades = binanceConfig.wsUrls.ws2Url(normalizedSymbol) + binanceConfig.streams.perpsTrades;
            restApi = binanceConfig.restApi.baseUrl(coin.replace('/USDT', 'USDT'));

            this.reconnect();
        });
    }

    subscribe(callback: (data: UnifiedData) => void) {
        this.unifiedCallbacks.push(callback);

        return () => {
            this.unifiedCallbacks = this.unifiedCallbacks.filter(cb => cb !== callback);
        }
    }

    async connect() {
        await Promise.all([
            this.startOrderbookStream('spotOrderbookStream', spotObUrl, 'SPOT'),
            this.startOrderbookStream('FuturesOrderbookStream', futuresObUrl, 'FUTURES'),
            this.startOrderbookStream('PerpsOrderbookStream', futuresObUrl, 'PERPS'),
            this.startTradesStream('spotTradesStream', spotTrades, 'SPOT'),
            this.startTradesStream('perpsTradesStream', perpsTrades, 'PERPS'),
        ])

        console.log('All Binance streams connected');
    }

    private async reconnect() {
        console.log('reconnecting to new coin pair');
        this.disconnect();
        await this.connect();
    }

    disconnect() {
        this.wsPool.forEach((ws, streamId) => {
            console.log(`closing ${streamId}`);
            ws.close();
        })

        this.wsPool.clear();
    }

    destroy() {
        this.disconnect();
        if (this.coinPairUnsubscribe) {
            this.coinPairUnsubscribe();
        }

        this.unifiedCallbacks = [];
    }

    private async startOrderbookStream(
        streamId: string,
        url: string,
        market: 'SPOT' | 'FUTURES' | 'PERPS'
    ) {
        return new Promise<void>((resolve, reject) => {
            const ws = new WebSocket(url);
            this.wsPool.set(streamId, ws);

            ws.onopen = () => {
                console.log(`${market} ${streamId} connected`);
                resolve()
            }

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    const normalizedData = normalizeOrderbook(data, market);

                    const unifiedOrderbook: UnifiedData = {
                        type: 'orderbook',
                        market,
                        data: normalizedData,
                        coinPair: coin
                    }

                    this.unifiedCallbacks.forEach(cb => cb(unifiedOrderbook));
                } catch (err: unknown) {
                    console.error(`${market} parsed error`, err);
                }
            }

            ws.onclose = () => {
                console.log(`${market} ${streamId} closed`);
                this.wsPool.delete(streamId);
            }

            ws.onerror = (err: unknown) => {
                console.error(`${market} ${streamId} error:`, err);
                reject(err);
            };
        })

    }

    private async startTradesStream(
        streamId: string,
        url: string,
        market: 'SPOT' | 'PERPS'
    ) {
        return new Promise<void>((resolve, reject) => {
            const ws = new WebSocket(url);
            this.wsPool.set(streamId, ws);

            ws.onopen = () => {
                console.log(`${market} ${streamId} connected`);
                resolve();
            }

            ws.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    const normalizedData = normalizeTrades(data, market);

                    const unifiedTrades: UnifiedData = {
                        type: 'trade',
                        market,
                        data: normalizedData,
                        coinPair: coin
                    }

                    this.unifiedCallbacks.forEach(cb => cb(unifiedTrades));
                } catch (err: unknown) {
                    console.log(`${market} parsed error`, err);
                }
            }

            ws.onclose = () => {
                console.log(`${market} ${streamId} closed`);
                this.wsPool.delete(streamId);
            }

            ws.onerror = (err: unknown) => {
                console.error(`${market} ${streamId} error:`, err);
                reject(err);
            };
        });
    }

    async fetchCoinStat(): Promise<UnifiedData> {
        try {
            const response = await axios.get(restApi);
            const data = response.data;
            const normalizedData = normalizeCoinStats(data, 'SPOT');

            const unifiedCoinStats: UnifiedData = {
                type: 'stats',
                market: 'SPOT',
                data: normalizedData,
                coinPair: coin
            }

            this.unifiedCallbacks.forEach(cb => cb(unifiedCoinStats));
            return unifiedCoinStats
        } catch (err: unknown) {
            console.log('failed to fetch coin data:', err);
            throw err;
        }
    }
}

const normalizeOrderbook = (
    data: any,
    market: 'SPOT' | 'FUTURES' | 'PERPS'
): unifiedOrderBook => {
    switch (market) {
        case ('SPOT'):
            return {
                asks: data.asks.map((item: [string, string]) => [
                    parseFloat(item[0]), //price
                    parseFloat(item[1])  //qty
                ]),
                bids: data.bids.map((item: [string, string]) => [
                    parseFloat(item[0]), //price
                    parseFloat(item[1])  //qty
                ])
            };

        case ('FUTURES'):
            return {
                asks: data.a.map((item: [string, string]) => [
                    parseFloat(item[0]), //price
                    parseFloat(item[1])  //qty
                ]),
                bids: data.b.map((item: [string, string]) => [
                    parseFloat(item[0]), //price
                    parseFloat(item[1])  //qty
                ])
            }
        default:
            return {
                asks: [],
                bids: [],
            }
    }
}


const normalizeTrades = (
    data: any,
    market: 'SPOT' | 'PERPS'
): unifiedTrades => {
    return {
        price: parseFloat(data.p),
        size: parseFloat(data.q),
        side: data.m ? 'BUY' : 'SELL',
        timestamp: data.T,
        orderType: data.x || market
    };
};


const normalizeCoinStats = (
    data: any,
    market: 'SPOT' | 'FUTURES'
): unifiedCoinStats => {
    return {
        price: parseFloat(data.lastPrice) || 0,
        priceChange: parseFloat(data.priceChange) || 0,
        marketCap: 0, 
        McChange: 0, 
        volume: parseFloat(data.quoteVolume) || 0,
        VolumeChange: 0,
        liquidity: 0, 
        FDV: 0, 
        totalSupply: 0, 
        maxSupply: 0, 
        orderType: market,
        circulatingSupply: 0, 
        timestamp: Date.now(),
    };
};