export interface unifiedOrderBook {
    asks: [number, number][],
    bids: [number, number][],
}

export interface unifiedTrades {
    price: number | null,
    size: number | null,
    side: 'BUY' | 'SELL' | null,
    timestamp: number | null,
    orderType?: string
}

export interface UnifiedData {
    type: 'orderbook' | 'trade' | 'stats';
    market: 'SPOT' | 'FUTURES' | 'PERPS',
    coinPair: string,
    data: any
}

export interface unifiedCoinStats {
    price: number,
    priceChange: number,
    marketCap: number,
    McChange: number,
    volume: number,
    VolumeChange: number,
    liquidity: number,
    FDV: number,
    totalSupply: number,
    maxSupply: number,
    circulatingSupply: number,
    timestamp: number
    orderType: string,
}

export interface ExchangeConfig {
    wsUrls: Record<string, (symbol: string) => string>;
    streams: Record<string, string>;
    restApi: Record<string, (symbol: string) => string>;
}

export interface Coins {
    symbol: string,
    name: string
}