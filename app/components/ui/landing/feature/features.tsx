import { cn } from "@/lib/utils";
import { div } from "motion/react-client";
import React from "react";

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

export default function Feature() {
    return (
        <div>
            <Background>

            </Background>
        </div>
    )
}