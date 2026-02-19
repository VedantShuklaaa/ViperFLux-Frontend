import { Bot, Zap, TrendingUp, Shield, Clock, BarChart3, Wallet, Globe, Lock, Cpu, Star, ChevronRight, Rocket, Target, Sparkles, Code } from "lucide-react";
import { Marquee4 } from "@/components/ui/marquee/marquees";
import { useData } from "@/app/context/dataContext";

export default function MarketMarquee() {

    const { isLeftOpen, isRightOpen } = useData();

    const marqueeItems = [
        { icon: Bot, title: "AI-Powered" },
        { icon: Zap, title: "Lightning Fast" },
        { icon: TrendingUp, title: "Smart Analytics" },
        { icon: Shield, title: "Secure" },
        { icon: Clock, title: "24/7 Automation" },
        { icon: BarChart3, title: "Real-Time Data" },
        { icon: Wallet, title: "Multi-Wallet" },
        { icon: Globe, title: "Global Markets" },
        { icon: Lock, title: "Private" },
        { icon: Cpu, title: "Neural Networks" },
        { icon: Star, title: "Premium" },
        { icon: ChevronRight, title: "Easy Setup" },
        { icon: Rocket, title: "Fast Deploy" },
        { icon: Target, title: "Precision" },
        { icon: Sparkles, title: "Magic" },
        { icon: Code, title: "Smart Code" },
    ];

    {/*const items2: Items[] = [
        { title: "0.01s Latency" },
        { title: "Global Coverage" },
        { title: "Real-Time Charts" },
        { title: "Price Alerts" },
        { title: "99.99% Uptime" },
    ] */}


    return (
        <div className={`absolute bottom-0 h-[94vh] w-screen flex flex-col gap-5 items-center justify-between p-2 blur-[1px] transition-all duration-300 pointer-events-none z-10`}>
            <div className="absolute w-full h-30 top-0 bg-linear-to-b from-primary/20 dark:from-primary/6 via-background/60 to-transparent pointer-events-none z-10" />
            <div className="absolute w-100 h-full left-0 top-0 bg-linear-to-r from-primary/20 dark:from-primary/6 via-background/60 to-transparent pointer-events-none z-11" />

            <Marquee4
                items={marqueeItems.slice(0, 8)}
                direction="left"
                speed={45}
                className=" "
                size="sm"
            />

            <Marquee4
                items={marqueeItems.slice(4, 12)}
                direction="right"
                speed={35}
                className=" "
                size="lg"
            />

            <Marquee4
                items={marqueeItems.slice(8, 16)}
                direction="left"
                speed={55}
                className=" "
                size="sm"
            />

            <Marquee4
                items={marqueeItems.slice(2, 10)}
                direction="right"
                speed={40}
                className=" "
                size="lg"
            />

            <Marquee4
                items={marqueeItems.slice(6, 14)}
                direction="left"
                speed={50}
                className=" "
                size="md"
            />

            <Marquee4
                items={marqueeItems.slice(8, 16)}
                direction="right"
                speed={40}
                className=" "
                size="lg"
            />

            <div className="absolute w-100 h-full right-0 bg-linear-to-l from-primary/20 dark:from-primary/6 via-background/60 to-transparent pointer-events-none z-10" />
            <div className="absolute w-full h-30 bottom-0 bg-linear-to-t from-primary/20 dark:from-primary/6 via-background/60 to-transparent pointer-events-none z-10" />
        </div>
    )
}