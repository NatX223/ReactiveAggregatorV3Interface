import React from "react";
import Link from "next/link";

const SecurityPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            <Link
              href="/docs"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Documentation
            </Link>
            <span>→</span>
            <span className="text-gray-900 dark:text-white">
              Security Considerations
            </span>
          </nav>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Security Considerations
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Essential security practices and considerations for safe operation
            of your cross-chain price feed bridge
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Security Overview */}
        <section className="mb-12">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 dark:text-red-400 font-bold">
                  ⚠️
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                  Critical Security Notice
                </h3>
                <p className="text-red-700 dark:text-red-300">
                  Cross-chain price feeds involve significant security
                  considerations. Always conduct thorough testing and security
                  audits before production deployment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Access Control */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Access Control
          </h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🔐 Authorized Sender Validation
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                All callback functions implement strict sender authorization to
                prevent unauthorized access.
              </p>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                  {`modifier authorizedSenderOnly() {
    require(
        msg.sender == SYSTEM_CONTRACT_ADDRESS,
        "Unauthorized sender"
    );
    _;
}`}
                </pre>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  Best Practices:
                </h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>
                    • Always validate the sender address in callback functions
                  </li>
                  <li>
                    • Use the official Reactive Network system contract
                    addresses
                  </li>
                  <li>
                    • Implement additional access controls for administrative
                    functions
                  </li>
                  <li>
                    • Consider multi-signature wallets for contract ownership
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🔍 Reactive VM Validation
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                RVM ID validation ensures callbacks originate from legitimate
                reactive contracts.
              </p>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                  {`modifier rvmIdOnly(address sender) {
    require(
        sender == expectedReactiveContract,
        "Invalid RVM ID"
    );
    _;
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Data Integrity */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Data Integrity
          </h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                📊 Event Tracking & Validation
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                The system tracks AnswerUpdated events to ensure data freshness
                and optimize gas usage.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    ✅ Implemented
                  </h4>
                  <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                    <li>• Event signature validation</li>
                    <li>• Round ID tracking</li>
                    <li>• Timestamp verification</li>
                    <li>• Source contract validation</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    ⚠️ Considerations
                  </h4>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                    <li>• Monitor for stale data</li>
                    <li>• Implement heartbeat checks</li>
                    <li>• Validate price ranges</li>
                    <li>• Check for replay attacks</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                ⏰ Timestamp & Freshness Validation
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Implement checks to ensure price data is recent and hasn't been
                manipulated.
              </p>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                  {`function validateFreshness(uint256 updatedAt) internal view {
    require(
        block.timestamp - updatedAt <= MAX_STALENESS,
        "Price data too stale"
    );
}`}
                </pre>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🔄 Round ID Anti-Replay Protection
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Track round IDs to prevent replay attacks and ensure data
                progression.
              </p>

              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
                  {`mapping(uint80 => bool) private processedRounds;

function validateRoundId(uint80 newRoundId) internal {
    require(
        !processedRounds[newRoundId],
        "Round already processed"
    );
    require(
        newRoundId > lastRoundId,
        "Round ID must increase"
    );
    processedRounds[newRoundId] = true;
    lastRoundId = newRoundId;
}`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Best Practices
          </h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                🔍 Price Data Validation
              </h3>

              <div className="space-y-4">
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Always Verify Freshness
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Check that price data is recent and within acceptable
                    staleness thresholds before using it in critical operations.
                  </p>
                </div>

                <div className="border-l-4 border-green-400 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Implement Circuit Breakers
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Add safeguards to pause operations if price movements exceed
                    reasonable thresholds or if data becomes stale.
                  </p>
                </div>

                <div className="border-l-4 border-purple-400 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Use Multiple Price Sources
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    When possible, aggregate data from multiple price feeds to
                    reduce single points of failure and improve reliability.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                ⚡ Operational Security
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Monitoring
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Set up alerts for failed transactions</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Monitor gas usage and costs</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Track price feed update frequency</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>Watch for unusual price movements</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Maintenance
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Regular contract balance checks</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Update RPC endpoints as needed</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Backup private keys securely</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-blue-500 mt-1">•</span>
                      <span>Test emergency procedures</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Procedures */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Emergency Procedures
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              🚨 Pausable Subscriptions
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The system includes pausable functionality for emergency stops
              when issues are detected.
            </p>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">
                When to Pause:
              </h4>
              <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                <li>• Detected price manipulation or anomalies</li>
                <li>• Source chain or Reactive Network issues</li>
                <li>• Suspected security breach or attack</li>
                <li>• Contract upgrade or maintenance requirements</li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <pre className="text-sm text-gray-700 dark:text-gray-300">
                {`// Emergency pause function (owner only)
function emergencyPause() external onlyOwner {
    _pause();
    emit EmergencyPause(block.timestamp);
}

// Resume operations after issue resolution
function resume() external onlyOwner {
    _unpause();
    emit OperationsResumed(block.timestamp);
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Security Checklist */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Security Checklist
          </h2>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              ✅ Pre-Deployment Checklist
            </h3>

            <div className="space-y-3">
              {[
                "Conduct thorough testing on testnets",
                "Verify all contract addresses and configurations",
                "Implement proper access controls and modifiers",
                "Set up monitoring and alerting systems",
                "Prepare emergency response procedures",
                "Secure private keys with hardware wallets",
                "Document all deployment parameters",
                "Perform security audit or code review",
                "Test pause/unpause functionality",
                "Verify gas limits and funding requirements",
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded"></div>
                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Resources */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Additional Resources
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                📚 Security Guidelines
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>
                  <a
                    href="https://consensys.github.io/smart-contract-best-practices/"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Smart Contract Security Best Practices
                  </a>
                </li>
                <li>
                  <a
                    href="https://docs.chain.link/data-feeds/price-feeds/addresses"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Chainlink Price Feed Addresses
                  </a>
                </li>
                <li>
                  <a
                    href="https://reactive.network/"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Reactive Network Documentation
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                🛠️ Security Tools
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>• Slither - Static analysis tool</li>
                <li>• MythX - Security analysis platform</li>
                <li>• Foundry - Testing framework</li>
                <li>• OpenZeppelin Defender - Operations platform</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Final Warning */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-semibold mb-4">
              ⚠️ Final Security Reminder
            </h3>
            <p className="text-red-100 mb-6">
              Cross-chain bridges are high-value targets for attackers. Always
              prioritize security over convenience and never deploy to mainnet
              without thorough testing and auditing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/docs"
                className="bg-white text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-red-50 transition-colors text-center"
              >
                ← Back to Documentation
              </Link>
              <Link
                href="https://github.com/NatX223/ReactiveAggregatorV3Interface/issues"
                className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-red-600 transition-colors text-center"
              >
                Report Security Issues →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SecurityPage;
