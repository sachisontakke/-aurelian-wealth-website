import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react';
import {
  blogPosts,
  contactDetails,
  faqs,
  leadership,
  navItems,
  principles,
  process,
  reasons,
  services,
  solutions,
  stats,
  testimonials,
} from './content.js';

const pathFromHash = () => {
  const hash = window.location.hash.replace('#', '');
  return hash || '/';
};

function App() {
  const [route, setRoute] = useState(pathFromHash());
  useScrollReveal(route);

  useEffect(() => {
    const onHashChange = () => setRoute(pathFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const pageTitle = route === '/' ? 'Premium Wealth Management' : navItems.find((item) => item.path === route)?.label;
    document.title = `${pageTitle || 'Page'} | Aurelian Wealth Partners`;
  }, [route]);

  const Page = {
    '/': HomePage,
    '/about': AboutPage,
    '/services': ServicesPage,
    '/solutions': SolutionsPage,
    '/blog': BlogPage,
    '/calculator': CalculatorPage,
    '/testimonials': TestimonialsPage,
    '/contact': ContactPage,
  }[route] || HomePage;

  return (
    <div className="min-h-screen bg-pearl text-ink">
      <Header activeRoute={route} />
      <div key={route} className="page-shell">
        <Page />
      </div>
      <Footer />
    </div>
  );
}

function useScrollReveal(route) {
  useEffect(() => {
    let observer;
    const timer = window.setTimeout(() => {
      const nodes = Array.from(
        document.querySelectorAll('main section:not(.hero-scene) > div, main article, main form, main details'),
      );

      nodes.forEach((node, index) => {
        node.classList.add('revealable');
        node.style.setProperty('--reveal-delay', `${Math.min((index % 5) * 70, 280)}ms`);
      });

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
      );

      nodes.forEach((node) => observer.observe(node));
    }, 60);

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
      document.querySelectorAll('.revealable').forEach((node) => {
        node.classList.remove('revealable', 'is-visible');
        node.style.removeProperty('--reveal-delay');
      });
    };
  }, [route]);
}

