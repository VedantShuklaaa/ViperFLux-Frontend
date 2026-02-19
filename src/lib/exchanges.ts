import { getSelectedCoinPair } from "./utils/utils";
import { AvailableExchanges } from "@/app/context/dataContext";

export const Exchanges: {
    name: AvailableExchanges,
    SpotOrderbookUrl?: () => string,
    FuturesOrderbookUrl?: () => string,
    PerpsOrderbookUrl?: () => string,
    spotTradesUrl?: () => string,
    FuturesTradeUrl?: () => string,
    coinDetailsApi?: () => string
}[] = [
        {
            name: 'binance',
            SpotOrderbookUrl: () => {
                const coinPair = getSelectedCoinPair()
                const symbol = coinPair?.symbol?.toLowerCase().replace('/usdt', 'usdt');
                return `wss://stream.binance.com:9443/ws/${symbol}@depth20@100ms`
            },
            FuturesOrderbookUrl: () => {
                const coinPair = getSelectedCoinPair()
                const symbol = coinPair?.symbol?.toLowerCase().replace('/usdt', 'usdt');
                return `wss://fstream.binance.com/ws/${symbol}@depth20@100ms`
            },
            PerpsOrderbookUrl: () => {
                const coinPair = getSelectedCoinPair()
                const symbol = coinPair?.symbol?.toLowerCase().replace('/usdt', 'usdt');
                return `wss://fstream.binance.com/ws/${symbol}@depth20@100ms`
            },
            spotTradesUrl: () => {
                const coinPair = getSelectedCoinPair();
                const symbol = coinPair?.symbol?.toLowerCase().replace('/usdt', 'usdt');
                return `wss://stream.binance.com:9443/ws/${symbol}@trade`
            },
            FuturesTradeUrl: () => {
                const coinPair = getSelectedCoinPair();
                const symbol = coinPair?.symbol?.toLowerCase().replace('/usdt', 'usdt');
                return `wss://fstream.binance.com/ws/${symbol}@trade`
            },
            coinDetailsApi: () => {
                const coinPair = getSelectedCoinPair();
                const symbol = coinPair?.symbol?.replace('/USDT', 'USDT');
                return `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
            }
        }, {
            name: 'binanceUs',
            SpotOrderbookUrl: () => {
                const coinPair = getSelectedCoinPair()
                const symbol = coinPair?.symbol?.toLowerCase().replace('/usdt', 'usdt');
                return `wss://stream.binance.us:9443/ws/${symbol}@depth20@100ms`
            },
            spotTradesUrl: () => {
                const coinPair = getSelectedCoinPair();
                const symbol = coinPair?.symbol?.toLowerCase().replace('/usdt', 'usdt');
                return `wss://stream.binance.us:9443/ws/${symbol}@trade`
            },
            coinDetailsApi: () => {
                const coinPair = getSelectedCoinPair();
                const symbol = coinPair?.symbol?.replace('/USDT', 'USDT');
                return `https://api.binance.us/api/v3/ticker/24hr?symbol=${symbol}`
            }
        }, {
            name: 'bitfinex',
            SpotOrderbookUrl: () => {
                const coinPair = getSelectedCoinPair()
                const symbol = coinPair?.symbol?.replace('/USDT', 'USD');
                const subMessage = {
                    event: "subscribe",
                    channel: "book",
                    symbol: "tBTCUSD",
                    prec: "P0",
                    freq: "F0",
                    len: 20
                }
                return `wss://api-pub.bitfinex.com/ws/2`
            },
            FuturesOrderbookUrl: () => {
                const coinPair = getSelectedCoinPair()
                const symbol = coinPair?.symbol?.replace('/USDT', 'USD');
                const subMessage = {
                    event: "subscribe",
                    channel: "book",
                    symbol: "tBTCUSD",
                    prec: "P0",
                    freq: "F0",
                    len: 20
                }
                return `wss://fstream.binance.com/ws/${symbol}@depth20@100ms`
            },
            PerpsOrderbookUrl: () => {
                const coinPair = getSelectedCoinPair()
                const symbol = coinPair?.symbol?.replace('/USDT', 'USD');
                return `wss://fstream.binance.com/ws/${symbol}@depth20@100ms`
            },
            spotTradesUrl: () => {
                const coinPair = getSelectedCoinPair();
                const symbol = coinPair?.symbol?.replace('/USDT', 'USD');
                const subMessage = {
                    event: "subscribe",
                    channel: "trades",
                    symbol: "tBTCUSD",
                    prec: "P0",
                    freq: "F0",
                    len: 20
                }
                return `wss://api-pub.bitfinex.com/ws/2`
            },
            FuturesTradeUrl: () => {
                const coinPair = getSelectedCoinPair();
                const symbol = coinPair?.symbol?.replace('/USDT', 'USD');
                return `wss://fstream.binance.com/ws/${symbol}@trade`
            },
            coinDetailsApi: () => {
                const coinPair = getSelectedCoinPair();
                const symbol = coinPair?.symbol?.replace('/USDT', 'USD');
                return `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
            }
        }, {
            name: 'bybit',
        }, {
            name: 'coinbase',
        }, {
            name: 'kraken',
        }, {
            name: 'kucoin',
        }, {
            name: 'okx',
        },
    ];

export interface BinanceTradeData {
    e: string,
    E: number,
    s: string,
    t: number,
    p: string,
    q: string,
    T: number,
    m: boolean,
    M: boolean
}

interface Coins {
    symbol: string,
    name: string
}

export const coins: Coins[] = [
    { symbol: 'BTC/USDT', name: 'Bitcoin' },
    { symbol: 'ETH/USDT', name: 'Ethereum' },
    { symbol: 'SOL/USDT', name: 'Solana' },
    { symbol: 'BNB/USDT', name: "Build n' Build" },
    { symbol: 'POL/USDT', name: 'Polkadot' },
]

export interface MarketData {
    symbol: string;
    bestBidPrice: string;
    bestBidQty: string;
    bestAskPrice: string;
    bestAskQty: string;
    bestPrice: string;
    exchange: string;
    time: number;
    previousBestPrice?: string;
}
