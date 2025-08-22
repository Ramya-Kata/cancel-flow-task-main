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

const MIN = 25;

export default function ReasonPlatformNotHelpful({ onAction, state, setState }: Props) {
  const [touched, setTouched] = useState(false);
  const value: string = state?.platform_feedback ?? '';

  const setValue = (v: string) =>
    setState((s: any) => ({ ...s, platform_feedback: v }));

  const len = value.trim().length;
  const isValid = len >= MIN;

  const tryComplete = () => {
    if (!isValid) {
      setTouched(true);
      return;
    }
    onAction('complete');
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
            What’s the main reason?
          </h2>
          <p className="mt-2 text-sm text-gray-700">
            Please take a minute to let us know why:
          </p>

          {/* Selected reason row (black radio) */}
          <div className="mt-4 flex items-center gap-2">
            <span className="relative flex h-4 w-4 items-center justify-center rounded-full border border-gray-900">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-900" />
            </span>
            <span className="text-sm md:text-base text-gray-900">Platform not helpful</span>
          </div>

          {/* Follow-up question + error */}
          <label className="mt-4 block text-sm md:text-base text-gray-900">
            What can we change to make the platform more helpful?<sup className="text-gray-400">*</sup>
          </label>

          {!isValid && touched && (
            <p className="mt-2 text-sm text-[#D32F2F]">
              Please enter at least 25 characters so we can understand your feedback<sup className="text-gray-400">*</sup>
            </p>
          )}

          <div className="mt-2 relative">
            <textarea
              rows={6}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => setTouched(true)}
              className="w-full resize-y rounded-md border border-gray-300 bg-white p-3 text-gray-900 shadow-sm outline-none
                         focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
            />
            <div className="pointer-events-none absolute bottom-2 right-3 text-xs text-gray-500">
              Min {MIN} characters ({Math.min(len, MIN)}/{MIN})
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Green offer CTA */}
          <button
            onClick={() => onAction('accept')}
            className="w-full inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold
                       bg-green-600 text-white hover:bg-green-700 transition-colors"
          >
            Get 50% off&nbsp; | &nbsp;$12.50 <span className="ml-1 line-through opacity-80">$25</span>
          </button>

          {/* Complete cancellation */}
          <button
            onClick={tryComplete}
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
