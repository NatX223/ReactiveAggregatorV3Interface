import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

// AggregatorV3Interface ABI
const AGGREGATOR_V3_ABI = [
    {
        "inputs": [],
        "name": "latestRoundData",
        "outputs": [
            { "internalType": "uint80", "name": "roundId", "type": "uint80" },
            { "internalType": "int256", "name": "answer", "type": "int256" },
            { "internalType": "uint256", "name": "startedAt", "type": "uint256" },
            { "internalType": "uint256", "name": "updatedAt", "type": "uint256" },
            { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "description",
        "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
        "stateMutability": "view",
        "type": "function"
    }
];

// Price feed configurations based on README.md
const PRICE_FEEDS = [
    {
        name: 'Bitcoin',
        pair: 'BTC/USD',
        sepoliaAddress: '0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43', // Aggregator Proxy from README
        lasnaAddress: '0xAc0723E5A9857A9a9b9503AfD0c0263B8f9bbFA1',   // FeedProxy from README
    }
];

// RPC URLs
const SEPOLIA_RPC = process.env.SEPOLIA_RPC_URL || 'https://ethereum-sepolia-rpc.publicnode.com';
const LASNA_RPC = process.env.LASNA_RPC_URL || 'https://lasna-rpc.rnk.dev/';

async function fetchPriceData(contractAddress: string, rpcUrl: string, chainName: string) {
    try {
        console.log(`Fetching price data from ${chainName} - Contract: ${contractAddress}, RPC: ${rpcUrl}`);

        const provider = new ethers.JsonRpcProvider(rpcUrl);

        // Test connection first
        await provider.getNetwork();

        const contract = new ethers.Contract(contractAddress, AGGREGATOR_V3_ABI, provider);

        // Get latest round data with timeout
        const latestRoundDataPromise = contract.latestRoundData();
        const decimalsPromise = contract.decimals();
        const descriptionPromise = contract.description().catch(() => 'N/A');

        // Set timeout for all calls
        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Request timeout')), 10000)
        );

        const [roundData, decimals, description] = await Promise.race([
            Promise.all([latestRoundDataPromise, decimalsPromise, descriptionPromise]),
            timeout
        ]) as any;

        const [roundId, answer, startedAt, updatedAt, answeredInRound] = roundData;

        const price = Number(answer) / Math.pow(10, Number(decimals));
        const lastUpdated = new Date(Number(updatedAt) * 1000).toISOString();

        console.log(`Successfully fetched data from ${chainName}: Price = ${price}, Updated = ${lastUpdated}`);

        return {
            roundId: roundId.toString(),
            answer: answer.toString(),
            startedAt: startedAt.toString(),
            updatedAt: updatedAt.toString(),
            answeredInRound: answeredInRound.toString(),
            decimals: Number(decimals),
            description,
            price,
            lastUpdated,
            status: 'active' as const
        };
    } catch (error) {
        console.error(`Error fetching price data from ${chainName} (${contractAddress}):`, error);
        return {
            roundId: '0',
            answer: '0',
            startedAt: '0',
            updatedAt: '0',
            answeredInRound: '0',
            decimals: 8,
            description: 'N/A',
            price: 0,
            lastUpdated: new Date().toISOString(),
            status: 'inactive' as const,
            error: error instanceof Error ? error.message : 'Unknown error'
        };
    }
}

export async function GET(request: NextRequest) {
    try {
        const results = await Promise.all(
            PRICE_FEEDS.map(async (feed) => {
                // Fetch data from both chains
                const [sepoliaData, lasnaData] = await Promise.all([
                    fetchPriceData(feed.sepoliaAddress, SEPOLIA_RPC, 'Sepolia'),
                    fetchPriceData(feed.lasnaAddress, LASNA_RPC, 'Lasna')
                ]);

                return {
                    ...feed,
                    sepoliaData,
                    lasnaData,
                    // Determine overall status
                    status: sepoliaData.status === 'active' && lasnaData.status === 'active' ? 'active' :
                        sepoliaData.status === 'active' || lasnaData.status === 'active' ? 'syncing' : 'inactive'
                };
            })
        );

        return NextResponse.json({
            success: true,
            data: results,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error in price feeds API:', error);
        return NextResponse.json(
            {
                success: false,
                error: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString()
            },
            { status: 500 }
        );
    }
}