"use client";
import React, { useState, useRef, useEffect } from "react";
import { Boxes } from "../ui/box/boxes";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabaseClient";
import Image from "next/image";
import { ConnectWallet } from "../wallet-connect/connectWallet";
import { useData } from "@/app/context/dataContext";

interface LinkItems {
    label: string,
    href: string,
}

interface NavProps {
    className?: string,
    links: LinkItems[],
    title: string,
}


const Nav: React.FC<NavProps> = ({
    className = "",
    links,
    title,
}) => {

    const supabase = createSupabaseBrowserClient();

    const menuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);


    return (
        <div className={`font-mono z-100`}>
            {/*PC NAV*/}
            <div className="hidden lg:flex">
                <Boxes className={`flex items-center justify-between bg-card p-2 ${className}`}>
                    <span className="text-2xl cursor-pointer">{title}</span>
                    <div className="flex md:gap-5 2xl:gap-10">
                        {links.map((item) => (
                            <Link key={item.href} href={item.href} className="h-8 p-2 flex items-center justify-center rounded-lg hover:bg-[#deded8] dark:hover:bg-zinc-800">
                                {item.label}
                            </Link>
                        ))}
                    </div>
                    <ConnectWallet />
                </Boxes>
            </div>


            {/*MOBILE NAV*/}
            <div className="flex flex-col lg:hidden gap-1 md:gap-2">
                <div>
                    <Boxes className="flex h-[6vh] w-[90vw] items-center justify-between p-2 bg-card">
                        <span className="text-2xl">{title}</span>
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <>
                                <Image src="/close.png" height={38} width={38} alt="menu" className="flex dark:hidden" />
                                <Image src="/close-white.png" height={38} width={38} alt="menu" className="hidden dark:flex" />
                            </> :
                                <>
                                    <Image src="/menu-bar.png" height={50} width={50} alt="menu" className="flex dark:hidden" />
                                    <Image src="/menu-bar-white.png" height={50} width={50} alt="menu" className="hidden dark:flex" />
                                </>}
                        </button>
                    </Boxes>
                </div>

                {isOpen && (
                    <div className="" ref={menuRef}>
                        <Boxes className=" w-[90vw] flex flex-col items-center justify-center gap-3 md:gap-4 p-4">
                            <span className="text-xl flex flex-col gap-2 md:gap-3">
                                {links.map((item) => (
                                    <Link key={item.href} href={item.href} className="h-12 w-85 md:w-[85vw] p-2 gap-2 flex flex-col items-center justify-center rounded-lg bg-background hover:bg-zinc-500 border border-black/20 dark:border-white/30">
                                        {item.label}
                                    </Link>
                                ))}
                            </span>
                            <ConnectWallet />
                        </Boxes>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function Navbar() {

    const navLinks: LinkItems[] = [
        { label: "Start Your journey", href: "/" },
        { label: "Community", href: "/community" },
        { label: "Contact us", href: "/contactus" },
    ]

    return (
        <Nav className="h-[5vh] md:w-[75vw] xl:w-[60vw] 2xl:w-[50vw]" links={navLinks} title="ViperFlux" />
    )
}
