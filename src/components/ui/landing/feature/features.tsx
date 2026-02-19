"use client";
import { cn } from "@/lib/utils/utils";
import { useAlert } from "@/app/providers/alert-provider";
import React from "react";
import { Marquee2Features } from "@/components/ui/marquee/marquees";

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

export default function Feature() {

    return (
        <div className="w-full h-[110vh] md:h-screen flex items-center justify-center">
            <Background>
                <div className="p-4 flex items-center justify-center z-100">
                    <Marquee2Features/>
                </div>
            </Background>
        </div>
    )
}