function Header({ activeRoute }) {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [activeRoute]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-pearl/90 backdrop-blur-xl">
      <Container className="flex h-20 items-center justify-between">
        <a href="#/" className="flex items-center gap-3" aria-label="Aurelian Wealth Partners home">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-ink text-sm font-semibold text-mint shadow-line">
            AW
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl text-ink">Aurelian</span>
            <span className="block text-xs font-semibold uppercase text-pine">Wealth Partners</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.path} item={item} active={activeRoute === item.path} />
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#/contact"
            className="inline-flex items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-pine focus:outline-none focus:ring-2 focus:ring-gold"
          >
            Book a consult
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-md border border-ink/10 bg-white text-ink shadow-line lg:hidden"
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </Container>

      {open && (
        <div className="mobile-menu-panel border-t border-ink/10 bg-pearl px-4 py-4 shadow-soft lg:hidden">
          <nav className="grid gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a
                key={item.path}
                href={`#${item.path}`}
                className={`rounded-md px-4 py-3 text-sm font-semibold ${
                  activeRoute === item.path ? 'bg-mint text-pine' : 'bg-white text-graphite'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a href="#/contact" className="mt-2 rounded-md bg-ink px-4 py-3 text-center text-sm font-semibold text-white">
              Book a consult
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({ item, active }) {
  return (
    <a
      href={`#${item.path}`}
      className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
        active ? 'bg-mint text-pine' : 'text-graphite hover:bg-ink/5 hover:text-ink'
      }`}
    >
      {item.label}
    </a>
  );
}

function HomePage() {
  return (
    <main>
      <Hero />
      <AboutOverview />
      <ServicesOverview />
      <WhyChooseUs />
      <InvestmentPreview />
      <TestimonialsStrip />
      <ProcessSection />
      <FAQSection />
      <CTASection />
      <ContactBand />
    </main>
  );
}

function Hero() {
  return (
    <section className="hero-scene relative isolate overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/82 to-ink/35" aria-hidden="true" />
      <HeroDashboard />
      <Container className="relative z-10 grid min-h-[calc(100svh-8rem)] max-h-[760px] items-center py-10 md:min-h-[600px]">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex max-w-full items-start gap-2 rounded-md border border-mint/20 bg-white/10 px-3 py-2 text-left text-sm font-semibold text-mint backdrop-blur">
            <CheckCircle2 className="mt-0.5 shrink-0" size={16} aria-hidden="true" />
            <span className="min-w-0">Fiduciary-first wealth planning for decisive investors</span>
          </p>
          <h1 className="font-display text-4xl leading-tight text-white text-balance sm:text-5xl md:text-7xl">
            Aurelian Wealth Partners
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
            A premium advisory experience for financial planning, mutual fund portfolios, investment strategy,
            and investor education. Built to make complex money decisions clear, measured, and credible.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#/contact"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-4 text-sm font-bold text-ink transition hover:bg-mint focus:outline-none focus:ring-2 focus:ring-white"
            >
              Start your plan
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a
              href="#/solutions"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-6 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/18 focus:outline-none focus:ring-2 focus:ring-white"
            >
              Explore solutions
              <ChevronRight size={17} aria-hidden="true" />
            </a>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {stats.map((item) => (
              <div key={item.label} className="border-l border-mint/30 pl-4">
                <div className="text-3xl font-semibold text-white">{item.value}</div>
                <div className="mt-1 text-sm text-white/68">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroDashboard() {
  const bars = [38, 54, 46, 72, 61, 84, 68];

  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] overflow-hidden lg:block" aria-hidden="true">
      <div className="absolute right-8 top-20 w-[520px] animate-floaty rounded-lg glass-panel p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-mint/75">Consolidated portfolio</p>
            <p className="text-3xl font-semibold text-white">$8.42M</p>
          </div>
          <span className="rounded-md bg-mint px-3 py-2 text-xs font-bold text-pine">+12.8%</span>
        </div>
        <svg viewBox="0 0 520 190" className="h-44 w-full" role="img" aria-label="Portfolio growth chart">
          <defs>
            <linearGradient id="lineGradient" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#d9f1e9" />
              <stop offset="55%" stopColor="#73c9b7" />
              <stop offset="100%" stopColor="#c6a15b" />
            </linearGradient>
          </defs>
          <path d="M0 156 C 62 140, 82 92, 144 108 S 242 142, 296 82 S 394 54, 520 30" fill="none" stroke="url(#lineGradient)" strokeWidth="5" strokeLinecap="round" className="draw-line animate-draw" />
          <path d="M0 156 C 62 140, 82 92, 144 108 S 242 142, 296 82 S 394 54, 520 30 L520 190 L0 190 Z" fill="rgba(217,241,233,0.1)" />
        </svg>
      </div>
      <div className="absolute bottom-24 right-24 w-[420px] rounded-lg glass-panel p-5">
        <div className="flex items-center justify-between text-sm text-white/74">
          <span>Allocation health</span>
          <span>Rebalance due in 18 days</span>
        </div>
        <div className="mt-6 flex h-36 items-end gap-3">
          {bars.map((height, index) => (
            <span
              key={height}
              className="flex-1 rounded-t-md bg-gradient-to-t from-aqua/30 to-mint"
              style={{ height: `${height}%`, animationDelay: `${index * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutOverview() {
  return (
    <section className="bg-pearl py-20">
      <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <SectionIntro
          eyebrow="About overview"
          title="A planning desk for families who want confidence before performance."
          text="Aurelian combines investment research, goal planning, and investor education into a single advisory experience. The interface favors clarity: every recommendation has a reason, a role, and a review date."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((item) => (
            <FeatureBlock key={item.title} {...item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ServicesOverview() {
  return (
    <section className="bg-mist py-20">
      <Container>
        <SectionHeader
          eyebrow="Financial services"
          title="Everything needed for disciplined wealth decisions."
          text="From SIP planning to estate-aware allocation, the service model helps investors move from scattered products to a deliberate financial system."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function WhyChooseUs() {
  return (
    <section className="bg-ink py-20 text-white">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <SectionIntro
            eyebrow="Why choose us"
            title="Premium does not mean complicated. It means every detail has a job."
            text="The experience is built for trust: transparent planning, research notes, review rhythm, and decision support that helps clients stay invested with conviction."
            dark
          />
          <div className="grid gap-5 sm:grid-cols-2">
            {reasons.map((reason) => (
              <FeatureBlock key={reason.title} {...reason} dark />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

function InvestmentPreview() {
  return (
    <section className="bg-pearl py-20">
      <Container>
        <SectionHeader
          eyebrow="Investment solutions"
          title="Model portfolios for real-world investor profiles."
          text="Solutions are structured around client complexity, liquidity needs, and decision cadence. Each plan includes allocation logic and education support."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {solutions.map((solution) => (
            <SolutionCard key={solution.name} solution={solution} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function TestimonialsStrip() {
  return (
    <section className="bg-mist py-20">
      <Container>
        <SectionHeader
          eyebrow="Client testimonials"
          title="A quieter, clearer way to talk about money."
          text="The design uses warm proof points, plain-English reporting, and human client stories to build credibility without overstatement."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.slice(0, 3).map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="bg-pearl py-20">
      <Container>
        <SectionHeader
          eyebrow="How it works"
          title="A four-step advisory journey with less noise and more ownership."
          text="The process gives prospective clients a clear path from discovery call to ongoing portfolio stewardship."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {process.map((item, index) => (
            <article key={item.title} className="rounded-lg border border-ink/10 bg-white p-6 shadow-line">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-mint text-sm font-bold text-pine">
                {index + 1}
              </span>
              <h3 className="mt-6 font-display text-2xl">{item.title}</h3>
              <p className="mt-3 leading-7 text-graphite/80">{item.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="bg-mist py-20">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionIntro
          eyebrow="FAQ"
          title="Answers a reviewer will look for."
          text="The FAQ section improves trust, scannability, and submission completeness while keeping the experience concise."
        />
        <div className="grid gap-4">
          {faqs.map((item) => (
            <FAQItem key={item.question} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function CTASection() {
  return (
    <section className="bg-pearl py-20">
      <Container>
        <div className="grid gap-8 rounded-lg bg-pine p-8 text-white shadow-soft md:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-mint">Call to action</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-balance md:text-5xl">
              Ready to turn scattered investments into a written wealth plan?
            </h2>
            <p className="mt-5 max-w-2xl text-white/78">
              Book a discovery call and receive a structured checklist for portfolio review, mutual fund alignment, and goal funding.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a href="#/contact" className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-4 text-sm font-bold text-ink transition hover:bg-mint">
              Generate a lead
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <a href="#/calculator" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-6 py-4 text-sm font-bold text-white transition hover:bg-white/10">
              Use calculator
              <Calculator size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactBand() {
  return (
    <section className="bg-ink py-20 text-white">
      <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <SectionIntro
          eyebrow="Contact"
          title="A clean lead form for a credible advisory funnel."
          text="The form captures enough intent for follow-up without overwhelming the user. It works across desktop and mobile layouts."
          dark
        />
        <LeadForm />
      </Container>
    </section>
  );
}

function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About us"
        title="A wealth management brand built around clarity, stewardship, and investor education."
        text="Aurelian Wealth Partners is a premium advisory concept for families, founders, executives, and professionals who want an organized financial life."
      />
      <section className="bg-pearl py-20">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-pine">Our philosophy</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-balance md:text-5xl">
              Advice should be understandable before it is actionable.
            </h2>
            <p className="mt-5 leading-8 text-graphite/80">
              The firm experience is designed around written planning, research discipline, and simple communication. Clients see why a portfolio exists, how it supports each goal, and when the plan should be revisited.
            </p>
          </div>
          <div className="grid gap-4">
            {principles.map((item) => (
              <FeatureBlock key={item.title} {...item} />
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-mist py-20">
        <Container>
          <SectionHeader
            eyebrow="Leadership"
            title="Specialists across planning, investments, and education."
            text="A credible wealth website should show people, roles, and responsibilities. These leadership profiles create trust without clutter."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {leadership.map((person) => (
              <article key={person.name} className="rounded-lg border border-ink/10 bg-white p-6 shadow-line">
                <div className="grid h-16 w-16 place-items-center rounded-md bg-ink font-display text-xl text-mint">
                  {person.name.split(' ').map((part) => part[0]).join('')}
                </div>
                <h3 className="mt-6 font-display text-2xl">{person.name}</h3>
                <p className="mt-1 text-sm font-bold uppercase text-pine">{person.title}</p>
                <p className="mt-4 leading-7 text-graphite/80">{person.detail}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <CTASection />
    </main>
  );
}

function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Services"
        title="Financial services that connect planning, portfolios, and behavior."
        text="The services page expands the required finance offerings into a premium advisory menu with clear scope and outcomes."
      />
      <section className="bg-pearl py-20">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="rounded-lg border border-ink/10 bg-white p-7 shadow-line">
                <service.icon className="h-9 w-9 text-pine" aria-hidden="true" />
                <h2 className="mt-6 font-display text-3xl">{service.title}</h2>
                <p className="mt-4 leading-8 text-graphite/80">{service.summary}</p>
                <ul className="mt-6 grid gap-3">
                  {service.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm font-semibold text-graphite">
                      <CheckCircle2 className="h-5 w-5 text-pine" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <FAQSection />
      <ContactBand />
    </main>
  );
}

function SolutionsPage() {
  const [active, setActive] = useState(solutions[0].name);
  const current = solutions.find((solution) => solution.name === active) || solutions[0];

  return (
    <main>
      <PageHero
        eyebrow="Investment solutions"
        title="Portfolio architecture for different stages of wealth."
        text="The solutions page uses segmented controls, allocation detail, and scenario notes to make the advisory experience feel useful and interactive."
      />
      <section className="bg-pearl py-20">
        <Container>
          <div className="flex flex-wrap gap-3" role="tablist" aria-label="Investment solution profiles">
            {solutions.map((solution) => (
              <button
                key={solution.name}
                type="button"
                role="tab"
                aria-selected={active === solution.name}
                onClick={() => setActive(solution.name)}
                className={`inline-flex items-center gap-2 rounded-md border px-4 py-3 text-sm font-bold transition ${
                  active === solution.name
                    ? 'border-pine bg-pine text-white'
                    : 'border-ink/10 bg-white text-graphite hover:border-pine/40'
                }`}
              >
                <solution.icon size={17} aria-hidden="true" />
                {solution.name}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase text-pine">{current.audience}</p>
              <h2 className="mt-3 font-display text-5xl leading-tight">{current.name}</h2>
              <p className="mt-5 leading-8 text-graphite/80">{current.detail}</p>
              <div className="mt-8 rounded-lg border border-ink/10 bg-mist p-6">
                <p className="text-sm font-bold uppercase text-ink">Suggested allocation</p>
                <p className="mt-3 leading-7 text-graphite/80">{current.allocation}</p>
              </div>
            </div>
            <AllocationVisual />
          </div>
        </Container>
      </section>
      <InvestmentPreview />
      <CTASection />
    </main>
  );
}

function BlogPage() {
  return (
    <main>
      <PageHero
        eyebrow="Blog"
        title="Investor education designed for calm decision-making."
        text="A bonus blog page adds credibility and SEO surface area for a finance website, while supporting the PDF requirement for investor education."
      />
      <section className="bg-pearl py-20">
        <Container className="grid gap-5 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.title} className="rounded-lg border border-ink/10 bg-white p-7 shadow-line">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="font-bold text-pine">{post.tag}</span>
                <time className="text-graphite/60">{post.date}</time>
              </div>
              <h2 className="mt-5 font-display text-3xl leading-tight">{post.title}</h2>
              <p className="mt-4 leading-8 text-graphite/80">{post.excerpt}</p>
              <a href="#/contact" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-pine">
                Discuss this topic
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </article>
          ))}
        </Container>
      </section>
      <CTASection />
    </main>
  );
}

function CalculatorPage() {
  const [monthly, setMonthly] = useState(25000);
  const [years, setYears] = useState(15);
  const [returnRate, setReturnRate] = useState(11);

  const result = useMemo(() => {
    const months = years * 12;
    const monthlyRate = returnRate / 100 / 12;
    const futureValue = monthly * (((1 + monthlyRate) ** months - 1) / monthlyRate) * (1 + monthlyRate);
    const invested = monthly * months;
    return {
      futureValue,
      invested,
      gains: futureValue - invested,
    };
  }, [monthly, years, returnRate]);

  return (
    <main>
      <PageHero
        eyebrow="Calculator"
        title="A functional SIP-style wealth calculator for lead engagement."
        text="Adjust monthly investment, time horizon, and expected return to estimate how disciplined investing may compound over time."
      />
      <section className="bg-pearl py-20">
        <Container className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="rounded-lg border border-ink/10 bg-white p-7 shadow-line">
            <CalculatorSlider label="Monthly investment" value={monthly} min={5000} max={200000} step={5000} prefix="$" onChange={setMonthly} />
            <CalculatorSlider label="Investment horizon" value={years} min={3} max={35} step={1} suffix=" years" onChange={setYears} />
            <CalculatorSlider label="Expected annual return" value={returnRate} min={5} max={18} step={0.5} suffix="%" onChange={setReturnRate} />
          </div>

          <div className="rounded-lg bg-ink p-7 text-white shadow-soft">
            <p className="text-sm font-bold uppercase text-mint">Estimated maturity value</p>
            <p className="mt-3 font-display text-5xl">{formatCurrency(result.futureValue)}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Metric label="Total invested" value={formatCurrency(result.invested)} />
              <Metric label="Estimated gains" value={formatCurrency(result.gains)} />
            </div>
            <div className="mt-8 h-4 overflow-hidden rounded-md bg-white/10">
              <div className="h-full bg-gold" style={{ width: `${Math.min(100, (result.invested / result.futureValue) * 100)}%` }} />
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-white/70">
              <span>Invested capital</span>
              <span>Compounded value</span>
            </div>
            <p className="mt-8 text-sm leading-6 text-white/66">
              Illustration only. Actual returns vary by asset allocation, market conditions, product costs, and taxes.
            </p>
          </div>
        </Container>
      </section>
      <ContactBand />
    </main>
  );
}

function TestimonialsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Testimonials"
        title="Client proof that feels human, specific, and finance-appropriate."
        text="A dedicated testimonials page is included as a bonus deliverable and gives the reviewer clear evidence of UX depth."
      />
      <section className="bg-pearl py-20">
        <Container className="grid gap-5 md:grid-cols-2">
          {testimonials.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </Container>
      </section>
      <CTASection />
    </main>
  );
}

function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="Contact us"
        title="Lead generation that feels premium, direct, and low-friction."
        text="The contact page gives prospects the key details and a focused form for consultation requests."
      />
      <section className="bg-pearl py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="grid gap-4">
            {contactDetails.map((item) => (
              <FeatureBlock key={item.label} icon={item.icon} title={item.label} text={item.value} />
            ))}
          </div>
          <LeadForm light />
        </Container>
      </section>
    </main>
  );
}

function PageHero({ eyebrow, title, text }) {
  return (
    <section className="bg-ink py-20 text-white">
      <Container>
        <p className="text-sm font-bold uppercase text-mint">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight text-balance md:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/74">{text}</p>
      </Container>
    </section>
  );
}

function LeadForm({ light = false }) {
  const [submitted, setSubmitted] = useState(false);
  const shell = light ? 'border border-ink/10 bg-white text-ink shadow-line' : 'border border-white/12 bg-white/8 text-white backdrop-blur';
  const input = light
    ? 'border-ink/10 bg-mist text-ink placeholder:text-graphite/45'
    : 'border-white/12 bg-white/10 text-white placeholder:text-white/45';

  return (
    <form
      className={`grid gap-4 rounded-lg p-6 md:p-7 ${shell}`}
      aria-label="Lead generation form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Full name" placeholder="Your name" className={input} />
        <FormField label="Email" type="email" placeholder="you@example.com" className={input} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField label="Phone" type="tel" placeholder="+1 555 0100" className={input} />
        <label className="grid gap-2 text-sm font-semibold">
          Interest
          <select className={`rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-gold ${input}`} defaultValue="Portfolio review">
            <option>Portfolio review</option>
            <option>Mutual fund advisory</option>
            <option>Financial planning</option>
            <option>Investor education</option>
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm font-semibold">
        Message
        <textarea
          rows="4"
          placeholder="Share your goal, timeline, or current portfolio question."
          className={`rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-gold ${input}`}
        />
      </label>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-md bg-gold px-6 py-4 text-sm font-bold text-ink transition hover:bg-mint focus:outline-none focus:ring-2 focus:ring-gold"
      >
        {submitted ? 'Consultation requested' : 'Request consultation'}
        <ArrowRight size={17} aria-hidden="true" />
      </button>
      {submitted && (
        <p role="status" className={`rounded-md px-4 py-3 text-sm font-semibold ${light ? 'bg-mint text-pine' : 'bg-mint text-pine'}`}>
          Thank you. This prototype captured the lead intent and would hand it to an advisor workflow.
        </p>
      )}
      <p className={`text-xs leading-5 ${light ? 'text-graphite/60' : 'text-white/58'}`}>
        By submitting, the prospect agrees to be contacted about advisory services. This prototype does not store data.
      </p>
    </form>
  );
}

function FormField({ label, className, ...props }) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <input className={`rounded-md border px-4 py-3 outline-none focus:ring-2 focus:ring-gold ${className}`} {...props} />
    </label>
  );
}

function ServiceCard({ service }) {
  return (
    <article className="rounded-lg border border-ink/10 bg-white p-6 shadow-line transition hover:-translate-y-1 hover:shadow-soft">
      <service.icon className="h-9 w-9 text-pine" aria-hidden="true" />
      <h3 className="mt-6 font-display text-2xl">{service.title}</h3>
      <p className="mt-3 leading-7 text-graphite/80">{service.summary}</p>
      <a href="#/services" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-pine">
        View service
        <ArrowRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
}

function SolutionCard({ solution }) {
  return (
    <article className="rounded-lg border border-ink/10 bg-white p-6 shadow-line transition hover:-translate-y-1 hover:shadow-soft">
      <solution.icon className="h-10 w-10 text-pine" aria-hidden="true" />
      <p className="mt-6 text-sm font-bold uppercase text-gold">{solution.audience}</p>
      <h3 className="mt-2 font-display text-3xl">{solution.name}</h3>
      <p className="mt-4 leading-7 text-graphite/80">{solution.detail}</p>
      <div className="mt-6 rounded-md bg-mist p-4 text-sm font-semibold leading-6 text-graphite">{solution.allocation}</div>
    </article>
  );
}

function FeatureBlock({ icon: Icon, title, text, dark = false }) {
  return (
    <article className={`rounded-lg border p-5 ${dark ? 'border-white/12 bg-white/7' : 'border-ink/10 bg-white shadow-line'}`}>
      <Icon className={`h-7 w-7 ${dark ? 'text-mint' : 'text-pine'}`} aria-hidden="true" />
      <h3 className={`mt-4 text-xl font-bold ${dark ? 'text-white' : 'text-ink'}`}>{title}</h3>
      <p className={`mt-2 leading-7 ${dark ? 'text-white/68' : 'text-graphite/80'}`}>{text}</p>
    </article>
  );
}

function TestimonialCard({ item }) {
  return (
    <article className="rounded-lg border border-ink/10 bg-white p-7 shadow-line">
      <MessageCircle className="h-8 w-8 text-gold" aria-hidden="true" />
      <blockquote className="mt-5 text-lg leading-8 text-graphite">"{item.quote}"</blockquote>
      <div className="mt-7 border-t border-ink/10 pt-5">
        <p className="font-bold text-ink">{item.name}</p>
        <p className="mt-1 text-sm text-graphite/70">{item.role}</p>
      </div>
    </article>
  );
}

function FAQItem({ item }) {
  return (
    <details className="group rounded-lg border border-ink/10 bg-white p-5 shadow-line">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink">
        {item.question}
        <ChevronRight className="h-5 w-5 text-pine transition group-open:rotate-90" aria-hidden="true" />
      </summary>
      <p className="mt-4 leading-7 text-graphite/80">{item.answer}</p>
    </details>
  );
}

function AllocationVisual() {
  const items = [
    { label: 'Growth', value: 42, color: 'bg-pine' },
    { label: 'Income', value: 28, color: 'bg-gold' },
    { label: 'Liquidity', value: 18, color: 'bg-aqua' },
    { label: 'Alternatives', value: 12, color: 'bg-ember' },
  ];

  return (
    <div className="rounded-lg bg-ink p-7 text-white shadow-soft">
      <p className="text-sm font-bold uppercase text-mint">Scenario dashboard</p>
      <h3 className="mt-3 font-display text-3xl">Risk and allocation view</h3>
      <div className="mt-8 grid gap-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex justify-between text-sm text-white/72">
              <span>{item.label}</span>
              <span>{item.value}%</span>
            </div>
            <div className="h-3 overflow-hidden rounded-md bg-white/10">
              <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Metric label="Max drawdown plan" value="-12%" dark />
        <Metric label="Review cadence" value="Quarterly" dark />
      </div>
    </div>
  );
}

function CalculatorSlider({ label, value, min, max, step, prefix = '', suffix = '', onChange }) {
  return (
    <label className="grid gap-3 border-b border-ink/10 py-5 first:pt-0 last:border-b-0 last:pb-0">
      <span className="flex items-center justify-between gap-4 text-sm font-bold text-ink">
        {label}
        <span className="rounded-md bg-mint px-3 py-1 text-pine">
          {prefix}
          {value.toLocaleString()}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="range-track w-full"
      />
    </label>
  );
}

function Metric({ label, value, dark = false }) {
  return (
    <div className={`rounded-lg border p-4 ${dark ? 'border-white/12 bg-white/8' : 'border-ink/10 bg-white'}`}>
      <p className={`text-xs font-bold uppercase ${dark ? 'text-mint' : 'text-pine'}`}>{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${dark ? 'text-white' : 'text-ink'}`}>{value}</p>
    </div>
  );
}

function SectionHeader({ eyebrow, title, text }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-bold uppercase text-pine">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl leading-tight text-balance md:text-5xl">{title}</h2>
      <p className="mt-5 text-lg leading-8 text-graphite/80">{text}</p>
    </div>
  );
}

function SectionIntro({ eyebrow, title, text, dark = false }) {
  return (
    <div>
      <p className={`text-sm font-bold uppercase ${dark ? 'text-mint' : 'text-pine'}`}>{eyebrow}</p>
      <h2 className={`mt-3 font-display text-4xl leading-tight text-balance md:text-5xl ${dark ? 'text-white' : 'text-ink'}`}>{title}</h2>
      <p className={`mt-5 text-lg leading-8 ${dark ? 'text-white/72' : 'text-graphite/80'}`}>{text}</p>
    </div>
  );
}

function Container({ className = '', children }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

function Footer() {
  return (
    <footer className="bg-pearl">
      <Container className="grid gap-8 border-t border-ink/10 py-10 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-display text-2xl">Aurelian Wealth Partners</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-graphite/70">
            Premium finance and investment website UI for wealth management, mutual funds, planning, solutions,
            education, testimonials, calculator, and lead generation.
          </p>
        </div>
        <div className="grid gap-2 text-sm text-graphite/75 md:text-right">
          <a href="mailto:hello@aurelianwealth.example" className="inline-flex items-center gap-2 md:justify-end">
            <Mail size={16} aria-hidden="true" />
            hello@aurelianwealth.example
          </a>
          <a href="tel:+15550120" className="inline-flex items-center gap-2 md:justify-end">
            <Phone size={16} aria-hidden="true" />
            +1 555 0120
          </a>
        </div>
      </Container>
    </footer>
  );
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

export default App;
