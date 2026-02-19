"use client";
import React, { useReducer, useContext, createContext, useEffect, useCallback } from 'react';
import { eventBus } from '@/lib/eventBus';

type ExchangeType = 'CEX' | 'DEX';
type ViewType = 'Trading' | 'Analysis';
type CoinView = 'Spot' | 'Futures' | 'Perps'
type CoinType = { symbol: string; name: string }
export type AvailableExchanges = 'binance' | 'binanceUs' | 'bitfinex' | 'bybit' | 'coinbase' | 'kraken' | 'kucoin' | 'okx'

interface DataContext {
    isConnected: boolean | null;
    sendIsConnected: (isConnected: boolean) => void;
    selectedCoinPair: CoinType;
    sendSelectedCoinPair: (selectedCoinPair: CoinType) => void;
    isLeftOpen: boolean | null;
    sendIsLeftOpen: (isLeftOpen: boolean) => void;
    isRightOpen: boolean | null;
    sendIsRightOpen: (isRightOpen: boolean) => void;
    exchange: ExchangeType | null;
    setExchanges: (exchange: ExchangeType) => void;
    viewType: ViewType | null;
    setViewType: (viewType: ViewType) => void;
    coinView: CoinView | null;
    setCoinView: (coinView: CoinView) => void;
    selectedExchange: AvailableExchanges | string;
    setSelectedExchange: (selectedExchange: AvailableExchanges) => void;
}

interface State {
    isConnected: boolean;
    isLeftOpen: boolean;
    isRightOpen: boolean;
    selectedCoinPair: CoinType;
    exchange: ExchangeType;
    viewType: ViewType;
    coinView: CoinView;
    selectedExchange: AvailableExchanges | string;
}

type Action =
    | { type: 'SET_IS_CONNECTED'; payload: boolean }
    | { type: 'SET_IS_LEFT_OPEN'; payload: boolean }
    | { type: 'SET_IS_RIGHT_OPEN'; payload: boolean }
    | { type: 'SET_SELECTED_COIN_PAIR'; payload: CoinType }
    | { type: 'SET_EXCHANGE'; payload: ExchangeType }
    | { type: 'SET_VIEW_TYPE'; payload: ViewType }
    | { type: 'SET_COIN_VIEW'; payload: CoinView }
    | { type: 'SET_SELECTED_EXCHANGE'; payload: AvailableExchanges | string };

function dataReducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_IS_CONNECTED':
            return { ...state, isConnected: action.payload };
        case 'SET_IS_LEFT_OPEN':
            return { ...state, isLeftOpen: action.payload };
        case 'SET_IS_RIGHT_OPEN':
            return { ...state, isRightOpen: action.payload };
        case 'SET_SELECTED_COIN_PAIR':
            return { ...state, selectedCoinPair: action.payload };
        case 'SET_EXCHANGE':
            return { ...state, exchange: action.payload };
        case 'SET_VIEW_TYPE':
            return { ...state, viewType: action.payload };
        case 'SET_COIN_VIEW':
            return { ...state, coinView: action.payload };
        case 'SET_SELECTED_EXCHANGE':
            return { ...state, selectedExchange: action.payload };
        default:
            return state;
    }
}

function getInitialState(): State {
    const storedCoinPair = typeof window !== 'undefined'
        ? localStorage.getItem('selectedCoinPair')
        : null;
    return {
        isConnected: false,
        isLeftOpen: false,
        isRightOpen: false,
        selectedCoinPair: storedCoinPair ? JSON.parse(storedCoinPair) : { symbol: 'BTC/USDT', name: 'Bitcoin' },
        exchange: 'CEX',
        viewType: 'Analysis',
        coinView: 'Spot',
        selectedExchange: 'binance',
    };
}

const DataContext = createContext<DataContext | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(dataReducer, undefined, getInitialState);

    useEffect(() => {
        eventBus.emit('coinPairChanged', state.selectedCoinPair);
    }, [state.selectedCoinPair]);

    const contextValue: DataContext = {
        isConnected: state.isConnected,
        sendIsConnected: useCallback((v: boolean) => dispatch({ type: 'SET_IS_CONNECTED', payload: v }), []),
        selectedCoinPair: state.selectedCoinPair,
        sendSelectedCoinPair: useCallback((v: CoinType) => dispatch({ type: 'SET_SELECTED_COIN_PAIR', payload: v }), []),
        isLeftOpen: state.isLeftOpen,
        sendIsLeftOpen: useCallback((v: boolean) => dispatch({ type: 'SET_IS_LEFT_OPEN', payload: v }), []),
        isRightOpen: state.isRightOpen,
        sendIsRightOpen: useCallback((v: boolean) => dispatch({ type: 'SET_IS_RIGHT_OPEN', payload: v }), []),
        exchange: state.exchange,
        setExchanges: useCallback((v: ExchangeType) => dispatch({ type: 'SET_EXCHANGE', payload: v }), []),
        viewType: state.viewType,
        setViewType: useCallback((v: ViewType) => dispatch({ type: 'SET_VIEW_TYPE', payload: v }), []),
        coinView: state.coinView,
        setCoinView: useCallback((v: CoinView) => dispatch({ type: 'SET_COIN_VIEW', payload: v }), []),
        selectedExchange: state.selectedExchange,
        setSelectedExchange: useCallback((v: AvailableExchanges) => dispatch({ type: 'SET_SELECTED_EXCHANGE', payload: v }), []),
    };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    )
}

export function useData() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within DataProvider');
    }
    return context;
}
