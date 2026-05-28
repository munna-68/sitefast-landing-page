import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Github,
  Globe2,
  Mail,
  Play,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = ['Home', 'How It Works', 'Pricing', 'Work', 'Contact'];

const projects = [
  {
    title: 'Local Cafe Refresh',
    description: 'A warm, fast site for a neighborhood cafe with menus, hours, and mobile-first directions.',
    fullDescription:
      'A compact business site built to help regulars check hours quickly and help new customers find the cafe from local search.',
    videoSrc: null,
    githubUrl: null,
    liveUrl: null,
  },
  {
    title: 'Contractor Quote Site',
    description: 'A lead-focused website for a home services company with clear service pages and calls to action.',
    fullDescription:
      'A hand-coded site structured around service areas, trust signals, and a simple request flow for homeowners.',
    videoSrc: null,
    githubUrl: null,
    liveUrl: null,
  },
  {
    title: 'Salon Booking Launch',
    description: 'A polished salon site designed around services, pricing, photos, and booking links.',
    fullDescription:
      'A clean launch site for a service business that needed credibility, fast mobile performance, and easy updates.',
    videoSrc: null,
    githubUrl: null,
    liveUrl: null,
  },
  {
    title: 'Fitness Coach Brand',
    description: 'A bold personal brand site with programs, testimonials, and a direct inquiry path.',
    fullDescription:
      'A conversion-minded site for a solo operator who needed a memorable first impression and low-friction leads.',
    videoSrc: null,
    githubUrl: null,
    liveUrl: null,
  },
  {
    title: 'Dental Office Starter',
    description: 'A calm, trustworthy local site for services, insurance details, and patient contact.',
    fullDescription:
      'A practical healthcare-adjacent marketing site with accessible content structure and local SEO basics.',
    videoSrc: null,
    githubUrl: null,
    liveUrl: null,
  },
  {
    title: 'Boutique Retail Site',
    description: 'A sharp storefront presence with product highlights, location details, and social proof.',
    fullDescription:
      'A visual business site for a retail shop that needed better local discovery without maintaining a large catalog.',
    videoSrc: null,
    githubUrl: null,
    liveUrl: null,
  },
];

const processSteps = [
  {
    title: 'Requirements',
    text: "Understand the client's business, goals, and what they need from their website",
  },
  {
    title: 'Design',
    text: 'Build the full design in Figma, present it to the client, and iterate until they approve',
  },
  {
    title: 'Development',
    text: 'Convert the approved Figma design into clean, hand-coded React/Next.js',
  },
  {
    title: 'Optimization',
    text: 'Performance tuning, SEO setup, accessibility checks, mobile responsiveness, and code cleanup before launch',
  },
  {
    title: 'Handoff & Maintenance',
    text: 'Site goes live, client gets their domain, ongoing $30/month support begins',
  },
];

const customStyles = `
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #4b4b3f; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #6f6f5e; }
`;

const FadeIn = ({ children, delay = 0, y = 24, className = '' }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const RevealLine = ({ children, delay = 0, className = '' }) => (
  <span className="block overflow-hidden pb-2 -mb-2">
    <motion.span
      className={`block ${className}`}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.span>
  </span>
);

const SectionShell = ({ children, className = '' }) => (
  <section className={`min-h-full h-full px-4 sm:px-6 lg:px-10 pt-24 pb-28 overflow-y-auto ${className}`}>
    <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col justify-center">{children}</div>
  </section>
);

const VideoPlaceholder = ({ src, large = false }) => (
  <div
    className={`relative aspect-video w-full overflow-hidden rounded-lg border border-[#e5e0c8]/15 bg-[#15150f] ${
      large ? 'shadow-2xl shadow-black/35' : ''
    }`}
  >
    {src ? (
      <video src={src} className="h-full w-full object-cover" controls />
    ) : (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,rgba(218,255,103,0.12),rgba(255,119,85,0.08)),radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.09),transparent_30%)]">
        <div className="grid h-12 w-12 place-items-center rounded-full border border-[#e5e0c8]/20 bg-black/30">
          <Play className="h-5 w-5 fill-[#e5e0c8] text-[#e5e0c8]" />
        </div>
        <span className="text-xs uppercase tracking-[0.22em] text-[#e5e0c8]/55">Video coming soon</span>
      </div>
    )}
  </div>
);

const LinkButton = ({ href, children, variant = 'solid', icon: Icon }) => {
  const disabled = !href;
  const classes =
    variant === 'solid'
      ? 'bg-[#e8ff69] text-[#15150f] hover:bg-[#f1ff98]'
      : 'border border-[#e5e0c8]/20 text-[#f6f1dc] hover:border-[#e8ff69]/60 hover:text-[#e8ff69]';

  if (disabled) {
    return (
      <button
        disabled
        className="inline-flex items-center justify-center gap-2 rounded-full border border-[#e5e0c8]/10 px-4 py-2 text-sm font-semibold text-[#e5e0c8]/35"
      >
        {Icon && <Icon className="h-4 w-4" />}
        {children}
      </button>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${classes}`}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </a>
  );
};

const HomeSection = ({ onCta }) => (
  <SectionShell>
    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#e8ff69]/30 bg-[#e8ff69]/10 px-4 py-2 text-sm font-semibold text-[#e8ff69]">
          <Sparkles className="h-4 w-4" /> SiteKeep
        </p>
        <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-normal text-[#f6f1dc] sm:text-6xl lg:text-8xl">
          <RevealLine>We Build Your</RevealLine>
          <RevealLine delay={0.08} className="text-[#e8ff69]">
            Website. For Free.
          </RevealLine>
        </h1>
        <FadeIn delay={0.18}>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#d8d1b2] sm:text-xl">
            Seriously. No setup fee, no hidden costs. Just $30/month to keep it running, secure, and updated — forever.
          </p>
        </FadeIn>
        <FadeIn delay={0.28}>
          <button
            onClick={onCta}
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#ff785a] px-6 py-3 text-base font-bold text-[#15150f] shadow-xl shadow-[#ff785a]/20 transition hover:bg-[#ff9279]"
          >
            Get My Free Website <ArrowRight className="h-5 w-5" />
          </button>
        </FadeIn>
      </div>
      <FadeIn delay={0.25} className="hidden lg:block">
        <div className="relative rounded-lg border border-[#e5e0c8]/15 bg-[#f6f1dc] p-4 text-[#15150f] shadow-2xl shadow-black/40">
          <div className="mb-4 flex items-center justify-between border-b border-[#15150f]/10 pb-3">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff785a]" />
              <span className="h-3 w-3 rounded-full bg-[#e8ff69]" />
              <span className="h-3 w-3 rounded-full bg-[#6edbd2]" />
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#15150f]/50">Live care</span>
          </div>
          <div className="grid gap-3">
            {['Free custom build', '$30 monthly care', 'Updates by text', 'No contract'].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-lg bg-[#15150f] p-4 text-[#f6f1dc]">
                <span className="font-semibold">{item}</span>
                <Check className="h-5 w-5 text-[#e8ff69]" />
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </div>
  </SectionShell>
);

const HowItWorksSection = () => {
  const steps = [
    ['You reach out', 'Tell us about your business. Takes 5 minutes.'],
    ['We build your site', 'Custom, hand-coded, ready in 1–2 weeks. Free.'],
    ['We keep it running', '$30/month. Cancel anytime.'],
  ];

  return (
    <SectionShell>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <h2 className="text-4xl font-black leading-none text-[#f6f1dc] sm:text-6xl">
            <RevealLine>Three Steps.</RevealLine>
            <RevealLine delay={0.08} className="text-[#e8ff69]">
              Zero Stress.
            </RevealLine>
          </h2>
          <FadeIn delay={0.18}>
            <div className="mt-8 rounded-lg border border-[#e8ff69]/25 bg-[#e8ff69]/10 p-6">
              <h3 className="text-2xl font-black text-[#f6f1dc]">Why Would We Build It For Free?</h3>
              <p className="mt-4 leading-7 text-[#d8d1b2]">
                Honest answer: we don't make money upfront. We build your site at no charge and only start earning after
                you've been with us for about two years. That means we're motivated to build something you actually love
                and keep you around — not take your money and disappear. No contract. No gotcha. Just a handshake deal
                that works for both of us.
              </p>
            </div>
          </FadeIn>
        </div>
        <div className="grid gap-4">
          {steps.map(([title, text], index) => (
            <FadeIn key={title} delay={index * 0.1}>
              <div className="grid gap-4 rounded-lg border border-[#e5e0c8]/15 bg-[#f6f1dc]/[0.04] p-5 sm:grid-cols-[4rem_1fr]">
                <span className="grid h-14 w-14 place-items-center rounded-lg bg-[#ff785a] text-xl font-black text-[#15150f]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-2xl font-black text-[#f6f1dc]">{title}</h3>
                  <p className="mt-2 text-[#d8d1b2]">{text}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </SectionShell>
  );
};

const PricingSection = () => {
  const features = [
    ['Security & Hosting', 'Your site stays online, protected, and never goes down', ShieldCheck],
    ['Monthly Updates', 'Need to change your hours, menu, or prices? Done.', SlidersHorizontal],
    ['Google Analytics', "See who's visiting and where they're coming from", Search],
    ['SEO Optimization', 'Built to show up when people search for you locally', ArrowUpRight],
    ['Custom Hand-Coded Site', 'Not a Wix template. A real website built for your business', Sparkles],
    ['Ongoing Support', "You have a question, you text us. That's it.", Mail],
  ];

  const rows = [
    ['Setup Cost', '$0', '$0', '$2,000–$10,000'],
    ['Monthly Cost', '$30', '$16–$45', '$100–$500'],
    ['Custom Built', 'Yes', 'No', 'Yes'],
    ['Ongoing Support', 'Yes', 'No', 'Rarely'],
    ['You Own the Domain', 'Yes', 'Yes', 'Sometimes'],
    ['SEO Optimized', 'Yes', 'Basic', 'Yes'],
  ];

  return (
    <SectionShell>
      <div className="grid gap-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <h2 className="max-w-3xl text-4xl font-black leading-none text-[#f6f1dc] sm:text-6xl">
            Your $30/Month Keeps Everything Running
          </h2>
          <span className="w-max rounded-full bg-[#e8ff69] px-4 py-2 text-sm font-black text-[#15150f]">$0 setup</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {features.map(([title, text, Icon], index) => (
            <FadeIn key={title} delay={index * 0.04}>
              <div className="h-full rounded-lg border border-[#e5e0c8]/15 bg-[#f6f1dc]/[0.04] p-4">
                <Icon className="mb-4 h-6 w-6 text-[#e8ff69]" />
                <h3 className="text-lg font-black text-[#f6f1dc]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#d8d1b2]">{text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.16}>
          <div className="overflow-x-auto rounded-lg border border-[#e5e0c8]/15">
            <div className="min-w-[680px]">
            <div className="grid grid-cols-4 bg-[#f6f1dc]/[0.06] text-sm font-black text-[#f6f1dc]">
              <span className="p-3"> </span>
              <span className="bg-[#e8ff69] p-3 text-[#15150f]">SiteKeep</span>
              <span className="p-3">Wix/Squarespace</span>
              <span className="p-3">Agency</span>
            </div>
            {rows.map((row) => (
              <div key={row[0]} className="grid grid-cols-4 border-t border-[#e5e0c8]/10 text-sm text-[#d8d1b2]">
                <span className="p-3 font-semibold text-[#f6f1dc]">{row[0]}</span>
                <span className="bg-[#e8ff69]/15 p-3 font-black text-[#e8ff69]">{row[1]}</span>
                <span className="p-3">{row[2]}</span>
                <span className="p-3">{row[3]}</span>
              </div>
            ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={0.22}>
          <div className="rounded-lg border border-[#ff785a]/25 bg-[#ff785a]/10 p-5">
            <h3 className="text-2xl font-black text-[#f6f1dc]">"This Sounds Too Good. What's the Catch?"</h3>
            <p className="mt-3 leading-7 text-[#d8d1b2]">
              Fair question. Here's the truth: we make our money over time, not upfront. We break even around the
              two-year mark, then it becomes worth it for us. That model only works if you're happy enough to stay — so
              we have every reason to do great work and keep you satisfied. No contracts. No pressure. If you ever want
              to leave, we'll hand you everything — your domain, your files, all of it.
            </p>
          </div>
        </FadeIn>
      </div>
    </SectionShell>
  );
};

const WorkSection = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedProject, setSelectedProject] = useState(null);
  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <SectionShell>
      <div className="grid gap-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-4xl font-black leading-none text-[#f6f1dc] sm:text-6xl">Built for Businesses Like Yours</h2>
            <p className="mt-4 max-w-2xl text-[#d8d1b2]">
              Every site is hand-coded from scratch. No templates, no page builders.
            </p>
          </div>
          {visibleCount < projects.length && (
            <button
              onClick={() => setVisibleCount((count) => Math.min(count + 3, projects.length))}
              className="inline-flex w-max items-center gap-2 rounded-full border border-[#e5e0c8]/20 px-4 py-2 font-semibold text-[#f6f1dc] transition hover:border-[#e8ff69]/60 hover:text-[#e8ff69]"
            >
              Show More <ChevronDown className="h-4 w-4" />
            </button>
          )}
        </div>
        <motion.div layout className="grid gap-4 md:grid-cols-3">
          <AnimatePresence initial={false}>
            {visibleProjects.map((project, index) => (
              <motion.article
                layout
                key={project.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 18 }}
                transition={{ duration: 0.35, delay: index >= 3 ? (index - 3) * 0.05 : 0 }}
                className="rounded-lg border border-[#e5e0c8]/15 bg-[#f6f1dc]/[0.04] p-3"
              >
                <VideoPlaceholder src={project.videoSrc} />
                <div className="mt-4">
                  <h3 className="text-xl font-black text-[#f6f1dc]">{project.title}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-[#d8d1b2]">{project.description}</p>
                </div>
                <div className="mt-4 flex items-center justify-between gap-2">
                  <div className="flex gap-2">
                    <LinkButton href={project.githubUrl} variant="outline" icon={Github}>
                      <span className="sr-only">GitHub</span>
                    </LinkButton>
                    <LinkButton href={project.liveUrl} variant="outline" icon={Globe2}>
                      <span className="sr-only">Live Site</span>
                    </LinkButton>
                  </div>
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="rounded-full bg-[#f6f1dc] px-4 py-2 text-sm font-black text-[#15150f] transition hover:bg-white"
                  >
                    Details
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </SectionShell>
  );
};

const ProjectModal = ({ project, onClose }) => (
  <AnimatePresence>
    {project && (
      <motion.div
        className="fixed inset-0 z-[90] grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          onClick={(event) => event.stopPropagation()}
          onWheel={(event) => event.stopPropagation()}
          onTouchStart={(event) => event.stopPropagation()}
          onTouchEnd={(event) => event.stopPropagation()}
          className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-lg border border-[#e5e0c8]/20 bg-[#191912] p-4 text-[#f6f1dc] shadow-2xl"
        >
          <div className="mb-4 flex justify-end">
            <button
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-full border border-[#e5e0c8]/15 text-[#f6f1dc] transition hover:border-[#ff785a]/70 hover:text-[#ff785a]"
              aria-label="Close project details"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <VideoPlaceholder src={project.videoSrc} large />
          <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h3 className="text-3xl font-black">{project.title}</h3>
              <p className="mt-3 leading-7 text-[#d8d1b2]">{project.fullDescription || project.description}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <LinkButton href={project.githubUrl} icon={Github}>
                  GitHub
                </LinkButton>
                <LinkButton href={project.liveUrl} variant="outline" icon={Globe2}>
                  Live Site
                </LinkButton>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-xl font-black">My Process</h4>
              <div className="grid gap-3">
                {processSteps.map((step, index) => (
                  <div key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#e8ff69] text-sm font-black text-[#15150f]">
                      {index + 1}
                    </span>
                    <div className="border-b border-[#e5e0c8]/10 pb-3">
                      <h5 className="font-black">{step.title}</h5>
                      <p className="mt-1 text-sm leading-6 text-[#d8d1b2]">{step.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ContactSection = () => (
  <SectionShell>
    <div className="mx-auto w-full max-w-4xl">
      <h2 className="text-4xl font-black leading-none text-[#f6f1dc] sm:text-6xl lg:text-7xl">
        Ready for Your Free Website?
      </h2>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-[#d8d1b2]">
        Tell us a little about your business and we'll take it from there. No commitment, no credit card.
      </p>
      <form
        className="mt-8 grid gap-4 rounded-lg border border-[#e5e0c8]/15 bg-[#f6f1dc]/[0.04] p-4 sm:grid-cols-2"
        onSubmit={(event) => event.preventDefault()}
      >
        {['Your Name', 'Business Name', 'Business Type', 'Phone or Email'].map((label) => (
          <label key={label} className="grid gap-2 text-sm font-bold text-[#f6f1dc]">
            {label}
            <input
              className="rounded-lg border border-[#e5e0c8]/15 bg-[#0f0f0b] px-4 py-3 text-base text-[#f6f1dc] outline-none transition placeholder:text-[#e5e0c8]/30 focus:border-[#e8ff69]/70"
              placeholder={label}
            />
          </label>
        ))}
        <button className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-[#ff785a] px-6 py-3 font-black text-[#15150f] transition hover:bg-[#ff9279] sm:col-span-2">
          Let's Build It → <ArrowRight className="h-5 w-5" />
        </button>
      </form>
    </div>
  </SectionShell>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const cooldownRef = useRef(false);
  const touchStartYRef = useRef(null);

  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = customStyles;
    document.head.appendChild(styleEl);
    return () => document.head.removeChild(styleEl);
  }, []);

  const moveToTab = (tab) => {
    if (!tabs.includes(tab)) return;
    setActiveTab(tab);
  };

  const moveByDirection = (direction) => {
    if (cooldownRef.current) return;
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex = Math.min(Math.max(currentIndex + direction, 0), tabs.length - 1);
    if (nextIndex === currentIndex) return;

    cooldownRef.current = true;
    setActiveTab(tabs[nextIndex]);
    window.setTimeout(() => {
      cooldownRef.current = false;
    }, 800);
  };

  const handleWheel = (event) => {
    if (Math.abs(event.deltaY) < 24) return;
    moveByDirection(event.deltaY > 0 ? 1 : -1);
  };

  const handleTouchStart = (event) => {
    touchStartYRef.current = event.touches[0].clientY;
  };

  const handleTouchEnd = (event) => {
    if (touchStartYRef.current === null) return;
    const deltaY = touchStartYRef.current - event.changedTouches[0].clientY;
    touchStartYRef.current = null;
    if (Math.abs(deltaY) < 44) return;
    moveByDirection(deltaY > 0 ? 1 : -1);
  };

  const getTabColor = (tab) => {
    switch (tab) {
      case 'Home':
        return '#10100b';
      case 'How It Works':
        return '#17130e';
      case 'Pricing':
        return '#11130e';
      case 'Work':
        return '#121114';
      case 'Contact':
        return '#15100f';
      default:
        return '#10100b';
    }
  };

  const renderContent = (tabName) => {
    switch (tabName) {
      case 'Home':
        return <HomeSection onCta={() => moveToTab('Contact')} />;
      case 'How It Works':
        return <HowItWorksSection />;
      case 'Pricing':
        return <PricingSection />;
      case 'Work':
        return <WorkSection />;
      case 'Contact':
        return <ContactSection />;
      default:
        return <HomeSection onCta={() => moveToTab('Contact')} />;
    }
  };

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-black text-[#f6f1dc] selection:bg-[#e8ff69] selection:text-[#15150f]"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence initial={false}>
        <motion.main
          key={activeTab}
          initial={{ y: '100%', zIndex: 20, boxShadow: '0 -40px 80px rgba(0,0,0,0.8)' }}
          animate={{ y: 0, zIndex: 20, boxShadow: '0 0px 0px rgba(0,0,0,0)', scale: 1, opacity: 1 }}
          exit={{ y: 0, scale: 0.94, opacity: 0.6, zIndex: 10, filter: 'blur(2px)' }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 h-full w-full overflow-hidden"
          style={{ backgroundColor: getTabColor(activeTab) }}
        >
          <header className="absolute left-0 top-0 z-50 flex w-full items-center justify-between px-4 py-5 sm:px-6 lg:px-10">
            <button onClick={() => moveToTab('Home')} className="text-xl font-black tracking-normal text-[#f6f1dc]">
              Site<span className="text-[#e8ff69]">Keep</span>
            </button>
            <span className="hidden text-sm font-semibold text-[#d8d1b2] sm:inline-flex">
              Free build. $30/month care.
            </span>
          </header>
          <div className="h-full">{renderContent(activeTab)}</div>
        </motion.main>
      </AnimatePresence>
      <div className="fixed bottom-5 left-0 z-50 flex w-full justify-center px-3 pointer-events-none sm:bottom-8">
        <nav className="pointer-events-auto relative flex max-w-full items-center overflow-x-auto rounded-full border border-white/10 bg-[#1a1a1c]/90 p-1.5 shadow-2xl backdrop-blur-xl">
          {tabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => moveToTab(tab)}
                className={`
                  relative z-10 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 sm:px-6
                  ${isActive ? 'text-black' : 'text-zinc-400 hover:text-zinc-200'}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 -z-10 rounded-full bg-white"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
