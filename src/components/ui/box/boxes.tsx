"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface BoxProps {
    children: React.ReactNode,
    className?: string,
    height?: number
    width?: number,
}


//HOVER GLOW + MOUSE FOLLOW
export const Boxes: React.FC<BoxProps> = ({
    children,
    className = '',
    height = 800,
    width = 800,
}) => {

    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const glow = glowRef.current;

        if (!card || !glow) return;

        const handleMouseMove = (event: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const X = event.clientX - rect.left;
            const Y = event.clientY - rect.top;

            gsap.to(glow, {
                x: X,
                y: Y,
                xPercent: -50,
                yPercent: -50,
                duration: 0.3,
                ease: "power2.out"
            });
        };

        const handleMouseEnter = () => {
            gsap.to(glow, {
                opacity: 1,
                duration: 0.3,
            });
        };

        const handleMouseLeave = () => {
            gsap.to(glow, {
                opacity: 0,
                duration: 0.3,
            });
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };

    }, [])

    return (
        <div
            className={`relative p-[2px] rounded-xl overflow-hidden w-fit h-fit`}
            ref={cardRef}
            style={{
                background: "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            }}
        >
            <div
                ref={glowRef}
                className={`absolute pointer-events-none opacity-0 `}
                style={{
                    height: `${height}px`,
                    width: `${width}px`,
                    background:
                        "radial-gradient(circle, rgba(16, 220, 150, 1) 0%, rgba(16, 185, 129, 0.8) 25%, transparent 50%)",
                    filter: "blur(15px)",
                }}
            />
            <div className={`relative rounded-lg  border border-border overflow-hidden ${className}`}>
                {children}
            </div>
        </div>
    )
}


///ONLY HOVER GLOW
export const Boxes2: React.FC<BoxProps> = ({
    children,
    className = ''
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const card = cardRef.current;
        const glow = glowRef.current;

        if (!card || !glow) return;

        const handleMouseEnter = () => {
            gsap.to(glow, {
                opacity: 1,
                duration: 0.3,
            });
        };

        const handleMouseLeave = () => {
            gsap.to(glow, {
                opacity: 0,
                duration: 0.3,
            });
        };

        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mouseenter', handleMouseEnter);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };

    }, [])

    return (
        <div
            className={`relative p-[2px] rounded-xl overflow-hidden`}
            ref={cardRef}
            style={{
                background: "linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            }}
        >
            <div
                ref={glowRef}
                className="absolute pointer-events-none opacity-0"
                style={{
                    height: "2000px",
                    width: "2000px",
                    background:
                        "radial-gradient(circle, rgba(16, 220, 150, 1) 0%, rgba(16, 185, 129, 0.8) 25%, transparent 50%)",
                    transform: "translate(-50%, -50%)",
                    filter: "blur(10px)",
                }}
            />
            <div className={`relative rounded-lg bg-card border border-black/20 dark:border-white/10 overflow-hidden ${className}`}>
                {children}
            </div>
        </div>
    )
}


