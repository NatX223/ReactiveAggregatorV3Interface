import { NextRequest, NextResponse } from 'next/server';
import { ethers } from 'ethers';

// ABI for Chainlink proxy contracts
const PROXY_ABI = [
  {
    "inputs": [],
    "name": "aggregator",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "description",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
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
  }
];

const SEPOLIA_RPC = process.env.SEPOLIA_RPC_URL || 'https://ethereum-sepolia-rpc.publicnode.com';

export async function POST(request: NextRequest) {
  try {
    const { proxyAddress } = await request.json();
    
    if (!proxyAddress) {
      return NextResponse.json(
        { success: false, error: 'Proxy address is required' },
        { status: 400 }
      );
    }

    // Validate address format
    if (!ethers.isAddress(proxyAddress)) {
      return NextResponse.json(
        { success: false, error: 'Invalid address format' },
        { status: 400 }
      );
    }

    console.log(`Validating proxy: ${proxyAddress}`);

    const provider = new ethers.JsonRpcProvider(SEPOLIA_RPC);
    const contract = new ethers.Contract(proxyAddress, PROXY_ABI, provider);

    // Test if it's a valid contract
    const code = await provider.getCode(proxyAddress);
    if (code === '0x') {
      return NextResponse.json(
        { success: false, error: 'No contract found at this address' },
        { status: 400 }
      );
    }

    // Get aggregator address
    const aggregatorAddress = await contract.aggregator();
    
    if (!aggregatorAddress || aggregatorAddress === '0x0000000000000000000000000000000000000000') {
      return NextResponse.json(
        { success: false, error: 'Invalid aggregator address returned' },
        { status: 400 }
      );
    }

    // Get additional contract info
    const [description, decimals, latestRoundData] = await Promise.all([
      contract.description().catch(() => 'Unknown'),
      contract.decimals().catch(() => 8),
      contract.latestRoundData().catch(() => null)
    ]);

    let priceInfo = null;
    if (latestRoundData) {
      const [roundId, answer, startedAt, updatedAt, answeredInRound] = latestRoundData;
      priceInfo = {
        roundId: roundId.toString(),
        price: Number(answer) / Math.pow(10, Number(decimals)),
        updatedAt: new Date(Number(updatedAt) * 1000).toISOString(),
        decimals: Number(decimals)
      };
    }

    console.log(`Successfully validated proxy: ${proxyAddress}, aggregator: ${aggregatorAddress}`);

    return NextResponse.json({
      success: true,
      data: {
        proxyAddress,
        aggregatorAddress,
        description,
        decimals: Number(decimals),
        priceInfo,
        isValid: true
      }
    });

  } catch (error) {
    console.error('Error validating proxy:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}