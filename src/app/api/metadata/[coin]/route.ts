import { NextRequest, NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis";
import axios from 'axios';


const myAxios = axios.create({
    baseURL: `https://api.coingecko.com/api/v3`,
    params: {
        vs_currency: 'usd',
    },
    headers: {
        "x-cg-demo-api-key": process.env.API_KEY!,
    }
})

const fetchData = async (coin: string): Promise<metadata> => {
    const res = await myAxios.get(`/coins/${coin}`);
    const data = res.data;

    if (!res.data) throw new Error('Cannot fetch data from the API');

    const marketData = data.market_data;

    return {
        coin,
        symbol: data.symbol ?? 'N/A',
        maxSupply: marketData?.max_supply ?? null,
        totalSupply: marketData?.total_supply ?? null,
        circulatingSupply: marketData?.circulating_supply ?? null,
        timestamp: Date.now()
    }
}

interface metadata {
    coin: string,
    symbol: string,
    maxSupply: number | null,
    totalSupply: number | null,
    circulatingSupply: number | null,
    timestamp: number
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ coin: string }> }
) {
    const { coin } = await params;
    const cacheKey = `coin:${coin}`;

    const isManualRefresh = req.nextUrl.searchParams.get('refresh') === 'true';
    const MANUAL_REFRESH_THRESHOLD = 60000;
    const AUTO_CACHE_DURATION = 300;

    try {
        const redis = await getRedisClient();
        const cached = await redis.get(cacheKey);

        if (cached) {
            console.log(`cached data found for ${coin}`);

            const parsedData: metadata = JSON.parse(cached);
            const time = parsedData.timestamp

            const cacheAge = Date.now() - time;

            if (isManualRefresh) {
                if (cacheAge < MANUAL_REFRESH_THRESHOLD) {
                    console.log(`manual refresh: cache too fresh, returning cached data`)

                    return NextResponse.json(
                        { data: parsedData, cached: true, reason: 'too_recent' },
                        { status: 200 }
                    );
                } else {
                    console.log(`manual refresh: cache old enough, fetching fresh data`);
                }
            } else {
                console.log('Auto request: Returning cached data');
                return NextResponse.json(
                    { data: parsedData, cached: true },
                    { status: 200 }
                );
            }
        }

        console.log(`no cache data found for ${coin}`);

        const fetchedData = await fetchData(coin);
        await redis.setEx(cacheKey, AUTO_CACHE_DURATION, JSON.stringify(fetchedData));

        return NextResponse.json(
            { data: fetchedData, cached: false },
            { status: 200 }
        );
    } catch (err: unknown) {
        console.log(`API error: ${err}`);

        return NextResponse.json(
            { error: `Internal server error` },
            { status: 500 }
        )
    }
}