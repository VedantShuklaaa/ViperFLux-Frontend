import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Boxes } from "../box/boxes";
import { LucideIcon } from "lucide-react";

interface Items {
    image?: string,
    title: string
}

interface MarqueeProps {
    className?: string;
    speed?: number;
    direction?: "left" | "right";
    items: Items[];
}

export const Marquee1: React.FC<MarqueeProps> = ({
    className = "",
    speed = 20,
    direction = "left",
    items,
}) => {

    const marqueeRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        const content = contentRef.current;

        if (!marquee || !content) return;

        const contentWidth = content.scrollWidth / 2;

        const animation = gsap.to(content, {
            x: direction === "left" ? -contentWidth : contentWidth,
            duration: speed,
            ease: "none",
            repeat: -2,
        })

        return () => {
            animation.kill();
        }
    }, [speed, direction]);

    return (
        <div
            ref={marqueeRef}
            className={`overflow-hidden whitespace-nowrap ${className}`}
        >
            <div className="absolute top-0 left-0 h-14 w-25 bg-linear-to-r from-background via-background/60 to-transparent pointer-events-none z-10" />
            <div
                ref={contentRef}
                className="flex gap-6"
            >
                {[0, 1, 2, 3, 4].map((setIdx) =>
                    items.map((item) => (
                        <span key={`set${setIdx}-${item.title}`} className="mx-8 text-2xl flex items-center justify-center gap-1">
                            <Image
                                src={item.image as string}
                                height={50}
                                width={50}
                                alt="IMG"
                            />
                            {item.title}
                        </span>
                    ))
                )}
            </div>
            <div className="absolute top-0 right-0 h-14 w-25 bg-linear-to-l from-background via-background/60 to-transparent pointer-events-none z-10" />
        </div>
    )
}

interface Marquee2Props {
    className?: string;
    speed?: number;
    direction?: "up" | "down";
    items: Items[];
}


const Marquee2: React.FC<Marquee2Props> = ({
    className = "",
    speed = 20,
    direction = "up",
    items,
}) => {
    const marqueeRef = useRef<HTMLDivElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const content = contentRef.current;
        const marquee = marqueeRef.current;

        if (!marquee || !content) return;
        const contentHeight = content.scrollHeight / 2;

        const animation = gsap.to(marquee, {
            x: direction === "up" ? -contentHeight : contentHeight,
            duration: speed,
            ease: "none",
            repeat: -2,
        })

        return (() => {
            animation.kill();
        })

    }, [speed, direction])


    return (
        <div
            ref={marqueeRef}
            className={`overflow-hidden whitespace-nowrap ${className}`}
        >
            <div ref={contentRef} className={`flex flex-col p-5 gap-4`}>
                {items.map((item) => (
                    <Boxes key={item.title} className="h-30 w-60 p-2 text-2xl flex items-center justify-center gap-1">
                        <Image
                            src={item.image as string}
                            height={50}
                            width={50}
                            alt="IMG"
                        />
                        {item.title}
                    </Boxes>
                ))}
            </div>
        </div>
    )
}

