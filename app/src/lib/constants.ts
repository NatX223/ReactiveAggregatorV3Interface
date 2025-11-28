import { NavigationItem, ModuleData, StepData, UseCaseData, TestimonialData } from '@/types';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Price Feeds', href: '/price-feeds', external: true },
  { label: 'Deploy', href: '/deploy', external: true },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Docs', href: '/docs', external: true }
];

export const WORKFLOW_STEPS: StepData[] = [
  {
    id: 1,
    title: 'Event Subscription',
    description: 'AggReactive subscribes to AnswerUpdated events from Chainlink price feeds on supported chains'
  },
  {
    id: 2,
    title: 'Data Extraction',
    description: 'FeedReader extracts comprehensive price data including latest answer, round ID, and metadata'
  },
  {
    id: 3,
    title: 'Cross-Chain Relay',
    description: 'ReactiveProxy processes data and triggers callbacks to destination chains via Reactive Network'
  },
  {
    id: 4,
    title: 'Data Storage',
    description: 'FeedProxy receives and stores price data with AggregatorV3Interface compatibility'
  }
];

export const FEATURED_MODULES: ModuleData[] = [
  {
    id: 'cross-chain-feeds',
    name: 'Cross-Chain Price Feeds',
    description: 'Bridge Chainlink price data to any blockchain network',
    icon: 'trending-up',
    tags: ['Cross-Chain', 'Price Feeds']
  },
  {
    id: 'real-time-sync',
    name: 'Real-Time Synchronization',
    description: 'Automatic price updates with minimal latency across chains',
    icon: 'clock',
    tags: ['Real-time', 'Synchronization']
  },
  {
    id: 'aggregator-compatibility',
    name: 'AggregatorV3 Compatible',
    description: 'Drop-in replacement for existing Chainlink integrations',
    icon: 'layers',
    tags: ['Compatibility', 'Standards']
  },
  {
    id: 'event-driven',
    name: 'Event-Driven Architecture',
    description: 'Reactive system that responds to price feed updates automatically',
    icon: 'code',
    tags: ['Events', 'Reactive']
  }
];

export const USE_CASES: UseCaseData[] = [
  {
    id: 'defi-protocols',
    title: 'DeFi Protocols on New Chains',
    description: 'Enable DeFi applications on chains without native Chainlink support',
    examples: ['Lending protocols with reliable price feeds', 'DEX price oracles', 'Liquidation systems', 'Yield farming with accurate pricing'],
    icon: 'repeat'
  },
  {
    id: 'cross-chain-apps',
    title: 'Cross-Chain Applications',
    description: 'Build applications that need consistent price data across multiple chains',
    examples: ['Multi-chain portfolio trackers', 'Cross-chain arbitrage bots', 'Universal price aggregators', 'Chain-agnostic DeFi protocols'],
    icon: 'trending-up'
  },
  {
    id: 'emerging-ecosystems',
    title: 'Emerging Blockchain Ecosystems',
    description: 'Bring institutional-grade price feeds to new and specialized blockchains',
    examples: ['Layer 2 scaling solutions', 'Gaming and NFT platforms', 'Enterprise blockchain networks', 'Specialized DeFi chains'],
    icon: 'users'
  }
];

export const TESTIMONIALS: TestimonialData[] = [
  {
    id: '1',
    quote: 'ReactiveAggregator enabled us to launch our DeFi protocol on a new L2 with reliable Chainlink price feeds. Game-changing technology.',
    author: 'Sarah Chen',
    role: 'DeFi Protocol Lead',
    type: 'founder'
  },
  {
    id: '2',
    quote: 'The cross-chain price synchronization is incredibly fast and reliable. Our arbitrage strategies now work seamlessly across multiple chains.',
    author: 'Marcus Rodriguez',
    role: 'Quantitative Developer',
    type: 'developer'
  },
  {
    id: '3',
    quote: 'Finally, we can use institutional-grade price feeds on our specialized blockchain. The AggregatorV3 compatibility made integration effortless.',
    author: 'Alex Kim',
    role: 'Blockchain Architect',
    type: 'founder'
  },
  {
    id: '4',
    quote: 'The real-time price mirroring helped us build a multi-chain portfolio tracker with consistent pricing across all supported networks.',
    author: 'Jennifer Walsh',
    role: 'Product Manager',
    type: 'developer'
  }
];

export const SOCIAL_LINKS = [
  { name: 'GitHub', href: 'https://github.com/NatX223/ReactiveAggregatorV3Interface', icon: 'github' },
  { name: 'Reactive Network', href: 'https://reactive.network/', icon: 'globe' },
  { name: 'Chainlink', href: 'https://chain.link/', icon: 'link' },
  { name: 'Documentation', href: '/docs', icon: 'book' }
];

export const FOOTER_SECTIONS = [
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'GitHub', href: 'https://github.com/NatX223/ReactiveAggregatorV3Interface' },
      { label: 'API', href: '/api' }
    ]
  }
];