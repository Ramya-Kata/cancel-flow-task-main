'use client';

import type { Dispatch, SetStateAction } from 'react';
import CardShell from './CardShell';
import Image from './Image';

type Props = {
  onAction: (a: 'back' | 'accept' | 'continue') => void;
  state: any;
  setState: Dispatch<SetStateAction<any>>;
};

// Options shown on each row
const OPTIONS = ['0', '1–5', '6–20', '20+'] as const;
type Opt = typeof OPTIONS[number];

// Reusable segmented row
function SegRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: Opt;
  onChange: (o: Opt) => void;
}) {
  return (
    <div className="mt-5">
      <p className="text-sm md:text-base text-gray-900">{label}</p>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {OPTIONS.map((o) => {
          const active = value === o;
          const base =
            'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm md:text-base border transition-colors';
          const tone = active
            ? 'bg-[#7E57FF] text-white border-[#7E57FF]'
            : 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
          return (
            <button
              type="button"
              key={o}
              className={`${base} ${tone}`}
              aria-pressed={active}
              onClick={() => onChange(o)}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function OfferDeclinedUsage1({ onAction, state, setState }: Props) {
  const { usage_applied, usage_emailed, usage_interviewed } = state ?? {};

  const set = (k: 'usage_applied' | 'usage_emailed' | 'usage_interviewed', v: Opt) =>
    setState((s: any) => ({ ...s, [k]: v }));

  const canContinue = !!(usage_applied && usage_emailed && usage_interviewed);

  const acceptOffer = () => {
    setState((s: any) => ({ ...s, offer_choice: '50_off_until_job' }));
    onAction('accept');
  };

  return (
    <CardShell
      title="Subscription Cancellation"
      currentStep={2}
      totalSteps={3}
      onBack={() => onAction('back')}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Right image (desktop) */}
        <div className="hidden lg:block lg:order-2 lg:col-span-6">
          <Image className="h-[360px]" />
        </div>

        {/* Left content */}
        <div className="lg:order-1 lg:col-span-6">
          {/* ✅ Mobile wording */}
          <div className="block lg:hidden">
            <h2 className="text-[22px] font-semibold tracking-tight text-gray-900">
              What’s the main reason for cancelling?
            </h2>
            <p className="mt-2 text-sm text-[#D32F2F]">
              Mind letting us know why you’re cancelling? It helps us understand your
              experience and improve the platform.<sup className="text-gray-400">*</sup>
            </p>
          </div>

          {/* ✅ Desktop wording */}
          <h2 className="hidden lg:block text-[28px] lg:text-[34px] font-semibold tracking-tight text-gray-900">
            Help us understand how you were using Migrate Mate.
          </h2>

          {/* Rows */}
          <SegRow
            label="How many roles did you apply for through Migrate Mate?"
            value={usage_applied}
            onChange={(o) => set('usage_applied', o)}
          />
          <SegRow
            label="How many companies did you email directly?"
            value={usage_emailed}
            onChange={(o) => set('usage_emailed', o)}
          />
          <SegRow
            label="How many different companies did you interview with?"
            value={usage_interviewed}
            onChange={(o) => set('usage_interviewed', o)}
          />

          <hr className="my-6 border-gray-200" />

          {/* Offer CTA (green) */}
          <button
            onClick={acceptOffer}
            className="w-full inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold
                       bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            Get 50% off&nbsp; | &nbsp;$12.50 <span className="ml-1 line-through opacity-80">$25</span>
          </button>

          {/* Continue (disabled until all answered) */}
          <button
            onClick={() => canContinue && onAction('continue')}
            disabled={!canContinue}
            className="mt-3 w-full inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold
                       bg-[#D32F2F] text-white hover:opacity-90
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:opacity-50
                       transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </CardShell>
  );
}
