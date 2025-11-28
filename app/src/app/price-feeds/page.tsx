"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/layout/Navigation';

interface PriceData {
  roundId: string;
  answer: string;
  startedAt: string;
  updatedAt: string;
  answeredInRound: string;
  decimals: number;
  description: string;
  price: number;
  lastUpdated: string;
  status: 'active' | 'inactive' | 'syncing';
  error?: string;
}

interface PriceFeed {
  name: string;
  pair: string;
  sepoliaAddress: string;
  lasnaAddress: string;
  sepoliaData?: PriceData;
  lasnaData?: PriceData;
  status: 'active' | 'inactive' | 'syncing';
}

interface ApiResponse {
  success: boolean;
  data?: PriceFeed[];
  error?: string;
  timestamp: string;
}

const PriceFeedsPage: React.FC = () => {
  const [feeds, setFeeds] = useState<PriceFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'syncing'>('all');
  const [mounted, setMounted] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchPriceFeeds = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/price-feeds', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data: ApiResponse = await response.json();
      
      if (data.success && data.data) {
        setFeeds(data.data);
        setLastUpdated(new Date().toLocaleTimeString());
      } else {
        setError(data.error || 'Failed to fetch price feeds');
      }
    } catch (err) {
      console.error('Error fetching price feeds:', err);
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted) {
      fetchPriceFeeds();
      
      // Refresh data every 30 seconds
      const interval = setInterval(fetchPriceFeeds, 30000);
      return () => clearInterval(interval);
    }
  }, [mounted]);

  const filteredFeeds = feeds.filter(feed => {
    const matchesSearch = feed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feed.pair.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || feed.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'syncing':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'inactive':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return '🟢';
      case 'syncing':
        return '🟡';
      case 'inactive':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const formatPrice = (price: number) => {
    if (price === 0) return 'N/A';
    if (price >= 1000) {
      return `$${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else if (price >= 1) {
      return `$${price.toFixed(4)}`;
    } else {
      return `$${price.toFixed(6)}`;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
      
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      
      return date.toLocaleDateString();
    } catch {
      return 'Unknown';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const getAssetIcon = (name: string) => {
    switch (name) {
      case 'Bitcoin': return '₿';
      case 'Ethereum': return 'Ξ';
      case 'Chainlink': return '🔗';
      case 'USD Coin': return '💵';
      case 'Solana': return '◎';
      case 'Cardano': return '₳';
      default: return '💰';
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Cross-Chain Price Feeds
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-4">
              Real-time Chainlink price data bridged from Sepolia to Lasna testnet using ReactiveAggregatorV3Interface
            </p>
            {lastUpdated && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Last updated: {lastUpdated}
              </p>
            )}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {feeds.length}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Total Feeds</div>
            </div>
            
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {feeds.filter(f => f.status === 'active').length}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">Active</div>
            </div>
            
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                {feeds.filter(f => f.status === 'syncing').length}
              </div>
              <div className="text-sm text-yellow-700 dark:text-yellow-300">Syncing</div>
            </div>
            
            <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-red-600 dark:text-red-400 mb-2">
                {feeds.filter(f => f.status === 'inactive').length}
              </div>
              <div className="text-sm text-red-700 dark:text-red-300">Inactive</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search price feeds..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="syncing">Syncing</option>
              <option value="inactive">Inactive</option>
            </select>
            
            <button
              onClick={fetchPriceFeeds}
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Loading State */}
        {loading && feeds.length === 0 && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-300">Loading price feeds...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-6">
            <div className="flex items-center">
              <span className="text-red-600 dark:text-red-400 text-xl mr-3">⚠️</span>
              <div>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Error Loading Price Feeds</h3>
                <p className="text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Price Feeds Table */}
        {!loading && feeds.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            
            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Asset
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Sepolia Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Lasna Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Addresses
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Last Updated
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  {filteredFeeds.map((feed, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-2xl mr-3">
                            {getAssetIcon(feed.name)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {feed.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {feed.pair}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {feed.sepoliaData ? formatPrice(feed.sepoliaData.price) : 'N/A'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {feed.sepoliaData?.status === 'active' ? '🟢 Live' : 
                           feed.sepoliaData?.status === 'syncing' ? '🟡 Syncing' : '🔴 Offline'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {feed.lasnaData ? formatPrice(feed.lasnaData.price) : 'N/A'}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {feed.lasnaData?.status === 'active' ? '🟢 Live' : 
                           feed.lasnaData?.status === 'syncing' ? '🟡 Syncing' : '🔴 Offline'}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Sepolia</div>
                            <div className="flex items-center space-x-2">
                              <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono">
                                {feed.sepoliaAddress.slice(0, 8)}...{feed.sepoliaAddress.slice(-6)}
                              </code>
                              <button
                                onClick={() => copyToClipboard(feed.sepoliaAddress)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                title="Copy address"
                              >
                                📋
                              </button>
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Lasna</div>
                            <div className="flex items-center space-x-2">
                              <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono">
                                {feed.lasnaAddress.slice(0, 8)}...{feed.lasnaAddress.slice(-6)}
                              </code>
                              <button
                                onClick={() => copyToClipboard(feed.lasnaAddress)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                title="Copy address"
                              >
                                📋
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(feed.status)}`}>
                          <span className="mr-1">{getStatusIcon(feed.status)}</span>
                          {feed.status.charAt(0).toUpperCase() + feed.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        <div>
                          <div>Sepolia: {feed.sepoliaData ? formatTimestamp(feed.sepoliaData.lastUpdated) : 'N/A'}</div>
                          <div>Lasna: {feed.lasnaData ? formatTimestamp(feed.lasnaData.lastUpdated) : 'N/A'}</div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden">
              {filteredFeeds.map((feed, index) => (
                <div key={index} className="p-6 border-b border-gray-200 dark:border-gray-600 last:border-b-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">
                        {getAssetIcon(feed.name)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {feed.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {feed.pair}
                        </div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feed.status)}`}>
                      <span className="mr-1">{getStatusIcon(feed.status)}</span>
                      {feed.status.charAt(0).toUpperCase() + feed.status.slice(1)}
                    </span>
                  </div>
                  
                  {/* Price Comparison */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <div className="text-xs font-medium text-blue-700 dark:text-blue-300 mb-1">Sepolia Price</div>
                      <div className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                        {feed.sepoliaData ? formatPrice(feed.sepoliaData.price) : 'N/A'}
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400">
                        {feed.sepoliaData?.status === 'active' ? '🟢 Live' : 
                         feed.sepoliaData?.status === 'syncing' ? '🟡 Syncing' : '🔴 Offline'}
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3">
                      <div className="text-xs font-medium text-purple-700 dark:text-purple-300 mb-1">Lasna Price</div>
                      <div className="text-lg font-semibold text-purple-900 dark:text-purple-100">
                        {feed.lasnaData ? formatPrice(feed.lasnaData.price) : 'N/A'}
                      </div>
                      <div className="text-xs text-purple-600 dark:text-purple-400">
                        {feed.lasnaData?.status === 'active' ? '🟢 Live' : 
                         feed.lasnaData?.status === 'syncing' ? '🟡 Syncing' : '🔴 Offline'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Sepolia Address
                      </div>
                      <div className="flex items-center space-x-2">
                        <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono flex-1">
                          {feed.sepoliaAddress}
                        </code>
                        <button
                          onClick={() => copyToClipboard(feed.sepoliaAddress)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Lasna Address
                      </div>
                      <div className="flex items-center space-x-2">
                        <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono flex-1">
                          {feed.lasnaAddress}
                        </code>
                        <button
                          onClick={() => copyToClipboard(feed.lasnaAddress)}
                          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        >
                          📋
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredFeeds.length === 0 && feeds.length > 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No price feeds found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-4">
            📊 How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-800 dark:text-blue-200">
            <div>
              <h4 className="font-medium mb-2">Source Chain (Sepolia)</h4>
              <p>
                Price data originates from Chainlink's official aggregator contracts deployed on Sepolia testnet. 
                These contracts receive updates from Chainlink's decentralized oracle network.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Destination Chain (Lasna)</h4>
              <p>
                ReactiveAggregatorV3Interface mirrors this data to Lasna testnet in real-time, 
                making Chainlink price feeds available on chains that don't natively support them.
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link 
              href="/docs/how-it-works"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Learn More →
            </Link>
            <Link 
              href="/docs/setup"
              className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              Deploy Your Own →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFeedsPage;