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
  ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #71717a; }
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
  <section
    data-section-scroll
    className={`min-h-full h-full px-4 sm:px-6 lg:px-10 pt-24 pb-28 overflow-y-auto ${className}`}
  >
    <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col justify-center">{children}</div>
  </section>
);

const VideoPlaceholder = ({ src, large = false }) => (
  <div
    className={`relative aspect-video w-full overflow-hidden rounded-md border border-white/15 bg-zinc-950 ${
      large ? 'shadow-2xl shadow-black/40' : ''
    }`}
  >
    {src ? (
      <video src={src} className="h-full w-full object-cover" controls />
    ) : (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
        <div className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/40">
          <Play className="h-5 w-5 fill-white text-white" />
        </div>
        <span className="text-xs uppercase tracking-[0.22em] text-zinc-500">Video coming soon</span>
      </div>
    )}
  </div>
);

const LinkButton = ({ href, children, variant = 'solid', icon: Icon }) => {
  const disabled = !href;
  const classes =
    variant === 'solid'
      ? 'bg-white text-black hover:bg-zinc-200'
      : 'border border-white/20 text-white hover:border-white/60 hover:bg-white/5';

  if (disabled) {
    return (
      <button
        disabled
        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-zinc-600"
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
    <div className="relative grid items-center gap-6 lg:grid-cols-12 lg:gap-6">
      <div className="absolute inset-0 monolith-gradient pointer-events-none" />
      <div className="relative z-10 lg:col-span-7 flex flex-col justify-center space-y-12 mb-20 lg:mb-0">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-outline-subtle/20 bg-surface-low px-4 py-1.5">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-label text-xs font-medium uppercase tracking-[0.05em] text-on-surface-dim">SiteKeep</span>
        </div>
        <h1 className="max-w-5xl font-headline text-[32px] font-bold leading-[38px] tracking-[-0.02em] text-primary md:text-[88px] md:leading-[92px] md:tracking-[-0.04em] md:font-extrabold">
          <RevealLine>We Build</RevealLine>
          <RevealLine delay={0.08}>Your Website.</RevealLine>
          <RevealLine delay={0.16}>For Free.</RevealLine>
        </h1>
        <FadeIn delay={0.18}>
          <p className="max-w-xl font-body text-[18px] leading-[28px] text-on-surface-dim">
            Seriously. No setup fee, no hidden costs. Just $30/month to keep it running, secure, and updated — forever.
          </p>
        </FadeIn>
        <FadeIn delay={0.28}>
          <button
            onClick={onCta}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-10 py-5 font-headline text-[24px] leading-[32px] tracking-[-0.01em] font-semibold text-surface transition-colors hover:bg-on-surface"
          >
            Get My Free Website <ArrowRight className="h-5 w-5" />
          </button>
        </FadeIn>
        <FadeIn delay={0.34}>
          <dl className="mt-10 grid max-w-2xl grid-cols-3 border-y border-outline-subtle/10 py-5 font-label text-xs font-medium uppercase tracking-[0.05em]">
            {[
              ['Setup', '$0'],
              ['Care plan', '$30/mo'],
              ['Contract', 'None'],
            ].map(([label, value]) => (
              <div key={label} className="border-r border-outline-subtle/10 px-4 first:pl-0 last:border-r-0">
                <dt className="text-on-surface-dim">{label}</dt>
                <dd className="mt-1 font-headline text-base font-extrabold normal-case tracking-normal text-primary">{value}</dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
      <FadeIn delay={0.25} className="hidden lg:block lg:col-span-5">
        <div className="w-full rounded-lg border border-outline-subtle/10 bg-surface-low p-8 md:p-12">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="max-w-xs font-headline text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-primary">A quieter way to buy a business website.</h2>
            <span className="hidden font-label text-xs font-medium uppercase tracking-[0.05em] text-on-surface-dim opacity-50 sm:block">Operating model</span>
          </div>
          <div className="space-y-0">
            {['Free custom build', '$30 monthly care', 'Updates by text', 'No contract'].map((item) => (
              <div key={item} className="group flex items-center justify-between border-b border-outline-subtle/10 py-6 last:border-b-0">
                <span className="font-body text-[18px] leading-[28px] text-on-surface transition-colors group-hover:text-primary">{item}</span>
                <Check className="h-5 w-5 text-primary" />
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-lg border border-outline-subtle/5 bg-surface-mid p-6">
            <p className="font-body text-[16px] leading-[24px] italic text-on-surface-dim">
              Built for small teams that want a real website without a big invoice, a platform maze, or a handoff that
              leaves them alone when something breaks.
            </p>
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
  const details = ['Mobile-first layout', 'Local SEO basics', 'Fast hosting setup', 'Simple update requests'];

  return (
    <SectionShell>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6 items-start">
        <div className="lg:col-span-6 space-y-12">
          <h1 className="font-headline text-[32px] font-bold leading-[38px] tracking-[-0.02em] text-primary md:text-[88px] md:leading-[92px] md:tracking-[-0.04em] md:font-extrabold max-w-xl">
            <RevealLine>Three Steps.</RevealLine>
            <RevealLine delay={0.08}>Zero Stress.</RevealLine>
          </h1>
          <FadeIn delay={0.18}>
            <div className="space-y-6 border border-outline-subtle/10 bg-surface-low/50 p-12 backdrop-blur-sm">
              <h3 className="font-headline text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-primary">Why Would We Build It For Free?</h3>
              <p className="font-body text-[16px] leading-[24px] text-on-surface-dim opacity-90">
                Honest answer: we don't make money upfront. We build your site at no charge and only start earning after
                you've been with us for about two years. That means we're motivated to build something you actually love
                and keep you around — not take your money and disappear. No contract. No gotcha. Just a handshake deal
                that works for both of us.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.24}>
            <div className="grid grid-cols-1 md:grid-cols-2 border border-outline-subtle/10 overflow-hidden">
              {details.map((item, index) => {
                const isTopRow = index < 2;
                const isLeftCol = index % 2 === 0;
                return (
                  <div
                    key={item}
                    className={`p-6 flex items-center gap-4 border-outline-subtle/10 ${
                      isTopRow ? 'border-b md:border-b-0' : ''
                    } ${isLeftCol ? 'md:border-r' : ''}`}
                  >
                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-label text-xs font-medium uppercase tracking-wider text-on-surface-dim">{item}</span>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
        <div className="lg:col-span-6 lg:pl-12 space-y-12">
          <div className="relative">
            <div className="absolute left-12 top-12 bottom-12 w-px bg-outline-subtle/30" />
            <div className="space-y-16">
              {steps.map(([title, text], index) => (
                <FadeIn key={title} delay={index * 0.1}>
                  <div className="relative flex gap-12 group">
                    <div className={`flex-shrink-0 w-24 h-24 ${index === 2 ? 'bg-primary' : 'bg-surface-high'} border border-outline-subtle/10 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-105`}>
                      <span className={`font-headline text-[48px] leading-[56px] tracking-[-0.02em] font-extrabold ${index === 2 ? 'text-surface' : 'text-primary'}`}>
                        0{index + 1}
                      </span>
                    </div>
                    <div className="flex-grow pt-4">
                      <h4 className="font-headline text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-primary mb-2">{title}</h4>
                      <p className="font-body text-[18px] leading-[28px] text-on-surface-dim">{text}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
          <FadeIn delay={0.34}>
            <div className="mt-20 pt-12 border-t border-outline-subtle/10">
              <span className="font-label text-xs font-medium text-primary tracking-[0.2em] uppercase">What happens after launch</span>
              <p className="mt-6 font-body text-[18px] leading-[28px] text-on-surface opacity-80">
                You keep one point of contact for fixes, content changes, security, analytics, and hosting. No plugin
                pile-up. No page builder bills. No guessing who to call.
              </p>
            </div>
          </FadeIn>
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
        <div className="flex flex-col gap-8 text-center md:text-left md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <h1 className="font-headline text-[32px] font-bold leading-[38px] tracking-[-0.02em] text-primary md:text-[48px] md:leading-[56px] md:tracking-[-0.02em]">
              Your $30/Month Keeps Everything Running
            </h1>
          </div>
          <div className="flex flex-col items-center md:items-end">
            <span className="w-max rounded-full border border-outline-subtle/10 bg-surface-mid px-6 py-3 font-headline text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-primary">
              $0 setup
            </span>
          </div>
        </div>
        <FadeIn delay={0.16}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-outline-subtle/20">
                  <th className="px-4 py-6 font-headline text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-on-surface-dim font-medium"> </th>
                  <th className="rounded-t-lg bg-primary px-4 py-6 font-headline text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-on-primary">SiteKeep</th>
                  <th className="px-4 py-6 font-headline text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-primary">Wix/Squarespace</th>
                  <th className="px-4 py-6 font-headline text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-primary">Agency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-subtle/10">
                {rows.map((row, rowIndex) => (
                  <tr key={row[0]}>
                    <td className="px-4 py-8 font-body text-[16px] leading-[24px] text-on-surface-dim">{row[0]}</td>
                    <td className={`bg-primary/95 px-4 py-8 font-bold text-on-primary ${rowIndex === rows.length - 1 ? 'rounded-b-lg' : ''}`}>{row[1]}</td>
                    <td className="px-4 py-8 text-primary">{row[2]}</td>
                    <td className="px-4 py-8 text-primary">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map(([title, text, Icon], index) => (
            <FadeIn key={title} delay={index * 0.04}>
              <div className="group h-full rounded-lg border border-outline-subtle/10 bg-surface-low p-8 transition-colors duration-300 hover:bg-surface-high">
                <Icon className="mb-6 h-6 w-6 text-primary" />
                <h3 className="font-headline text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-primary mb-2">{title}</h3>
                <p className="font-body text-[16px] leading-[24px] text-on-surface-dim">{text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.22}>
          <div className="grid gap-5 border-y border-outline-subtle/10 py-5 lg:grid-cols-[0.6fr_1.4fr]">
            <h3 className="font-headline text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-primary">"This Sounds Too Good. What's the Catch?"</h3>
            <p className="font-body text-[16px] leading-[24px] text-on-surface-dim">
              Fair question. Here's the truth: we make our money over time, not upfront. We break even around the
              two-year mark, then it becomes worth it for us. That model only works if you're happy enough to stay — so
              we have every reason to do great work and keep you satisfied. No contracts. No pressure. If you ever want
              to leave, we'll hand you everything — your domain, your files, all of it.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.28}>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['No surprise invoices', 'Small edits, hosting care, and support are folded into one predictable plan.'],
              ['No platform lock-in', 'If you leave, the files and domain go with you. That should be normal.'],
              ['No template ceiling', 'The site can grow as the business changes because the code is not boxed in.'],
            ].map(([title, text]) => (
              <div key={title} className="border-l border-outline-subtle/15 pl-4">
                <h4 className="font-headline text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-primary">{title}</h4>
                <p className="mt-2 font-body text-[16px] leading-[24px] text-on-surface-dim">{text}</p>
              </div>
            ))}
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
      <div className="w-full py-4 md:py-8">
        <div className="mb-12 text-center md:mb-16">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-4 font-headline text-[32px] font-bold leading-[38px] tracking-[-0.02em] text-primary md:text-[48px] md:leading-[56px]">
              Built for Businesses Like Yours
            </h1>
            <p className="font-body text-[18px] leading-[28px] text-on-surface-dim">
              Every site is hand-coded from scratch. No templates, no page builders.
            </p>
          </div>
        </div>
        <div className="mb-8 flex flex-wrap items-center gap-6 md:gap-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-dim/40">Filters</span>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {['Small business sites', 'Service pages and lead forms', 'Launch plus monthly care'].map((item, index) => (
              <p
                key={item}
                className={`font-label text-xs font-medium transition-colors ${
                  index === 0
                    ? 'text-primary relative after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-primary'
                    : 'text-on-surface-dim/60 hover:text-primary'
                }`}
              >
                {item}
              </p>
            ))}
          </div>
        </div>
        <div className="overflow-hidden">
          <motion.div
            layout
            className="hide-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pr-0 md:pr-16"
          >
            <AnimatePresence initial={false}>
              {visibleProjects.map((project, index) => (
                <motion.article
                  layout
                  key={project.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 18 }}
                  transition={{ duration: 0.35, delay: index >= 3 ? (index - 3) * 0.05 : 0 }}
                  className="group flex min-w-[85vw] snap-start flex-col overflow-hidden rounded-xl border border-outline-subtle/20 bg-surface-low transition-colors duration-300 hover:bg-surface-high md:min-w-[40%] lg:min-w-[38%]"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-surface-high">
                    <VideoPlaceholder src={project.videoSrc} />
                  </div>
                  <div className="flex flex-grow flex-col p-8">
                    <h3 className="mb-3 font-headline text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-primary">
                      {project.title}
                    </h3>
                    <p className="mb-8 min-h-12 flex-grow font-body text-[16px] leading-[24px] text-on-surface-dim">
                      {project.description}
                    </p>
                    <div className="flex items-center justify-between gap-4">
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
                        className="rounded-full bg-primary px-6 py-2 font-label text-xs font-bold text-on-primary transition-colors hover:bg-on-surface active:scale-95"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
          {visibleCount < projects.length && (
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2">
                <div className="h-1 w-12 rounded-full bg-primary" />
                <div className="h-1 w-8 rounded-full bg-outline-subtle/30" />
                <div className="h-1 w-8 rounded-full bg-outline-subtle/30" />
              </div>
              <button
                onClick={() => setVisibleCount((count) => Math.min(count + 3, projects.length))}
                className="flex items-center gap-2 font-label text-xs font-bold text-primary transition-all hover:underline"
              >
                Show More <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </SectionShell>
  );
};

const ProjectModal = ({ project, onClose }) => (
  <AnimatePresence>
    {project && (
      <motion.div
        className="fixed inset-0 z-[90] grid place-items-center bg-black/80 p-4 backdrop-blur-sm"
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
          className="max-h-[92vh] w-full max-w-4xl overflow-y-auto border border-white/20 bg-black p-4 text-white shadow-2xl"
        >
          <div className="mb-4 flex justify-end">
            <button
              onClick={onClose}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-black"
              aria-label="Close project details"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <VideoPlaceholder src={project.videoSrc} large />
          <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h3 className="text-3xl font-black">{project.title}</h3>
              <p className="mt-3 leading-7 text-zinc-300">{project.fullDescription || project.description}</p>
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
                    <span className="grid h-9 w-9 place-items-center border border-white/20 bg-white text-sm font-black text-black">
                      {index + 1}
                    </span>
                    <div className="border-b border-white/10 pb-3">
                      <h5 className="font-black">{step.title}</h5>
                      <p className="mt-1 text-sm leading-6 text-zinc-300">{step.text}</p>
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
    <div className="mx-auto w-full max-w-4xl text-center space-y-12">
      <div className="space-y-6">
        <h1 className="font-headline text-[32px] font-bold leading-[38px] tracking-[-0.02em] text-primary md:text-[88px] md:leading-[92px] md:tracking-[-0.04em] md:font-extrabold">
          Ready for Your Free Website?
        </h1>
        <p className="mx-auto max-w-2xl font-body text-[18px] leading-[28px] text-on-surface-dim">
          Tell us a little about your business and we'll take it from there. No commitment, no credit card.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 border-y border-outline-subtle/10 py-8 md:grid-cols-3">
        {[
          ['Reply time', 'Usually same day'],
          ['First call', '15 minutes'],
          ['Payment', 'Only after launch'],
        ].map(([label, value], index) => (
          <div key={label} className={`space-y-1 ${index === 1 ? 'border-y md:border-y-0 md:border-x border-outline-subtle/10 py-6 md:py-0' : ''}`}>
            <p className="font-label text-xs font-medium uppercase tracking-[0.05em] text-on-surface-dim">{label}</p>
            <p className="font-headline text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-primary">{value}</p>
          </div>
        ))}
      </div>
      <div className="relative overflow-hidden rounded-lg border border-outline-subtle/10 bg-surface-low p-8 text-left md:p-12 group">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl transition-transform duration-700 group-hover:scale-110" />
        <form className="relative z-10 space-y-8" onSubmit={(event) => event.preventDefault()}>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {['Your Name', 'Business Name', 'Business Type', 'Phone or Email'].map((label) => (
              <div key={label} className="space-y-3">
                <label className="ml-1 block font-label text-xs font-medium uppercase tracking-[0.05em] text-on-surface-dim">{label}</label>
                <input
                  className="monolith-input w-full rounded-full border border-outline-subtle/10 bg-surface px-6 py-4 font-body text-[16px] leading-[24px] text-primary placeholder:text-outline/50 transition-all"
                  placeholder={label}
                />
              </div>
            ))}
          </div>
          <button className="flex w-full items-center justify-center gap-3 rounded-full bg-primary py-6 font-headline text-[24px] leading-[32px] tracking-[-0.01em] font-semibold text-surface transition-colors hover:bg-on-surface active:scale-[0.98]">
            Let's Build It <ArrowRight className="h-5 w-5" />
          </button>
        </form>
        <p className="mt-8 text-center font-label text-xs font-medium text-on-surface-dim/60">
          Send the basics now. We can collect photos, domain details, menu PDFs, service lists, and brand notes after we
          know the business.
        </p>
      </div>
    </div>
  </SectionShell>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const cooldownRef = useRef(false);
  const touchStartYRef = useRef(null);
  const touchScrollElRef = useRef(null);

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

  const getScrollElement = (target) => target?.closest?.('[data-section-scroll]');

  const isAtScrollEdge = (element, direction) => {
    if (!element) return true;
    const maxScrollTop = element.scrollHeight - element.clientHeight;
    if (maxScrollTop <= 2) return true;
    if (direction > 0) return element.scrollTop >= maxScrollTop - 2;
    return element.scrollTop <= 2;
  };

  const handleWheel = (event) => {
    if (Math.abs(event.deltaY) < 24) return;
    const direction = event.deltaY > 0 ? 1 : -1;
    if (!isAtScrollEdge(getScrollElement(event.target), direction)) return;
    moveByDirection(direction);
  };

  const handleTouchStart = (event) => {
    touchStartYRef.current = event.touches[0].clientY;
    touchScrollElRef.current = getScrollElement(event.target);
  };

  const handleTouchEnd = (event) => {
    if (touchStartYRef.current === null) return;
    const deltaY = touchStartYRef.current - event.changedTouches[0].clientY;
    touchStartYRef.current = null;
    if (Math.abs(deltaY) < 44) return;
    const direction = deltaY > 0 ? 1 : -1;
    if (!isAtScrollEdge(touchScrollElRef.current, direction)) return;
    touchScrollElRef.current = null;
    moveByDirection(direction);
  };

  const getTabColor = (tab) => {
    switch (tab) {
      case 'Home':
        return '#050505';
      case 'How It Works':
        return '#090909';
      case 'Pricing':
        return '#0d0d0d';
      case 'Work':
        return '#070707';
      case 'Contact':
        return '#111111';
      default:
        return '#050505';
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
      className="relative h-screen w-full overflow-hidden bg-black text-white selection:bg-white selection:text-black"
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
            <button onClick={() => moveToTab('Home')} className="text-xl font-black tracking-normal text-white">
              Site<span className="text-zinc-400">Keep</span>
            </button>
            <span className="hidden text-sm font-semibold text-zinc-400 sm:inline-flex">
              Free build. $30/month care.
            </span>
          </header>
          <div className="h-full">{renderContent(activeTab)}</div>
        </motion.main>
      </AnimatePresence>
      <div className="fixed bottom-5 left-0 z-50 flex w-full justify-center px-3 pointer-events-none sm:bottom-8">
        <nav className="pointer-events-auto relative flex max-w-full items-center overflow-x-auto rounded-full border border-white/10 bg-zinc-950/90 p-1.5 shadow-2xl backdrop-blur-xl">
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
