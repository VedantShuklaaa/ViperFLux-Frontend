import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

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

const Marquee: React.FC<MarqueeProps> = ({
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
            <div
                ref={contentRef}
                className="flex gap-6"
            >
                {items.map((item, idx) => (
                    <span key={`dup-${idx}`} className="mx-8 text-2xl flex items-center justify-center gap-1">
                        <Image
                            src={item.image as string}
                            height={50}
                            width={50}
                            alt="IMG"
                        />
                        {item.title}
                    </span>
                ))}

                {items.map((item, idx) => (
                    <span key={`dup-${idx}`} className="mx-8 text-2xl flex items-center justify-center gap-1">
                        <Image
                            src={item.image as string}
                            height={50}
                            width={50}
                            alt="IMG"
                        />
                        {item.title}
                    </span>
                ))}

                {items.map((item, idx) => (
                    <span key={`dup-${idx}`} className="mx-8 text-2xl flex items-center justify-center gap-1">
                        <Image
                            src={item.image as string}
                            height={50}
                            width={50}
                            alt="IMG"
                        />
                        {item.title}
                    </span>
                ))}

                {items.map((item, idx) => (
                    <span key={`dup-${idx}`} className="mx-8 text-2xl flex items-center justify-center gap-1">
                        <Image
                            src={item.image as string}
                            height={50}
                            width={50}
                            alt="IMG"
                        />
                        {item.title}
                    </span>
                ))}

                {items.map((item, idx) => (
                    <span key={`dup-${idx}`} className="mx-8 text-2xl flex items-center justify-center gap-1">
                        <Image
                            src={item.image as string}
                            height={50}
                            width={50}
                            alt="IMG"
                        />
                        {item.title}
                    </span>
                ))}
            </div>

        </div>
    )
}

export default function MarqueeMain() {

    const items: Items[] = [
        {
            title: "Binance",
            image: "/binance.png"
        }, {
            title: "OKX",
            image: "/okx.png"
        }, {
            title: "Bybit",
            image: "/bybit.png"
        }, {
            title: "Kucoin",
            image: "/kucoin.png"
        }, {
            title: "CoinGekko",
            image: "/CoinGecko.png"
        }
    ]

    return (
        <Marquee
            items={items}
            direction="left"
            speed={9}
        />
    )
}