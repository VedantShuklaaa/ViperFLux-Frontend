"useClient";
import { useData } from "@/app/context/dataContext"
import { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";



export default function RightSideBar() {
    const [openChanges, setOpenChanges] = useState<boolean>(false);
    const [previewChart, setPreviewChart] = useState<boolean>(false);
    const router = useRouter();

    const { isRightOpen, sendIsRightOpen, isLeftOpen } = useData();

    const cryptoData = {
        name: 'Bitcoin',
        symbol: 'BTC',
        price: 95420,
        change: 2.3,
        volume: '2.3M',
        spread: 0.16,
        exchange: 'Binance',
        arbPercent: 0.2,
        image: '₿',
        color: 'from-orange-400 to-orange-600'
    }

    return (
        <>
            <div className={`h-screen border border-border z-102 relative flex items-center justify-center bg-card transition-all duration-300 ease-out ${isLeftOpen && isRightOpen ? 'w-[15vw]' : isRightOpen && !isLeftOpen ? 'w-[25vw]' : 'w-0 h-0'} `}>
                {isRightOpen && (
                    <>
                        <div className={`relative h-full flex flex-col items-end ${isLeftOpen && isRightOpen ? 'w-[15vw]' : isRightOpen && !isLeftOpen ? 'w-[25vw]' : 'w-0 h-0'}`}>
                            <div className="h-[6vh] border-b border-border z-102 w-full bg-card backdrop-blur-sm">

                            </div>
                            <div className={`h-[94vh] grid grid-cols-1 items-end backdrop-blur-sm transition-all duration-300 ${isLeftOpen && isRightOpen ? 'w-63' : isRightOpen && !isLeftOpen ? 'w-111' : 'w-0'} `}>
                                <div className={`h-full w-full grid grid-cols-1 p-2 gap-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
                                    <div className="flex gap-2 w-full h-15">
                                        <div className={`h-full w-full  border hover:border-border flex flex-col items-center justify-center cursor-pointer hover:bg-transparent bg-background/50 transition-all duration-300  border-slate-600/50`}>
                                            <span className="text-xs dark:text-slate-500">Exchange</span>
                                            <span className="text-4xl text-slate-800 dark:text-slate-100">Binance</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 w-full">
                                        <div className={`h-15 w-full  border hover:border-border flex flex-col items-center justify-center cursor-pointer p-2 bg-background/50 hover:bg-transparent transition-all duration-300 border-slate-600/50`}>
                                            <span className="text-xs dark:text-slate-500">Coin</span>
                                            <span className="text-xl text-slate-800 dark:text-slate-100">Bitcoin</span>
                                        </div>
                                        <div className={`h-15 w-full  border hover:border-border flex flex-col items-center justify-center cursor-pointer p-2 bg-background/50 hover:bg-transparent transition-all duration-300 border-slate-600/50`}>
                                            <span className="text-xs dark:text-slate-500">Symbol</span>
                                            <span className="text-xl text-slate-800 dark:text-slate-100">BTC/USD</span>
                                        </div>
                                        <div className={`h-15 w-full  border hover:border-border flex flex-col items-center justify-center cursor-pointer p-2 bg-background/50 hover:bg-transparent transition-all duration-300 border-slate-600/50`}>
                                            <span className="text-xs dark:text-slate-500">Price</span>
                                            <span className="text-xl text-slate-800 dark:text-slate-100">$94395</span>
                                        </div>
                                    </div>

                                    <div className={`relative w-full p-2 gap-2 flex flex-col items-center justify-start ${openChanges ? 'h-56' : 'h-35'} border hover:border-border cursor-pointer transition-all duration-300  border-slate-600/50`}>
                                        <span className="h-5 w-full flex items-center justify-center text-lg dark:text-slate-500">
                                            Changes
                                        </span>
                                        <div className="w-full grid grid-cols-3 items-center justify-center p-2 gap-2">
                                            <div className={`h-15 w-full  border hover:border-border text-center flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-transparent bg-background/50 transition-all duration-300 border-slate-600/50`}>
                                                <span className="text-xs dark:text-slate-500">1hr Change</span>
                                                <span className="text-xl text-slate-800 dark:text-slate-100">2.46%</span>
                                            </div>
                                            <div className={`h-15 w-full  border hover:border-border text-center flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-transparent bg-background/50 transition-all duration-300 border-slate-600/50`}>
                                                <span className="text-xs dark:text-slate-500">4hr Change</span>
                                                <span className="text-xl text-slate-800 dark:text-slate-100">4.52%</span>
                                            </div>
                                            <div className={`h-15 w-full  border hover:border-border text-center flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-transparent bg-background/50 transition-all duration-300 border-slate-600/50`}>
                                                <span className="text-xs dark:text-slate-500">24hr Change</span>
                                                <span className="text-xl text-slate-800 dark:text-slate-100">1.63%</span>
                                            </div>


                                            <div className={`h-15 w-full  border hover:border-border text-center transition-all duration-300 ${openChanges ? 'flex' : 'hidden'} flex-col items-center justify-center cursor-pointer p-2 hover:bg-transparent bg-background/50 transition-all duration-300 border-slate-600/50`}>
                                                <span className="text-xs dark:text-slate-500">7day Change</span>
                                                <span className="text-xl text-slate-800 dark:text-slate-100">2.46%</span>
                                            </div>
                                            <div className={`h-15 w-full  border hover:border-border text-center transition-all duration-300 ${openChanges ? 'flex' : 'hidden'} flex-col items-center justify-center cursor-pointer p-2 hover:bg-transparent bg-background/50 transition-all duration-300 border-slate-600/50`}>
                                                <span className="text-xs dark:text-slate-500">30day Change</span>
                                                <span className="text-xl text-slate-800 dark:text-slate-100">4.52%</span>
                                            </div>
                                            <div className={`h-15 w-full  border hover:border-border text-center transition-all duration-300 ${openChanges ? 'flex' : 'hidden'} flex-col items-center justify-center cursor-pointer p-2 hover:bg-transparent bg-background/50 transition-all duration-300 border-slate-600/50`}>
                                                <span className="text-xs dark:text-slate-500">1 year Change</span>
                                                <span className="text-xl text-slate-800 dark:text-slate-100">1.63%</span>
                                            </div>
                                        </div>

                                        <button className="absolute bottom-0 h-7 w-100 border-t border-border dark:hover:bg-background/50 cursor-pointer flex items-center justify-center" onClick={() => { setOpenChanges(!openChanges) }}>
                                            <ChevronDown height={25} width={25} className={`transition-transform duration-300 ${openChanges ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>

                                    <div className={`h-80 w-full flex items-center justify-center cursor-pointer gap-2 border border-slate-600/50 hover:border-border hover:bg-transparent bg-background/80 transition-all duration-300 `} onMouseEnter={() => { setPreviewChart(true) }} onMouseLeave={() => { setPreviewChart(false) }}>

                                    </div>

                                    <div className={`w-full flex gap-2`}>
                                        <div className={`h-15 w-full  border border-slate-600/50 hover:border-border text-center flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-transparent bg-background transition-all duration-300`}>
                                            <span className="text-xs dark:text-slate-500">Volume (24hr)</span>
                                            <span className="text-xl text-slate-800 dark:text-slate-100">2.4M</span>
                                        </div>
                                        <div className={`h-15 w-full  border border-slate-600/50 hover:border-border text-center flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-transparent bg-background transition-all duration-300`}>
                                            <span className="text-xs dark:text-slate-500">Circulating supply</span>
                                            <span className="text-xl text-slate-800 dark:text-slate-100">842.77M</span>
                                        </div>
                                    </div>

                                    <div className={`w-full flex gap-2`}>
                                        <div className={`h-15 w-full border border-slate-600/50 hover:border-border text-center flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-transparent bg-background transition-all duration-300`}>
                                            <span className="text-xs dark:text-slate-500">Market Cap</span>
                                            <span className="text-xl text-slate-800 dark:text-slate-100">75.3B</span>
                                        </div>
                                        <div className={`h-15 w-full  border border-slate-600/50 hover:border-border text-center flex flex-col items-center justify-center cursor-pointer p-2 hover:bg-transparent bg-background transition-all duration-300`}>
                                            <span className="text-xs dark:text-slate-500">FDV</span>
                                            <span className="text-xl text-slate-800 dark:text-slate-100">82.5B</span>
                                        </div>
                                    </div>

                                    <div className={`w-full flex gap-2`}>
                                        <div className={`relative h-25 w-full p-2 gap-2 flex flex-col items-center justify-center border border-slate-600/50 hover:border-border bg-background/50 cursor-pointer transition-all duration-300`}>
                                            asd
                                        </div>
                                    </div>

                                    <div className="h-5 flex w-full items-center justify-center">
                                        <Link href={`/markets/${cryptoData.exchange}/${cryptoData.symbol}`} className="text-blue-600 hover:text-blue-400 cursor-pointer">
                                            Viem more details
                                        </Link>
                                    </div>
                                </div>

                                <div className={`h-10 border-t w-full border-border flex items-center justify-between border transition-all duration-300 `}>
                                    <div className={`h-full w-full flex items-center justify-between transition-all duration-300 ${isLeftOpen && isRightOpen ? 'p-1' : isRightOpen && !isLeftOpen ? 'p-2' : ''}`}>
                                        <span className={`transition-all duration-300 ${isLeftOpen && isRightOpen ? 'text-sm' : isRightOpen && !isLeftOpen ? 'text-md' : ''}`}>Status</span>
                                        <div className={`flex items-center justify-center transition-all duration-300 ${isLeftOpen && isRightOpen ? 'gap-1' : isRightOpen && !isLeftOpen ? 'gap-2' : ''}`}>
                                            <span className={`font-extralight transition-all duration-300 ${isLeftOpen && isRightOpen ? 'text-xs' : isRightOpen && !isLeftOpen ? 'text-sm' : ''}`}>Online</span>
                                            <span className="h-3 w-3 rounded-full bg-emerald-300" />
                                        </div>
                                    </div>
                                    <div className="h-full border border-border left-[50%]" />
                                    <div className={`h-full w-full flex items-center justify-between transition-all duration-300 ${isLeftOpen && isRightOpen ? 'p-1' : isRightOpen && !isLeftOpen ? 'p-2' : ''}`}>
                                        <span className={`transition-all duration-300 ${isLeftOpen && isRightOpen ? 'text-sm' : isRightOpen && !isLeftOpen ? 'text-md' : ''}`}>Market Data</span>
                                        <div className={`flex items-center justify-center transition-all duration-300 ${isLeftOpen && isRightOpen ? 'gap-1' : isRightOpen && !isLeftOpen ? 'gap-2' : ''}`}>
                                            <span className={`font-extralight transition-all duration-300 ${isLeftOpen && isRightOpen ? 'text-xs' : isRightOpen && !isLeftOpen ? 'text-sm' : ''}`}>Live</span>
                                            <span className="h-3 w-3 rounded-full bg-emerald-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="absolute left-0 bottom-0">
                            <button
                                onClick={() => { sendIsRightOpen(false) }}
                                className=" flex items-center justify-center cursor-pointer h-[94vh] w-8 z-101 relative left-0 bottom-0 border-r border-border/70 bg-card"
                            >
                                <ChevronRight height={30} width={30} className="text-primary" />
                            </button>
                            {previewChart && (
                                <div className={`absolute right-10 top-40 h-[60vh] w-[40vw] p-2 bg-linear-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 z-50 flex items-center justify-center transition-all duration-200`}>
                                    <span className="text-white text-xl h-full w-full flex items-center justify-center backdrop-blur-xl">Preview Chart</span>
                                </div>
                            )}
                        </div>

                    </>
                )}
            </div>
            {/* {!isRightOpen && (
                <button
                    onClick={() => { sendIsRightOpen(true) }}
                    className="flex items-center justify-end z-100 h-[94vh] w-8 cursor-pointer absolute right-0 bottom-0 border-r border-border/40 bg-card/70"
                >
                    <ChevronLeft height={30} width={30} className="text-primary" />
                </button>
            )
            } */}
        </>
    )
}