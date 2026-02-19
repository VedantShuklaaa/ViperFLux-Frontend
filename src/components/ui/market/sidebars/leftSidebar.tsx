"useClient";
import { useData } from "@/app/context/dataContext";
import {ChevronLeft, ChevronRight } from 'lucide-react';

export default function LeftSideBar() {

    const {isLeftOpen, sendIsLeftOpen, isRightOpen} = useData();
    return (
        <>
            <div className={`h-screen bg-background border border-border z-101 relative flex items-center justify-center transition-all duration-300 ease-out ${isLeftOpen && isRightOpen ? 'w-[15vw]' : isLeftOpen && !isRightOpen ? 'w-[15vw]' : 'w-0 h-0'} `}>
                {isLeftOpen && (
                    <>
                        <div className="h-full w-full flex flex-col bg-card">
                            <div className="h-[6vh] border-b border-border z-102 w-full bg-card">

                            </div>
                            <div className="h-[94vh] w-full flex items-end justify-start">
                                <div className={`h-20 w-63 p-2 border-t border-border flex items-center justify-center`}>
                                    <div className="h-full w-full flex items-center justify-start border border-border dark:border-none rounded-lg bg-background p-2 gap-2">
                                        <div className="h-12 w-12 rounded-full border border-border bg-primary flex items-center justify-center text-3xl font-serif">T</div>
                                        <div className="h-12 w-25 flex flex-col items-start justify-center gap-1 font-sans">
                                            <span className="text-md">Trader</span>
                                            <span className="text-xs">Pro Account</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => { sendIsLeftOpen(false) }}
                            className="flex items-center justify-center cursor-pointer h-[94vh] w-8 z-101 absolute right-0 bottom-0 border-l border-border/70 bg-card"
                        >
                            <ChevronLeft height={30} width={30} className="text-primary" />
                        </button>
                    </>
                )}
            </div>
            {!isLeftOpen && (
                <button
                    onClick={() => { sendIsLeftOpen(true) }}
                    className="flex items-center justify-end z-101 h-[94vh] w-8 cursor-pointer absolute left-0 bottom-0 border-r border-border/40 bg-card/10 hover:bg-card/70 transition-all duration-100 opacity-0 hover:opacity-100"
                >
                    <ChevronRight height={30} width={30} className="text-primary" />
                </button>
            )}
        </>
    )
}