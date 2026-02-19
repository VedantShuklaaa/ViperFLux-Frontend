import { ExchangeConfig } from "@/lib/types";

export const binanceConfig: ExchangeConfig = {
    wsUrls: {
        ws1Url: (symbol: string) => `wss://stream.binance.com:9443/ws/${symbol}`,
        ws2Url: (symbol: string) => `wss://fstream.binance.com/ws/${symbol}`,
    },
    streams: {
      spotOrderBook: `@depth20@100ms`,
      futuresOrderBook: `@depth20@100ms`,
      perpsOrderBook: `@depth20@100ms`,
      spotTrades: `@trade`,
      perpsTrades: `@trade`,
    },
    restApi: {
        baseUrl: (symbol: string) => `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`,
    }
};
    