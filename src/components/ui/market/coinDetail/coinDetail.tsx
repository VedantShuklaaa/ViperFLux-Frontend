'use client';
import React, { useState } from "react"
import { TrendingUp, Star, Bell, Share2, Share, Copy, Shield, PieChart, ChartCandlestick, Layers, ChartColumn, Target, MessageCircle, BookOpenTextIcon, GlobeIcon, DockIcon, LucideIcon, Flame, AlertTriangle } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa'
import { Boxes } from "@/components/ui/box/boxes";
import { IconType } from "react-icons/lib";

interface coinDetails {
    exchange: string,
    coinPair: string,
}

export const CoinDetailsTop: React.FC<coinDetails> = ({
    exchange,
    coinPair,
}) => {

    const topItems = [
        {
            title: '24h High',
            value: '$3,512.45'
        }, {
            title: '24h Low',
            value: '$3,298.12'
        }, {
            title: 'ATH',
            value: '$4,891.3'
        }, {
            title: '7d Change',
            value: '+12.34%'
        },
    ]

    const topItems2 = [
        {
            title: 'Market Cap',
            value: '$415.00B'
        }, {
            title: '24h Volume',
            value: '$18.50B'
        }, {
            title: 'Vol/MCap Ratio',
            value: '4.46%'
        },
    ]
    return (
        <div className="h-[27vh] w-full flex items-center justify-center border-b border-border font-mono">
            <div className="h-full w-[70vw] bg-linear-to-r from-trasparent via-card to-trasnparent flex">
                <div className="h-full w-[50vw] flex flex-col items-start">
                    <div className="h-[10vh] w-[30vw] flex p-2 gap-1">
                        <div>
                            <Boxes className="h-20 w-20 border border-border bg-background flex items-center justify-center">
                                E
                            </Boxes>
                        </div>
                        <div className="h-20 w-full border border-border rounded-md bg-background flex flex-col">
                            <div className="flex gap-4 p-1">
                                <span className={`text-4xl`}>Ethereum</span>
                                <span className="h-6 px-3 border border-border text-slate-950 dark:text-slate-200 rounded-xl flex items-center justify-center text-sm">ETH</span>
                                <span className="h-6 px-3 border border-border bg-primary-2 text-slate-200 rounded-xl flex items-center justify-center text-sm">Rank #2</span>
                            </div>

                            <div className="flex gap-2 p-1">
                                <span className="h-6 px-3 bg-card text-slate-950 dark:text-slate-200 rounded-xl flex items-center justify-center text-xs">Layer 1</span>
                                <span className="h-6 px-3 bg-card text-slate-950 dark:text-slate-200 rounded-xl flex items-center justify-center text-xs">Smart Contract Platform</span>
                                <span className="h-6 px-3 bg-card text-slate-950 dark:text-slate-200 rounded-xl flex items-center justify-center text-xs">Proof of Stake</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-[17vh] w-full flex flex-col">
                        <div className="h-[7vh] w-[30vw] rounded-md flex items-end gap-2 p-2">
                            <span className="text-6xl">
                                $4,502.78
                            </span>
                            <span className="flex text-sm items-center justify-center gap-1 text-primary">
                                <TrendingUp height={20} width={20} className="" />
                                +5.67% <span className="text-slate-400">(24h)</span>
                            </span>
                        </div>

                        <div className="h-[10vh] w-full rounded-md flex items-center justify-start p-2 gap-5">
                            {topItems.map((items) => (
                                <Boxes className={`h-20 w-50 border border-border bg-background flex flex-col justify-center p-2`} key={items.title} height={250} width={250}>
                                    <span className="text-xs text-slate-400">{items.title}</span>
                                    <span className="text-xl">{items.value}</span>
                                </Boxes>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="h-full w-[25vw] flex flex-col">
                    <div className="h-[7vh] flex items-center justify-end p-2 gap-2">
                        <div className="h-10 p-2 border border-border rounded-md flex items-center gap-1 bg-background hover:bg-primary/80 text-sm cursor-pointer">
                            <Star height={18} width={18} />
                            <span>Watchlist</span>
                        </div>
                        <div className="h-10 p-2 border border-border rounded-md flex items-center gap-1 bg-background hover:bg-primary/80 text-sm cursor-pointer">
                            <Bell height={18} width={18} />
                            <span>Alert</span>
                        </div>
                        <div className="h-10 p-2 border border-border rounded-md flex items-center gap-1 bg-background hover:bg-primary/80 text-sm cursor-pointer">
                            <Share2 height={18} width={18} />
                            <span>Share</span>
                        </div>
                    </div>
                    <div className="h-[20vh] w-full p-2 gap-2 flex flex-col items-center justify-center">
                        <div className="h-[13vh] w-full flex flex-col p-4 gap-2 items-center justify-center border border-border rounded-md bg-background">
                            {topItems2.map((items) => (
                                <div key={items.title} className="w-full  flex items-center justify-between">
                                    <span className="text-sm text-gray-400">
                                        {items.title}
                                    </span>
                                    <span className="text-sm">
                                        {items.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="h-[4vh] w-full flex items-center justify-between">
                            <div className="h-full w-[20vw] flex items-center justify-center gap-2 border border-border cursor-pointer rounded-md bg-background hover:bg-primary/80 group">
                                <Copy height={20} width={20} className="text-gray-400 group-hover:text-black" />
                                <span>0x0000...0000</span>
                            </div>
                            <div className="h-full w-[2vw] border border-border rounded-md bg-background flex items-center justify-center cursor-pointer hover:bg-primary/80 group">
                                <Share height={20} width={20} className="text-slate-400 group-hover:text-black" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const viewBar = [
    { value: 'Overview' },
    { value: 'Market' },
    { value: 'Derivatives' },
    { value: 'On-Chain' },
    { value: 'Social & Dev' },
]

interface Links {
    title: string,
    icon: LucideIcon | IconType,
}

const Links: Links[] = [
    { title: "Website", icon: GlobeIcon },
    { title: "Docs", icon: DockIcon },
    { title: "Twitter", icon: MessageCircle },
    { title: "Discord", icon: MessageCircle },
    { title: "GitHub", icon: FaDiscord },
    { title: "Whitepaper", icon: DockIcon },
]

interface PriceFiller {
    value: number,
    maxValue: number,
    type: "BUY" | "SELL"
}

const PriceFiller: React.FC<PriceFiller> = ({
    value,
    maxValue,
    type = "BUY"
}) => {
    const percentage = (value / maxValue) * 100;
    return (
        <div className={`relative h-full w-full`}>
            <div className={`absolute right-0 top-0 transition-all ${type == 'BUY' ? 'bg-primary' : 'bg-red-500'}`} style={{ width: `${percentage}%` }} />
        </div>
    )
}

const orders = [
    { price: 3456.60, amount: 201.80, type: 'sell' },
    { price: 3456.35, amount: 156.30, type: 'sell' },
    { price: 3456.12, amount: 98.70, type: 'sell' },
    { price: 3455.48, amount: 125.40, type: 'buy' },
    { price: 3455.20, amount: 89.20, type: 'buy' },
    { price: 3454.95, amount: 234.10, type: 'buy' },
];

export const CoinDetailsMid: React.FC<coinDetails> = ({
    exchange,
    coinPair
}) => {
    const [selected, setSelected] = useState<string>("Overview")
    const [selectedRightType, setSelectedRightType] = useState<string>("Book")
    const [bookType, setBookType] = useState<string>("Both")

    const maxAmount = Math.max(...orders.map(o => o.amount));

    return (
        <div className={`w-full flex justify-center font-mono`}>
            <div className="h-full w-[70vw] grid grid-cols-1 place-content-start py-1 bg-linear-to-r from-trasparent via-card to-trasnparent">
                <div className="h-[5vh] w-full flex items-center p-2 ">
                    <div className="h-10 border border-border rounded-md flex items-center p-1 gap-2 bg-background">
                        {viewBar.map((items) => (
                            <button className={`h-8 p-2 rounded-md flex items-center justify-center cursor-pointer ${selected == items.value ? 'bg-black/10 dark:bg-black/70' : ''}`} key={items.value} onClick={() => { setSelected(items.value) }}>
                                {items.value}
                            </button>
                        ))}
                    </div>
                </div>

                {selected == "Overview" && (
                    <div className="h-full w-full grid grid-cols-1 p-2 gap-2">
                        <div className="h-[60vh] w-full flex">
                            <div className="h-full w-full flex flex-col items-center justify-center border border-border rounded-md bg-background ">
                                <div className="h-15 w-full border-b border-border rounded-t-md bg-card flex items-center p-2 gap-2">
                                    <span className="p-1 rounded-md bg-primary/40">
                                        <ChartCandlestick height={20} width={20} className="text-primary" />
                                    </span>
                                    <span className="text-lg dark:text-slate-200">
                                        Chart
                                    </span>
                                </div>
                                <div className="h-full w-full flex">
                                    <div className="h-full w-[50vw] border-r border-border">

                                    </div>
                                    <div className="h-full w-[20vw] p-2">
                                        <div className="h-full w-full flex flex-col border border-border rounded-md bg-card p-2 gap-2">
                                            <div className="h-10 w-fit border border-border rounded-md flex items-center justify-start p-1 gap-1">
                                                <button className={`p-2 h-8 rounded-md flex items-center justify-center cursor-pointer ${selectedRightType == 'Book' ? 'bg-background' : ''}`} onClick={() => { setSelectedRightType("Book") }}>
                                                    Book
                                                </button>
                                                <button className={`p-2 h-8 rounded-md flex items-center justify-center cursor-pointer ${selectedRightType == 'Trades' ? 'bg-background' : ''}`} onClick={() => { setSelectedRightType("Trades") }}>
                                                    Trades
                                                </button>
                                            </div>
                                            <div className="h-full w-full flex flex-col border border-border rounded-md p-1 gap-1">
                                                <div className="h-10 w-full rounded-md flex items-center justify-between">
                                                    <div className="flex">
                                                        <button className={`p-2 cursor-pointer flex items-center justify-center rounded-md ${bookType == "Buy" ? 'bg-background' : ''}`} onClick={() => (setBookType("Buy"))}><BookOpenTextIcon height={15} width={15} className="text-primary" /></button>
                                                        <button className={`p-2 cursor-pointer flex items-center justify-center rounded-md ${bookType == "Both" ? 'bg-background' : ''}`} onClick={() => (setBookType("Both"))}><BookOpenTextIcon height={15} width={15} /></button>
                                                        <button className={`p-2 cursor-pointer flex items-center justify-center rounded-md ${bookType == "Sell" ? 'bg-background' : ''}`} onClick={() => (setBookType("Sell"))}><BookOpenTextIcon height={15} width={15} className="text-red-500" /></button>
                                                    </div>
                                                    <div className="flex items-center justify-center gap-1">
                                                        <button className="h-6 p-2 flex items-center justify-center cursor-pointer rounded-md hover:bg-background bg-background/50 text-sm">+</button>
                                                        <span className="text-lg">0.01</span>
                                                        <button className="h-6 p-2 flex items-center justify-center cursor-pointer rounded-md hover:bg-background bg-background/50 text-sm">-</button>
                                                    </div>
                                                </div>
                                                <div className="h-full w-full rounded-md">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="h-[70vh] grid grid-cols-2 gap-2">
                            <div className="h-full w-full flex flex-col items-center justify-center border border-border rounded-md bg-background">
                                <div className="h-15 w-full border-b border-border rounded-t-md bg-card flex items-center p-2 gap-2">
                                    <span className="p-1 rounded-md bg-primary/40">
                                        <Layers height={20} width={20} className="text-primary" />
                                    </span>
                                    <span className="text-lg dark:text-slate-200">
                                        Core Identity & Listing
                                    </span>
                                </div>
                                <div className="h-full w-full flex flex-col items-center justify-center p-4">
                                    <div className="h-[25%] w-full border-b-2 border-border flex flex-col gap-5">
                                        <div className="h-[30%] w-full flex items-center justify-between">
                                            <span className="text-sm dark:text-white/50">Sector / Category</span>
                                            <span className="border border-border rounded-xl h-6 p-2 flex items-center justify-center text-sm">Layer 1</span>
                                        </div>
                                        <div className="h-[70%] w-full flex items-start justify-between">
                                            <span className="text-sm dark:text-white/50">Tags</span>
                                            <span className="flex flex-col items-end gap-1">
                                                <span className="h-6 w-fit p-2 text-sm border border-border rounded-xl flex items-center justify-center bg-card">
                                                    Smart Contract Platform
                                                </span>
                                                <span className="h-6 w-fit p-2 text-sm border border-border rounded-xl flex items-center justify-center bg-card">
                                                    Defi
                                                </span>
                                                <span className="h-6 w-fit p-2 text-sm border border-border rounded-xl flex items-center justify-center bg-card">
                                                    NFT Infrastructure
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="h-[30%] w-full border-b-2 border-border flex flex-col justify-center gap-2">
                                        <div>
                                            <span className="text-sm dark:text-white/50">Contract Addresses</span>
                                        </div>
                                        <div className="flex flex-col items-start justify-center gap-1">
                                            <span className="h-10 w-full border border-border dark:border-none rounded-md bg-card flex items-center justify-between p-1">
                                                <div className="flex items-center justify-center gap-2">
                                                    <span className="h-6 w-fit p-2 text-sm border border-border bg-background rounded-lg flex items-center justify-center">Ethereum</span>
                                                    <span className="text-sm dark:text-white/50">Native</span>
                                                </div>
                                                <div className="flex items-center justify-center gap-1">
                                                    <span className="p-2 bg-background/50 hover:bg-primary cursor-pointer rounded-md group">
                                                        <Copy height={15} width={15} className="group-hover:text-black" />
                                                    </span>
                                                    <span className="p-2 bg-background/50 hover:bg-primary cursor-pointer rounded-md group">
                                                        <Share height={15} width={15} className="group-hover:text-black" />
                                                    </span>
                                                </div>
                                            </span>
                                            <span className="h-10 w-full border border-border dark:border-none rounded-md bg-card flex items-center justify-between p-1">
                                                <div className="flex items-center justify-center gap-2">
                                                    <span className="h-6 w-fit p-2 text-sm border border-border bg-background rounded-lg flex items-center justify-center">Arbitrum</span>
                                                    <span className="text-sm dark:text-white/50">0x82aF...Bab1</span>
                                                </div>
                                                <div className="flex items-center justify-center gap-1">
                                                    <span className="p-2 bg-background/50 hover:bg-primary cursor-pointer rounded-md group">
                                                        <Copy height={15} width={15} className="group-hover:text-black" />
                                                    </span>
                                                    <span className="p-2 bg-background/50 hover:bg-primary cursor-pointer rounded-md group">
                                                        <Share height={15} width={15} className="group-hover:text-black" />
                                                    </span>
                                                </div>
                                            </span>
                                            <span className="h-10 w-full border border-border dark:border-none rounded-md bg-card flex items-center justify-between p-1">
                                                <div className="flex items-center justify-center gap-2">
                                                    <span className="h-6 w-fit p-2 text-sm border border-border bg-background rounded-lg flex items-center justify-center">Polygon</span>
                                                    <span className="text-sm dark:text-white/50">0x7ceB...f619</span>
                                                </div>
                                                <div className="flex items-center justify-center gap-1">
                                                    <span className="p-2 bg-background/50 hover:bg-primary cursor-pointer rounded-md group">
                                                        <Copy height={15} width={15} className="group-hover:text-black" />
                                                    </span>
                                                    <span className="p-2 bg-background/50 hover:bg-primary cursor-pointer rounded-md group">
                                                        <Share height={15} width={15} className="group-hover:text-black" />
                                                    </span>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="h-[25%] w-full border-b-2 border-border flex flex-col items-center justify-center gap-2">
                                        <div className="w-full p-2 flex items-center justify-between text-sm">
                                            <span className="dark:text-white/50">Total Supply</span>
                                            <span>120,450,832 ETH</span>
                                        </div>
                                        <div className="w-full p-2 flex items-center justify-between text-sm">
                                            <span className="dark:text-white/50">Max Supply</span>
                                            <span>∞ (No cap)</span>
                                        </div>
                                        <div className="w-full p-2 flex items-center justify-between text-sm">
                                            <span className="dark:text-white/50">Launch Date</span>
                                            <span>July 30, 2015</span>
                                        </div>
                                    </div>
                                    <div className="h-[20%] w-full flex flex-col justify-center gap-2">
                                        <div>
                                            <span className="text-sm dark:text-white/50">OFFICIAL LINKS</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-2">
                                            {Links.map((items) => {
                                                const Icon = items.icon;
                                                return (
                                                    <div className="flex items-center justify-center p-1 gap-2 rounded-md bg-card cursor-pointer" key={items.title}>
                                                        <Icon height={15} width={15} className="dark:text-white/50" />
                                                        <span>{items.title}</span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="h-full w-full flex flex-col items-center justify-center border border-border rounded-md bg-background">
                                <div className="h-15 w-full border-b border-border rounded-t-md bg-card flex items-center p-2 gap-2">
                                    <span className="p-1 rounded-md bg-primary/40">
                                        <ChartColumn height={20} width={20} className="text-primary" />
                                    </span>
                                    <span className="text-lg dark:text-slate-200">
                                        Spot Price & Volume
                                    </span>
                                </div>
                                <div className="h-full w-full flex flex-col justify-start p-4">
                                    <div className="h-[20%] w-full border-b-2 border-border flex flex-col gap-2 justify-center">
                                        <div className="flex">
                                            <span className="text-sm dark:text-white/50">
                                                LAST TRADE PRICE
                                            </span>
                                        </div>
                                        <div className=" flex items-center justify-center gap-2">
                                            <span className="h-15 w-full border border-border dark:border-none rounded-md bg-card flex flex-col items-center justify-center">
                                                <span className="text-sm dark:text-white/50">
                                                    USD
                                                </span>
                                                <span>
                                                    $3,456.78
                                                </span>
                                            </span>
                                            <span className="h-15 w-full border border-border dark:border-none rounded-md bg-card flex flex-col items-center justify-center">
                                                <span className="text-sm dark:text-white/50">
                                                    USDT
                                                </span>
                                                <span>
                                                    $3,455.9
                                                </span>
                                            </span>
                                            <span className="h-15 w-full border border-border dark:border-none rounded-md bg-card flex flex-col items-center justify-center">
                                                <span className="text-sm dark:text-white/50">
                                                    BTC
                                                </span>
                                                <span>
                                                    0.05234
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="h-[17%] w-full border-b-2 border-border flex flex-col justify-center gap-2">
                                        <div>
                                            <span className="text-sm dark:text-white/50">PERFORMANCE</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="flex flex-col items-center justify-center w-full gap-1">
                                                <span className="text-xs dark:text-white/50">
                                                    1h
                                                </span>
                                                <span className="text-primary text-sm">
                                                    +0.45%
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center justify-center w-full gap-1">
                                                <span className="text-xs dark:text-white/50">
                                                    4h
                                                </span>
                                                <span className="text-primary text-sm">
                                                    +1.23%
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center justify-center w-full gap-1">
                                                <span className="text-xs dark:text-white/50">
                                                    24h
                                                </span>
                                                <span className="text-primary text-sm">
                                                    +5.67%
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center justify-center w-full gap-1">
                                                <span className="text-xs dark:text-white/50">
                                                    7d
                                                </span>
                                                <span className="text-primary text-sm">
                                                    +12.34%
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center justify-center w-full gap-1">
                                                <span className="text-xs dark:text-white/50">
                                                    30d
                                                </span>
                                                <span className="text-red-500 text-sm">
                                                    -3.21%
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center justify-center w-full gap-1">
                                                <span className="text-xs dark:text-white/50">
                                                    1yr
                                                </span>
                                                <span className="text-primary text-sm">
                                                    +45.67%
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-[17%] w-full border-b-2 border-border flex flex-col justify-center gap-2">
                                        <div>
                                            <span className="text-sm dark:text-white/50">
                                                OHLC (24H)
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-full flex flex-col justify-center items-center">
                                                <span className="text-xs dark:text-white/50">
                                                    Open
                                                </span>
                                                <span className=" text-sm">
                                                    $3,312.45
                                                </span>
                                            </div>
                                            <div className="w-full flex flex-col justify-center items-center">
                                                <span className="text-xs dark:text-white/50">
                                                    High
                                                </span>
                                                <span className="text-primary text-sm">
                                                    $3,512.45
                                                </span>
                                            </div>
                                            <div className="w-full flex flex-col justify-center items-center">
                                                <span className="text-xs dark:text-white/50">
                                                    Low
                                                </span>
                                                <span className="text-red-500 text-sm">
                                                    $3,298.12
                                                </span>
                                            </div>
                                            <div className="w-full flex flex-col justify-center items-center">
                                                <span className="text-xs dark:text-white/50">
                                                    Close
                                                </span>
                                                <span className=" text-sm">
                                                    $3,456.78
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-[20%] w-full flex flex-col justify-center gap-5">
                                        <div className="w-full flex justify-between">
                                            <span className="dark:text-white/50">
                                                24h Global Volume
                                            </span>
                                            <span>
                                                $18.50B
                                            </span>
                                        </div>
                                        <div className="w-full flex justify-between">
                                            <span className="dark:text-white/50">
                                                1h Volume
                                            </span>
                                            <span>
                                                $850.00M
                                            </span>
                                        </div>
                                        <div className="w-full flex justify-between">
                                            <span className="dark:text-white/50">
                                                4h Volume
                                            </span>
                                            <span>
                                                $3.20B
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="h-[70vh] grid grid-cols-2 gap-2">
                            <div className="h-full w-full flex flex-col items-center justify-center border border-border rounded-md bg-background">
                                <div className="h-15 w-full border-b border-border rounded-t-md bg-card flex items-center p-2 gap-2">
                                    <span className="p-1 rounded-md bg-primary/40">
                                        <TrendingUp height={20} width={20} className="text-primary" />
                                    </span>
                                    <span className="text-lg dark:text-slate-200">
                                        Orderbook, Liquidity & Execution
                                    </span>
                                </div>
                                <div className="h-full w-full "></div>
                            </div>
                            <div className="h-full w-full flex flex-col items-center justify-center border border-border rounded-md bg-background">
                                <div className="h-15 w-full border-b border-border rounded-t-md bg-card flex items-center p-2 gap-2">
                                    <span className="p-1 rounded-md bg-primary/40">
                                        <PieChart height={20} width={20} className="text-primary" />
                                    </span>
                                    <span className="text-lg dark:text-slate-200">
                                        Market Cap & Supply Structure
                                    </span>
                                </div>
                                <div className="h-full w-full "></div>
                            </div>
                        </div>

                        <div className="h-[80vh]">
                            <div className="h-full w-full flex flex-col items-center justify-center border border-border rounded-md bg-background">
                                <div className="h-15 w-full border-b border-border rounded-t-md bg-card flex items-center p-2 gap-2">
                                    <span className="p-1 rounded-md bg-primary/40">
                                        <Shield height={20} width={20} className="text-primary" />
                                    </span>
                                    <span className="text-lg dark:text-slate-200">
                                        Risk, Flags & Composite Scores
                                    </span>
                                </div>
                                <div className="h-full w-full "></div>
                            </div>
                        </div>
                    </div>
                )}

                {selected == "Market" && (
                    <div className="h-full w-full grid grid-cols-1 p-2 gap-2">
                        <div className="h-[80vh]">
                            <div className="h-full w-full flex flex-col items-center justify-center border border-border rounded-md bg-background">
                                <div className="h-15 w-full border-b border-border rounded-t-md flex items-center p-2 gap-2 bg-card">
                                    <span className="p-1 rounded-md bg-primary/40">
                                        <ChartColumn height={20} width={20} className="text-primary" />
                                    </span>
                                    <span className="text-lg dark:text-slate-200">
                                        Spot Price & Volume
                                    </span>
                                </div>
                                <div className="h-full w-full flex flex-col items-center p-4">
                                    <div className="h-[15%] w-full border-b-2 border-border flex flex-col justify-center gap-2">
                                        <div>
                                            <span className="text-sm dark:text-white/50">
                                                LAST TRADE PRICE
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="h-15 w-full rounded-md bg-card flex flex-col items-center justify-center">
                                                <span className="text-xs dark:text-white/50">USD</span>
                                                <span>$3,456.78</span>
                                            </div>
                                            <div className="h-15 w-full rounded-md bg-card flex flex-col items-center justify-center">
                                                <span className="text-xs dark:text-white/50">USDT</span>
                                                <span>$3,455.9</span>
                                            </div>
                                            <div className="h-15 w-full rounded-md bg-card flex flex-col items-center justify-center">
                                                <span className="text-xs dark:text-white/50">BTC</span>
                                                <span>0.05234</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-[15%] w-full border-b-2 border-border flex flex-col justify-center">
                                        <div>
                                            <span className="text-sm dark:text-white/50">PERFORMANCE</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="flex flex-col items-center justify-center w-full gap-1">
                                                <span className="text-xs dark:text-white/50">
                                                    1h
                                                </span>
                                                <span className="text-primary text-sm">
                                                    +0.45%
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center justify-center w-full gap-1">
                                                <span className="text-xs dark:text-white/50">
                                                    4h
                                                </span>
                                                <span className="text-primary text-sm">
                                                    +1.23%
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center justify-center w-full gap-1">
                                                <span className="text-xs dark:text-white/50">
                                                    24h
                                                </span>
                                                <span className="text-primary text-sm">
                                                    +5.67%
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center justify-center w-full gap-1">
                                                <span className="text-xs dark:text-white/50">
                                                    7d
                                                </span>
                                                <span className="text-primary text-sm">
                                                    +12.34%
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center justify-center w-full gap-1">
                                                <span className="text-xs dark:text-white/50">
                                                    30d
                                                </span>
                                                <span className="text-red-500 text-sm">
                                                    -3.21%
                                                </span>
                                            </div>
                                            <div className="flex flex-col items-center justify-center w-full gap-1">
                                                <span className="text-xs dark:text-white/50">
                                                    1yr
                                                </span>
                                                <span className="text-primary text-sm">
                                                    +45.67%
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-[12%] w-full border-b-2 border-border flex flex-col justify-center">
                                        <div>
                                            <span className="text-sm dark:text-white/50">
                                                OHLC (24H)
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="w-full flex flex-col justify-center items-center">
                                                <span className="text-xs dark:text-white/50">
                                                    Open
                                                </span>
                                                <span className=" text-sm">
                                                    $3,312.45
                                                </span>
                                            </div>
                                            <div className="w-full flex flex-col justify-center items-center">
                                                <span className="text-xs dark:text-white/50">
                                                    High
                                                </span>
                                                <span className="text-primary text-sm">
                                                    $3,512.45
                                                </span>
                                            </div>
                                            <div className="w-full flex flex-col justify-center items-center">
                                                <span className="text-xs dark:text-white/50">
                                                    Low
                                                </span>
                                                <span className="text-red-500 text-sm">
                                                    $3,298.12
                                                </span>
                                            </div>
                                            <div className="w-full flex flex-col justify-center items-center">
                                                <span className="text-xs dark:text-white/50">
                                                    Close
                                                </span>
                                                <span className=" text-sm">
                                                    $3,456.78
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-[20%] w-full border-b-2 border-border flex flex-col justify-center gap-5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm dark:text-white/50">24h Global Volume</span>
                                            <span>$18.50B</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm dark:text-white/50">1h Volume</span>
                                            <span>$850.00M</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm dark:text-white/50">4h Volume</span>
                                            <span>$3.20B</span>
                                        </div>
                                    </div>

                                    <div className="h-[25%] w-full border-b-2 border-border flex flex-col justify-center gap-1">
                                        <div>
                                            <span className="text-sm dark:text-white/50">VOLUME BY QUOTE ASSET</span>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="">
                                                <span className="text-sm dark:text-white/50">USDT</span>
                                            </div>
                                            <div className="">
                                                <span className="text-sm dark:text-white/50">USDC</span>
                                            </div>
                                            <div className="">
                                                <span className="text-sm dark:text-white/50">USD</span>
                                            </div>
                                            <div className="">
                                                <span className="text-sm dark:text-white/50">OTHER</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-[13%] w-full flex flex-col justify-center gap-2">
                                        <div className="flex flex-row items-center justify-between">
                                            <span className="text-sm dark:text-white/50">
                                                VWAP (Session)
                                            </span>
                                            <span>
                                                $3,423.56
                                            </span>
                                        </div>
                                        <div className="flex flex-row items-center justify-between">
                                            <span className="text-sm dark:text-white/50">
                                                TWAP (Session)
                                            </span>
                                            <span>
                                                $3,398.12
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="h-[110vh]">
                            <div className="h-full w-full flex flex-col items-center justify-center border border-border rounded-md bg-background">
                                <div className="h-15 w-full border-b border-border rounded-t-md flex items-center p-2 gap-2 bg-card">
                                    <span className="p-1 rounded-md bg-primary/40">
                                        <TrendingUp height={20} width={20} className="text-primary" />
                                    </span>
                                    <span className="text-lg dark:text-slate-200">
                                        Orderbook, Liquidity & Execution
                                    </span>
                                </div>
                                <div className="h-full w-full"></div>
                            </div>
                        </div>
                    </div>
                )}

                {selected == "Derivatives" && (
                    <div className="h-full w-full grid grid-cols-1 p-2 gap-2">
                        <div className="h-[118vh]">
                            <div className="h-full w-full flex flex-col items-center justify-center border border-border rounded-md bg-background">
                                <div className="h-15 w-full border-b border-border rounded-t-md bg-card flex items-center p-2 gap-2">
                                    <span className="p-1 rounded-md bg-primary/40">
                                        <Target height={20} width={20} className="text-primary" />
                                    </span>
                                    <span className="text-lg dark:text-slate-200">
                                        Derivatives, Funding & Perp Intel
                                    </span>
                                </div>
                                <div className="h-full w-full flex flex-col items-center p-4">
                                    <div className="h-[14%] w-full border-b-2 border-border flex flex-col gap-1">
                                        <div>
                                            <span className="text-sm dark:text-white/50">PERPETUAL FUNDING RATE</span>
                                        </div>
                                        <div className="flex items-center justify-center gap-2">
                                            <div className="h-25 w-full rounded-md bg-card flex flex-col items-start justify-center p-2">
                                                <span className="text-sm dark:text-white/50">Current (8h)</span>
                                                <span className="text-3xl text-primary">+0.0123%</span>
                                                <span className="text-sm dark:text-white/50">Longs pay short</span>
                                            </div>
                                            <div className="h-25 w-full rounded-md bg-card flex flex-col items-start justify-center p-2">
                                                <span className="text-sm dark:text-white/50">7d Average</span>
                                                <span className="text-3xl text-primary">+0.0089%</span>
                                                <span className="text-sm dark:text-white/50">Bullish bias</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-[18%] w-full border-b-2 border-border flex flex-col justify-center gap-4">
                                        <div>
                                            <span className="text-sm dark:text-white/50">OPEN INTEREST</span>
                                        </div>
                                        <div className="w-full flex flex-col gap-2">
                                            <div className="w-full flex justify-between items-center">
                                                <span className="text-sm dark:text-white/50">Total OI</span>
                                                <span>$8.45B</span>
                                            </div>

                                            <div className="w-full flex justify-between items-center">
                                                <span className="text-sm dark:text-white/50">OI / Market Cap</span>
                                                <span>2.03%</span>
                                            </div>

                                            <div className="w-full flex justify-between items-center">
                                                <span className="text-sm dark:text-white/50">24h OI Change</span>
                                                <span className="text-primary">+5.67%</span>
                                            </div>

                                            <div className="w-full flex justify-between items-center">
                                                <span className="text-sm dark:text-white/50">1h OI Change</span>
                                                <span className="text-primary">+0.34%</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-[24%] w-full border-b-2 border-border flex flex-col justify-center gap-2">
                                        <div>
                                            <span className="text-sm dark:text-white/50">LIQUIDATIONS (24H)</span>
                                        </div>
                                        <div className="h-50 w-full flex flex-col gap-2">
                                            <div className="h-full w-full">
                                                <div className="h-full w-full rounded-md bg-card flex flex-col items-center justify-center gap-1">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Flame className="text-red-500" />
                                                        <span className="text-3xl">$125.00M</span>
                                                    </div>
                                                    <span className="text-sm dark:text-white/50">Total Liquidations</span>
                                                </div>
                                            </div>
                                            <div className="h-full w-full flex gap-2">
                                                <div className="h-full w-full rounded-md bg-primary/30 border border-primary/20 flex flex-col items-center justify-center">
                                                    <span className="text-sm text-white/50">Long Liquidations</span>
                                                    <span className="text-2xl text-primary">$68.00M</span>
                                                </div>
                                                <div className="h-full w-full rounded-md bg-red-400/30 border border-red-500/20 flex flex-col items-center justify-center">
                                                    <span className="text-sm text-white/50">Short Liquidations</span>
                                                    <span className="text-2xl text-red-500">$57.00M</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-[11%] w-full border-b-2 border-border flex flex-col justify-center gap-2">
                                        <div>
                                            <span className="text-sm dark:text-white/50">PERP VS SPOT BASIS</span>
                                        </div>
                                        <div className="h-15 w-full rounded-md bg-card flex items-center justify-between p-2">
                                            <div className="flex flex-col">
                                                <span>Premium: 0.12%</span>
                                                <span className="text-sm dark:text-white/50">Perp trading at contango</span>
                                            </div>
                                            <div className="px-2 bg-primary rounded-xl">
                                                <span className="text-black text-sm font-bold">Contango</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-[23%] w-full border-b-2 border-border flex flex-col justify-center gap-2">
                                        <div>
                                            <span className="text-sm dark:text-white/50">OPTIONS METRICS</span>
                                        </div>
                                        <div className="h-50 w-full grid grid-cols-2 gap-3">
                                            <div className="h-full w-full rounded-md border border-border bg-card flex flex-col justify-center p-2">
                                                <span className="text-sm dark:text-white/50">Implied Volatility</span>
                                                <span className="text-2xl">62.5%</span>
                                            </div>
                                            <div className="h-full w-full rounded-md border border-border bg-card flex flex-col justify-center p-2">
                                                <span className="text-sm dark:text-white/50">25Δ Skew</span>
                                                <span className="text-2xl text-red-500">-2.3%</span>
                                            </div>
                                            <div className="h-full w-full rounded-md border border-border bg-card flex flex-col justify-center p-2">
                                                <span className="text-sm dark:text-white/50">Put/Call OI Ratio</span>
                                                <span className="text-2xl">0.85</span>
                                            </div>
                                            <div className="h-full w-full rounded-md border border-border bg-card flex flex-col justify-center p-2">
                                                <span className="text-sm dark:text-white/50">Max Pain</span>
                                                <span className="text-2xl">$3,400</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-[10%] w-full flex flex-col justify-center gap-2">
                                        <div className="h-20 w-full rounded-md bg-red-400/30 border border-red-500/20 flex items-center p-2">
                                            <AlertTriangle className="text-red-500" height={25} width={25}/>
                                            <div className="flex flex-col p-4">
                                                <span className="text-sm">Squeeze Risk: Moderate</span>
                                                <span className="text-xs dark:text-white/50">High funding + increasing OI suggests potential long squeeze if price reverses</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {selected == "On-Chain" && (
                    <div className="h-full w-full grid grid-cols-1 p-2 gap-2">
                        <div className="h-[150vh]">
                            <div className="h-full w-full flex flex-col items-center justify-center border border-border rounded-md bg-background">
                                <div className="h-15 w-full border-b border-border rounded-t-md bg-card flex items-center p-2 gap-2">
                                    <span className="p-1 rounded-md bg-primary/40">
                                        <TrendingUp height={20} width={20} className="text-primary" />
                                    </span>
                                    <span className="text-lg dark:text-slate-200">
                                        On-Chain Activity Metrics
                                    </span>
                                </div>
                                <div className="h-full w-full "></div>
                            </div>
                        </div>
                    </div>
                )}

                {selected == "Social & Dev" && (
                    <div className="h-full w-full grid grid-cols-1 p-2 gap-2">
                        <div className="h-[150vh]">
                            <div className="h-full w-full flex flex-col items-center justify-center border border-border rounded-md bg-background">
                                <div className="h-15 w-full border-b border-border rounded-t-md bg-card flex items-center p-2 gap-2">
                                    <span className="p-1 rounded-md bg-primary/40">
                                        <MessageCircle height={20} width={20} className="text-primary" />
                                    </span>
                                    <span className="text-lg dark:text-slate-200">
                                        Social, Dev & Sentiment Intel
                                    </span>
                                </div>
                                <div className="h-full w-full "></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}


