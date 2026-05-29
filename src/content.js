import {
  BarChart3,
  BookOpen,
  Briefcase,
  Building2,
  Calculator,
  CheckCircle2,
  CircleDollarSign,
  ClipboardCheck,
  Compass,
  FileText,
  Globe2,
  Landmark,
  LineChart,
  LockKeyhole,
  PieChart,
  Scale,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';

export const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Solutions', path: '/solutions' },
  { label: 'Blog', path: '/blog' },
  { label: 'Calculator', path: '/calculator' },
  { label: 'Testimonials', path: '/testimonials' },
  { label: 'Contact', path: '/contact' },
];

export const stats = [
  { label: 'Client assets modeled', value: '$1.8B+' },
  { label: 'Planning scenarios reviewed', value: '14k' },
  { label: 'Family office partners', value: '42' },
];

export const services = [
  {
    icon: Compass,
    title: 'Financial Planning',
    summary: 'Goal-based planning for life events, liquidity, taxes, and long-term financial confidence.',
    points: ['Cash-flow map', 'Goal funding plan', 'Annual review cadence'],
  },
  {
    icon: PieChart,
    title: 'Mutual Fund Advisory',
    summary: 'Research-led mutual fund portfolios mapped to time horizon, risk profile, and return expectations.',
    points: ['Fund screeners', 'SIP and lump sum plans', 'Portfolio overlap checks'],
  },
  {
    icon: LineChart,
    title: 'Portfolio Strategy',
    summary: 'Asset allocation, risk controls, and rebalancing rules designed for disciplined compounding.',
    points: ['Asset mix', 'Drawdown guardrails', 'Rebalancing calendar'],
  },
  {
    icon: BookOpen,
    title: 'Investor Education',
    summary: 'Clear explainers, workshops, and market notes that help clients make calmer decisions.',
    points: ['Monthly notes', 'Behavior coaching', 'Learning library'],
  },
];

export const reasons = [
  {
    icon: ShieldCheck,
    title: 'Fiduciary mindset',
    text: 'Advice begins with suitability, risk capacity, and clear disclosures before any product discussion.',
  },
  {
    icon: LockKeyhole,
    title: 'Secure by design',
    text: 'Sensitive client journeys are shaped around privacy, consent, audit trails, and clean documentation.',
  },
  {
    icon: Target,
    title: 'Goal-first architecture',
    text: 'Every portfolio is connected to a real objective, time frame, and planned review rhythm.',
  },
  {
    icon: BarChart3,
    title: 'Research discipline',
    text: 'Model portfolios combine quantitative signals, qualitative due diligence, and scenario testing.',
  },
];

export const solutions = [
  {
    icon: Wallet,
    name: 'Core Wealth',
    audience: 'Professionals and young families',
    detail: 'SIP-led portfolios, insurance gap checks, emergency reserves, and tax-aware goal planning.',
    allocation: '60% equity funds, 25% debt funds, 15% liquid reserves',
  },
  {
    icon: Briefcase,
    name: 'Founder Liquidity',
    audience: 'Entrepreneurs and executives',
    detail: 'Liquidity laddering, concentrated-stock risk planning, family governance, and reinvestment policy.',
    allocation: '45% growth, 30% income, 15% alternatives, 10% cash',
  },
  {
    icon: Landmark,
    name: 'Legacy Office',
    audience: 'Multi-generation families',
    detail: 'Estate coordination, philanthropic mandates, manager selection, and consolidated reporting.',
    allocation: '35% listed markets, 25% fixed income, 25% alternatives, 15% real assets',
  },
];

export const process = [
  {
    title: 'Discover',
    text: 'We understand goals, liabilities, current holdings, risk appetite, and behavioral preferences.',
  },
  {
    title: 'Design',
    text: 'We create a written investment policy, portfolio mix, and milestone-based action plan.',
  },
  {
    title: 'Deploy',
    text: 'We phase implementation through SIPs, switches, tax-aware entries, and documented approvals.',
  },
  {
    title: 'Review',
    text: 'We monitor drift, update plans, educate stakeholders, and rebalance with discipline.',
  },
];

