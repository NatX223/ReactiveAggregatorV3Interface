"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import Navigation from "@/components/layout/Navigation";
import ClientOnly from "@/components/ClientOnly";

interface CreateAccountFormData {
  contractCount: string;
  contractType: "reactive" | "callback" | "mixed";
}

function CreateAccountContent() {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [createAccountForm, setCreateAccountForm] =
    useState<CreateAccountFormData>({
      contractCount: "",
      contractType: "reactive",
    });
  const [createAccountLoading, setCreateAccountLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect to dashboard if not connected
  useEffect(() => {
    if (mounted && !isConnected) {
      router.push("/dashboard");
    }
  }, [mounted, isConnected, router]);

  const handleCreateAccount = async () => {
    if (!address || !createAccountForm.contractCount) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setCreateAccountLoading(true);
      const response = await fetch("/api/account/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to dashboard on success
        router.push("/dashboard");
      } else {
        alert(`Failed to create account: ${data.error}`);
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert("Failed to create account. Please try again.");
    } finally {
      setCreateAccountLoading(false);
    }
  };

  // Don't render anything until mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // After mounting, check if wallet is connected
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
            Please connect your wallet to create a developer account.
          </p>
          <button
            onClick={() => router.push("/dashboard")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />

      {/* Navigation spacing */}
      <div className="pt-16" />

      <div className="max-w-2xl mx-auto px-4 pt-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-700 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Create Developer Account
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Set up your account to start monitoring and managing your
              contracts.
            </p>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-8">
            {/* Contract Count */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                How many contracts do you plan to track?
              </label>
              <input
                type="number"
                value={createAccountForm.contractCount}
                onChange={(e) =>
                  setCreateAccountForm((prev) => ({
                    ...prev,
                    contractCount: e.target.value,
                  }))
                }
                placeholder="e.g., 5"
                min="1"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Contract Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                What type of contracts will you mostly be working with?
              </label>
              <div className="space-y-4">
                <label className="flex items-start p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="contractType"
                    value="reactive"
                    checked={createAccountForm.contractType === "reactive"}
                    onChange={(e) =>
                      setCreateAccountForm((prev) => ({
                        ...prev,
                        contractType: e.target.value as
                          | "reactive"
                          | "callback"
                          | "mixed",
                      }))
                    }
                    className="mt-1 mr-4 text-blue-600"
                  />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Reactive Contracts
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Contracts that respond to blockchain events automatically
                    </p>
                  </div>
                </label>

                <label className="flex items-start p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="contractType"
                    value="callback"
                    checked={createAccountForm.contractType === "callback"}
                    onChange={(e) =>
                      setCreateAccountForm((prev) => ({
                        ...prev,
                        contractType: e.target.value as
                          | "reactive"
                          | "callback"
                          | "mixed",
                      }))
                    }
                    className="mt-1 mr-4 text-blue-600"
                  />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Callback Contracts
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Contracts that emit events for reactive contracts to
                      monitor
                    </p>
                  </div>
                </label>

                <label className="flex items-start p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                  <input
                    type="radio"
                    name="contractType"
                    value="mixed"
                    checked={createAccountForm.contractType === "mixed"}
                    onChange={(e) =>
                      setCreateAccountForm((prev) => ({
                        ...prev,
                        contractType: e.target.value as
                          | "reactive"
                          | "callback"
                          | "mixed",
                      }))
                    }
                    className="mt-1 mr-4 text-blue-600"
                  />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white">
                      Mixed (Both Types)
                    </span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Working with both reactive and callback contracts
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                💡 This information helps us optimize your account setup. You
                can always change these settings later in your dashboard.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => router.push("/dashboard")}
                disabled={createAccountLoading}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateAccount}
                disabled={
                  createAccountLoading || !createAccountForm.contractCount
                }
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                {createAccountLoading && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CreateAccountPage() {
  return (
    <ClientOnly>
      <CreateAccountContent />
    </ClientOnly>
  );
}
