"use client";
import React, { useState } from "react"
import { cn } from "@/lib/utils/utils";
import { io } from 'socket.io-client';
import { useData } from "@/app/context/dataContext";
import { Bell, TrendingUp, Search, CandlestickChart } from 'lucide-react'
import { useRouter } from "next/navigation";
import MarketMarquee from "./marketMarquee";
import Link from "next/link";
import { Boxes } from "@/components/ui/box/boxes";
import HeroShowcase from "./heroShowcase";
import RightSideBar from "./sidebars/rightSidebar";
import LeftSideBar from "./sidebars/leftSidebar";
import Analysis from "./viewtype/analysis";
import Trading from "./viewtype/trading";


interface BackgroundProps {
    children?: React.ReactNode,
    className?: string
}

const Background: React.FC<BackgroundProps> = ({
    children,
    className = ''
}) => {
    return (
        <div className={`relative flex min-h-screen h-[110vh] md:h-screen w-full items-center justify-center bg-background z-99 ${className}`}>
            <div
                className={cn(
                    "absolute inset-0",
                    `bg-size-[25px_25px]`,
                    `bg-[radial-gradient(#1a1818_1px,transparent_1px)]`,
                    `dark:bg-[radial-gradient(#706f6f_1px,transparent_1px)]`,
                )}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background" style={{ maskImage: "radial-gradient(ellipse at center, transparent 20%, black)" }}></div>
            <MarketMarquee />
            {children}
        </div>
    )
}

interface LinkItems {
    label: string,
    href: string
}

const Navlinks: LinkItems[] = [
    { label: 'market', href: '/markets' },
    { label: 'trade', href: '/trade' },
    { label: 'swap', href: '/swap' },
    { label: 'bridge', href: '/bridge' },
]


