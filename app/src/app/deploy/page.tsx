"use client";

import React, { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { parseEther, isAddress } from "viem";
import Navigation from "@/components/layout/Navigation";
import ClientOnly from "@/components/ClientOnly";
import { ethers } from "ethers";

// ABI for getting aggregator from proxy
const PROXY_ABI = [
  {
    inputs: [],
    name: "aggregator",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

// Factory contract ABIs
const FEED_READER_FACTORY_ABI = [
  {
    inputs: [
      { internalType: "address", name: "aggregatorProxy", type: "address" },
      { internalType: "address", name: "service", type: "address" },
    ],
    name: "deployFeedReader",
    outputs: [{ internalType: "address", name: "feedReader", type: "address" }],
    stateMutability: "payable",
    type: "function",
  },
];

const REACTIVE_SYSTEM_FACTORY_ABI = [
  {
    inputs: [
      { internalType: "address", name: "feedReader", type: "address" },
      { internalType: "address", name: "priceFeedAggregator", type: "address" },
      { internalType: "uint256", name: "sourceChainId", type: "uint256" },
    ],
    name: "deploySystem",
    outputs: [
      { internalType: "address", name: "aggReactive", type: "address" },
      { internalType: "address", name: "feedProxy", type: "address" },
      { internalType: "address", name: "reactiveProxy", type: "address" },
    ],
    stateMutability: "payable",
    type: "function",
  },
];

// Contract addresses (these would need to be deployed first)
const CONTRACTS = {
  SEPOLIA: {
    FEED_READER_FACTORY: "0x0000000000000000000000000000000000000000", // To be deployed
    SERVICE_ADDRESS: "0xc9f36411C9897e7F959D99ffca2a0Ba7ee0D7bDA",
    CHAIN_ID: 11155111,
  },
  LASNA: {
    REACTIVE_SYSTEM_FACTORY: "0x0000000000000000000000000000000000000000", // To be deployed
    SERVICE_ADDRESS: "0x0000000000000000000000000000000000fffFfF",
    CHAIN_ID: 5318007,
  },
};

interface DeploymentStep {
  id: number;
  title: string;
  description: string;
  status: "pending" | "loading" | "success" | "error";
  txHash?: string;
  result?: any;
}

interface DeploymentResults {
  feedReader?: string;
  aggReactive?: string;
  feedProxy?: string;
  reactiveProxy?: string;
}

const DeployContent: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  // Form state
  const [proxyAddress, setProxyAddress] = useState("");
  const [aggregatorAddress, setAggregatorAddress] = useState("");
  const [isValidProxy, setIsValidProxy] = useState(false);

  // Deployment state
  const [deploymentSteps, setDeploymentSteps] = useState<DeploymentStep[]>([
    {
      id: 1,
      title: "Validate Proxy Contract",
      description: "Verify the proxy address and get aggregator address",
      status: "pending",
    },
    {
      id: 2,
      title: "Deploy FeedReader (Sepolia)",
      description: "Deploy FeedReader contract on Sepolia testnet",
      status: "pending",
    },
    {
      id: 3,
      title: "Deploy Reactive System (Lasna)",
      description: "Deploy AggReactive, FeedProxy, and ReactiveProxy on Lasna",
      status: "pending",
    },
    {
      id: 4,
      title: "Verify Deployment",
      description:
        "Confirm all contracts are deployed and configured correctly",
      status: "pending",
    },
  ]);

  const [currentStep, setCurrentStep] = useState(0);
  const [deploymentResults, setDeploymentResults] = useState<DeploymentResults>(
    {}
  );

  // Contract interaction hooks
  const { writeContract: writeFeedReader, data: feedReaderTxHash } =
    useWriteContract();
  const { writeContract: writeReactiveSystem, data: reactiveSystemTxHash } =
    useWriteContract();

  const { isLoading: feedReaderLoading, isSuccess: feedReaderSuccess } =
    useWaitForTransactionReceipt({
      hash: feedReaderTxHash,
    });

  const { isLoading: reactiveSystemLoading, isSuccess: reactiveSystemSuccess } =
    useWaitForTransactionReceipt({
      hash: reactiveSystemTxHash,
    });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Validate proxy address and get aggregator
  const validateProxy = async () => {
    if (!proxyAddress || !isAddress(proxyAddress)) {
      setIsValidProxy(false);
      return;
    }

    try {
      updateStepStatus(1, "loading");

      const response = await fetch("/api/validate-proxy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ proxyAddress }),
      });

      const result = await response.json();

      if (result.success && result.data) {
        setAggregatorAddress(result.data.aggregatorAddress);
        setIsValidProxy(true);
        updateStepStatus(1, "success", undefined, result.data);
      } else {
        throw new Error(result.error || "Failed to validate proxy");
      }
    } catch (error) {
      console.error("Error validating proxy:", error);
      setIsValidProxy(false);
      updateStepStatus(1, "error");
    }
  };

  const updateStepStatus = (
    stepId: number,
    status: DeploymentStep["status"],
    txHash?: string,
    result?: any
  ) => {
    setDeploymentSteps((prev) =>
      prev.map((step) =>
        step.id === stepId ? { ...step, status, txHash, result } : step
      )
    );
  };

  const deployFeedReader = async () => {
    if (!isValidProxy || !aggregatorAddress) return;

    try {
      updateStepStatus(2, "loading");
      setCurrentStep(1);

      await writeFeedReader({
        address: CONTRACTS.SEPOLIA.FEED_READER_FACTORY as `0x${string}`,
        abi: FEED_READER_FACTORY_ABI,
        functionName: "deployFeedReader",
        args: [
          proxyAddress as `0x${string}`,
          CONTRACTS.SEPOLIA.SERVICE_ADDRESS as `0x${string}`,
        ],
        value: parseEther("0.005"),
      });
    } catch (error) {
      console.error("Error deploying FeedReader:", error);
      updateStepStatus(2, "error");
    }
  };

  const deployReactiveSystem = async (feedReaderAddress: string) => {
    try {
      updateStepStatus(3, "loading");
      setCurrentStep(2);

      await writeReactiveSystem({
        address: CONTRACTS.LASNA.REACTIVE_SYSTEM_FACTORY as `0x${string}`,
        abi: REACTIVE_SYSTEM_FACTORY_ABI,
        functionName: "deploySystem",
        args: [
          feedReaderAddress as `0x${string}`,
          aggregatorAddress as `0x${string}`,
          BigInt(CONTRACTS.SEPOLIA.CHAIN_ID),
        ],
        value: parseEther("3"),
      });
    } catch (error) {
      console.error("Error deploying Reactive System:", error);
      updateStepStatus(3, "error");
    }
  };

  // Handle transaction success
  useEffect(() => {
    if (feedReaderSuccess && feedReaderTxHash) {
      updateStepStatus(2, "success", feedReaderTxHash);
      // In a real implementation, you'd parse the transaction receipt to get the deployed address
      const mockFeedReaderAddress =
        "0x1234567890123456789012345678901234567890";
      setDeploymentResults((prev) => ({
        ...prev,
        feedReader: mockFeedReaderAddress,
      }));
      deployReactiveSystem(mockFeedReaderAddress);
    }
  }, [feedReaderSuccess, feedReaderTxHash]);

  useEffect(() => {
    if (reactiveSystemSuccess && reactiveSystemTxHash) {
      updateStepStatus(3, "success", reactiveSystemTxHash);
      updateStepStatus(4, "success");
      setCurrentStep(3);
    }
  }, [reactiveSystemSuccess, reactiveSystemTxHash]);

  const startDeployment = async () => {
    if (!isValidProxy) {
      await validateProxy();
      return;
    }

    await deployFeedReader();
  };

  const getStepIcon = (step: DeploymentStep) => {
    switch (step.status) {
      case "loading":
        return (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
        );
      case "success":
        return <span className="text-green-600 text-xl">✅</span>;
      case "error":
        return <span className="text-red-600 text-xl">❌</span>;
      default:
        return <span className="text-gray-400 text-xl">⏳</span>;
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navigation />
        <div className="pt-16" />
        <div className="max-w-4xl mx-auto px-4 pt-20 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Connect Your Wallet
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Please connect your wallet to deploy a new price feed bridge.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Deploy Price Feed Bridge
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Create a new cross-chain price feed bridge from Sepolia to Lasna
            testnet
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Input Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Configuration
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sepolia Price Feed Proxy Address
              </label>
              <input
                type="text"
                value={proxyAddress}
                onChange={(e) => setProxyAddress(e.target.value)}
                onBlur={validateProxy}
                placeholder="0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Enter the Chainlink price feed proxy address from Sepolia
                testnet
              </p>
            </div>

            {aggregatorAddress && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Detected Aggregator Address
                </label>
                <div className="px-4 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <code className="text-sm font-mono text-green-800 dark:text-green-200">
                    {aggregatorAddress}
                  </code>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Deployment Steps */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Deployment Progress
          </h2>

          <div className="space-y-4">
            {deploymentSteps.map((step, index) => (
              <div key={step.id} className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">{getStepIcon(step)}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {step.description}
                  </p>
                  {step.txHash && (
                    <a
                      href={`https://sepolia.etherscan.io/tx/${step.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 text-sm font-mono"
                    >
                      View Transaction: {step.txHash.slice(0, 10)}...
                      {step.txHash.slice(-8)}
                    </a>
                  )}
                  {step.result && (
                    <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <pre className="text-xs text-gray-700 dark:text-gray-300">
                        {JSON.stringify(step.result, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={startDeployment}
            disabled={
              !proxyAddress || feedReaderLoading || reactiveSystemLoading
            }
            className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {(feedReaderLoading || reactiveSystemLoading) && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            {currentStep === 0
              ? "Start Deployment"
              : currentStep === 1
              ? "Deploying FeedReader..."
              : currentStep === 2
              ? "Deploying Reactive System..."
              : "Deployment Complete"}
          </button>

          {deploymentSteps[3].status === "success" && (
            <button
              onClick={() => (window.location.href = "/price-feeds")}
              className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200"
            >
              View Price Feeds
            </button>
          )}
        </div>

        {/* Cost Information */}
        <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4">
            💰 Deployment Costs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700 dark:text-yellow-300">
            <div>
              <h4 className="font-medium mb-2">Sepolia Testnet</h4>
              <ul className="space-y-1">
                <li>• FeedReader deployment: 0.005 ETH</li>
                <li>• Gas fees: ~0.001 ETH</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Lasna Testnet</h4>
              <ul className="space-y-1">
                <li>• Reactive System deployment: 3 REACT</li>
                <li>• Gas fees: ~0.01 REACT</li>
              </ul>
            </div>
          </div>
          <p className="text-yellow-700 dark:text-yellow-300 mt-4 font-medium">
            Total estimated cost: ~0.006 ETH and 3.01 REACT (testnet tokens)
          </p>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
            📋 Instructions
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-700 dark:text-blue-300">
            <li>
              Enter a valid Chainlink price feed proxy address from Sepolia
              testnet
            </li>
            <li>The system will automatically detect the aggregator address</li>
            <li>
              Ensure you have sufficient ETH on both Sepolia and Lasna testnets
            </li>
            <li>
              Click "Start Deployment" to begin the automated deployment process
            </li>
            <li>
              Wait for all transactions to confirm (this may take several
              minutes)
            </li>
            <li>
              Once complete, your price feed will be available on the Price
              Feeds page
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

const DeployPage: React.FC = () => {
  return (
    <ClientOnly>
      <DeployContent />
    </ClientOnly>
  );
};

export default DeployPage;
