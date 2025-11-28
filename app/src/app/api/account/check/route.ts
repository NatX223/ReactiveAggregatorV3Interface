import { NextResponse } from 'next/server';
import { ethers } from 'ethers';

const accountFactoryABI = [
    {
        "type": "function",
        "name": "devAccounts",
        "inputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "outputs": [
            {
                "name": "",
                "type": "address",
                "internalType": "address"
            }
        ],
        "stateMutability": "view"
    }
];

const PROVIDER_URL = 'https://lasna-rpc.rnk.dev/';

export async function GET(request: Request) {
    try {
        console.log('Account check started');
        const { searchParams } = new URL(request.url);
        const address = searchParams.get('address');

        if (!address || typeof address !== 'string') {
            return NextResponse.json(
                { error: 'Valid Ethereum address is required as query parameter' },
                { status: 400 }
            );
        }

        // Validate Ethereum address format
        if (!ethers.isAddress(address)) {
            return NextResponse.json(
                { error: 'Invalid Ethereum address format' },
                { status: 400 }
            );
        }

        console.log('Checking dev account for address:', address);

        // Check if address has a dev account
        try {
            const provider = new ethers.JsonRpcProvider(PROVIDER_URL);

            // You'll need to replace this with your actual factory contract address
            const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS!;
            const contract = new ethers.Contract(FACTORY_CONTRACT_ADDRESS, accountFactoryABI, provider);

            console.log('Calling devAccounts on factory contract...');
            const devAccountAddress = await contract.devAccounts(address);
            console.log('Dev account address returned:', devAccountAddress);

            // Check if the returned address is the zero address
            const isZeroAddress = devAccountAddress === ethers.ZeroAddress;

            if (isZeroAddress) {
                return NextResponse.json({
                    hasDevAccount: false,
                    address: address,
                    devAccount: null,
                    balance: null,
                    message: 'No dev account found for this address'
                });
            } else {
                // Get the balance of the dev account
                console.log('Getting balance for dev account:', devAccountAddress);
                const balanceWei = await provider.getBalance(devAccountAddress);
                const balanceEth = ethers.formatEther(balanceWei);

                console.log('Dev account balance:', balanceEth, 'ETH');

                return NextResponse.json({
                    hasDevAccount: true,
                    address: address,
                    devAccount: devAccountAddress,
                    balance: balanceEth,
                    message: 'Dev account found'
                });
            }
        } catch (err) {
            console.error('Error checking dev account:', err);
            throw err;
        }
    } catch (error) {
        console.error('Error in account check:', error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        return NextResponse.json(
            { error: 'Failed to check account', details: errorMessage },
            { status: 500 }
        );
    }
}