import React, { useState, useEffect, useCallback } from "react"
import { Exchanges, coins } from "@/lib/exchanges"
import { Star, ChevronDown, BookOpenTextIcon, RefreshCcw } from "lucide-react"
import { useData } from "@/app/context/dataContext"
import { io } from 'socket.io-client';
import { MarketData } from "@/lib/exchanges";
import axios from 'axios';
import { useExchangeStream } from "@/hooks/useExchangeStream";
import { unifiedOrderBook, unifiedTrades } from "@/lib/types";

function OrderPanel({ orderbook, lastTrades, maxSize, selectedCoinPair }: {
    orderbook: unifiedOrderBook | null;
    lastTrades: unifiedTrades[];
    maxSize: number;
    selectedCoinPair: { symbol: string; name: string };
}) {
    const [bookType, setBookType] = useState<string>("Both")
    const [selectedOrderbookType, setSelectedOrderbookType] = useState<string>("Book")

    return (
        <div className="h-[50%] w-full flex flex-col p-2 gap-2">
            <div className="h-full w-full flex flex-col  p-1 gap-1">
                <div className="h-10 w-fit border border-border rounded-md flex items-center bg-background justify-start p-1 gap-1">
                    <button className={`p-2 h-8 rounded-md flex items-center justify-center cursor-pointer ${selectedOrderbookType == 'Book' ? 'bg-card' : ''}`} onClick={() => { setSelectedOrderbookType("Book") }}>
                        Book
                    </button>
                    <button className={`p-2 h-8 rounded-md flex items-center justify-center cursor-pointer ${selectedOrderbookType == 'Trades' ? 'bg-card' : ''}`} onClick={() => { setSelectedOrderbookType("Trades") }}>
                        Trades
                    </button>
                </div>
                {selectedOrderbookType == 'Book' && (
                    <div className="h-full w-full flex flex-col border border-border bg-background rounded-md p-1 gap-1 overflow-hidden">
                        <div className="h-10 w-full flex items-center justify-between">
                            <div className="flex">
                                <button className={`p-2 cursor-pointer flex items-center justify-center rounded-md ${bookType == "Buy" ? 'bg-card' : ''}`} onClick={() => (setBookType("Buy"))}><BookOpenTextIcon height={15} width={15} className="text-primary" /></button>
                                <button className={`p-2 cursor-pointer flex items-center justify-center rounded-md ${bookType == "Both" ? 'bg-card' : ''}`} onClick={() => (setBookType("Both"))}><BookOpenTextIcon height={15} width={15} /></button>
                                <button className={`p-2 cursor-pointer flex items-center justify-center rounded-md ${bookType == "Sell" ? 'bg-card' : ''}`} onClick={() => (setBookType("Sell"))}><BookOpenTextIcon height={15} width={15} className="text-red-500" /></button>
                            </div>
                            <div className="flex items-center justify-center gap-1">
                                <button className="h-6 p-2 flex items-center justify-center cursor-pointer rounded-md hover:bg-background bg-background/50 text-sm">+</button>
                                <span className="text-lg">0.01</span>
                                <button className="h-6 p-2 flex items-center justify-center cursor-pointer rounded-md hover:bg-background bg-background/50 text-sm">-</button>
                            </div>
                        </div>

                        {bookType == 'Buy' && (
                            <div className="h-full w-full flex flex-col gap-2">
                                <div className="h-full w-full flex flex-col">
                                    <div className="w-full flex items-center justify-between text-xs px-2 dark:text-white/50 border-b border-border shrink-0">
                                        <span>Price(USDT)</span>
                                        <span>Size(SOL)</span>
                                        <span>Total(USDT)</span>
                                    </div>

                                    <div className="flex-1 w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                        {orderbook?.bids.map((items) => (
                                            <div className="w-full flex items-center justify-between text-sm px-2 dark:text-white/50" key={items[0]}>
                                                <span className="w-20 flex items-center justify-start">{items[0].toFixed(2)}</span>
                                                <span className="w-20 flex items-center justify-center">{selectedCoinPair?.name == 'Bitcoin' ? items[1].toFixed(6) : items[1].toFixed(3)}</span>
                                                <span className="w-20 flex items-center justify-end">{(items[0] * items[1]).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {bookType == "Both" && (
                            <div className="h-full w-full flex flex-col gap-2">
                                <div className="h-[calc(50%-2.75rem)] w-full flex flex-col">
                                    <div className="w-full flex items-center justify-between text-xs px-2 dark:text-white/50 border-b border-border shrink-0">
                                        <span>Price(USDT)</span>
                                        <span>Size(SOL)</span>
                                        <span>Total(USDT)</span>
                                    </div>

                                    <div className="flex-1 w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                        {orderbook?.bids?.map((items) => {
                                            const bidSize = items[1];
                                            const width = (bidSize / maxSize) * 100;
                                            return (
                                                <div className="relative w-full h-fit flex items-center justify-between text-sm px-2 dark:text-white/50" key={items[0]}>
                                                    <div className="absolute h-4 bg-green-400 z-100 mx-1 opacity-10" style={{ width: `${width}%` }} />
                                                    <div className="flex items-center justify-between w-full h-fit z-103">
                                                        <span className="w-20 flex items-center justify-start">{items[0].toFixed(2)}</span>
                                                        <span className="w-20 flex items-center justify-center">{selectedCoinPair?.name == 'Bitcoin' ? items[1].toFixed(6) : items[1].toFixed(3)}</span>
                                                        <span className="w-20 flex items-center justify-end">{(items[0] * items[1]).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="h-10 w-full bg-card flex items-center px-2 shrink-0">
                                    <span className="flex items-center justify-center gap-1 text-xl text-primary">
                                        79<ChevronDown />
                                    </span>
                                </div>

                                <div className="h-[calc(50%-2.75rem)] w-full flex flex-col">
                                    <div className="w-full flex items-center justify-between text-xs px-2 dark:text-white/50 border-b border-border shrink-0">
                                        <span>Price(USDT)</span>
                                        <span>Size(SOL)</span>
                                        <span>Total(USDT)</span>
                                    </div>

                                    <div className="flex-1 w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                        {orderbook?.asks?.map((items) => {
                                            const askSize = items[1];
                                            const width = (askSize / maxSize) * 100;
                                            return (
                                                <div className="relative w-full h-fit flex items-center justify-between text-sm px-2 dark:text-white/50" key={items[0]}>
                                                    <div className="absolute h-4 bg-red-400 z-100 mx-1 opacity-10" style={{ width: `${width}%` }} />
                                                    <div className="flex items-center justify-between w-full h-fit z-103">
                                                        <span className="w-20 flex items-center justify-start">{items[0].toFixed(2)}</span>
                                                        <span className="w-20 flex items-center justify-center">{selectedCoinPair?.name == 'Bitcoin' ? items[1].toFixed(6) : items[1].toFixed(3)}</span>
                                                        <span className="w-20 flex items-center justify-end">{(items[0] * items[1]).toFixed(2)}</span>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        {bookType == 'Sell' && (
                            <div className="h-full w-full flex flex-col gap-2">
                                <div className="h-full w-full flex flex-col">
                                    <div className="w-full flex items-center justify-between text-xs px-2 dark:text-white/50 border-b border-border shrink-0">
                                        <span>Price(USDT)</span>
                                        <span>Size(SOL)</span>
                                        <span>Total(USDT)</span>
                                    </div>

                                    <div className="flex-1 w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                        {orderbook?.asks.map((items) => (
                                            <div className="w-full flex items-center justify-between text-sm px-2 dark:text-white/50" key={items[0]}>
                                                <span className="w-20 flex items-center justify-start">{items[0].toFixed(2)}</span>
                                                <span className="w-20 flex items-center justify-center">{selectedCoinPair?.name == 'Bitcoin' ? items[1].toFixed(6) : items[1].toFixed(3)}</span>
                                                <span className="w-20 flex items-center justify-end">{(items[0] * items[1]).toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {selectedOrderbookType == 'Trades' && (
                    <div className="h-full w-full flex flex-col border border-border bg-background rounded-md p-1 gap-1 overflow-hidden">
                        <div className="w-full flex items-center justify-between text-xs px-2 dark:text-white/50 border-b border-border shrink-0">
                            <span className="w-20 flex items-center justify-start">Price(USDT)</span>
                            <span className="w-20 flex items-center justify-center">Size(SOL)</span>
                            <span className="w-20 flex items-center justify-end">Side(Buy/Sell)</span>
                        </div>

                        <div className="flex-1 w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {lastTrades?.map((items) => {
                                const buy = 'h-2 w-2 rounded-full bg-green-500';
                                const sell = 'h-2 w-2 rounded-full bg-red-500';
                                return (
                                    <div className="w-full flex items-center justify-between text-sm px-2 dark:text-white/50" key={`${items.price}-${items.timestamp}`}>
                                        <span className="w-20 flex items-center justify-start">{items.price}</span>
                                        <span className="w-20 flex items-center justify-center">{items.size}</span>
                                        <span className={`w-20 flex items-center justify-end ${items.side == "BUY" ? `${buy}` : `${sell}`}`}></span>
                                    </div>
                                )
                            })}
                        </div>
                    </div >
                )}
            </div>
        </div>
    )
}

export default function Trading() {
    const { selectedCoinPair, sendSelectedCoinPair, exchange, setExchanges, coinView, setCoinView, isLeftOpen, selectedExchange, setSelectedExchange } = useData();
    const { orderbook, lastTrades, coinStats, isLoading, error } = useExchangeStream(selectedExchange || 'binance', selectedCoinPair?.symbol || 'BTC/USDT', coinView as 'SPOT' | 'FUTURES' | 'PERPS')
    const [showAvailableCoins, setShowAvailableCoins] = useState<boolean>(false);
    const socket = io('http://localhost:3004');
    const [webSocketData, setWebSocketData] = useState<Record<string, MarketData>>({})
    const [metadata, setMetadata] = useState<metadata>();
    const allSizes = [
        ...(orderbook?.bids ? orderbook.bids.map(p => p[1]) : []),
        ...(orderbook?.asks ? orderbook.asks.map(p => p[1]) : []),
    ]

    const maxSize = Math.max(...allSizes);
    
    console.log('🎯 Trading component render:', {
        coinView,
        isLoading,
        error,
        hasOrderbook: !!orderbook,
        hasTrades: lastTrades.length > 0,
        hasStats: !!coinStats
    });

    

    const handleMarketData = (newData: MarketData) => {
        setWebSocketData(prev => {
            const key = `${newData.exchange}-${newData.symbol}`;
            const previousData = prev[key];

            return {
                ...prev,
                [key]: {
                    ...newData,
                    previousBestPrice: previousData?.bestPrice
                }
            };
        });
    };

    const formatData = (data: number | null | undefined) => {
        if (!data || data === 0) return '0';

        const num = typeof data === 'string' ? parseFloat(data) : data;

        if (isNaN(num)) return '0';

        if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
        if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
        if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';

        return num.toFixed(1);
    }

    const calculateMarketCap = () => {
        const supply = metadata?.circulatingSupply || 0;
        const price = coinStats?.price || 0;
        const marketCap = supply * price;

        return formatData(marketCap);
    }

    const calculateFDV = () => {
        const supply = metadata?.totalSupply || 0;
        const price = coinStats?.price || 0;
        const FDV = supply * price;

        return formatData(FDV);
    }


    return (
        <div className={`h-full w-full border-t border-border z-104 flex backdrop-blur transition-all duration-300 overflow-hidden`}>
            <div className="h-full w-[20%] flex border-r border-border overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="min-h-full w-full flex flex-col items-start justify-start">
                    <div className="h-[5%] w-full flex items-center justify-between px-2">
                        <span className="text-xl">Binance</span>
                        <div className="flex items-center justify-center gap-2">
                            <button className="h-9 w-9 border border-border hover:border-white/50 rounded-md flex items-center justify-center bg-card hover:bg-background cursor-pointer">
                                <Star height={20} width={20} />
                            </button>
                            <RefetchButton setMetadata={setMetadata} />
                        </div>
                    </div>

                    <div className="h-[7%] w-full flex items-center justify-between px-2">
                        <div className="flex flex-col h-full justify-center">
                            <span className="text-3xl">{selectedCoinPair?.name}</span>
                            <span className="text-sm dark:text-white/50">{selectedExchange}</span>
                        </div>

                        <div className="flex flex-col h-full justify-center items-end">
                            <span className="text-3xl">${(coinStats?.price || 0).toFixed(3)}</span>
                            <span className="text-sm text-primary">{`${coinStats?.priceChange || 0}`} (24h)</span>
                        </div>
                    </div>

                    <div className="h-[3%] w-full flex px-2 items-center">
                        <button className={`h-[2vh] ${isLeftOpen ? 'w-[95%]' : 'w-[80%]'} text-xs rounded-md border border-border hover:border-black/50 dark:hover:border-white/50 bg-linear-to-r from-emerald-200 dark:from-emerald-600 via-green-500 to-emerald-200 dark:to-emerald-600 cursor-pointer`}>
                            wanna know more about the coin? ask VPF AI
                        </button>
                    </div>

                    <div className="h-[35%] w-full flex flex-col p-2 gap-2">
                        <div className="h-[20%] w-full border border-border hover:border-black/20 dark:hover:border-white/20 bg-card hover:bg-background rounded-md cursor-pointer flex flex-col items-center justify-center">
                            <span className="text-xs dark:text-white/50">Market Cap</span>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-xl">${calculateMarketCap()}</span>
                                <span className="text-xs text-red-500 flex items-center justify-center"><ChevronDown height={15} width={15} />0.85%</span>
                            </div>
                        </div>

                        <div className="h-[20%] w-full rounded-md flex gap-1">
                            <div className="h-full w-full border border-border hover:border-black/20 dark:hover:border-white/20 bg-card hover:bg-background rounded-md cursor-pointer flex flex-col items-center justify-center">
                                <span className="text-xs dark:text-white/50">Volume (24hr)</span>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-xl">${ }</span>
                                    <span className="text-xs text-red-500 flex items-center justify-center"><ChevronDown height={15} width={15} />47.07%</span>
                                </div>
                            </div>
                            <div className="h-full w-full border border-border hover:border-black/20 dark:hover:border-white/20 bg-card hover:bg-background rounded-md cursor-pointer flex flex-col items-center justify-center">
                                <span className="text-xs dark:text-white/50">Liquidity (24hr)</span>
                                <span className="text-xl">9.36%</span>
                            </div>
                        </div>

                        <div className="h-[20%] w-full border border-border hover:border-black/20 dark:hover:border-white/20 bg-card hover:bg-background rounded-md cursor-pointer flex flex-col items-center justify-center">
                            <span className="text-xs dark:text-white/50">FDV</span>
                            <span className="text-xl">${calculateFDV()}</span>
                        </div>

                        <div className="h-[20%] w-full rounded-md flex gap-1">
                            <div className="h-full w-full border border-border hover:border-black/20 dark:hover:border-white/20 bg-card hover:bg-background rounded-md cursor-pointer flex flex-col items-center justify-center">
                                <span className="text-xs dark:text-white/50">Total supply</span>
                                <span className="text-xl">{formatData(metadata?.totalSupply || 0)} {selectedCoinPair.symbol.replace('/USDT', '')}</span>
                            </div>
                            <div className="h-full w-full border border-border hover:border-black/20 dark:hover:border-white/20 bg-card hover:bg-background rounded-md cursor-pointer flex flex-col items-center justify-center">
                                <span className="text-xs dark:text-white/50">Max. supply</span>
                                <span className="text-xl">{formatData(metadata?.maxSupply || 0)} {selectedCoinPair.symbol.replace('/USDT', '')}</span>
                            </div>
                        </div>

                        <div className="h-[20%] w-full border border-border hover:border-black/20 dark:hover:border-white/20 bg-card hover:bg-background rounded-md cursor-pointer flex flex-col items-center justify-center">
                            <span className="text-xs dark:text-white/50">Circulating supply</span>
                            <span className="text-xl">{formatData(metadata?.circulatingSupply || 0)} {selectedCoinPair.symbol.replace('/USDT', '')}</span>
                        </div>
                    </div>

                    <OrderPanel orderbook={orderbook} lastTrades={lastTrades} maxSize={maxSize} selectedCoinPair={selectedCoinPair} />
                </div>
            </div>

            <div className="h-full w-[60%] border-r border-border flex flex-col overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="h-[60vh] w-full border-b border-border flex shrink-0 items-center justify-center">
                    asd
                </div>
                <div className="min-h-screen w-full flex flex-col justify-between">
                    <div className="h-15 w-full border-b border-border flex items-center justify-between px-2 bg-background">
                        <span className="text-lg dark:text-white/70">{selectedCoinPair?.name} Market</span>

                        <div className={`h-full flex items-center justify-center gap-2`}>
                            <div className=" relative">
                                <div className={`flex items-center h-11 w-30 rounded-md border border-border`}>
                                    <button className={`h-full w-full rounded-md flex items-center justify-center text-sm bg-zinc-950/70 dark:bg-card cursor-pointer text-primary transition-all duration-100`} onClick={() => { setShowAvailableCoins(!showAvailableCoins) }}>
                                        {selectedCoinPair?.symbol}
                                    </button>
                                </div>
                                {showAvailableCoins && (
                                    <div className="absolute h-48 w-30 border border-border bg-background top-12 left-0 z-103 transition-all duration-300 grid grid-cols-1 place-items-center place-content-start px-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                                        {coins.map((items) => (
                                            <div className="h-12 w-full text-sm cursor-pointer flex items-center justify-center hover:text-primary border-b border-border" key={items.symbol} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setShowAvailableCoins(!showAvailableCoins), sendSelectedCoinPair(items), localStorage.setItem('selectedCoinPair', JSON.stringify(items)); } }} onClick={() => { setShowAvailableCoins(!showAvailableCoins), sendSelectedCoinPair(items), localStorage.setItem('selectedCoinPair', JSON.stringify(items)); }}>
                                                {items.symbol}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center h-11 rounded-md border border-border">
                                <button className={` h-full w-20 flex items-center justify-center text-sm cursor-pointer rounded-l-md hover:bg-card/70 transition-all duration-100 ${coinView == 'Spot' ? 'bg-zinc-950/70 dark:bg-card text-primary' : ''}`} onClick={() => { setCoinView('Spot') }}>
                                    Spot
                                </button>

                                <button className={` h-full w-20 flex items-center justify-center text-sm cursor-pointer hover:bg-card/70 transition-all duration-100 ${coinView == 'Futures' ? 'bg-zinc-950/70 dark:bg-card text-primary' : ''}`} onClick={() => { setCoinView('Futures') }}>
                                    Futures
                                </button>

                                <button className={` h-full w-20 flex items-center justify-center text-sm cursor-pointer rounded-r-md hover:bg-card/70 transition-all duration-100 ${coinView == 'Perps' ? 'bg-zinc-950/70 dark:bg-card text-primary' : ''}`} onClick={() => { setCoinView('Perps') }}>
                                    Perps
                                </button>
                            </div>

                            <div className="flex items-center h-11 rounded-md border border-border">
                                <button className={` h-full w-20 flex items-center justify-center text-sm cursor-pointer rounded-l-md hover:bg-card/70 transition-all duration-100 ${exchange == 'CEX' ? 'bg-zinc-950/70 dark:bg-card text-primary' : ''}`} onClick={() => { setExchanges('CEX') }}>
                                    CEX
                                </button>
                                <button className={` h-full w-20 flex items-center justify-center text-sm cursor-pointer rounded-r-md hover:bg-card/70 transition-all duration-100 ${exchange == 'DEX' ? 'bg-zinc-950/70 dark:bg-card text-primary' : ''}`} onClick={() => { setExchanges('DEX') }}>
                                    DEX
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="h-full w-full flex flex-col items-start">
                        <div className="h-10 w-full border-b border-border flex items-center justify-between px-2 text-sm bg-background">
                            <span>#</span>
                            <span className="w-full flex justify-center">Exchange</span>
                            <span className="w-full flex justify-center">Symbol</span>
                            <span className="w-full flex justify-center">Best Price</span>
                            <span className="w-full flex justify-center">Best Ask Price</span>
                            <span className="w-full flex justify-center">Best Bid Price</span>
                            <span className="w-full flex justify-center">Volume(24h)</span>
                        </div>

                        {Exchanges.map((exchanges, idx) => {
                            const exchangeData = Object.values(webSocketData)
                                .filter(data =>
                                    data.exchange === exchanges.name &&
                                    data.symbol.toUpperCase().replace('USDT', '/USDT') === selectedCoinPair?.symbol
                                )
                                .sort((a, b) => a.symbol.localeCompare(b.symbol));

                            return exchangeData.map(data => {
                                const currentPrice = parseFloat(data.bestPrice);
                                const previousPrice = parseFloat(data.previousBestPrice || data.bestPrice);
                                const priceIncreased = currentPrice >= previousPrice;

                                return (
                                    <div className="h-14 w-full border-b border-border flex items-center justify-between px-2 bg-card" key={`${exchanges.name}-${data.symbol}`} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelectedExchange(exchanges.name) }} onClick={() => { setSelectedExchange(exchanges.name) }}>
                                        <span>{idx + 1}</span>
                                        <span className="w-full flex justify-center">{exchanges.name}</span>
                                        <span className="w-full flex justify-center">{data.symbol.toUpperCase().replace('USDT', '/USDT')}</span>
                                        <span className={`w-full flex justify-center ${priceIncreased ? 'text-primary' : 'text-red-500'}`}>{parseFloat(data.bestPrice).toFixed(3)}</span>
                                        <span className="w-full flex justify-center">{parseFloat(data.bestAskPrice).toFixed(3)}</span>
                                        <span className="w-full flex justify-center">{parseFloat(data.bestBidPrice).toFixed(3)}</span>
                                        <span className="w-full flex justify-center">22M</span>
                                    </div>
                                )
                            }

                            )
                        })}
                    </div>
                </div>
            </div>

            <div className="h-full w-[20%] flex overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                <div className="min-h-[150vh] w-full flex items-start justify-center">
                    asd
                </div>
            </div>
        </div>
    )
}


interface metadata {
    coin: string,
    symbol: string,
    maxSupply: number | null,
    totalSupply: number | null,
    circulatingSupply: number | null,
    timestamp: number
}

const RefetchButton = ({ setMetadata }: { setMetadata: (data: metadata) => void }) => {
    const { selectedCoinPair } = useData();
    const coin = selectedCoinPair?.name.toLowerCase()

    const [isRotated, setIsRotated] = useState<boolean>(false)

    const fetchCoinData = useCallback(async (coin: string, isManualRefresh = false) => {
        if(!coin) return;
        try {
            const url = isManualRefresh ? `/api/metadata/${coin}?refresh=true` : `/api/metadata/${coin}`
            const res = await axios.get(url);
            setMetadata(res.data.data);

            if(res.data.reason === 'too_recent'){
                console.log(`data was fetched less than 1 minute ago`);
            }
        } catch (err: unknown) {
            console.error('Error fetching coin data:', err);
        }
    }, [setMetadata]);

    useEffect(() => {
        fetchCoinData(coin);

        const intervalId = setInterval(() => {
            fetchCoinData(coin);
        }, 600000);

        return () => clearInterval(intervalId);
    }, [coin])

    return (
        <button
            className={`h-9 w-9 border border-border rounded-md p-1 flex items-center justify-center cursor-pointer`}
            onClick={() => {
                fetchCoinData(coin);
                setIsRotated(isRotated);
            }}
        >
            <RefreshCcw
                height={20}
                width={20}
                className="text-primary transition-transform duration-300"
                style={{ transform: isRotated ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
        </button>
    )
}
