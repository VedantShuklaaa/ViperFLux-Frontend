import React, { useState } from "react"
import { Exchanges, coins } from "@/lib/exchanges"
import { useData } from "@/app/context/dataContext"

export default function Analysis() {
    const { selectedCoinPair, sendSelectedCoinPair, exchange, setExchanges, sendIsRightOpen } = useData();
    const [showAvailableCoins, setShowAvailableCoins] = useState<boolean>(false);

    return (
        <div className={`h-full w-full border border-border p-5 gap-2 z-102 flex flex-col items-center justify-center bg-transparent backdrop-blur transition-all duration-300`}>
            <div className={`h-[8vh] w-full flex items-center justify-between z-102`}>
                <div className={`h-full flex items-center justify-center`}>
                    <button className={`relative h-12 w-30 border border-border rounded-md flex items-center justify-center text-lg cursor-pointer dark:hover:bg-card/10 transition-all duration-100`} onClick={() => { setShowAvailableCoins(!showAvailableCoins) }}>
                        <div className="h-full w-full flex items-center justify-center rounded-md text-sm bg-linear-to-r from-card via-transparent to-card hover:bg-blue-400/10 text-primary">
                            {selectedCoinPair?.symbol}
                        </div>
                    </button>
                </div>
                <div className={`h-full flex items-center justify-center`}>
                    <div className="flex items-center h-12 rounded-md border border-border">
                        <button className={` h-full w-20 flex items-center justify-center text-lg cursor-pointer rounded-l-md hover:bg-card/70 transition-all duration-100 ${exchange == 'CEX' ? 'bg-linear-to-r from-card via-transparent to-card text-primary' : ''}`} onClick={() => { setExchanges('CEX') }}>
                            CEX
                        </button>
                        <button className={` h-full w-20 flex items-center justify-center text-lg cursor-pointer rounded-r-md hover:bg-card/70 transition-all duration-100 ${exchange == 'DEX' ? 'bg-linear-to-r from-card via-transparent to-card text-primary' : ''}`} onClick={() => { setExchanges('DEX') }}>
                            DEX
                        </button>
                    </div>
                </div>
            </div>
            {showAvailableCoins && (
                <div className="absolute h-48 w-30 border border-border bg-card top-22 left-5 z-103 transition-all duration-300 grid grid-cols-1 place-items-center place-content-start px-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                    {coins.map((items) => (
                        <div className="h-12 w-full text-sm cursor-pointer flex items-center justify-center bg-linear-to-r from-card via-transparent to-card hover:bg-blue-400/10 border-b border-border" key={items.symbol} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { setShowAvailableCoins(!showAvailableCoins), sendSelectedCoinPair(items) } }} onClick={() => { setShowAvailableCoins(!showAvailableCoins), sendSelectedCoinPair(items) }}>
                            {items.symbol}
                        </div>
                    ))}
                </div>
            )}


            <div className={`h-[90vh] w-full bg-transparent z-102 backdrop-blur grid grid-cols-1 place-items-center place-content-start gap-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}>
                {Exchanges.map((items) => (
                    <div
                        key={items.name}
                        className="h-60 w-full rounded-sm bg-card cursor-pointer dark:bg-card/80 backdrop-blur-sm border border-border flex items-center justify-center gap-2 p-2 hover:bg-slate-600/20 dark:hover:bg-slate-800/70 hover:border-slate-600/50"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') sendIsRightOpen(true) }}
                        onClick={() => { sendIsRightOpen(true) }}
                    >
                        <div className="h-full w-25 bg-background rounded-md flex flex-col gap-2 items-center justify-start">
                            <span className="text-md">{items.name}</span>
                            <div className="h-17 w-17 border rounded-full">

                            </div>
                        </div>

                        <div className="h-full w-60 bg-background rounded-md">

                        </div>

                        <div className="h-full w-60 bg-background rounded-md">

                        </div>

                        <div className="h-full w-60 bg-background rounded-md">

                        </div>

                        <div className="h-full w-60 bg-background rounded-md">

                        </div>

                        <div className="h-full w-60 bg-background rounded-md">

                        </div>

                        <div className="h-full w-60 bg-background rounded-md">

                        </div>

                        <div className="h-full w-60 bg-background rounded-md">

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
