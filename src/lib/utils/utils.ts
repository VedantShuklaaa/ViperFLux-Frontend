import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSelectedCoinPair = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('selectedCoinPair');
    return stored ? JSON.parse(stored) : { symbol: 'BTC/USDT', name: 'Bitcoin' };
  }
  return { symbol: 'BTC/USDT', name: 'Bitcoin' };
}
