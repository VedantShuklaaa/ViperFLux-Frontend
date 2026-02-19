import { CoinDetailsTop, CoinDetailsMid } from "@/components/ui/market/coinDetail/coinDetail";

export default function CoinPage({ params }: { params: { exchange: string; coinPair: string } }) {
  return (
    <div className={`w-full flex flex-col`}>
      <CoinDetailsTop exchange={params.exchange} coinPair={params.coinPair} />
      <CoinDetailsMid exchange={params.exchange} coinPair={params.coinPair} />
    </div>
  )
}
