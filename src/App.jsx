import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  Code2,
  Github,
  Globe2,
  Headphones,
  Mail,
  Play,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Lenis from "lenis";

const tabs = ["Home", "How It Works", "Pricing", "Work", "Contact"];

const projects = [
  {
    title: "Local Cafe Refresh",
    category: "Hospitality case study",
    imageSrc:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    description:
      "A warm, fast site for a neighborhood cafe with menus, hours, and mobile-first directions.",
    fullDescription:
      "A compact business site built to help regulars check hours quickly and help new customers find the cafe from local search.",
    process: [
      "Mapped the menu, hours, and route info into a single glanceable homepage.",
      "Designed a soft editorial layout that feels welcoming on mobile.",
      "Kept the code lean so the site loads quickly even on weak connections.",
    ],
    outcomes: [
      "Faster mobile browsing",
      "Clearer hours + directions",
      "More local search visibility",
    ],
    videoSrc: null,
    githubUrl: null,
    liveUrl: null,
  },
  {
    title: "Contractor Quote Site",
    category: "Lead generation case study",
    imageSrc:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80",
    description:
      "A lead-focused website for a home services company with clear service pages and calls to action.",
    fullDescription:
      "A hand-coded site structured around service areas, trust signals, and a simple request flow for homeowners.",
    process: [
      "Built the homepage around trust, urgency, and one simple action.",
      "Separated services into clean blocks so visitors can self-select fast.",
      "Kept forms and calls to action consistent everywhere on the site.",
    ],
    outcomes: [
      "Fewer dropped leads",
      "Stronger trust signals",
      "Cleaner quote flow",
    ],
    videoSrc: null,
    githubUrl: null,
    liveUrl: null,
  },
  {
    title: "Salon Booking Launch",
    category: "Service brand case study",
    imageSrc:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80",
    description:
      "A polished salon site designed around services, pricing, photos, and booking links.",
    fullDescription:
      "A clean launch site for a service business that needed credibility, fast mobile performance, and easy updates.",
    process: [
      "Used a magazine-like rhythm so the site feels premium without becoming heavy.",
      "Balanced service cards, pricing, and booking actions for fast decision-making.",
      "Made content easy to update so the owner can keep it current.",
    ],
    outcomes: [
      "Clear booking flow",
      "Stronger visual polish",
      "Easy content updates",
    ],
    videoSrc: null,
    githubUrl: null,
    liveUrl: null,
  },
  {
    title: "Fitness Coach Brand",
    category: "Personal brand case study",
    imageSrc:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    description:
      "A bold personal brand site with programs, testimonials, and a direct inquiry path.",
    fullDescription:
      "A conversion-minded site for a solo operator who needed a memorable first impression and low-friction leads.",
    process: [
      "Built a strong hero with a direct promise and clear social proof.",
      "Structured the page like a story: problem, offer, proof, and next step.",
      "Kept the layout tight so the message stays consistent on every screen size.",
    ],
    outcomes: ["Clearer positioning", "Stronger trust", "Simpler inquiry path"],
    videoSrc: null,
    githubUrl: null,
    liveUrl: null,
  },
  {
    title: "Dental Office Starter",
    category: "Local SEO case study",
    imageSrc:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
    description:
      "A calm, trustworthy local site for services, insurance details, and patient contact.",
    fullDescription:
      "A practical healthcare-adjacent marketing site with accessible content structure and local SEO basics.",
    process: [
      "Focused the design on reassurance, clarity, and quick access to core info.",
      "Organized insurance, services, and contact details into predictable blocks.",
      "Added SEO structure so nearby patients can actually find the office.",
    ],
    outcomes: [
      "More accessible navigation",
      "Better local search structure",
      "Faster patient answers",
    ],
    videoSrc: null,
    githubUrl: null,
    liveUrl: null,
  },
  {
    title: "Boutique Retail Site",
    category: "Retail launch case study",
    imageSrc:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    description:
      "A sharp storefront presence with product highlights, location details, and social proof.",
    fullDescription:
      "A visual business site for a retail shop that needed better local discovery without maintaining a large catalog.",
    process: [
      "Mixed product photography with concise copy so the shop feels premium and scannable.",
      "Kept location and contact info persistent for immediate action.",
      "Made the design modular so future promos and seasonal updates stay consistent.",
    ],
    outcomes: [
      "Stronger storefront feel",
      "Easier seasonal updates",
      "Better local discovery",
    ],
    videoSrc: null,
    githubUrl: null,
    liveUrl: null,
  },
];

const processSteps = [
  {
    title: "Requirements",
    text: "Understand the client's business, goals, and what they need from their website",
  },
  {
    title: "Design",
    text: "Build the full design in Figma, present it to the client, and iterate until they approve",
  },
  {
    title: "Development",
    text: "Convert the approved Figma design into clean, hand-coded React/Next.js",
  },
  {
    title: "Optimization",
    text: "Performance tuning, SEO setup, accessibility checks, mobile responsiveness, and code cleanup before launch",
  },
  {
    title: "Handoff & Maintenance",
    text: "Site goes live, client gets their domain, ongoing $30/month support begins",
  },
];

const customStyles = `
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #71717a; }
`;

// Preloader Context for triggering entrance animations simultaneously with the columns split
const PreloaderContext = React.createContext({ startReveal: false });

const buttonSpringTransition = { type: "spring", stiffness: 400, damping: 30 };

const AnimatedButton = ({
  as = "button",
  className = "",
  children,
  icon: Icon,
  showArrowAnimation = false,
  arrowIcon: ArrowIcon = ArrowRight,
  type = "button",
  ...props
}) => {
  const Component = as === "a" ? motion.a : motion.button;

  return (
    <Component
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={{ tap: { scale: 0.95 } }}
      transition={buttonSpringTransition}
      className={className}
      {...(as === "button" ? { type } : {})}
      {...props}
    >
      {showArrowAnimation ? (
        <>
          <motion.div
            variants={{
              rest: { width: 0, opacity: 0 },
              hover: { width: 32, opacity: 1 },
            }}
            transition={buttonSpringTransition}
            className="flex items-center justify-start overflow-hidden whitespace-nowrap shrink-0"
          >
            <motion.div
              variants={{ rest: { x: -20 }, hover: { x: 0 } }}
              transition={buttonSpringTransition}
            >
              <ArrowIcon size={24} className="mr-2" />
            </motion.div>
          </motion.div>

          <span className="relative z-10 whitespace-nowrap">{children}</span>

          <motion.div
            variants={{
              rest: { width: 32, opacity: 1 },
              hover: { width: 0, opacity: 0 },
            }}
            transition={buttonSpringTransition}
            className="flex items-center justify-end overflow-hidden whitespace-nowrap shrink-0"
          >
            <motion.div
              variants={{ rest: { x: 0 }, hover: { x: 20 } }}
              transition={buttonSpringTransition}
            >
              <ArrowIcon size={24} className="ml-2" />
            </motion.div>
          </motion.div>
        </>
      ) : (
        <>
          {Icon && <Icon className="h-4 w-4" />}
          <span className="relative z-10 whitespace-nowrap">{children}</span>
        </>
      )}
    </Component>
  );
};

