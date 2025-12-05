"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { Boxes2 } from "@/components/ui/box/boxes";
import Image from "next/image";
import { HoverBorderGradient } from "@//components/ui/hover-border-gradient";
import MarqueeMain from "@/components/ui/marquee/marquee";


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
                    "[background-size:25px_25px]",
                    "[background-image:radial-gradient(#1a1818_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#706f6f_1px,transparent_1px)]",
                )}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            {children}
        </div>
    )
}


export default function Hero() {
    return (
        <div className="w-full h-[110vh] md:h-screen flex items-center justify-center">
            <Background className="font-mono flex flex-col gap-10 xl:gap-18">
                <div className="absolute top-30 md:top-25 xl:top-25 2xl:top-40">
                    <Boxes2 className="h-[5vh] xl:h-[4vh] w-[57vw] sm:w-[52vw] md:w-[35vw] lg:w-[20vw] xl:w-[15vw] 2xl:w-[11vw] flex items-center justify-center cursor-pointer">
                        <span className="flex items-center justify-center gap-3">
                            <Image src="/microchipW.png" height={25} width={25} alt="NA" className="hidden dark:flex" />
                            <Image src="/microchip.png" height={25} width={25} alt="NA" className="flex dark:hidden" />
                            <p>Meet VipFlux AI</p>
                        </span>
                    </Boxes2>
                </div>

                <div className="w-[90vw] lg:w-[80vw] xl:w-[80vw] 2xl:w-[80vw] font-serif z-100  mt-25 md:mt-0">
                    <p className="text-4xl md:text-6xl xl:text-7xl text-center text-transparent bg-linear-to-br from-emerald-400 via bg-emerald-600 to-green-600 bg-clip-text">
                        Compare live prices across DEXs and CEXs in real-time and execute trades instantly—one terminal, every market, total control.
                    </p>
                </div>

                <div className="flex gap-5 z-100  mb-25 md:mb-0">
                    <HoverBorderGradient
                        containerClassName="rounded-xl"
                        as="button"
                        className="bg-card text-black dark:text-white flex items-center justify-center space-x-2 2xl:w-40">
                        <span>Learn More</span>
                    </HoverBorderGradient>

                    <HoverBorderGradient
                        containerClassName="rounded-xl"
                        as="button"
                        className="bg-card text-black dark:text-white flex items-center justify-center space-x-2 2xl:w-40">
                        <span>Get Started</span>
                    </HoverBorderGradient>
                </div>

                <div className="absolute h-[16vh] w-[80vw] bottom-10 md:bottom-4 2xl:bottom-8 flex flex-col gap-4 items-center justify-center overflow-hidden">
                    <span className="text-xl">Integrated With</span>
                    <div className="relative h-[6vh] w-[90vw] lg:w-[70vw] rounded-2xl flex items-center justify-center bg-gradient-mask/from-[0%_at_0%,transparent_10px,black_30px,black_calc(100%-30px),transparent_calc(100%-10px),transparent_100%]">
                        <MarqueeMain />
                    </div>
                </div>
            </Background>
        </div>
    )
}


