'use client';
import React, { useEffect, useState } from "react"
import { cn } from "@/src/lib/utils"
import { ChevronLeft } from "lucide-react"
import { ChevronRight } from "lucide-react"
import { Boxes } from "@/src/components/ui/box/boxes";
import { useData } from "@/src/app/context/dataContext";
import Link from "next/link";
import { Bell } from "lucide-react";

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
            {children}
        </div>
    )
}

interface LinkItems {
    label: string,
    href: string
}


export default function Dashboard() {

    const [isOpen, setIsOpen] = useState<boolean>(true)
    const { sendIsConnected } = useData();

    useEffect(() => {
        sendIsConnected(true);
    }, [])

    const Navlinks: LinkItems[] = [
        { label: 'market', href: '/(without-navbar)/market' },
        { label: 'trade', href: '/(without-navbar)/trade' },
        { label: 'swap', href: '/(without-navbar)/swap' },
        { label: 'bridge', href: '/(without-navbar)/bridge' },
        { label: '', href: '' },
    ]


    return (
        <div className="font-mono">
            <Background className="flex h-screen overflow-hidden">
                <div className={`bg-background z-100 relative items-center justify-center transition-all duration-300 ${isOpen ? 'w-[15vw] h-screen flex' : 'w-0 h-0 none'} `}>
                    {isOpen && (
                        <>
                            <div className="h-[98vh] w-[14vw] rounded-xl bg-card border border-border">

                            </div>
                            <button
                                onClick={() => { setIsOpen(false) }}
                                className="flex items-center justify-center cursor-pointer p-2 z-999 absolute right-[-15] top-[50%] border border-border rounded-2xl bg-card"
                            >
                                <ChevronLeft height={30} width={30} />
                            </button>
                        </>
                    )}
                </div>
                {!isOpen && (
                    <button
                        onClick={() => { setIsOpen(true) }}
                        className="flex items-center justify-end z-999 p-2 cursor-pointer absolute left-[-20] top-[50%] border border-border rounded-2xl bg-card"
                    >
                        <ChevronRight height={30} width={30} />
                    </button>
                )}
                <div className={`flex flex-col transition-all duration-300 ${isOpen ? 'w-[85vw]' : 'w-screen'}`}>
                    <div className="bg-background p-4 z-50 flex items-center justify-center">
                        <Boxes className={`h-[6vh] dark:border-none rounded-xl transition-all duration-300 flex items-center justify-between p-4 text-lg ${isOpen ? 'w-[83vw]' : 'w-[98vw]'}`}>
                            <span className="flex items-center justify-center gap-2">
                                {Navlinks.map((items) => (
                                    <Link key={items.href || items.label} href={items.href} className="h-8 p-2 flex items-center justify-center rounded-lg hover:bg-[#deded8] dark:hover:bg-zinc-800">
                                        {items.label}
                                    </Link>
                                ))}
                            </span>
                            <div className="flex items-center justify-center p-2 border border-border backdrop-blur rounded-2xl cursor-pointer bg-background">
                                <span className="w-[40vw] border border-border rounded-lg p-4 bg-card hover:bg-background">

                                </span>
                            </div>
                            <div className="flex items-center justify-center border p-1 border-border rounded-2xl bg-background hover:bg-black/50 cursor-pointer">
                                <span className="border border-border rounded-lg p-2 bg-card hover:bg-background">
                                    <Bell height={20} width={20} />
                                </span>
                            </div>
                        </Boxes>
                    </div>
                    <div className="h-[92vh] bg-background w-full z-50 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <div className={`max-w-screen bg-background min-w-[85vw] flex items-center justify-center gap-8 p-2 }`}>
                            <div><Boxes className={`dark:border-none rounded-2xl transition-all duration-300 flex items-center justify-center ${isOpen ? 'h-[20vh] w-[15vw]' : 'h-[23vh] w-[18vw]'}`}>asd</Boxes></div>
                            <div><Boxes className={`dark:border-none rounded-2xl transition-all duration-300 flex items-center justify-center ${isOpen ? 'h-[20vh] w-[15vw]' : 'h-[23vh] w-[18vw]'}`}>asd</Boxes></div>
                            <div><Boxes className={`dark:border-none rounded-2xl transition-all duration-300 flex items-center justify-center ${isOpen ? 'h-[20vh] w-[15vw]' : 'h-[23vh] w-[18vw]'}`}>asd</Boxes></div>
                            <div><Boxes className={`dark:border-none rounded-2xl transition-all duration-300 flex items-center justify-center ${isOpen ? 'h-[20vh] w-[15vw]' : 'h-[23vh] w-[18vw]'}`}>asd</Boxes></div>
                            <div><Boxes className={`dark:border-none rounded-2xl transition-all duration-300 flex items-center justify-center ${isOpen ? 'h-[20vh] w-[15vw]' : 'h-[23vh] w-[18vw]'}`}>asd</Boxes></div>
                        </div>
                        <div className={`flex items-center justify-center transform-all duration-300 p-2 z-50 ${isOpen ? 'gap-10' : 'gap-14'}`}>
                            <div>
                                <Boxes className={`dark:border-none rounded-xl transition-all duration-300 flex items-center justify-center ${isOpen ? 'h-[50vh] w-[40vw]' : 'h-[53vh] w-[47vw]'}`}>
                                    asd
                                </Boxes>
                            </div>
                            <div>
                                <Boxes className={`dark:border-none rounded-xl transition-all duration-300 flex items-center justify-center ${isOpen ? 'h-[50vh] w-[40vw]' : 'h-[53vh] w-[47vw]'}`}>
                                    asd
                                </Boxes>
                            </div>
                        </div>
                        <div className="bg-background flex items-center justify-center">
                            <div className="flex items-center p-2 justify-center">
                                <Boxes className={`dark:border-none transition-all duration-300 flex items-center justify-center ${isOpen ? 'h-[50vh] w-[82vw]' : 'h-[54vh] w-[97vw]'}`}>
                                    asd
                                </Boxes>
                            </div>
                        </div>
                    </div>
                </div>
            </Background>
        </div>
    )
}