// 1. Scramble & Glitch Text Component
const ScrambleText = ({ text, startGlitchOut }) => {
  const [display, setDisplay] = useState(text.replace(/./g, " "));
  const chars = "!@#$%^&*()_+-=[]{}|;':,./<>?";

  useEffect(() => {
    let iteration = 0;
    let interval = setInterval(() => {
      setDisplay((current) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join(""),
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 0.25;
    }, 40);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.div
      className="font-glitch text-[#111] text-base sm:text-lg md:text-xl tracking-[0.5em] uppercase select-none relative z-20"
      initial="visible"
      animate={startGlitchOut ? "glitchOut" : "visible"}
      variants={{
        visible: { opacity: 1, scale: 1 },
        glitchOut: {
          opacity: [1, 1, 1, 0.5, 0],
          x: [0, -15, 15, -10, 10, -15, 0],
          y: [0, 8, -8, 8, -8, 8, 0],
          textShadow: [
            "0px 0px 0px rgba(0,0,0,1)",
            "5px 0px 0px rgba(255,0,0,0.8), -5px 0px 0px rgba(0,255,255,0.8)",
            "-5px 0px 0px rgba(255,0,0,0.8), 5px 0px 0px rgba(0,255,255,0.8)",
            "0px 0px 0px rgba(0,0,0,1)",
            "6px 3px 0px rgba(255,0,0,0.8), -6px -3px 0px rgba(0,255,255,0.8)",
            "0px 0px 0px rgba(0,0,0,0)",
          ],
          filter: [
            "blur(0px)",
            "blur(0px)",
            "blur(3px)",
            "blur(0px)",
            "blur(5px)",
            "blur(12px)",
          ],
          transition: { duration: 0.6, ease: "linear" },
        },
      }}
    >
      {display}
    </motion.div>
  );
};

// 2. Main Preloader Component
const Preloader = ({ onReveal, onComplete }) => {
  const [startGlitchOut, setStartGlitchOut] = useState(false);
  const [columnCount, setColumnCount] = useState(10);

  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumnCount(4); // 4 columns on mobile screen
      } else {
        setColumnCount(10); // 10 columns on desktop
      }
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const middle = (columnCount - 1) / 2;
  const getDelay = (i) => 2.2 + Math.abs(i - middle) * 0.06;

  useEffect(() => {
    const glitchTimer = setTimeout(() => setStartGlitchOut(true), 1500);
    const revealTimer = setTimeout(() => onReveal(), 2900); // 2.9s: Trigger reveal exactly as columns slide open!
    const completeTimer = setTimeout(() => onComplete(), 3800);

    return () => {
      clearTimeout(glitchTimer);
      clearTimeout(revealTimer);
      clearTimeout(completeTimer);
    };
  }, [onReveal, onComplete]);

  return (
    <motion.div className="fixed inset-0 z-50 flex pointer-events-none">
      <div className="absolute inset-0 flex w-full h-full">
        {Array.from({ length: columnCount }).map((_, i) => (
          <div
            key={i}
            className="relative flex-1 h-full overflow-hidden scale-x-[1.02] origin-center"
          >
            <motion.div
              className="absolute top-0 left-0 w-full h-[calc(50%+1px)] bg-[#f6f6f6]"
              initial={{ y: "0%" }}
              animate={{ y: "-100%" }}
              transition={{
                duration: 1.2,
                delay: getDelay(i),
                ease: [0.85, 0, 0.15, 1],
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-full h-[calc(50%+1px)] bg-[#f6f6f6]"
              initial={{ y: "0%" }}
              animate={{ y: "100%" }}
              transition={{
                duration: 1.2,
                delay: getDelay(i),
                ease: [0.85, 0, 0.15, 1],
              }}
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <ScrambleText text="SiteKeep" startGlitchOut={startGlitchOut} />
      </div>
    </motion.div>
  );
};

const FadeIn = ({ children, delay = 0, y = 24, className = "" }) => {
  const { startReveal } = React.useContext(PreloaderContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const shouldAnimate = startReveal && isInView;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
        delay: delay + 0.25,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const RevealLine = ({ children, delay = 0, className = "" }) => {
  const { startReveal } = React.useContext(PreloaderContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const shouldAnimate = startReveal && isInView;

  return (
    <span ref={ref} className="block overflow-hidden pb-2 -mb-2">
      <motion.span
        className={`block ${className}`}
        initial={{ y: "100%", rotate: 2 }}
        animate={shouldAnimate ? { y: 0, rotate: 0 } : { y: "100%", rotate: 2 }}
        transition={{
          duration: 1.0,
          ease: [0.16, 1, 0.3, 1],
          delay: delay + 0.25,
        }}
      >
        {children}
      </motion.span>
    </span>
  );
};

const AnimatedLine = ({ children, text, delay = 0, className = "" }) => {
  const { startReveal } = React.useContext(PreloaderContext);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const shouldAnimate = startReveal && isInView;

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0, rotate: 3 }}
        animate={
          shouldAnimate
            ? { y: "0%", opacity: 1, rotate: 0 }
            : { y: "100%", opacity: 0, rotate: 3 }
        }
        transition={{
          duration: 1.2,
          delay: delay + 0.25,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="block origin-bottom-left"
      >
        {text || children}
      </motion.div>
    </div>
  );
};

const SectionShell = ({ children, className = "" }) => (
  <section
    data-section-scroll
    className={`min-h-full h-full px-4 pt-20 pb-24 overflow-y-auto sm:px-6 sm:pt-24 sm:pb-28 lg:px-10 ${className}`}
  >
    <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col justify-center">
      {children}
    </div>
  </section>
);

const VideoPlaceholder = ({ src, large = false }) => (
  <div
    className={`relative aspect-video w-full overflow-hidden rounded-md border border-white/15 bg-zinc-950 ${
      large ? "shadow-2xl shadow-black/40" : ""
    }`}
  >
    {src ? (
      <video src={src} className="h-full w-full object-cover" controls />
    ) : (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]">
        <div className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-black/40">
          <Play className="h-5 w-5 fill-white text-white" />
        </div>
        <span className="text-xs uppercase tracking-[0.22em] text-zinc-500">
          Video coming soon
        </span>
      </div>
    )}
  </div>
);

const revealUpVariants = {
  hidden: { opacity: 0, y: 42 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

const CaseStudyImage = ({ src, alt, className = "" }) => (
  <div
    className={`group relative overflow-hidden rounded-[20px] border border-white/10 bg-zinc-950 ${className}`}
  >
    <motion.div
      className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.5)_100%)] z-10"
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    />
    <motion.img
      src={src}
      alt={alt}
      initial={{ y: 42, opacity: 0, scale: 1.05 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="h-full w-full object-cover"
      loading="lazy"
    />
  </div>
);

const LinkButton = ({ href, children, variant = "solid", icon: Icon }) => {
  const disabled = !href;
  const classes =
    variant === "solid"
      ? "bg-white text-black hover:bg-zinc-200"
      : "border border-white/20 text-white hover:border-white/60 hover:bg-white/5";

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
    {/* Ambient Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-white opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
    <div className="relative grid items-center gap-6 lg:grid-cols-12 lg:gap-6">
      <div className="absolute inset-0 monolith-gradient pointer-events-none" />
      <div className="relative z-10 lg:col-span-7 flex flex-col justify-center space-y-8 sm:space-y-12 mb-16 lg:mb-0">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-outline-subtle/20 bg-surface-low px-3 py-1.5 sm:px-4">
          <Sparkles className="h-3.5 w-3.5 text-primary sm:h-4 sm:w-4" />
          <span className="font-label text-[10px] font-medium uppercase tracking-[0.05em] text-on-surface-dim sm:text-xs">
            SiteKeep
          </span>
        </div>
        <h1 className="max-w-5xl font-headline text-[36px] font-bold leading-[42px] tracking-[-0.02em] text-primary sm:text-[44px] sm:leading-[50px] md:text-[88px] md:leading-[92px] md:tracking-[-0.04em] md:font-extrabold">
          <RevealLine>We Build</RevealLine>
          <RevealLine delay={0.08}>Your Website.</RevealLine>
          <RevealLine delay={0.16}>For Free.</RevealLine>
        </h1>
        <FadeIn delay={0.18}>
          <p className="max-w-xl font-body text-[16px] leading-[26px] text-on-surface-dim sm:text-[18px] sm:leading-[28px]">
            Seriously. No setup fee, no hidden costs. Just $30/month to keep it
            running, secure, and updated — forever.
          </p>
        </FadeIn>
        <FadeIn delay={0.28}>
          <AnimatedButton
            onClick={onCta}
            showArrowAnimation
            className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 font-headline text-[18px] leading-[26px] tracking-[-0.01em] font-semibold text-surface shadow-[0_18px_40px_rgba(255,255,255,0.12)] transition-colors hover:shadow-[0_24px_55px_rgba(255,255,255,0.18)] sm:px-10 sm:py-5 sm:text-[24px] sm:leading-[32px]"
          >
            Get My Free Website
          </AnimatedButton>
        </FadeIn>
        <FadeIn delay={0.34}>
          <dl className="mt-6 grid grid-cols-3 border-y border-outline-subtle/10 py-4 font-label text-[10px] font-medium uppercase tracking-[0.05em] sm:mt-10 sm:py-5 sm:text-xs">
            {[
              ["Setup", "$0"],
              ["Care plan", "$30/mo"],
              ["Contract", "None"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="border-r border-outline-subtle/10 px-2 first:pl-0 last:border-r-0 sm:px-4"
              >
                <dt className="text-on-surface-dim">{label}</dt>
                <dd className="mt-1 font-headline text-sm font-extrabold normal-case tracking-normal text-primary sm:text-base">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>
      </div>
      <FadeIn delay={0.25} className="hidden lg:block lg:col-span-5">
        <div className="w-full rounded-lg border border-outline-subtle/10 bg-surface-low p-8 md:p-12">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="max-w-xs font-headline text-[24px] font-semibold leading-[32px] tracking-[-0.01em] text-primary">
              A quieter way to buy a business website.
            </h2>
            <span className="hidden font-label text-xs font-medium uppercase tracking-[0.05em] text-on-surface-dim opacity-50 sm:block">
              Operating model
            </span>
          </div>
          <div className="space-y-0">
            {[
              "Free custom build",
              "$30 monthly care",
              "SEO-ready from day one",
              "No contract",
            ].map((item) => (
              <div
                key={item}
                className="group flex items-center justify-between border-b border-outline-subtle/10 py-6 last:border-b-0"
              >
                <span className="font-body text-[18px] leading-[28px] text-on-surface transition-colors group-hover:text-primary">
                  {item}
                </span>
                <Check className="h-5 w-5 text-primary" />
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-lg border border-outline-subtle/5 bg-surface-mid p-6">
            <p className="font-body text-[16px] leading-[24px] italic text-on-surface-dim">
              Built for small teams that want a real website without a big
              invoice, a platform maze, or a handoff that leaves them alone when
              something breaks.
            </p>
          </div>
        </div>
      </FadeIn>
    </div>
  </SectionShell>
);

const HowItWorksSection = () => {
  const steps = [
    [
      "Step 01 – You tell us what you need",
      "Share your business details and what you want on your site. Takes about 5 minutes.",
    ],
    [
      "Step 02 – We design it, you approve",
      "We create a custom design mockup. You review it, give feedback, and approve before we write a single line of code.",
    ],
    [
      "Step 03 – We build and deliver",
      "Once you approve the design, we hand-code your full site and deliver it in 1–2 weeks. Free.",
    ],
    [
      "Step 04 – We keep it running",
      "$30/month. Hosting, security, Fast-loading, and a real person to text. Cancel anytime.",
    ],
  ];
  const details = [
    "Mobile-first layout",
    "Local SEO basics",
    "Fast hosting setup",
    "Simple update requests",
  ];

  return (
    <SectionShell>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-6 items-start">
        <div className="lg:col-span-6 space-y-8 sm:space-y-12">
          <h1 className="font-headline text-[32px] font-bold leading-[38px] tracking-[-0.02em] text-primary sm:text-[44px] sm:leading-[50px] md:text-[88px] md:leading-[92px] md:tracking-[-0.04em] md:font-extrabold max-w-xl">
            <RevealLine>Four Steps.</RevealLine>
            <RevealLine delay={0.08}>Zero Stress.</RevealLine>
          </h1>
          <FadeIn delay={0.18}>
            <div className="space-y-5 border border-outline-subtle/10 bg-surface-low/50 p-6 backdrop-blur-sm sm:space-y-6 sm:p-8 md:p-12">
              <h3 className="font-headline text-[20px] font-semibold leading-[28px] tracking-[-0.01em] text-primary sm:text-[24px] sm:leading-[32px]">
                Why Would We Build It For Free?
              </h3>
              <p className="font-body text-[15px] leading-[24px] text-on-surface-dim opacity-90 sm:text-[16px] sm:leading-[24px]">
                Honest answer: we don't make money upfront. We build your site
                at no charge and only start earning after you've been with us
                for about two years. That means we're motivated to build
                something you actually love and keep you around — not take your
                money and disappear. No contract. No gotcha. Just a handshake
                deal that works for both of us.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.24}>
            <div className="grid grid-cols-1 sm:grid-cols-2 border border-outline-subtle/10 overflow-hidden">
              {details.map((item, index) => {
                const isTopRow = index < 2;
                const isLeftCol = index % 2 === 0;
                return (
                  <div
                    key={item}
                    className={`p-4 flex items-center gap-3 border-outline-subtle/10 sm:p-6 sm:gap-4 ${
                      isTopRow ? "border-b sm:border-b-0" : ""
                    } ${isLeftCol ? "sm:border-r" : ""}`}
                  >
                    <Check className="h-4 w-4 text-primary flex-shrink-0 sm:h-5 sm:w-5" />
                    <span className="font-label text-[11px] font-medium uppercase tracking-wider text-on-surface-dim sm:text-xs">
                      {item}
                    </span>
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </div>
        <div className="lg:col-span-6 lg:pl-12 space-y-10 sm:space-y-12">
          <div className="relative">
            <div className="absolute left-10 top-10 bottom-10 w-px bg-outline-subtle/30 sm:left-12 sm:top-12 sm:bottom-12" />
            <div className="space-y-12 sm:space-y-16">
              {steps.map(([title, text], index) => (
                <FadeIn key={title} delay={index * 0.1}>
                  <div className="relative flex gap-6 sm:gap-8 md:gap-12 group">
                    <div
                      className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 ${index === 2 ? "bg-primary" : "bg-surface-high"} border border-outline-subtle/10 flex items-center justify-center relative z-10 transition-transform duration-500 group-hover:scale-105`}
                    >
                      <span
                        className={`font-headline text-[32px] leading-[40px] tracking-[-0.02em] font-extrabold sm:text-[40px] sm:leading-[48px] md:text-[48px] md:leading-[56px] ${index === 2 ? "text-surface" : "text-primary"}`}
                      >
                        0{index + 1}
                      </span>
                    </div>
                    <div className="flex-grow pt-2 sm:pt-4">
                      <h4 className="font-headline text-[18px] font-semibold leading-[26px] tracking-[-0.01em] text-primary mb-2 sm:text-[24px] sm:leading-[32px]">
                        {title}
                      </h4>
                      <p className="font-body text-[15px] leading-[24px] text-on-surface-dim sm:text-[18px] sm:leading-[28px]">
                        {text}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
};

const PricingSection = () => {
  const [activeComparison, setActiveComparison] = useState("wix");

  const rows = [
    {
      label: "Setup Cost",
      icon: Calendar,
      siteKeep: "$0",
      wix: "$0",
      agency: "$2,000–$10,000",
    },
    {
      label: "Monthly Cost",
      icon: Calendar,
      siteKeep: "$30",
      wix: "$16–$45",
      agency: "$100–$500",
    },
    {
      label: "Custom Built",
      icon: Code2,
      siteKeep: "Yes",
      wix: "No",
      agency: "Yes",
    },
    {
      label: "Ongoing Support",
      icon: Headphones,
      siteKeep: "Yes",
      wix: "No",
      agency: "Rarely",
    },
    {
      label: "You Own the Domain",
      icon: Globe2,
      siteKeep: "Yes",
      wix: "Yes",
      agency: "Sometimes",
    },
    {
      label: "SEO Optimized",
      icon: Search,
      siteKeep: "Yes",
      wix: "Basic",
      agency: "Yes",
    },
  ];

  const competitorLabel =
    activeComparison === "wix" ? "Wix/Squarespace" : "Agency";
  const competitorKey = activeComparison;

  return (
    <SectionShell>
      <div className="monolith-pricing-page">
        {/* SECTION 1: Page Heading Area */}
        <section className="monolith-section monolith-hero-section">
          <div className="monolith-container">
            <header className="monolith-header">
              <h1 className="monolith-display-title">
                Your $30/Month Keeps Everything Running
              </h1>
              <p className="monolith-subtitle">See how SiteKeep compares.</p>
            </header>
          </div>
        </section>

        {/* SECTION 2: Comparison Table Area (Desktop Only) */}
        <section className="monolith-section monolith-table-section">
          <div className="monolith-container">
            <div className="table-wrapper">
              <table className="monolith-table">
                <thead>
                  <tr>
                    <th className="col-feature">Feature</th>
                    <th className="col-highlight text-center">
                      <div className="highlight-header-container">
                        <span className="badge-sub-geist">RECOMMENDED</span>
                        <div className="header-brand-container">
                          <span className="brand-name">SiteKeep</span>
                          <span className="brand-tag">YOU</span>
                        </div>
                      </div>
                    </th>
                    <th className="col-other text-center">Wix/Squarespace</th>
                    <th className="col-other text-center">Agency</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, rowIndex) => {
                    const Icon = row.icon;
                    const isLast = rowIndex === rows.length - 1;
                    return (
                      <tr key={`desktop-${row.label}`}>
                        <td className="cell-feature">
                          <Icon className="cell-icon" />
                          {row.label}
                        </td>
                        <td className="cell-highlight text-center bold-val highlight-primary">
                          {row.siteKeep}
                        </td>
                        <td className="text-center">{row.wix}</td>
                        <td className="text-center">{row.agency}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Mobile Toggle & Table - Untouched */}
        <FadeIn delay={0.08}>
          <div className="relative mb-7 flex rounded-[30px] border border-white/10 bg-black/70 p-1 shadow-[0_20px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm md:hidden">
            <button
              onClick={() => setActiveComparison("wix")}
              className={`relative z-10 inline-flex w-1/2 items-center justify-center gap-2 rounded-full px-3 py-4 text-[16px] font-semibold tracking-[-0.01em] transition-colors ${
                activeComparison === "wix" ? "text-white" : "text-zinc-400"
              }`}
            >
              {activeComparison === "wix" && (
                <motion.div
                  layoutId="pricingComparisonPill"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  className="absolute inset-[2px] -z-10 rounded-full border border-white/15 bg-white/[0.07]"
                />
              )}
              <Globe2 className="h-[18px] w-[18px]" />
              vs Wix/Squarespace
            </button>
            <button
              onClick={() => setActiveComparison("agency")}
              className={`relative z-10 inline-flex w-1/2 items-center justify-center gap-2 rounded-full px-3 py-4 text-[16px] font-semibold tracking-[-0.01em] transition-colors ${
                activeComparison === "agency" ? "text-white" : "text-zinc-400"
              }`}
            >
              {activeComparison === "agency" && (
                <motion.div
                  layoutId="pricingComparisonPill"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                  className="absolute inset-[2px] -z-10 rounded-full border border-white/15 bg-white/[0.07]"
                />
              )}
              <User className="h-[18px] w-[18px]" />
              vs Agency
            </button>
          </div>
        </FadeIn>

        <FadeIn delay={0.14}>
          <div className="overflow-hidden rounded-[18px] border border-white/10 bg-[linear-gradient(170deg,#111214_0%,#0a0a0c_100%)] md:hidden">
            <div className="grid grid-cols-[1.1fr_0.7fr_0.9fr] border-b border-white/10">
              <span className="border-r border-white/10 px-4 py-4 text-[12px] font-semibold uppercase tracking-[0.08em] text-zinc-500">
                Feature
              </span>
              <span className="border-r border-white/10 px-2 py-4 text-center text-[15px] font-bold leading-[1.1] text-white">
                SiteKeep
                <span className="block pt-1 text-[12px] font-medium text-zinc-500">
                  (You)
                </span>
              </span>
              <span className="px-2 py-4 text-center text-[15px] font-semibold leading-[1.15] text-zinc-300">
                {competitorLabel}
              </span>
            </div>

            {rows.map((row, rowIndex) => {
              const Icon = row.icon;
              const isLast = rowIndex === rows.length - 1;
              return (
                <div
                  key={row.label}
                  className={`grid grid-cols-[1.1fr_0.7fr_0.9fr] items-center ${
                    !isLast ? "border-b border-white/[0.06]" : ""
                  }`}
                >
                  <div className="flex items-center gap-3 border-r border-white/10 px-4 py-4">
                    <Icon className="h-4 w-4 shrink-0 text-zinc-500" />
                    <span className="text-[16px] leading-[1.2] text-zinc-300">
                      {row.label}
                    </span>
                  </div>
                  <span className="border-r border-white/10 px-2 text-center text-[17px] font-bold text-white">
                    {row.siteKeep}
                  </span>
                  <motion.span
                    key={`${row.label}-${competitorKey}`}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22 }}
                    className="px-2 text-center text-[17px] text-zinc-400"
                  >
                    {row[competitorKey]}
                  </motion.span>
                </div>
              );
            })}
          </div>
        </FadeIn>

        {/* SECTION 3: "All the essentials" Card */}
        <section className="monolith-section monolith-essentials-section">
          <div className="monolith-container">
            <div className="essentials-card">
              <div className="essentials-icon-box">
                <ShieldCheck className="essentials-icon" />
              </div>
              <div className="essentials-content">
                <h2 className="essentials-title">
                  All the essentials. One simple price.
                </h2>
                <div className="essentials-details">
                  <p className="essentials-text">
                    No hidden fees, no surprises.
                  </p>
                  <p className="essentials-text highlight-line">
                    Just a site that works — for $30/month.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: "What Your $30/Month Covers" Section */}
        <section className="monolith-section monolith-covers-section">
          <div className="monolith-container">
            <header className="monolith-header">
              <h2 className="monolith-title">What Your $30/Month Covers</h2>
              <p className="monolith-subtitle">
                No surprise invoices. No platform fees. Just one number that
                covers everything.
              </p>
            </header>

            <div className="monolith-grid">
              <div className="monolith-card">
                <div className="monolith-icon-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="monolith-icon"
                  >
                    <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
                    <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
                    <line x1="6" x2="6.01" y1="6" y2="6" />
                    <line x1="6" x2="6.01" y1="18" y2="18" />
                  </svg>
                </div>
                <div className="monolith-card-content">
                  <h3 className="monolith-card-title">Hosting</h3>
                  <p className="monolith-card-text">
                    Your site lives on fast, reliable infrastructure. No
                    separate hosting bill.
                  </p>
                </div>
              </div>

              <div className="monolith-card">
                <div className="monolith-icon-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="monolith-icon"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div className="monolith-card-content">
                  <h3 className="monolith-card-title">SSL Certificate</h3>
                  <p className="monolith-card-text">
                    Your site is secured with HTTPS, keeping visitors and search
                    engines happy.
                  </p>
                </div>
              </div>

              <div className="monolith-card">
                <div className="monolith-icon-box">
                  <ShieldCheck className="monolith-icon" />
                </div>
                <div className="monolith-card-content">
                  <h3 className="monolith-card-title">Security Updates</h3>
                  <p className="monolith-card-text">
                    We monitor and patch vulnerabilities before they become
                    problems.
                  </p>
                </div>
              </div>

              <div className="monolith-card">
                <div className="monolith-icon-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="monolith-icon"
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div className="monolith-card-content">
                  <h3 className="monolith-card-title">Uptime Monitoring</h3>
                  <p className="monolith-card-text">
                    If your site ever goes down, we know about it before you do.
                  </p>
                </div>
              </div>

              <div className="monolith-card">
                <div className="monolith-icon-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="monolith-icon"
                  >
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </div>
                <div className="monolith-card-content">
                  <h3 className="monolith-card-title">
                    Performance Maintenance
                  </h3>
                  <p className="monolith-card-text">
                    Regular checks to keep your site loading fast and running
                    clean.
                  </p>
                </div>
              </div>

              <div className="monolith-card">
                <div className="monolith-icon-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="monolith-icon"
                  >
                    <polyline points="23 4 23 10 17 10" />
                    <polyline points="1 20 1 14 7 14" />
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                  </svg>
                </div>
                <div className="monolith-card-content">
                  <h3 className="monolith-card-title">Backup & Recovery</h3>
                  <p className="monolith-card-text">
                    Your site is backed up regularly so nothing is ever lost.
                  </p>
                </div>
              </div>
            </div>

            <footer className="monolith-footer">
              <p className="monolith-footer-text">
                All plans include everything above. Cancel anytime.
              </p>
            </footer>
          </div>
        </section>

        {/* SECTION 5: Small Footer Note */}
        <footer className="monolith-page-footer">
          <p className="monolith-legal-note">
            Pricing shown for small business brochure-style websites.
          </p>
        </footer>
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
        <div className="mb-10 text-center md:mb-16">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 font-label text-[10px] font-semibold uppercase tracking-[0.24em] text-on-surface-dim/50 sm:text-xs">
              Case studies
            </p>
            <h1 className="mb-3 font-headline text-[28px] font-bold leading-[34px] tracking-[-0.02em] text-primary sm:text-[32px] sm:leading-[38px] md:text-[48px] md:leading-[56px]">
              Built to stay consistent over time
            </h1>
            <p className="font-body text-[16px] leading-[26px] text-on-surface-dim sm:text-[18px] sm:leading-[28px]">
              I design, hand-code, and maintain sites so the visuals, messaging,
              and performance stay aligned after launch.
            </p>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-4 sm:mb-8 sm:gap-6 md:gap-12">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-dim/40">
            What I publish
          </span>
          <div className="flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-8 sm:gap-y-4">
            {[
              "Case studies with images",
              "Implementation notes",
              "Repeatable process + support",
            ].map((item, index) => (
              <p
                key={item}
                className={`font-label text-[11px] font-medium transition-colors sm:text-xs ${
                  index === 0
                    ? "text-primary relative after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                    : "text-on-surface-dim/60 hover:text-primary"
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
            className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 pr-0 sm:gap-6 sm:pb-8 md:pr-16"
          >
            <AnimatePresence initial={false}>
              {visibleProjects.map((project, index) => (
                <motion.article
                  layout
                  key={project.title}
                  initial={{ opacity: 0, y: 42 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 28 }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex min-w-[86vw] snap-start flex-col overflow-hidden rounded-[24px] border border-outline-subtle/20 bg-surface-low transition-colors duration-300 hover:bg-surface-high sm:min-w-[70vw] md:min-w-[42%] lg:min-w-[38%]"
                >
                  <CaseStudyImage
                    src={project.imageSrc}
                    alt={project.title}
                    className="aspect-[4/3] rounded-none border-0"
                  />
                  <div className="flex flex-grow flex-col p-5 sm:p-8">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <span className="font-label text-[10px] font-semibold uppercase tracking-[0.22em] text-on-surface-dim/55 sm:text-xs">
                        {project.category}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-300 sm:text-xs">
                        4 min read
                      </span>
                    </div>
                    <h3 className="mb-3 font-headline text-[22px] font-semibold leading-[30px] tracking-[-0.01em] text-primary sm:text-[28px] sm:leading-[34px]">
                      {project.title}
                    </h3>
                    <p className="mb-6 font-body text-[15px] leading-[24px] text-on-surface-dim sm:mb-8 sm:text-[16px] sm:leading-[24px]">
                      {project.description}
                    </p>

                    <div className="mb-5 grid gap-2 sm:mb-6">
                      {project.outcomes.slice(0, 3).map((outcome) => (
                        <div
                          key={outcome}
                          className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-3 py-2"
                        >
                          <Check className="h-3.5 w-3.5 text-primary" />
                          <span className="font-body text-[13px] leading-[20px] text-zinc-300 sm:text-sm">
                            {outcome}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto flex items-center justify-between gap-3 sm:gap-4">
                      <div className="flex gap-2">
                        <LinkButton
                          href={project.githubUrl}
                          variant="outline"
                          icon={Github}
                        >
                          <span className="sr-only">GitHub</span>
                        </LinkButton>
                        <LinkButton
                          href={project.liveUrl}
                          variant="outline"
                          icon={Globe2}
                        >
                          <span className="sr-only">Live Site</span>
                        </LinkButton>
                      </div>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="rounded-full bg-primary px-4 py-1.5 font-label text-[11px] font-bold text-on-primary transition-colors hover:bg-on-surface sm:px-6 sm:py-2 sm:text-xs"
                      >
                        Read Case Study
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
          {visibleCount < projects.length && (
            <div className="mt-6 flex items-center justify-between sm:mt-8">
              <div className="flex gap-2">
                <div className="h-1 w-10 rounded-full bg-primary sm:w-12" />
                <div className="h-1 w-6 rounded-full bg-outline-subtle/30 sm:w-8" />
                <div className="h-1 w-6 rounded-full bg-outline-subtle/30 sm:w-8" />
              </div>
              <AnimatedButton
                onClick={() =>
                  setVisibleCount((count) =>
                    Math.min(count + 3, projects.length),
                  )
                }
                showArrowAnimation
                className="flex items-center gap-2 font-label text-xs font-bold text-primary transition-all hover:underline sm:text-sm"
              >
                Show More
              </AnimatedButton>
            </div>
          )}
        </div>
      </div>
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </SectionShell>
  );
};

const ProjectModal = ({ project, onClose }) => (
  <AnimatePresence>
    {project && (
      <motion.div
        className="fixed inset-0 z-[90] grid place-items-end bg-black/80 p-3 backdrop-blur-sm sm:place-items-center sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 72 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 72 }}
          transition={{ type: "spring", stiffness: 240, damping: 26 }}
          onClick={(event) => event.stopPropagation()}
          onWheel={(event) => event.stopPropagation()}
          onTouchStart={(event) => event.stopPropagation()}
          onTouchEnd={(event) => event.stopPropagation()}
          className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[28px] border border-white/15 bg-[linear-gradient(180deg,#111111_0%,#090909_100%)] p-4 text-white shadow-[0_40px_120px_rgba(0,0,0,0.65)] sm:p-6"
        >
          <div className="flex justify-end pb-2 sm:pb-4">
            <button
              onClick={onClose}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white transition hover:bg-white hover:text-black sm:h-10 sm:w-10"
              aria-label="Close project details"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            <motion.div
              className="space-y-4 sm:space-y-5"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.09, delayChildren: 0.05 },
                },
              }}
            >
              <motion.div
                variants={revealUpVariants}
                custom={0}
                className="space-y-3"
              >
                <p className="font-label text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500 sm:text-xs">
                  {project.category}
                </p>
                <h3 className="max-w-2xl font-headline text-[28px] font-bold leading-[32px] tracking-[-0.03em] text-primary sm:text-[36px] sm:leading-[40px]">
                  {project.title}
                </h3>
                <p className="max-w-2xl font-body text-[15px] leading-[24px] text-zinc-300 sm:text-[16px] sm:leading-[26px]">
                  {project.fullDescription || project.description}
                </p>
              </motion.div>

              <motion.div variants={revealUpVariants} custom={0.05}>
                <CaseStudyImage
                  src={project.imageSrc}
                  alt={project.title}
                  className="aspect-[16/10]"
                />
              </motion.div>

              <motion.div
                variants={revealUpVariants}
                custom={0.1}
                className="grid gap-3 sm:grid-cols-2 sm:gap-4"
              >
                <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                  <p className="font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
                    How I implement it
                  </p>
                  <div className="mt-3 space-y-3">
                    {project.process.map((item) => (
                      <div key={item} className="flex gap-3">
                        <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                        <p className="font-body text-[14px] leading-[22px] text-zinc-300 sm:text-[15px] sm:leading-[24px]">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[20px] border border-white/10 bg-white/[0.03] p-4 sm:p-5">
                  <p className="font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
                    Consistent results
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.outcomes.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-black/40 px-3 py-2 font-body text-[13px] leading-none text-zinc-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <p className="mt-4 font-body text-[14px] leading-[22px] text-zinc-400 sm:text-[15px] sm:leading-[24px]">
                    I keep the design system, spacing, and content flow
                    repeatable so the site stays coherent when it grows.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.aside
              className="space-y-4 sm:space-y-5"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.12 },
                },
              }}
            >
              <motion.div
                variants={revealUpVariants}
                custom={0}
                className="rounded-[22px] border border-white/10 bg-white/[0.03] p-4 sm:p-5"
              >
                <p className="font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
                  What makes it feel consistent
                </p>
                <ul className="mt-3 space-y-3">
                  {[
                    "One visual rhythm across cards, headings, and buttons.",
                    "Reusable layouts that keep content updates predictable.",
                    "Lightweight motion that always reveals from the bottom.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="font-body text-[14px] leading-[22px] text-zinc-300 sm:text-[15px] sm:leading-[24px]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                variants={revealUpVariants}
                custom={0.08}
                className="overflow-hidden rounded-[22px] border border-white/10 bg-black/40"
              >
                <div className="border-b border-white/10 px-4 py-3 sm:px-5 sm:py-4">
                  <p className="font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
                    Implementation notes
                  </p>
                </div>
                <div className="space-y-0">
                  {[
                    [
                      "Structure",
                      "Clear hierarchy from hero to proof to action.",
                    ],
                    ["Motion", "Bottom-up reveals with soft spring timing."],
                    [
                      "Maintenance",
                      "Easy to update without breaking the layout.",
                    ],
                  ].map(([label, value], index) => (
                    <div
                      key={label}
                      className={`grid grid-cols-[0.9fr_1.1fr] gap-3 px-4 py-4 sm:px-5 ${index !== 2 ? "border-b border-white/10" : ""}`}
                    >
                      <span className="font-label text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 sm:text-xs">
                        {label}
                      </span>
                      <span className="font-body text-[14px] leading-[22px] text-zinc-300 sm:text-[15px] sm:leading-[24px]">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={revealUpVariants}
                custom={0.16}
                className="flex flex-wrap gap-3"
              >
                <LinkButton href={project.githubUrl} icon={Github}>
                  GitHub
                </LinkButton>
                <LinkButton
                  href={project.liveUrl}
                  variant="outline"
                  icon={Globe2}
                >
                  Live Site
                </LinkButton>
              </motion.div>
            </motion.aside>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ContactSection = () => (
  <SectionShell>
    <div className="mx-auto w-full max-w-4xl text-center space-y-8 sm:space-y-12">
      <div className="space-y-4 sm:space-y-6">
        <h1 className="font-headline text-[28px] font-bold leading-[34px] tracking-[-0.02em] text-primary sm:text-[32px] sm:leading-[38px] md:text-[88px] md:leading-[92px] md:tracking-[-0.04em] md:font-extrabold">
          Ready for Your Free Website?
        </h1>
        <p className="mx-auto max-w-2xl font-body text-[16px] leading-[26px] text-on-surface-dim sm:text-[18px] sm:leading-[28px]">
          Tell us a little about your business and we'll take it from there. No
          commitment, no credit card.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-5 border-y border-outline-subtle/10 py-6 sm:gap-6 sm:py-8 md:grid-cols-3">
        {[
          ["Reply time", "Usually same day"],
          ["First call", "15 minutes"],
          ["Payment", "Only after launch"],
        ].map(([label, value], index) => (
          <div
            key={label}
            className={`space-y-1 ${index === 1 ? "border-y border-outline-subtle/10 py-5 md:border-y-0 md:border-x md:py-0" : ""}`}
          >
            <p className="font-label text-[11px] font-medium uppercase tracking-[0.05em] text-on-surface-dim sm:text-xs">
              {label}
            </p>
            <p className="font-headline text-[20px] font-semibold leading-[28px] tracking-[-0.01em] text-primary sm:text-[24px] sm:leading-[32px]">
              {value}
            </p>
          </div>
        ))}
      </div>
      <div className="relative overflow-hidden rounded-lg border border-outline-subtle/10 bg-surface-low p-5 text-left sm:p-8 md:p-12 group">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl transition-transform duration-700 group-hover:scale-110" />
        <form
          className="relative z-10 space-y-6 sm:space-y-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            {[
              "Your Name",
              "Business Name",
              "Business Type",
              "Phone or Email",
            ].map((label) => (
              <div key={label} className="space-y-2 sm:space-y-3">
                <label className="ml-1 block font-label text-[11px] font-medium uppercase tracking-[0.05em] text-on-surface-dim sm:text-xs">
                  {label}
                </label>
                <input
                  className="monolith-input w-full rounded-full border border-outline-subtle/10 bg-surface px-4 py-3 font-body text-[15px] leading-[24px] text-primary placeholder:text-outline/50 transition-all sm:px-6 sm:py-4 sm:text-[16px] sm:leading-[24px]"
                  placeholder={label}
                />
              </div>
            ))}
          </div>
          <AnimatedButton
            type="submit"
            showArrowAnimation
            className="flex w-full items-center justify-center gap-3 rounded-full bg-primary py-5 font-headline text-[18px] leading-[26px] tracking-[-0.01em] font-semibold text-surface shadow-[0_18px_40px_rgba(255,255,255,0.12)] transition-colors hover:shadow-[0_24px_55px_rgba(255,255,255,0.18)] sm:py-6 sm:text-[24px] sm:leading-[32px]"
          >
            Let's Build It
          </AnimatedButton>
        </form>
        <p className="mt-6 text-center font-label text-[10px] font-medium text-on-surface-dim/60 sm:mt-8 sm:text-xs">
          Send the basics now. We can collect photos, domain details, menu PDFs,
          service lists, and brand notes after we know the business.
        </p>
      </div>
    </div>
  </SectionShell>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [startReveal, setStartReveal] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const cooldownRef = useRef(false);
  const touchStartYRef = useRef(null);
  const touchScrollElRef = useRef(null);

  const moveToTab = (tab) => {
    if (!tabs.includes(tab)) return;
    setActiveTab(tab);
  };

  const moveByDirection = (direction) => {
    if (cooldownRef.current) return;
    const currentIndex = tabs.indexOf(activeTab);
    const nextIndex = Math.min(
      Math.max(currentIndex + direction, 0),
      tabs.length - 1,
    );
    if (nextIndex === currentIndex) return;

    cooldownRef.current = true;
    setActiveTab(tabs[nextIndex]);
    window.setTimeout(() => {
      cooldownRef.current = false;
    }, 800);
  };

  const getScrollElement = (target) =>
    target?.closest?.("[data-section-scroll]");

  const isAtScrollEdge = (element, direction) => {
    if (!element) return true;
    const maxScrollTop = element.scrollHeight - element.clientHeight;
    if (maxScrollTop <= 2) return true;
    if (direction > 0) return element.scrollTop >= maxScrollTop - 2;
    return element.scrollTop <= 2;
  };

  const handleWheel = (event) => {
    if (loading) return; // Disable scroll transitions during preloader
    if (Math.abs(event.deltaY) < 24) return;
    const direction = event.deltaY > 0 ? 1 : -1;
    if (!isAtScrollEdge(getScrollElement(event.target), direction)) return;
    moveByDirection(direction);
  };

  const handleTouchStart = (event) => {
    if (loading) return; // Disable scroll transitions during preloader
    touchStartYRef.current = event.touches[0].clientY;
    touchScrollElRef.current = getScrollElement(event.target);
  };

  const handleTouchEnd = (event) => {
    if (loading) return; // Disable scroll transitions during preloader
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
      case "Home":
        return "#050505";
      case "How It Works":
        return "#090909";
      case "Pricing":
        return "#0d0d0d";
      case "Work":
        return "#070707";
      case "Contact":
        return "#111111";
      default:
        return "#050505";
    }
  };

  const renderContent = (tabName) => {
    switch (tabName) {
      case "Home":
        return <HomeSection onCta={() => moveToTab("Contact")} />;
      case "How It Works":
        return <HowItWorksSection />;
      case "Pricing":
        return <PricingSection />;
      case "Work":
        return <WorkSection />;
      case "Contact":
        return <ContactSection />;
      default:
        return <HomeSection onCta={() => moveToTab("Contact")} />;
    }
  };

  return (
    <PreloaderContext.Provider value={{ startReveal }}>
      <div
        className="relative h-screen w-full overflow-hidden bg-black text-white selection:bg-white selection:text-black"
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
          @import url('https://fonts.googleapis.com/css2?family=Rubik+Glitch&display=swap');
          .font-glitch { font-family: 'Rubik Glitch', system-ui; }
          
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #71717a; }
        `,
          }}
        />

        <AnimatePresence initial={false}>
          <motion.main
            key={activeTab}
            initial={{
              y: "100%",
              zIndex: 20,
              boxShadow: "0 -40px 80px rgba(0,0,0,0.8)",
            }}
            animate={{
              y: 0,
              zIndex: 20,
              boxShadow: "0 0px 0px rgba(0,0,0,0)",
              scale: 1,
              opacity: 1,
            }}
            exit={{
              y: 0,
              scale: 0.94,
              opacity: 0.6,
              zIndex: 10,
              filter: "blur(2px)",
            }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 h-full w-full overflow-hidden"
            style={{ backgroundColor: getTabColor(activeTab) }}
          >
            <header className="absolute left-0 top-0 z-50 flex w-full items-center justify-between px-3 py-4 sm:px-4 sm:py-5 lg:px-10">
              <button
                onClick={() => moveToTab("Home")}
                className="font-logo text-xl tracking-normal text-white cursor-pointer bg-transparent border-none sm:text-2xl"
              >
                SiteKeep
              </button>
              <span className="hidden text-xs font-semibold text-zinc-400 sm:inline-flex md:text-sm">
                Free build. $30/month care.
              </span>
            </header>
            <div className="h-full">{renderContent(activeTab)}</div>
          </motion.main>
        </AnimatePresence>

        {/* Floating Navigation Bar */}
        <div className="fixed bottom-3 left-0 z-50 flex w-full justify-center px-2 pointer-events-none sm:bottom-5 sm:px-3 md:bottom-8">
          <nav className="pointer-events-auto relative flex max-w-full items-center overflow-x-auto rounded-full border border-white/10 bg-zinc-950/90 p-1 shadow-2xl backdrop-blur-xl sm:p-1.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => moveToTab(tab)}
                  className={`
                    relative z-10 whitespace-nowrap rounded-full px-3 py-2 text-[11px] font-medium transition-colors duration-300 sm:px-4 sm:py-2.5 sm:text-sm cursor-pointer bg-transparent border-none
                    ${isActive ? "text-black font-semibold" : "text-zinc-400 hover:text-zinc-200"}
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute inset-0 -z-10 rounded-full bg-white"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  {tab}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Preloader Overlay */}
        <AnimatePresence>
          {loading && (
            <Preloader
              onReveal={() => setStartReveal(true)}
              onComplete={() => setLoading(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </PreloaderContext.Provider>
  );
}
