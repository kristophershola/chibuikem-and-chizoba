import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  ExternalLink,
  Heart,
  Copy,
  Check,
  Menu,
  X,
  Loader2,
} from 'lucide-react';
import { Toaster, toast } from 'sonner';

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
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-md border border-gold/40 bg-background px-2.5 py-1 text-xs text-ink transition-colors hover:border-gold hover:bg-gold/10"
    >
      {copied ? (
        <Check size={14} className="text-gold" />
      ) : (
        <Copy size={14} />
      )}
      <span>{copied ? 'Copied' : 'Copy'}</span>
    </button>
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
      <span className="font-smallcaps text-[0.65rem] text-ink/70">{label}</span>
      <div
        className={`mt-2 ${
          error
            ? '[&_.field-input]:border-destructive [&_.field-input]:ring-1 [&_.field-input]:ring-destructive/40'
            : ''
        }`}
      >
        {children}
      </div>
      {error && (
        <span
          role="alert"
          aria-live="polite"
          className="mt-2 flex items-start gap-1.5 rounded-md border border-destructive/30 bg-destructive/5 px-2.5 py-1.5 text-xs font-medium text-destructive"
        >
          <span aria-hidden="true">⚠</span>
          <span>{error}</span>
        </span>
      )}
    </label>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Toaster position="bottom-right" richColors />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a
            className="flex items-center gap-3 active cursor-pointer"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            aria-label="CJ monogram"
          >
            <span className="inline-flex items-center font-display text-gold" aria-label="CJ monogram">
              <span className="text-2xl leading-none tracking-tight">CJ</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => scrollTo('details')}
              className="text-xs uppercase tracking-[0.25em] text-ink/70 transition-colors hover:text-gold"
            >
              Details
            </button>
            <button
              onClick={() => scrollTo('rsvp')}
              className="text-xs uppercase tracking-[0.25em] text-ink/70 transition-colors hover:text-gold"
            >
              RSVP
            </button>
            <button
              onClick={() => scrollTo('gift')}
              className="text-xs uppercase tracking-[0.25em] text-ink/70 transition-colors hover:text-gold"
            >
              Send a Gift
            </button>
          </nav>

          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-md p-2 text-ink md:hidden"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <nav className="flex flex-col gap-1 border-t border-border/60 px-6 pb-4 pt-2 md:hidden">
            <button
              onClick={() => scrollTo('details')}
              className="rounded px-2 py-2 text-left text-xs uppercase tracking-[0.25em] text-ink/80 hover:bg-cream hover:text-gold"
            >
              Details
            </button>
            <button
              onClick={() => scrollTo('rsvp')}
              className="rounded px-2 py-2 text-left text-xs uppercase tracking-[0.25em] text-ink/80 hover:bg-cream hover:text-gold"
            >
              RSVP
            </button>
            <button
              onClick={() => scrollTo('gift')}
              className="rounded px-2 py-2 text-left text-xs uppercase tracking-[0.25em] text-ink/80 hover:bg-cream hover:text-gold"
            >
              Send a Gift
            </button>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div>
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-cream/40 shadow-[inset_0_-30px_60px_-40px_rgba(120,90,40,0.25)]">
            <div className="relative mx-auto max-w-3xl px-6 py-24 text-center md:py-32">
              <p className="font-smallcaps text-xs text-gold md:text-sm">
                Together with our families
              </p>
              <h1 className="mt-10 font-script text-7xl leading-none text-ink/85 drop-shadow-[0_4px_12px_rgba(120,90,40,0.18)] md:text-9xl">
                Chibuikem
              </h1>
              <div className="my-10 flex items-center justify-center gap-4">
                <span className="h-px w-16 bg-gold/60"></span>
                <span className="font-script text-5xl text-gold drop-shadow-[0_2px_6px_rgba(180,140,60,0.35)] md:text-6xl">
                  &amp;
                </span>
                <span className="h-px w-16 bg-gold/60"></span>
              </div>
              <h1 className="font-script text-7xl leading-none text-ink/85 drop-shadow-[0_4px_12px_rgba(120,90,40,0.18)] md:text-9xl">
                Jennifer
              </h1>
              <div className="mt-12 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-gold/60"></span>
                <span className="rotate-45 text-gold">◆</span>
                <span className="h-px w-12 bg-gold/60"></span>
              </div>
              <p className="mt-8 font-display text-2xl font-bold tracking-wide text-ink drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)] md:text-3xl">
                Saturday, 19th December 2026
              </p>
            </div>
          </section>

          {/* Note From Us Section */}
          <section className="mx-auto max-w-3xl px-6 py-20 text-center">
            <p className="font-smallcaps text-xs text-gold">A note from us</p>
            <div className="gold-rule mx-auto my-6 max-w-[120px]"></div>
            <p className="font-display text-xl italic leading-relaxed text-ink/85 md:text-2xl">
              “Your love and prayers — in person or in spirit — is the greatest gift we could ask for. For those who have asked how to bless our home, please use the avenue provided below. Whatever you choose, do know that your love is already more than enough.”
            </p>
            <p className="mt-6 font-script text-3xl text-gold drop-shadow-[0_2px_6px_rgba(180,140,60,0.3)]">
              Chibuikem &amp; Jennifer
            </p>
          </section>

          {/* When & Where Section */}
          <section id="details" className="relative bg-cream/40 py-24">
            <div className="relative mx-auto max-w-6xl px-6 text-center">
              <p className="font-smallcaps text-xs text-gold">When &amp; Where</p>
              <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">The Celebration</h2>
              <div className="gold-rule mx-auto my-6 max-w-[120px]"></div>

              <div className="mt-12 mx-auto max-w-xl">
                <article className="overflow-hidden rounded-2xl border border-gold/30 bg-card text-left shadow-[0_20px_50px_-25px_rgba(120,90,40,0.35)] transition-shadow hover:shadow-[0_30px_60px_-25px_rgba(120,90,40,0.45)]">
                  <div className="px-7 py-8 text-center">
                    <p className="font-smallcaps text-xs text-gold">Traditional Marriage</p>
                    <h3 className="mt-3 font-display text-3xl text-ink">Signatious Hotel</h3>
                    <p className="mt-3 inline-flex items-center gap-2 text-sm text-ink/75">
                      <MapPin size={14} className="text-gold" />
                      Ajau Estate, Lagos
                    </p>
                    <p className="mt-1 inline-flex items-center gap-2 text-sm text-ink/75">
                      <Clock size={14} className="text-gold" />
                      1:00 pm
                    </p>
                  </div>
                  <div className="aspect-[16/10] w-full overflow-hidden border-t border-gold/20">
                    <iframe
                      src="https://www.google.com/maps?q=Signatious+Hotel+Ajau+Estate+Lagos&output=embed"
                      title="Map for Signatious Hotel"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="h-full w-full border-0"
                    />
                  </div>
                  <div className="border-t border-gold/20 bg-cream/40 px-7 py-3 text-center">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Signatious+Hotel+Ajau+Estate+Lagos"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-gold hover:underline"
                    >
                      Open in Google Maps <ExternalLink size={12} />
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </section>

          {/* Bless Our Home Section */}
          <section id="gift" className="relative bg-cream/40 py-24">
            <div className="relative mx-auto max-w-2xl px-6 text-center">
              <p className="font-smallcaps text-xs text-gold">Bless Our Home</p>
              <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">Send a Gift</h2>
              <div className="gold-rule mx-auto my-6 max-w-[120px]"></div>
              <p className="font-display text-xl italic leading-relaxed text-ink/85 md:text-2xl">
                “Marriage is a home being built — and every prayer, every kind thought, every gesture from loved ones like you becomes part of its foundation. If your heart leads you to bless ours, we receive it with quiet, overflowing gratitude.”
              </p>

              {revealedRecipient ? (
                <div className="mt-10 rounded-2xl border border-gold/40 bg-card p-8 text-left shadow-[0_20px_50px_-25px_rgba(120,90,40,0.35)]">
                  <p className="text-center font-display text-2xl italic text-ink">
                    Thank you, {revealedRecipient}.
                  </p>
                  <p className="mt-1 text-center text-sm text-ink/75">
                    Please use the bank details below to complete your transfer.
                  </p>
                  <div className="my-6 gold-rule"></div>
                  <dl className="space-y-4">
                    {bankDetails.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-4 rounded-lg border border-gold/20 bg-cream/40 px-4 py-3"
                      >
                        <div>
                          <dt className="font-smallcaps text-[0.65rem] text-gold">{item.label}</dt>
                          <dd className="mt-1 font-sans text-lg font-medium text-ink">{item.value}</dd>
                        </div>
                        <CopyButton value={item.value} label={item.label} />
                      </div>
                    ))}
                  </dl>
                  <p className="mt-6 text-center text-xs italic text-ink/60">
                    Your gift is received with deep gratitude and appreciation. God bless you.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleGiftSubmit}
                  className="mt-10 space-y-5 rounded-2xl border border-gold/30 bg-card p-8 text-left shadow-[0_20px_50px_-25px_rgba(120,90,40,0.35)]"
                >
                  <FormField label="Full Name" error={giftErrors.fullName}>
                    <input
                      name="full_name"
                      placeholder="Your full name"
                      inputMode="text"
                      autoComplete="name"
                      className="field-input"
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
                      className="field-input"
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 text-sm uppercase tracking-[0.25em] text-primary-foreground shadow-md transition-transform hover:-translate-y-0.5 hover:bg-gold/90 disabled:opacity-60 cursor-pointer"
                  >
                    {giftSubmitting ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Heart size={16} />
                    )}
                    Reveal Bank Details
                  </button>
                </form>
              )}
            </div>
          </section>

          {/* RSVP Section */}
          <section id="rsvp" className="mx-auto max-w-2xl px-6 py-24 text-center">
            <p className="font-smallcaps text-xs text-gold">Kindly Respond</p>
            <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">Will you join us?</h2>
            <div className="gold-rule mx-auto my-6 max-w-[120px]"></div>
            <p className="text-ink/75">
              Your presence would mean the world to us. Please let us know by sending in your details below.
            </p>

            {rsvpSubmitted ? (
              <div className="mt-10 rounded-2xl border border-gold/40 bg-cream/50 p-8 shadow-[0_20px_50px_-25px_rgba(120,90,40,0.35)]">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-gold">
                  <Check size={20} />
                </div>
                <p className="font-display text-2xl text-ink">Thank you, dear one.</p>
                <p className="mt-2 text-sm text-ink/75">
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
                  className="mt-5 text-xs uppercase tracking-[0.25em] text-gold hover:underline cursor-pointer"
                >
                  Submit another response
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleRsvpSubmit}
                className="mt-10 space-y-5 rounded-2xl border border-gold/30 bg-card p-8 text-left shadow-[0_20px_50px_-25px_rgba(120,90,40,0.35)]"
              >
                <FormField label="Full Name" error={rsvpErrors.fullName}>
                  <input
                    name="full_name"
                    placeholder="Your full name"
                    inputMode="text"
                    autoComplete="name"
                    className="field-input"
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
                    className="field-input"
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
                    className="field-input"
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
                    className="field-input"
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
                    className="field-input"
                    value={rsvpForm.message}
                    onChange={(e) => setRsvpForm((prev) => ({ ...prev, message: e.target.value }))}
                  />
                </FormField>

                <button
                  type="submit"
                  disabled={rsvpSubmitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3 text-sm uppercase tracking-[0.25em] text-primary-foreground shadow-md transition-transform hover:-translate-y-0.5 hover:bg-gold/90 disabled:opacity-60 cursor-pointer"
                >
                  {rsvpSubmitting ? <Loader2 size={16} className="animate-spin" /> : null}
                  Send my RSVP
                </button>
              </form>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-border/60 bg-cream/40">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <div className="gold-rule mx-auto mb-8 max-w-xs"></div>
          <p className="font-display text-2xl text-ink">With all our love,</p>
          <p className="mt-2 font-script text-5xl text-gold">Chibuikem &amp; Jennifer</p>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-muted-foreground">#CJ2026</p>
          <p className="mt-3 text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Chibuikem &amp; Jennifer.
          </p>
        </div>
      </footer>
    </div>
  );
}
