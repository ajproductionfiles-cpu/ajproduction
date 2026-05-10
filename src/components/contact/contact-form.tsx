"use client";

import { useActionState } from "react";
import { CheckCircle2 } from "lucide-react";
import { submitInquiryAction } from "@/app/admin/actions";
import { SubmitButton } from "@/components/admin/submit-button";

type ContactFormProps = {
  services: string[];
  budgets: string[];
  successTitle: string;
  successBody: string;
  submitLabel: string;
};

type ContactFormState = {
  error?: string;
  success?: string;
};

const initialState: ContactFormState = {};

export function ContactForm({
  services,
  budgets,
  successTitle,
  successBody,
  submitLabel,
}: ContactFormProps) {
  const [state, action] = useActionState<ContactFormState, FormData>(submitInquiryAction, initialState);

  if (state?.success) {
    return (
      <div
        aria-live="polite"
        className="surface-card-strong fade-up-enter rounded-[2.5rem] p-10 text-center md:p-16"
      >
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--brand-blue-soft)] text-[var(--brand-blue)]">
          <CheckCircle2 size={34} />
        </div>
        <h2 className="section-title mt-6">{successTitle}</h2>
        <p className="body-large mx-auto mt-3 max-w-[32rem]">{successBody}</p>
      </div>
    );
  }

  return (
    <form
      action={action}
      className="surface-card-strong rounded-[2.5rem] p-8 md:p-16"
    >
      <div className="grid gap-10 md:grid-cols-2">
        <Field label="Your name" htmlFor="contact-name">
          <input id="contact-name" name="name" placeholder="Steve Jobs" required className="field-input" />
        </Field>
        <Field label="Email address" htmlFor="contact-email">
          <input id="contact-email" name="email" type="email" placeholder="steve@apple.com" required className="field-input" />
        </Field>
        <Field label="Phone number" htmlFor="contact-phone">
          <input id="contact-phone" name="phone" placeholder="+1 (555) 010-2040" className="field-input" />
        </Field>
        <Field label="Estimated budget" htmlFor="contact-budget">
          <select id="contact-budget" name="budget" className="field-input">
            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <fieldset className="mt-10 space-y-3">
        <legend className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
          Select a service
        </legend>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <label
              key={service}
              className="flex cursor-pointer items-center gap-3 rounded-[1.3rem] border border-[var(--line-soft)] bg-white px-4 py-4 text-[14px] font-semibold text-[var(--text-primary)] hover:border-[var(--brand-blue)] hover:bg-[var(--brand-blue-soft)]"
            >
              <input
                type="radio"
                name="service"
                value={service}
                defaultChecked={index === 0}
                className="accent-[var(--brand-blue)]"
              />
              <span>{service}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-10 space-y-3">
        <label htmlFor="contact-message" className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
          How can we help?
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          placeholder="Tell us about your vision..."
          className="w-full rounded-[2rem] border border-transparent bg-[var(--surface-soft)] p-6 text-[17px] text-[var(--text-primary)] outline-none focus:border-[var(--line-soft)] focus:bg-white focus:ring-2 focus:ring-[var(--brand-blue-soft)]"
        />
      </div>

      {state?.error ? (
        <p className="mt-6 rounded-[1.25rem] border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700" aria-live="polite">
          {state.error}
        </p>
      ) : null}

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="text-[14px] leading-relaxed text-[var(--text-tertiary)]">
          We typically reply within one business day with the right next step.
        </p>
        <SubmitButton
          label={submitLabel}
          pendingLabel="Sending..."
          className="studio-pill-primary w-full justify-center px-8 md:w-auto"
        />
      </div>
    </form>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <label htmlFor={htmlFor} className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[var(--text-muted)]">
        {label}
      </label>
      {children}
    </div>
  );
}
