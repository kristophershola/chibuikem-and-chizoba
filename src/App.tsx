import React, { useState, useRef, useEffect } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Location01Icon,
  Time01Icon,
  LinkSquare01Icon,
  Calendar03Icon,
  HeartIcon,
  Copy01Icon,
  CheckmarkCircle01Icon,
  Menu01Icon,
  Cancel01Icon,
  Loading03Icon,
} from '@hugeicons/core-free-icons';
import { Toaster, toast } from 'sonner';
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from 'motion/react';

interface BankDetail {
  label: string;
  value: string;
}

const bankDetails: BankDetail[] = [
  { label: 'Bank Name', value: 'Keystone Bank' },
  { label: 'Account Number', value: '6033648918' },
  { label: 'Account Name', value: 'Chibuikem Samuel Nwanehiudo' },
];

function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label ?? 'Details'} copied to clipboard`);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error('Could not copy. Please copy manually.');
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className="inline-flex min-h-[32px] items-center gap-1.5 rounded-full border border-clay/35 bg-cream/70 px-3 py-1 text-xs font-semibold text-cocoa transition-colors hover:border-burgundy hover:text-burgundy cursor-pointer"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span
            key="copied"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1 text-burgundy font-medium"
          >
            <HugeiconsIcon icon={CheckmarkCircle01Icon} size={14} className="text-burgundy" />
            <span>Copied</span>
          </motion.span>
        ) : (
          <motion.span
            key="copy"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="inline-flex items-center gap-1"
          >
            <HugeiconsIcon icon={Copy01Icon} size={14} className="text-clay" />
            <span>Copy</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="v3-eyebrow text-clay">{label}</span>
      <div
        className={`mt-2 ${
          error
            ? '[&_.field-input]:border-burgundy [&_.field-input]:ring-1 [&_.field-input]:ring-burgundy/40'
            : ''
        }`}
      >
        {children}
      </div>
      {error && (
        <span
          role="alert"
          aria-live="polite"
          className="mt-2 flex items-start gap-1.5 rounded-md border border-burgundy/30 bg-burgundy/5 px-2.5 py-1.5 text-xs font-medium text-burgundy"
        >
          <span aria-hidden="true">⚠</span>
          <span>{error}</span>
        </span>
      )}
    </label>
  );
}

function ScrollWordReveal({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'start 45%'],
  });

  const words = text.split(' ');

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = Math.min(start + 1.5 / words.length, 1);
        return (
          <React.Fragment key={i}>
            <ScrollWordItem progress={scrollYProgress} range={[start, end]}>
              {word}
            </ScrollWordItem>
            {i < words.length - 1 ? ' ' : null}
          </React.Fragment>
        );
      })}
    </p>
  );
}

function ScrollWordItem({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.25, 1]);
  const y = useTransform(progress, range, [3, 0]);

  return (
    <motion.span style={{ opacity, y }} className="inline-block transition-colors">
      {children}
    </motion.span>
  );
}

function ParallaxBackgroundMotifs() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2400], [0, 320]);
  const y2 = useTransform(scrollY, [0, 2400], [0, -220]);
  const rotate1 = useTransform(scrollY, [0, 2400], [0, 120]);
  const rotate2 = useTransform(scrollY, [0, 2400], [45, -45]);
  const opacityGlow = useTransform(scrollY, [0, 800, 2000], [0.15, 0.35, 0.2]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Top Left Floating Diamond Motif */}
      <motion.div
        style={{ y: y1, rotate: rotate1, opacity: opacityGlow }}
        className="absolute -left-16 top-1/4 h-56 w-56 rounded-full border border-rose/30 bg-gradient-to-tr from-rose/15 to-transparent blur-[1px]"
      />
      {/* Mid Right Floating Motif */}
      <motion.div
        style={{ y: y2, rotate: rotate2, opacity: opacityGlow }}
        className="absolute -right-20 top-2/3 h-72 w-72 rounded-3xl border border-clay/20 bg-gradient-to-bl from-clay/10 to-transparent blur-[1px]"
      />
    </div>
  );
}

function CelebrationCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.93, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.8, 1]);

  return (
    <div ref={cardRef} style={{ perspective: 1200 }} className="mt-12 mx-auto max-w-xl">
      <motion.article
        style={{ rotateX, y, scale, opacity }}
        whileHover={{ y: -6, transition: { duration: 0.25 } }}
        className="overflow-hidden rounded-2xl border border-clay/35 bg-card text-left shadow-[0_20px_50px_-25px_rgba(58,27,22,0.16)] transition-shadow hover:shadow-[0_30px_60px_-25px_rgba(123,45,49,0.22)]"
      >
        <div className="px-7 py-8 text-center">
          <p className="v3-eyebrow text-clay">Traditional Marriage</p>
          <h3 className="v3-h3 mt-3 text-cocoa">Signatious Hotel</h3>
          <p className="mt-3 inline-flex items-center gap-2 font-body text-[15px] text-cocoa/80">
            <HugeiconsIcon icon={Location01Icon} size={14} className="text-clay" />
            Ajau Estate, Lagos
          </p>
          <p className="mt-1 inline-flex items-center gap-2 font-body text-[15px] text-cocoa/80">
            <HugeiconsIcon icon={Time01Icon} size={14} className="text-clay" />
            12:30 pm
          </p>
        </div>
        <div className="aspect-[16/10] w-full overflow-hidden border-t border-clay/20">
          <iframe
            src="https://www.google.com/maps?q=Signatious+Hotel+Ajau+Estate+Lagos&output=embed"
            title="Map for Signatious Hotel"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0"
          />
        </div>
        <div className="border-t border-clay/20 bg-cream/60 px-7 py-4 text-center flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Signatious+Hotel+Ajau+Estate+Lagos"
            target="_blank"
            rel="noreferrer"
            className="v3-btn-secondary"
          >
            Directions <HugeiconsIcon icon={LinkSquare01Icon} size={14} />
          </a>
          <a
            href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Chibuikem+%26+Chizoba+Traditional+Marriage&dates=20261219T113000Z/20261219T180000Z&details=Celebrating+the+traditional+marriage+of+Chibuikem+and+Chizoba&location=Signatious+Hotel,+Ajau+Estate,+Lagos"
            target="_blank"
            rel="noreferrer"
            className="v3-btn-secondary"
          >
            Add to calendar <HugeiconsIcon icon={Calendar03Icon} size={14} />
          </a>
        </div>
      </motion.article>
    </div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroY = useTransform(heroProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(heroProgress, [0, 0.75], [1, 0.05]);
  const heroScale = useTransform(heroProgress, [0, 1], [1, 0.94]);
  const bgAuraY = useTransform(heroProgress, [0, 1], [0, 140]);
  const bgAuraScale = useTransform(heroProgress, [0, 1], [1, 1.35]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Gift section state
  const [giftForm, setGiftForm] = useState({ fullName: '', phone: '' });
  const [giftErrors, setGiftErrors] = useState<{ fullName?: string; phone?: string }>({});
  const [giftSubmitting, setGiftSubmitting] = useState(false);
  const [revealedRecipient, setRevealedRecipient] = useState<string | null>(null);

  // RSVP section state
  const [rsvpForm, setRsvpForm] = useState({
    fullName: '',
    phone: '',
    attending: 'yes',
    guests: '1',
    message: '',
  });
  const [rsvpErrors, setRsvpErrors] = useState<{ fullName?: string; phone?: string }>({});
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGiftSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { fullName?: string; phone?: string } = {};

    if (!giftForm.fullName.trim() || giftForm.fullName.trim().length < 2) {
      errors.fullName = 'Please share your full name';
    }
    const cleanPhone = giftForm.phone.trim();
    if (!cleanPhone || cleanPhone.length < 7) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (Object.keys(errors).length > 0) {
      setGiftErrors(errors);
      return;
    }

    setGiftErrors({});
    setGiftSubmitting(true);

    setTimeout(() => {
      const firstName = giftForm.fullName.trim().split(' ')[0];
      setRevealedRecipient(firstName);
      setGiftSubmitting(false);
      toast.success('Bank details revealed!');
    }, 600);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { fullName?: string; phone?: string } = {};

    if (!rsvpForm.fullName.trim() || rsvpForm.fullName.trim().length < 2) {
      errors.fullName = 'Please share your full name';
    }
    const cleanPhone = rsvpForm.phone.trim();
    if (!cleanPhone || cleanPhone.length < 7) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (Object.keys(errors).length > 0) {
      setRsvpErrors(errors);
      return;
    }

    setRsvpErrors({});
    setRsvpSubmitting(true);

    setTimeout(() => {
      setRsvpSubmitted(true);
      setRsvpSubmitting(false);
      toast.success('Thank you! Your RSVP has been received.');
    }, 600);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground relative">
      <Toaster position="bottom-right" richColors />
      <ParallaxBackgroundMotifs />

      {/* Reading Progress Indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-gradient-to-r from-burgundy via-clay to-rose pointer-events-none"
      />

      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-40 border-b border-clay/20 bg-background/90 backdrop-blur"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="flex items-center gap-3 active cursor-pointer"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="CC monogram"
          >
            <span className="v3-names inline-flex items-center text-burgundy text-3xl leading-none" aria-label="CC monogram">
              CC
            </span>
          </motion.a>

          <nav className="hidden items-center gap-7 md:flex">
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo('details')}
              className="v3-nav text-cocoa/75 transition-colors hover:text-burgundy cursor-pointer"
            >
              Details
            </motion.button>
            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollTo('gift')}
              className="v3-nav text-cocoa/75 transition-colors hover:text-burgundy cursor-pointer"
            >
              Send a Gift
            </motion.button>
          </nav>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-md p-2 text-cocoa hover:text-burgundy md:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <HugeiconsIcon icon={Cancel01Icon} size={20} />
            ) : (
              <HugeiconsIcon icon={Menu01Icon} size={20} />
            )}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="flex flex-col gap-1 border-t border-clay/20 px-6 pb-4 pt-2 md:hidden overflow-hidden bg-cream"
            >
              <button
                onClick={() => scrollTo('details')}
                className="v3-nav rounded px-3 py-2.5 text-left text-cocoa/80 hover:bg-rose/10 hover:text-burgundy"
              >
                Details
              </button>
              <button
                onClick={() => scrollTo('rsvp')}
                className="v3-nav rounded px-3 py-2.5 text-left text-cocoa/80 hover:bg-rose/10 hover:text-burgundy"
              >
                RSVP
              </button>
              <button
                onClick={() => scrollTo('gift')}
                className="v3-nav rounded px-3 py-2.5 text-left text-cocoa/80 hover:bg-rose/10 hover:text-burgundy"
              >
                Send a Gift
              </button>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1">
        <div>
          {/* Hero Section with Parallax */}
          <section
            ref={heroRef}
            className="relative overflow-hidden bg-cream/40 shadow-[inset_0_-30px_60px_-40px_rgba(120,90,40,0.25)]"
          >
            {/* Ambient Breathing Gold Aura with Parallax */}
            <motion.div
              style={{ y: bgAuraY, scale: bgAuraScale }}
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[450px] w-[450px] rounded-full bg-gradient-to-br from-rose/25 via-clay/15 to-burgundy/15 blur-3xl"
            />

            <motion.div
              style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.18,
                    delayChildren: 0.1,
                  },
                },
              }}
              className="relative mx-auto max-w-3xl px-6 py-24 text-center md:py-32"
            >
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
                }}
                className="v3-invite text-clay md:text-xl"
              >
                Together with our families
              </motion.p>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 35, scale: 0.96 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="v3-names-hero mt-8 text-burgundy drop-shadow-[0_4px_16px_rgba(123,45,49,0.18)]"
              >
                Chibuikem
              </motion.h1>

              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="my-8 flex items-center justify-center gap-4"
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="h-px w-16 origin-right bg-clay/50"
                ></motion.span>
                <span className="v3-amp text-clay text-[clamp(2.25rem,6vw,3.5rem)] drop-shadow-[0_2px_6px_rgba(184,103,47,0.35)]">
                  &amp;
                </span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.35 }}
                  className="h-px w-16 origin-left bg-clay/50"
                ></motion.span>
              </motion.div>

              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 35, scale: 0.96 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="v3-names-hero text-burgundy drop-shadow-[0_4px_16px_rgba(123,45,49,0.18)]"
              >
                Chizoba
              </motion.h1>

              <motion.div
                variants={{
                  hidden: { opacity: 0, scaleX: 0 },
                  visible: {
                    opacity: 1,
                    scaleX: 1,
                    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                className="tribal-divider mx-auto mt-10 max-w-[220px] origin-center"
              />

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
                }}
                className="mt-8 font-body text-[16px] font-medium tracking-[0.02em] text-cocoa drop-shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
              >
                Saturday, 19th December 2026 · Lagos
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.15 } },
                }}
                className="mt-8 flex items-center justify-center"
              >
                <button
                  type="button"
                  onClick={() => scrollTo('rsvp')}
                  className="v3-btn-primary"
                >
                  RSVP
                </button>
              </motion.div>
            </motion.div>
          </section>

          {/* Note From Us Section with Scroll Word Reveal */}
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto max-w-3xl px-6 py-20 text-center"
          >
            <p className="v3-eyebrow text-clay">A note from us</p>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="tribal-divider mx-auto my-6 max-w-[220px] origin-center"
            ></motion.div>
            <ScrollWordReveal
              text="“Your love and prayers — in person or in spirit — is the greatest gift we could ask for. For those who have asked how to bless our home, please use the avenue provided below. Whatever you choose, do know that your love is already more than enough.”"
              className="font-display text-xl italic leading-relaxed text-cocoa/90 md:text-2xl"
            />
            <p className="v3-names mt-6 text-3xl text-burgundy drop-shadow-[0_2px_6px_rgba(123,45,49,0.2)] md:text-4xl">
              Chibuikem &amp; Chizoba
            </p>
          </motion.section>

          <div className="tribal-divider-wide mx-auto my-6" aria-hidden="true" />

          {/* When & Where Section with 3D Perspective Scroll Card */}
          <section id="details" className="relative bg-cream/40 py-24">
            <div className="relative mx-auto max-w-6xl px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
              >
                <p className="v3-eyebrow text-clay">When &amp; Where</p>
                <h2 className="v3-h2 mt-3 text-cocoa">The Celebration</h2>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="tribal-divider mx-auto my-6 max-w-[220px] origin-center"
                />
              </motion.div>

              <CelebrationCard />
            </div>
          </section>

          {/* Bless Our Home Section */}
          <section id="gift" className="relative bg-cream/40 py-24">
            <div className="relative mx-auto max-w-2xl px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6 }}
              >
                <p className="v3-eyebrow text-clay">Bless Our Home</p>
                <h2 className="v3-h2 mt-3 text-cocoa">Send a Gift</h2>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="tribal-divider mx-auto my-6 max-w-[220px] origin-center"
                />
                <ScrollWordReveal
                  text="“Marriage is a home being built — and every prayer, every kind thought, every gesture from loved ones like you becomes part of its foundation. If your heart leads you to bless ours, we receive it with quiet, overflowing gratitude.”"
                  className="font-display text-xl italic leading-relaxed text-cocoa/90 md:text-2xl"
                />
              </motion.div>

              <AnimatePresence mode="wait">
                {revealedRecipient ? (
                  <motion.div
                    key="bank-details"
                    initial={{ opacity: 0, y: 20, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-10 rounded-2xl border border-clay/35 bg-card p-8 text-left shadow-[0_20px_50px_-25px_rgba(58,27,22,0.16)]"
                  >
                    <p className="v3-h3 text-center text-cocoa italic">
                      Thank you, {revealedRecipient}.
                    </p>
                    <p className="mt-1 text-center font-body text-[15px] text-cocoa/75">
                      Please use the bank details below to complete your transfer.
                    </p>
                    <div className="my-6 tribal-divider max-w-[220px]"></div>
                    <dl className="space-y-4">
                      {bankDetails.map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 * index, duration: 0.35 }}
                          whileHover={{ scale: 1.01 }}
                          className="flex items-center justify-between gap-4 rounded-lg border border-clay/20 bg-cream/50 px-4 py-3 transition-colors hover:border-clay/40"
                        >
                          <div>
                            <dt className="v3-eyebrow text-[10.5px] text-clay">{item.label}</dt>
                            <dd className="mt-1 font-body text-[17px] font-semibold text-cocoa">{item.value}</dd>
                          </div>
                          <CopyButton value={item.value} label={item.label} />
                        </motion.div>
                      ))}
                    </dl>
                    <p className="mt-6 text-center font-body text-xs italic text-cocoa/60">
                      Your gift is received with deep gratitude and appreciation. God bless you.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="gift-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, scale: 0.97 }}
                    transition={{ duration: 0.35 }}
                    onSubmit={handleGiftSubmit}
                    className="mt-10 space-y-5 rounded-2xl border border-clay/30 bg-card p-8 text-left shadow-[0_20px_50px_-25px_rgba(58,27,22,0.16)]"
                  >
                    <FormField label="Full Name" error={giftErrors.fullName}>
                      <input
                        name="full_name"
                        placeholder="Your full name"
                        inputMode="text"
                        autoComplete="name"
                        className="field-input font-body text-[15px]"
                        value={giftForm.fullName}
                        onChange={(e) => {
                          setGiftForm((prev) => ({ ...prev, fullName: e.target.value }));
                          if (giftErrors.fullName) setGiftErrors((prev) => ({ ...prev, fullName: undefined }));
                        }}
                      />
                    </FormField>

                    <FormField label="Phone Number" error={giftErrors.phone}>
                      <input
                        name="phone"
                        placeholder="e.g. +234 803 000 0000"
                        inputMode="tel"
                        autoComplete="tel"
                        className="field-input font-body text-[15px]"
                        value={giftForm.phone}
                        onChange={(e) => {
                          setGiftForm((prev) => ({ ...prev, phone: e.target.value }));
                          if (giftErrors.phone) setGiftErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                      />
                    </FormField>

                    <button
                      type="submit"
                      disabled={giftSubmitting}
                      className="v3-btn-primary w-full"
                    >
                      {giftSubmitting ? (
                        <HugeiconsIcon icon={Loading03Icon} size={16} className="animate-spin text-cream" />
                      ) : (
                        <HugeiconsIcon icon={HeartIcon} size={16} className="text-rose" />
                      )}
                      Reveal Bank Details
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </section>

          <div className="tribal-divider-wide mx-auto my-6" aria-hidden="true" />

          {/* RSVP Section */}
          <section id="rsvp" className="mx-auto max-w-2xl px-6 py-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
            >
              <p className="v3-eyebrow text-clay">Kindly Respond</p>
              <h2 className="v3-h2-xl mt-3 text-cocoa">Will you join us?</h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="tribal-divider mx-auto my-6 max-w-[220px] origin-center"
              />
              <p className="font-body text-[16px] leading-relaxed text-cocoa/80">
                Your presence would mean the world to us. Please let us know by sending in your details below.
              </p>
            </motion.div>

            <AnimatePresence mode="wait">
              {rsvpSubmitted ? (
                <motion.div
                  key="rsvp-success"
                  initial={{ opacity: 0, scale: 0.95, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -15 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-10 rounded-2xl border border-clay/35 bg-cream/70 p-8 shadow-[0_20px_50px_-25px_rgba(58,27,22,0.16)]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20, delay: 0.1 }}
                    className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-burgundy/15 text-burgundy"
                  >
                    <HugeiconsIcon icon={CheckmarkCircle01Icon} size={20} className="text-burgundy" />
                  </motion.div>
                  <p className="v3-h3 text-cocoa">Thank you, dear one.</p>
                  <p className="mt-2 font-body text-[15px] text-cocoa/80">
                    Your response has been received with so much joy. We can’t wait to celebrate with you.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setRsvpSubmitted(false);
                      setRsvpForm({
                        fullName: '',
                        phone: '',
                        attending: 'yes',
                        guests: '1',
                        message: '',
                      });
                    }}
                    className="v3-btn-secondary mt-5"
                  >
                    Submit another response
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="rsvp-form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.97 }}
                  transition={{ duration: 0.35 }}
                  onSubmit={handleRsvpSubmit}
                  className="mt-10 space-y-5 rounded-2xl border border-clay/30 bg-card p-8 text-left shadow-[0_20px_50px_-25px_rgba(58,27,22,0.16)]"
                >
                  <FormField label="Full Name" error={rsvpErrors.fullName}>
                    <input
                      name="full_name"
                      placeholder="Your full name"
                      inputMode="text"
                      autoComplete="name"
                      className="field-input font-body text-[15px]"
                      value={rsvpForm.fullName}
                      onChange={(e) => {
                        setRsvpForm((prev) => ({ ...prev, fullName: e.target.value }));
                        if (rsvpErrors.fullName) setRsvpErrors((prev) => ({ ...prev, fullName: undefined }));
                      }}
                    />
                  </FormField>

                  <FormField label="Phone Number" error={rsvpErrors.phone}>
                    <input
                      name="phone"
                      placeholder="e.g. +234 803 000 0000"
                      inputMode="tel"
                      autoComplete="tel"
                      className="field-input font-body text-[15px]"
                      value={rsvpForm.phone}
                      onChange={(e) => {
                        setRsvpForm((prev) => ({ ...prev, phone: e.target.value }));
                        if (rsvpErrors.phone) setRsvpErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                    />
                  </FormField>

                  <FormField label="Will you be attending?">
                    <select
                      name="attending"
                      className="field-input font-body text-[15px]"
                      value={rsvpForm.attending}
                      onChange={(e) => setRsvpForm((prev) => ({ ...prev, attending: e.target.value }))}
                    >
                      <option value="yes">Yes, I’ll be there</option>
                      <option value="maybe">I’ll try my best</option>
                      <option value="no">Sadly, I can’t make it</option>
                    </select>
                  </FormField>

                  <FormField label="Number of guests">
                    <select
                      name="guests"
                      className="field-input font-body text-[15px]"
                      value={rsvpForm.guests}
                      onChange={(e) => setRsvpForm((prev) => ({ ...prev, guests: e.target.value }))}
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="A short message (optional)">
                    <textarea
                      name="message"
                      rows={3}
                      placeholder="Anything you'd like us to know"
                      className="field-input font-body text-[15px]"
                      value={rsvpForm.message}
                      onChange={(e) => setRsvpForm((prev) => ({ ...prev, message: e.target.value }))}
                    />
                  </FormField>

                  <button
                    type="submit"
                    disabled={rsvpSubmitting}
                    className="v3-btn-primary w-full"
                  >
                    {rsvpSubmitting ? (
                      <HugeiconsIcon icon={Loading03Icon} size={16} className="animate-spin text-cream" />
                    ) : null}
                    RSVP
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </section>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-24 border-t border-clay/20 bg-cream/60"
      >
        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="tribal-divider-fade mx-auto mb-8 max-w-xs origin-center"
          ></motion.div>
          <p className="v3-invite text-cocoa text-xl">With all our love,</p>
          <p className="v3-names mt-3 text-[42px] md:text-[54px] text-burgundy drop-shadow-[0_2px_8px_rgba(123,45,49,0.18)]">
            Chibuikem &amp; Chizoba
          </p>
          <p className="v3-eyebrow mt-6 text-clay">#CC2026</p>
          <p className="mt-3 font-body text-xs text-cocoa/60">
            © {new Date().getFullYear()} Chibuikem &amp; Chizoba.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
