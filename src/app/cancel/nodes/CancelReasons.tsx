'use client';

import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import CardShell from './CardShell';
import Image from './Image';

type Props = {
  onAction: (a: 'back' | 'accept' | 'too_expensive' | 'platform_not_helpful' | 'not_enough_jobs' | 'not_to_move' | 'other') => void;
  state: any;
  setState: Dispatch<SetStateAction<any>>;
};

const REASONS = [
  { id: 'too_expensive', label: 'Too expensive' },
  { id: 'platform_not_helpful', label: 'Platform not helpful' },
  { id: 'not_enough_jobs', label: 'Not enough relevant jobs' },
  { id: 'not_to_move', label: 'Decided not to move' },
  { id: 'other', label: 'Other' },
] as const;

type ReasonId = typeof REASONS[number]['id'];

export default function CancelReasons({ onAction, state, setState }: Props) {
  const selected: ReasonId | undefined = state?.cancel_reason_id;
  const [showError, setShowError] = useState(false);

  const pick = (id: ReasonId, label: string) => {
    setShowError(false);
    setState((s: any) => ({ ...s, cancel_reason_id: id, cancel_reason_label: label }));
  };

  const acceptOffer = () => onAction('accept');

  const goNext = () => {
    if (!selected) {
      setShowError(true);
      return;
    }
    onAction(selected); // e.g., 'too_expensive'
  };

  return (
    <CardShell
      title="Subscription Cancellation"
      currentStep={3}
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
          <h2 className="text-[28px] lg:text-[34px] font-semibold tracking-tight text-gray-900">
            What’s the main reason for cancelling?
          </h2>
          <p className="mt-2 text-sm text-gray-700">Please take a minute to let us know why:</p>

          {/* Error helper */}
          {showError && (
            <p className="mt-4 text-sm text-[#D32F2F]">
              To help us understand your experience, please select a reason for cancelling
              <sup className="text-gray-400">*</sup>
            </p>
          )}

          <ul className="mt-4 space-y-3" role="radiogroup" aria-invalid={showError}>
            {REASONS.map((r) => {
              const active = selected === r.id;
              return (
                <li key={r.id}>
                  <button
                    type="button"
                    onClick={() => pick(r.id, r.label)}
                    className="w-full flex items-center gap-3 rounded-md border border-gray-200 bg-white px-3 py-2 text-left hover:bg-gray-50"
                    aria-pressed={active}
                    role="radio"
                    aria-checked={active}
                  >
                    {/* ✅ black filled radio when active */}
                    <span
                      className={`relative flex h-4 w-4 items-center justify-center rounded-full border ${
                        active ? 'border-gray-900' : 'border-gray-400'
                      }`}
                    >
                      {active && <span className="h-2.5 w-2.5 rounded-full bg-gray-900" />}
                    </span>
                    <span className="text-sm md:text-base text-gray-900">{r.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <hr className="my-6 border-gray-200" />

          {/* Green offer CTA (unchanged) */}
          <button
            onClick={acceptOffer}
            className="w-full inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold
                       bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            Get 50% off&nbsp; | &nbsp;$12.50 <span className="ml-1 line-through opacity-80">$25</span>
          </button>

          {/* Continue -> routes to reason-specific next page */}
          <button
            onClick={goNext}
            className="mt-3 w-full inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold
                       bg-[#D32F2F] text-white hover:opacity-90 transition-colors"
          >
            Continue
          </button>
        </div>
      </div>
    </CardShell>
  );
}