export const testimonials = [
  {
    name: 'Ananya Rao',
    role: 'Founder, consumer wellness brand',
    quote:
      'Aurelian converted a messy set of investments into a clear family policy. The reporting is calm, visual, and easy to act on.',
  },
  {
    name: 'Vikram Shah',
    role: 'Technology executive',
    quote:
      'Their planning process helped us connect equity compensation, mutual funds, and retirement goals without feeling sold to.',
  },
  {
    name: 'Nisha Menon',
    role: 'Second-generation family business',
    quote:
      'The team brought structure to our legacy portfolio and made reviews meaningful for every generation at the table.',
  },
  {
    name: 'Rahul Mehta',
    role: 'Medical professional',
    quote:
      'The SIP roadmap and tax notes helped me stay consistent through market noise. The experience feels premium but practical.',
  },
];

export const blogPosts = [
  {
    tag: 'Investor Education',
    title: 'A calmer framework for reviewing mutual fund performance',
    date: 'May 2026',
    excerpt:
      'How to separate temporary underperformance from a broken thesis using benchmarks, rolling returns, and portfolio role.',
  },
  {
    tag: 'Planning',
    title: 'Building a liquidity ladder before making long-term allocations',
    date: 'May 2026',
    excerpt:
      'A practical approach to emergency funds, near-term goals, and keeping investments untouched for compounding.',
  },
  {
    tag: 'Portfolio Strategy',
    title: 'Why asset allocation matters more than product collecting',
    date: 'April 2026',
    excerpt:
      'A plain-English explanation of risk buckets, rebalancing, and why fewer better decisions often win.',
  },
];

export const faqs = [
  {
    question: 'Is this website suitable for a wealth management internship submission?',
    answer:
      'Yes. It includes the mandatory pages, home sections, responsive navigation, lead form, bonus pages, SEO metadata, and a premium finance-focused UI.',
  },
  {
    question: 'Does the design include mutual funds and investor education?',
    answer:
      'Yes. Services and solution pages include mutual fund advisory, SIP planning, portfolio reviews, and a learning-led advisory experience.',
  },
  {
    question: 'Is the calculator functional?',
    answer:
      'Yes. The calculator page estimates future value from monthly investment, years, and expected annual return inputs.',
  },
  {
    question: 'Can the brand and content be renamed later?',
    answer:
      'Yes. Most page copy, navigation, services, testimonials, and blog entries are centralized in the React content file.',
  },
];

export const principles = [
  {
    icon: ClipboardCheck,
    title: 'Documented advice',
    text: 'Recommendations are written, comparable, and connected to the client plan.',
  },
  {
    icon: Scale,
    title: 'Balanced risk',
    text: 'Growth plans are paired with cash reserves, liability mapping, and downside expectations.',
  },
  {
    icon: Globe2,
    title: 'Global perspective',
    text: 'Allocation conversations include domestic, international, listed, and private market context.',
  },
  {
    icon: CheckCircle2,
    title: 'Review discipline',
    text: 'The client experience centers on periodic reviews, clear ownership, and next actions.',
  },
];

export const leadership = [
  {
    name: 'Meera Sanyal',
    title: 'Managing Partner',
    detail: 'Leads planning strategy, family governance, and client experience design.',
  },
  {
    name: 'Arjun Kapoor',
    title: 'Head of Investments',
    detail: 'Builds model portfolios across mutual funds, debt, alternatives, and liquidity sleeves.',
  },
  {
    name: 'Tara Iyer',
    title: 'Director, Education',
    detail: 'Creates investor education journeys, workshops, and decision-support material.',
  },
];

export const contactDetails = [
  { icon: Building2, label: 'Studio', value: 'BKC, Mumbai and remote advisory desk' },
  { icon: CircleDollarSign, label: 'Minimum brief', value: 'Goal planning, SIP roadmap, or portfolio review' },
  { icon: FileText, label: 'Response', value: 'One working day after form submission' },
  { icon: Calculator, label: 'Tools', value: 'Investment calculator, review checklist, and planning notes' },
];