export default function Market() {
    const socket = io('http://localhost:3004');
    const { isLeftOpen, isRightOpen, viewType, setViewType } = useData();
    const [showNotification, setShowNotification] = useState<boolean>(false);
    const Router = useRouter();

    return (
        <div className="font-mono">
            <Background className="flex h-screen overflow-hidden">
                <LeftSideBar />


                <div className={`flex flex-col transition-all duration-300 ${isLeftOpen && isRightOpen ? 'w-[70vw]' : isLeftOpen && !isRightOpen ? 'w-[85vw]' : isRightOpen && !isLeftOpen ? 'w-[75vw]' : 'w-screen'}`}>
                    <div className="z-102 flex items-center justify-center border border-border transition-all duration-300 ">
                        <div className="relative">
                            <div className={`h-[6vh] transition-all duration-300 flex items-center justify-center p-4 text-lg ${isLeftOpen && isRightOpen ? 'w-[70vw]' : isLeftOpen && !isRightOpen ? 'w-[85vw]' : !isLeftOpen && isRightOpen ? 'w-[75vw]' : 'w-screen'}`}>
                                <div className="h-full w-[96vw] flex items-center justify-between">
                                    <span className="flex items-center justify-center gap-2">
                                        {Navlinks.map((items) => (
                                            <Link key={items.href} href={items.href} className="h-8 p-2 flex items-center justify-center rounded-lg hover:bg-black/10 dark:hover:bg-zinc-800 transition-all duration-200">
                                                {items.label}
                                            </Link>
                                        ))}
                                    </span>

                                    <div className={`flex items-center justify-center h-10 border border-border p-2 backdrop-blur rounded-lg cursor-pointer transition-all duration-300  ${isLeftOpen && isRightOpen ? 'w-[40vw]' : isLeftOpen && !isRightOpen ? 'w-[50vw]' : !isLeftOpen && isRightOpen ? 'w-[30vw]' : 'w-[50vw]'}`}>
                                        <input type="text" className="h-full w-full outline-none p-2 text-sm" />
                                        <Search height={20} width={20} className="text-slate-400" />
                                    </div>

                                    <div className="relative flex gap-5">
                                        <div className="h-10 w-30 flex items-center justify-center rounded-md border border-border">
                                            <button className={`h-full w-full rounded-l-md hover:bg-card cursor-pointer flex items-center justify-center ${viewType == 'Trading' ? 'text-primary bg-zinc-950/70 dark:bg-card' : ''}`} onClick={() => { setViewType("Trading") }}>
                                                <CandlestickChart height={20} width={20} />
                                            </button>
                                            <button className={`h-full w-full rounded-r-md hover:bg-card cursor-pointer flex items-center justify-center ${viewType == 'Analysis' ? 'text-primary bg-zinc-950/70 dark:bg-card' : ''}`} onClick={() => { setViewType("Analysis") }}>
                                                <TrendingUp height={20} width={20} />
                                            </button>
                                        </div>

                                        <button className="flex items-center justify-center border p-2 border-border rounded-lg bg-background hover:bg-black/10 dark:hover:bg-black/50 cursor-pointer transition-all duration-200" onClick={() => { setShowNotification(!showNotification) }}>
                                            <Bell height={20} width={20} />
                                        </button>
                                    </div>
                                </div>

                            </div>
                            {showNotification && (
                                <div className={`absolute right-10 top-14 grid grid-cols-1 p-1 gap-1 h-60 w-65 border border-border rounded-md bg-background overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
                                    <div className={`h-14 w-full border border-border rounded-sm hover:bg-black/10 dark:hover:bg-black/50`}>

                                    </div>
                                    <div className={`h-14 w-full border border-border rounded-sm hover:bg-black/10 dark:hover:bg-black/50`}>

                                    </div>
                                    <div className={`h-14 w-full border border-border rounded-sm hover:bg-black/10 dark:hover:bg-black/50`}>

                                    </div>
                                    <div className={`h-14 w-full border border-border rounded-sm hover:bg-black/10 dark:hover:bg-black/50`}>

                                    </div>
                                    <div className={`h-14 w-full border border-border rounded-sm hover:bg-black/10 dark:hover:bg-black/50`}>

                                    </div>
                                    <div className={`h-14 w-full border border-border rounded-sm hover:bg-black/10 dark:hover:bg-black/50`}>

                                    </div>
                                    <div className={`h-14 w-full border border-border rounded-sm hover:bg-black/10 dark:hover:bg-black/50`}>

                                    </div>
                                    <div className={`h-14 w-full border border-border rounded-sm hover:bg-black/10 dark:hover:bg-black/50`}>

                                    </div>
                                    <div className={`h-14 w-full border border-border rounded-sm hover:bg-black/10 dark:hover:bg-black/50`}>

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={`h-[94vh] w-full z-50 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col items-center`}>

                        <div className="min-h-full w-full flex flex-col gap-2 items-center justify-center">
                            <div className={`min-h-full flex flex-col gap-10 items-center justify-between z-101 p-4 `}>
                                <div className={`h-10 flex items-center justify-center gap-2`}>

                                </div>
                                <span className="flex flex-col items-center justify-center gap-10">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <h1 className={`font-serif text-primary transition-all duration-300 ${!isLeftOpen && !isRightOpen ? 'text-8xl' : isLeftOpen && isRightOpen ? 'text-7xl' : 'text-7xl'}`}>
                                            Live Markets. Zero Latency
                                        </h1>
                                        <p className="w-200 text-center">
                                            The real-time market hub that delivers every tick across 50+ exchanges. Fast. Reliable. Built for traders.
                                        </p>
                                    </div>
                                    <div className="">
                                        <Boxes className="cursor-pointer bg-card dark:border-none ">
                                            <div className="h-10 w-50 flex items-center justify-center ">
                                                Start Free Trial
                                            </div>
                                        </Boxes>
                                    </div>
                                </span>
                                <div>
                                    <HeroShowcase />
                                </div>
                            </div>
                        </div>

                        <div className={`min-h-full w-full flex flex-col gap-10 items-center justify-center z-104 transition-all duration-300`}>
                            {viewType == "Analysis" && <Analysis />}

                            {viewType == "Trading" && <Trading />}
                        </div>
                    </div>
                </div >

                <RightSideBar />
            </Background >
        </div >
    )
}
