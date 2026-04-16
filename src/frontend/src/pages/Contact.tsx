// XSS protection note: All user inputs are trimmed before submission.
// React JSX auto-escapes rendered strings, preventing XSS from stored data.

import {
  ChevronRight,
  Clock,
  Globe,
  Loader2,
  Mail,
  MapPin,
  Shield,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { GlassCard } from "../components/GlassCard";
import { SectionHeader } from "../components/SectionHeader";
import { useSubmitContact } from "../hooks/useBackend";
import type { ContactInput } from "../types";

const faqItems = [
  { q: "How soon do you respond?", a: "Within 24 hours", icon: Clock },
  { q: "Is my data secure?", a: "Yes, end-to-end encrypted", icon: Shield },
  { q: "Do you work remotely?", a: "Yes, globally available", icon: Globe },
];

export default function Contact() {
  const submitContact = useSubmitContact();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>();

  const onSubmit = async (data: ContactInput) => {
    const trimmed: ContactInput = {
      name: data.name.trim(),
      email: data.email.trim(),
      message: data.message.trim(),
    };
    try {
      await submitContact.mutateAsync(trimmed);
      toast.success(
        "Message sent successfully! We'll get back to you shortly.",
        {
          duration: 5000,
        },
      );
      reset();
    } catch {
      toast.error("Failed to send message. Please try again.", {
        duration: 5000,
      });
    }
  };

  const inputBase =
    "w-full rounded-lg px-4 py-3 bg-background/60 border border-border/50 text-foreground placeholder:text-muted-foreground/60 font-body text-sm transition-smooth focus:outline-none focus:border-accent focus:[box-shadow:0_0_12px_oklch(var(--accent)/0.25)] focus:bg-background/80";

  return (
    <section
      className="relative min-h-screen py-20 px-4"
      data-ocid="contact.page"
    >
      {/* Background ambient glow */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <SectionHeader
          title="Get in Touch"
          subtitle="Ready to secure your infrastructure? Let us know."
          accent="cyan"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Contact Form — 2/3 width */}
          <div className="lg:col-span-2">
            <GlassCard
              glow="cyan"
              className="p-8"
              data-ocid="contact.form_card"
            >
              <h3 className="font-display text-lg font-semibold text-foreground mb-6 tracking-wide uppercase">
                Send a Message
              </h3>
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="flex flex-col gap-6"
                data-ocid="contact.form"
              >
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-medium text-muted-foreground tracking-wide"
                  >
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
                    data-ocid="contact.name_input"
                    className={inputBase}
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    aria-invalid={!!errors.name}
                    aria-describedby={
                      errors.name ? "contact-name-error" : undefined
                    }
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      className="text-sm text-destructive mt-0.5"
                      role="alert"
                      data-ocid="contact.name_field_error"
                    >
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium text-muted-foreground tracking-wide"
                  >
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="you@company.com"
                    autoComplete="email"
                    data-ocid="contact.email_input"
                    className={inputBase}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    aria-invalid={!!errors.email}
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
                    }
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      className="text-sm text-destructive mt-0.5"
                      role="alert"
                      data-ocid="contact.email_field_error"
                    >
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-medium text-muted-foreground tracking-wide"
                  >
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Describe your security needs, infrastructure details, or any questions…"
                    data-ocid="contact.message_textarea"
                    className={`${inputBase} resize-none leading-relaxed`}
                    {...register("message", {
                      required: "Message is required",
                      minLength: {
                        value: 10,
                        message: "Message must be at least 10 characters",
                      },
                    })}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "contact-message-error" : undefined
                    }
                  />
                  {errors.message && (
                    <p
                      id="contact-message-error"
                      className="text-sm text-destructive mt-0.5"
                      role="alert"
                      data-ocid="contact.message_field_error"
                    >
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || submitContact.isPending}
                  data-ocid="contact.submit_button"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg font-display font-semibold text-sm uppercase tracking-widest transition-smooth bg-primary text-primary-foreground hover:opacity-90 glow-neon disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {isSubmitting || submitContact.isPending ? (
                    <>
                      <Loader2
                        className="w-4 h-4 animate-spin"
                        aria-hidden="true"
                      />
                      <span>Sending…</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ChevronRight className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            </GlassCard>

            {/* FAQ Row */}
            <div
              className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
              data-ocid="contact.faq_section"
            >
              {faqItems.map(({ q, a, icon: Icon }) => (
                <GlassCard key={q} className="flex flex-col gap-2 p-4">
                  <div className="flex items-center gap-2">
                    <Icon
                      className="w-4 h-4 shrink-0 text-accent"
                      aria-hidden="true"
                    />
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      {q}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{a}</p>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Contact Info Panel — 1/3 width, desktop only */}
          <aside
            className="hidden lg:flex flex-col gap-6"
            data-ocid="contact.info_panel"
          >
            <GlassCard glow="purple" className="flex flex-col gap-6 p-6">
              {/* Logo + tagline */}
              <div>
                <p className="font-display text-xl font-bold text-foreground uppercase tracking-widest">
                  Ryzous
                </p>
                <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                  Think Like a Hacker. Defend Like a Pro.
                </p>
              </div>

              <hr className="border-border/30" />

              {/* Address */}
              <div className="flex gap-3 items-start">
                <MapPin
                  className="w-4 h-4 shrink-0 mt-0.5 text-accent"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                    Headquarters
                  </p>
                  <p className="text-sm text-foreground leading-relaxed">
                    1 Cyber District, Suite 404
                    <br />
                    San Francisco, CA 94102
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3 items-start">
                <Mail
                  className="w-4 h-4 shrink-0 mt-0.5 text-primary"
                  aria-hidden="true"
                />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">
                    Security Team
                  </p>
                  <a
                    href="mailto:security@ryzous.com"
                    className="text-sm text-primary hover:text-primary/80 transition-colors break-all focus-visible:outline-none focus-visible:underline"
                    data-ocid="contact.email_link"
                  >
                    security@ryzous.com
                  </a>
                </div>
              </div>

              <hr className="border-border/30" />

              {/* Emergency badge */}
              <div className="flex items-center gap-2 rounded-lg bg-primary/10 border border-primary/25 px-3 py-2.5">
                <span
                  className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0"
                  aria-hidden="true"
                />
                <span className="text-xs font-display font-bold text-primary uppercase tracking-widest">
                  Emergency Response 24/7
                </span>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Critical incidents? Our rapid-response team is on call around
                the clock to contain breaches and neutralize threats in real
                time.
              </p>
            </GlassCard>

            {/* Certifications blurb */}
            <GlassCard className="p-4 flex flex-col gap-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Trusted by enterprise teams
              </p>
              <div className="flex flex-wrap gap-2">
                {["ISO 27001", "SOC 2 Type II", "OWASP Top 10", "PTES"].map(
                  (cert) => (
                    <span
                      key={cert}
                      className="text-xs px-2.5 py-1 rounded-md bg-muted/60 text-muted-foreground border border-border/30"
                    >
                      {cert}
                    </span>
                  ),
                )}
              </div>
            </GlassCard>
          </aside>
        </div>
      </div>
    </section>
  );
}
