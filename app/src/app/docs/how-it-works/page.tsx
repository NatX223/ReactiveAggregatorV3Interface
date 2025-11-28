import React from 'react';
import Link from 'next/link';

const HowItWorksPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Link href="/docs" className="hover:text-blue-600 dark:hover:text-blue-400">
              Documentation
            </Link>
            <span>→</span>
            <span className="text-gray-900 dark:text-white">How It Works</span>
          </nav>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Understand the cross-chain architecture and event-driven flow of ReactiveAggregatorV3Interface
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Architecture Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Architecture Overview</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              ReactiveAggregator utilizes the Reactive Network's callback functionality to monitor when price feed data has been updated and then reads the data and serves it to a chain not supported by Chainlink.
            </p>
            
            {/* Architecture Diagram */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-gray-700 dark:text-gray-300">
{`Source Chain                    Reactive Network                 Destination Chain
┌────────────────────────┐     ┌──────────────────┐            ┌─────────────────┐
│  AggregatorV3 contracts│◄────┤  AggReactive     │            │                 │
│  (Price Source)        │     │  (Event Monitor) │            │                 │
└────────────────────────┘     └──────────────────┘            │ ┌─────────────┐ │
         │                              │                      │ │ FeedProxy   │ │
         │ AnswerUpdated                │ Callback             │ │(Data Store) │ │
         ▼                              ▼                      │ └─────────────┘ │
┌─────────────────┐            ┌──────────────────┐            │                 │
│   FeedReader    │◄───────────┤ ReactiveProxy    │───────────►│                 │
│ (Data Extractor)│            │ (Cross-chain     │            │                 │
└─────────────────┘            │  Coordinator)    │            │                 │
                               └──────────────────┘            └─────────────────┘`}
              </pre>
            </div>
          </div>
        </section>

        {/* Program Flow */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Program Flow</h2>
          
          {/* Step 1: Event Subscription */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">1</div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Event Subscription</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 ml-14">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">AggReactive</code> contract subscribes to <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">AnswerUpdated</code> events from price feed aggregator on the source chain and reacts to it by calling the callback on the feedReader contract.
              </p>
              
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Subscribing:</h4>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-700 dark:text-gray-300">
{`constructor(
    address _feedReader,
    address _priceFeedAggregator,
    uint256 _eventTopic0,
    uint256 _chainId,
    address _service
) payable {
    feedReader = _feedReader;
    priceFeedAggregator = _priceFeedAggregator;
    chainService = _service;
    eventTopic0 = _eventTopic0;
    chainId = _chainId;
    service = ISystemContract(payable(_service));
    if (!vm) {
        service.subscribe(
            _chainId,
            _priceFeedAggregator,
            _eventTopic0,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE,
            REACTIVE_IGNORE
        );
    }
}`}
                  </pre>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Reacting:</h4>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-700 dark:text-gray-300">
{`function react(LogRecord calldata log) external vmOnly {
    bytes memory payload = abi.encodeWithSignature(
        "callback(address)",
        address(0)
    );

    emit Callback(chainId, feedReader, GAS_LIMIT, payload);
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Data Extraction */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">2</div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Data Extraction</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 ml-14">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                When a price update occurs, <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">FeedReader</code> contract on the source chain extracts comprehensive feed data including:
              </p>
              
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mb-4 space-y-1">
                <li>Latest price answer</li>
                <li>Round ID and timestamps</li>
                <li>Aggregator metadata</li>
                <li>Decimal precision</li>
              </ul>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Then emits an event consisting of the necessary price feed data which will be tracked and transmitted to the destination chain.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-700 dark:text-gray-300">
{`function callback(
    address sender
) external authorizedSenderOnly rvmIdOnly(sender) {
    (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
    ) = dataFeed.latestRoundData();
    
    emit feedRead(
        aggregatorProxy,
        answer,
        dataFeed.description(),
        roundId,
        dataFeed.decimals(),
        startedAt,
        updatedAt,
        dataFeed.version()
    );
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Step 3: Cross-Chain Relay */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">3</div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Cross-Chain Relay</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 ml-14">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">ReactiveProxy</code> processes the extracted data and triggers a callback to the destination chain via the Reactive Network.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-700 dark:text-gray-300">
{`function react(LogRecord calldata log) external vmOnly {
    address aggregatorProxy = address(uint160(log.topic_1));
    int256 answer = int256(log.topic_2);

    (
        string memory description,
        uint80 roundId,
        uint256 decimals,
        uint256 startedAt,
        uint256 updatedAt,
        uint256 version
    ) = abi.decode(
            log.data,
            (string, uint80, uint256, uint256, uint256, uint256)
        );

    bytes memory payload = abi.encodeWithSignature(
        "callback(address,address,int256,string,uint80,uint256,uint256,uint256,uint256)",
        address(0),
        aggregatorProxy,
        answer,
        description,
        roundId,
        decimals,
        startedAt,
        updatedAt,
        version
    );

    emit Callback(chainId, feedProxy, GAS_LIMIT, payload);
}`}
                </pre>
              </div>
            </div>
          </div>

          {/* Step 4: Data Storage */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-4">4</div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Data Storage</h3>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 ml-14">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">FeedProxy</code> receives the callback and stores the price data, providing AggregatorV3Interface compatibility for consuming contracts on the destination chain.
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-700 dark:text-gray-300">
{`function callback(
    address sender, 
    address _aggregatorProxy, 
    int256 _answer, 
    string memory _description, 
    uint80 _roundId, 
    uint256 _decimals, 
    uint256 _startedAt, 
    uint256 _updatedAt, 
    uint256 _version
) external 
  authorizedSenderOnly 
  rvmIdOnly(sender) {

    aggregatorProxy = _aggregatorProxy;
    answer = _answer;
    description_ = _description;
    roundId = _roundId;
    decimals_ = _decimals;
    startedAt = _startedAt;
    updatedAt = _updatedAt;
    version = _version;

    emit feedReceived(roundId, answer);
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Contract Addresses */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Deployed Contracts</h2>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Contract</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Address</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Chain</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      Chainlink BTC/USD Aggregator
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 font-mono">
                      0x17Dac87b07EAC97De4E182Fc51C925ebB7E723e2
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      Sepolia
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      AggReactive
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 font-mono">
                      0xa76c05CecE1D5d74ADA1e4746EE14df75603b422
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      Lasna
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      FeedReader
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 font-mono">
                      0x7B7d298752718b7a8D0B22AfAF509900CaA61F23
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      Sepolia
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ReactiveProxy
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 font-mono">
                      0xa2f2436C61b1C0B40685691280B846B3B032bF25
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      Lasna
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      FeedProxy
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300 font-mono">
                      0xAc0723E5A9857A9a9b9503AfD0c0263B8f9bbFA1
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      Lasna
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-semibold mb-4">Ready to deploy your own?</h3>
            <p className="text-blue-100 mb-6">
              Now that you understand how the system works, learn how to set up and deploy your own cross-chain price feed bridge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/docs/setup"
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors text-center"
              >
                Setup & Deployment →
              </Link>
              <Link 
                href="/docs/security"
                className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors text-center"
              >
                Security Considerations →
              </Link>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HowItWorksPage;