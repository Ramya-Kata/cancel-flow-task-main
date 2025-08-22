'use client';

import { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import CardShell from './CardShell';
import Image from './Image';

type Props = {
  onAction: (a: 'back' | 'accept' | 'complete') => void;
  state: any;
  setState: Dispatch<SetStateAction<any>>;
};

export default function ReasonTooExpensive({ onAction, state, setState }: Props) {
  const [touched, setTouched] = useState(false);
  const value = state?.too_expensive_max ?? '';

  const setValue = (v: string) => setState((s: any) => ({ ...s, too_expensive_max: v }));

  const isValid = (() => {
    if (value === '' || value === null || value === undefined) return false;
    const num = Number(value);
    return Number.isFinite(num) && num > 0 && num < 10000; // simple sanity bound
  })();

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

          {/* Selected reason badge/row */}
          <div className="mt-4 flex items-center gap-2">
            <span className="relative flex h-4 w-4 items-center justify-center rounded-full border border-gray-900">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-900" />
            </span>
            <span className="text-sm md:text-base text-gray-900">Too expensive</span>
          </div>

          {/* Follow-up question */}
          <label className="mt-4 block text-sm md:text-base text-gray-900">
            What would be the maximum you would be willing to pay?<sup className="text-gray-400">*</sup>
          </label>
          <div className="mt-2 flex items-center gap-2">
            <span className="rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-gray-700">$</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => setTouched(true)}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
          </div>
          {!isValid && touched && (
            <p className="mt-2 text-xs text-[#D32F2F]">Please enter a valid amount greater than 0.</p>
          )}

          <hr className="my-6 border-gray-200" />

          {/* Green offer CTA */}
          <button
            onClick={() => onAction('accept')}
            className="w-full inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold
                       bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            Get 50% off&nbsp; | &nbsp;$12.50 <span className="ml-1 line-through opacity-80">$25</span>
          </button>

          {/* Complete cancellation (enabled only when isValid) */}
          <button
            onClick={() => isValid && onAction('complete')}
            disabled={!isValid}
            className="mt-3 w-full inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold
                       disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed
                       bg-[#D32F2F] text-white hover:opacity-90"
          >
            Complete cancellation
          </button>
        </div>
      </div>
    </CardShell>
  );
}