export const Marquee3: React.FC<MarqueeProps> = ({
    className = "",
    speed = 20,
    direction = "left",
    items,
}) => {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        const content = contentRef.current;

        if (!marquee || !content) return;

        const contentWidth = content.scrollWidth / 2;

        const animation = gsap.to(content, {
            x: direction === "left" ? -contentWidth : contentWidth,
            duration: speed,
            ease: "none",
            repeat: -2,
        })

        return () => {
            animation.kill();
        }
    }, [speed, direction]);

    return (
        <div
            ref={marqueeRef}
            className={`overflow-hidden whitespace-nowrap w-full ${className}`}
        >
            <div className="absolute top-0 left-0 h-14 w-25 bg-linear-to-r from-background via-background/60 to-transparent pointer-events-none z-10" />
            <div
                ref={contentRef}
                className="flex flex-row"
            >
                {[0, 1, 2, 3, 4].map((setIdx) => (
                    <div key={`group-${setIdx}`} className="flex flex-row">
                        {items.map((item) => (
                            <span key={item.title} className={`mx-8 text-3xl text-primary flex flex-col items-center justify-center gap-1 h-30 w-70 border border-border rounded-lg bg-card ${className}`}>
                                <Image
                                    src={item.image as string}
                                    height={70}
                                    width={70}
                                    alt="IMG"
                                />
                                {item.title}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
            <div className="absolute top-0 right-0 h-14 w-25 bg-linear-to-l from-background via-background/60 to-transparent pointer-events-none z-10" />
        </div>
    )
}

interface item {
    icon?: LucideIcon,
    title: string
}

interface MarqueeProps4 {
    className?: string;
    speed?: number;
    direction?: "left" | "right";
    items: item[];
    size?: "sm" | "md" | "lg"
}

const sizeClasses = {
    sm: "px-4 py-2 gap-2 text-xs",
    md: "px-5 py-3 gap-3 text-sm",
    lg: "px-6 py-4 gap-4 text-base",
};

const iconSizes = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
};

const MarqueeItem = ({ icon: Icon, text, size }: { icon: any; text: string; size: "sm" | "md" | "lg" }) => (
    <div className={`flex items-center ${sizeClasses[size]} bg-card/30 backdrop-blur-sm border border-border/30 rounded-full whitespace-nowrap`}>
        <Icon className={`${iconSizes[size]} text-primary`} />
        <span className="text-muted-foreground font-medium">{text}</span>
    </div>
);

export const Marquee4: React.FC<MarqueeProps4> = ({
    className = "",
    speed = 20,
    direction = "left",
    items,
    size = "md"
}) => {

    const marqueeRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        const content = contentRef.current;

        if (!marquee || !content) return;

        const firstChild = content.firstElementChild as HTMLElement;
        if (!firstChild) return;

        const singleSetWidth = firstChild.scrollWidth;

        if (direction === "right") {
            gsap.set(content, { x: -singleSetWidth });
        } else {
            gsap.set(content, { x: 0 });
        }

        const animation = gsap.to(content, {
            x: direction === "left" ? -singleSetWidth : 0,
            duration: speed,
            ease: "none",
            repeat: -1,
        })

        return () => {
            animation.kill();
        }
    }, [speed, direction]);

    return (
        <div
            ref={marqueeRef}
            className={`overflow-hidden whitespace-nowrap w-full ${className}`}
        >
            <div
                ref={contentRef}
                className="flex flex-row gap-0"
            >
                {[0, 1, 2, 3, 4].map((setIdx) => (
                    <div key={`group-${setIdx}`} className="flex flex-row gap-4">
                        {items.map((item) => (
                            <MarqueeItem key={item.title} icon={item.icon} text={item.title} size={size} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}


export function Marquee2Features() {

    const items: Items[] = [
        { title: "Binance", image: "/binance.png" },
        { title: "OKX", image: "/okx.png" },
        { title: "Bybit", image: "/bybit.png" },
        { title: "Kucoin", image: "/kucoin.png" },
        { title: "CoinGekko", image: "/CoinGecko.png" }
    ]
    return (
        <div className="h-[80vh] w-[90vw] border rounded-lg">
            <Marquee2
                items={items}
                direction="up"
                speed={9}
            />
        </div>
    )
}



export function MarqueeMain() {

    const items: Items[] = [
        { title: "Binance", image: "/binance.png" },
        { title: "OKX", image: "/okx.png" },
        { title: "Bybit", image: "/bybit.png" },
        { title: "Kucoin", image: "/kucoin.png" },
        { title: "CoinGekko", image: "/CoinGecko.png" }
    ]

    return (
        <Marquee1
            items={items}
            direction="left"
            speed={9}
        />
    )
}
