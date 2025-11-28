import { NavigationItem, ModuleData, StepData, UseCaseData, TestimonialData } from '@/types';

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Docs', href: '/docs', external: true }
];

export const WORKFLOW_STEPS: StepData[] = [
  {
    id: 1,
    title: 'Deploy Reactive Contract',
    description: 'Deploy your callback or reactive contract on the network'
  },
  {
    id: 2,
    title: 'Set Monitoring Rules',
    description: 'Configure balance thresholds and replenishment amounts'
  },
  {
    id: 3,
    title: 'Choose Payment Method',
    description: 'Pay with ETH, REACT tokens, stablecoins, or credit card'
  },
  {
    id: 4,
    title: 'Auto-Replenishment',
    description: 'System monitors and refills your contracts automatically'
  }
];

export const FEATURED_MODULES: ModuleData[] = [
  {
    id: 'balance-monitor',
    name: 'Balance Monitor',
    description: 'Real-time monitoring of reactive contract balances',
    icon: 'clock',
    tags: ['Monitoring', 'Real-time']
  },
  {
    id: 'auto-replenish',
    name: 'Auto Replenish',
    description: 'Automatic ETH/REACT token transfers to low contracts',
    icon: 'trending-up',
    tags: ['Automation', 'Replenishment']
  },
  {
    id: 'multi-payment',
    name: 'Multi-Payment',
    description: 'Support for stablecoins and credit card payments',
    icon: 'layers',
    tags: ['Payments', 'Flexibility']
  },
  {
    id: 'callback-tracker',
    name: 'Callback Tracker',
    description: 'Track callback events and contract activity status',
    icon: 'code',
    tags: ['Tracking', 'Analytics']
  }
];

export const USE_CASES: UseCaseData[] = [
  {
    id: 'defi-protocols',
    title: 'DeFi Protocol Maintenance',
    description: 'Keep your DeFi contracts funded and operational 24/7',
    examples: ['Lending protocol callbacks', 'AMM pool maintenance', 'Yield farming contracts'],
    icon: 'repeat'
  },
  {
    id: 'reactive-apps',
    title: 'Reactive Applications',
    description: 'Ensure your reactive dApps never go offline due to low funds',
    examples: ['Event-driven contracts', 'Oracle callback systems', 'Cross-chain bridges'],
    icon: 'trending-up'
  },
  {
    id: 'enterprise-systems',
    title: 'Enterprise Blockchain',
    description: 'Mission-critical contract monitoring for enterprise applications',
    examples: ['Supply chain tracking', 'Payment processing', 'Identity verification'],
    icon: 'users'
  }
];

export const TESTIMONIALS: TestimonialData[] = [
  {
    id: '1',
    quote: 'Reactive saved our DeFi protocol from going offline. The monitoring is incredibly reliable.',
    author: 'Sarah Chen',
    role: 'DeFi Protocol Lead',
    type: 'founder'
  },
  {
    id: '2',
    quote: 'No more 3AM alerts about contract failures. The auto-replenishment just works seamlessly.',
    author: 'Marcus Rodriguez',
    role: 'Smart Contract Developer',
    type: 'developer'
  },
  {
    id: '3',
    quote: 'Being able to pay with credit card for contract maintenance is a game-changer for our team.',
    author: 'Alex Kim',
    role: 'Blockchain Engineer',
    type: 'founder'
  },
  {
    id: '4',
    quote: 'The callback tracking helped us identify and fix issues before they became critical problems.',
    author: 'Jennifer Walsh',
    role: 'Protocol Architect',
    type: 'developer'
  }
];

export const SOCIAL_LINKS = [
  { name: 'Farcaster', href: 'https://farcaster.xyz/autowall', icon: 'farcaster' },
  { name: 'Twitter', href: 'https://twitter.com/autowall', icon: 'twitter' },
  { name: 'GitHub', href: 'https://github.com/autowall', icon: 'github' },
  { name: 'Discord', href: 'https://discord.gg/autowall', icon: 'discord' }
];

export const FOOTER_SECTIONS = [
  {
    title: 'About',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Privacy', href: '/privacy' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Docs', href: '/docs' },
      { label: 'GitHub', href: 'https://github.com/autowall' },
      { label: 'API', href: '/api' }
    ]
  }
];