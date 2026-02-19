import Image from "next/image"
import { Boxes } from "@/components/ui/box/boxes"
import { useData } from "@/app/context/dataContext"
import { MoveUp, ArrowUpRight } from "lucide-react";

export default function HeroShowcase() {

    const {isLeftOpen, isRightOpen} = useData();

    const bottomItems: bottosmItem[] = [
        { chainName: 'Solana', shortName: 'SOL', Link: '#', price: 135.2, UpOrDown: 5.73, image: '/coin/solana.png' },
        { chainName: 'Bitcoin', shortName: 'BTC', Link: '#', price: 93263.4, UpOrDown: 1.64, image: '/coin/btc1.png' },
        { chainName: 'Ethereum', shortName: 'Eth', Link: '#', price: 2043.7, UpOrDown: 10.73, image: '/coin/eth.png' },
        { chainName: 'Polygon', shortName: 'MATIC', Link: '#', price: 863.2, UpOrDown: 0.43, image: '/coin/polygon.png' },
    ]

    
interface bottosmItem {
    chainName: string,
    shortName: string,
    Link: string,
    price: number,
    UpOrDown: number,
    image: string
}

    return (
        <div className="flex itesm-center justify-center gap-10 ">
            {bottomItems.map((items) => (
                <div key={items.shortName} >
                    <Boxes className="dark:border-none" height={350} width={350}>
                        <div className={`rounded-lg bg-background transition-all duration-300 p-2 gap-2 flex flex-col ${!isLeftOpen && !isRightOpen ? 'h-65 w-70' : isLeftOpen && isRightOpen ? 'h-60 w-65' : 'h-65 w-70'}`}>
                            <div className={`w-full rounded-t-lg transition-all duration-300 flex items-center justify-center ${!isLeftOpen && !isRightOpen ? 'h-20' : isLeftOpen && isRightOpen ? 'h-16' : 'h-20'}`}>
                                <div className={`h-full w-full rounded-lg flex items-center justify-start bg-card border border-border dark:border-none`}>
                                    <div className="h-full w-20 rounded-lg bg-card p-1 flex items-center justify-center">
                                        <Image
                                            src={items.image}
                                            height={60}
                                            width={60}
                                            alt="NA"
                                        />
                                    </div>
                                    <div className="h-full w-full flex flex-col items-start justify-center p-1 rounded-lg  font-sans">
                                        <p className={`transition-all duration-300 ${!isLeftOpen && !isRightOpen ? 'text-xs' : isLeftOpen && isRightOpen ? 'text-sm' : 'text-base'}`}>
                                            Chain
                                        </p>
                                        <p className={`transition-all duration-300 ${!isLeftOpen && !isRightOpen ? '' : isLeftOpen && isRightOpen ? 'text-sm' : 'text-base'}`}>
                                            {items.chainName} ({items.shortName})
                                        </p>
                                    </div>
                                    <div className="h-full w-20 flex items-center justify-center p-1">
                                        <div className={`border border-border rounded-full p-2 flex items-center justify-center cursor-pointer hover:bg-background dark:hover:bg-background/70 transition-all duration-300 ${!isLeftOpen && !isRightOpen ? 'h-12 w-12' : isLeftOpen && isRightOpen ? 'h-10 w-10' : 'h-11 w-11'}`}>
                                            <ArrowUpRight height={25} width={25} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`w-full rounded-b-lg transition-all duration-300 ${!isLeftOpen && !isRightOpen ? 'h-50' : isLeftOpen && isRightOpen ? 'h-44' : 'h-45'}`}>
                                <div className="h-full w-full rounded-lg flex flex-col items-start justify-center p-3 gap-5 bg-card border border-border dark:border-none">
                                    <div className="flex flex-col items-start justify-center">
                                        <p className="text-md font-serif">Price</p>
                                        <p className={`transition-all duration-300 ${!isLeftOpen && !isRightOpen ? 'text-4xl' : isLeftOpen && isRightOpen ? 'text-4xl' : 'text-4xl'}`}>${items.price}</p>
                                    </div>
                                    <div className="flex gap-2 items-center justify-center">
                                        <span className="p-1 rounded-full bg-primary/10">
                                            <MoveUp height={10} width={10} className="text-primary" />
                                        </span>
                                        <span className="text-sm font-extralight">
                                            {items.UpOrDown}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Boxes>
                </div>
            ))}
        </div>
    )
}