// src/components/cancel/nodes/VisaSupport.tsx
'use client'

import type { Dispatch, SetStateAction } from 'react'
import CardShell from './CardShell'
import Image from './Image'

type Props = {
  onAction: (a: 'back' | 'yes' | 'no') => void
  state: any
  setState: Dispatch<SetStateAction<any>>
}

export default function VisaSupport({ onAction, state, setState }: Props) {
  const answer: 'yes' | 'no' | undefined = state?.visa_support_answer
  const setAnswer = (v: 'yes' | 'no') =>
    setState((s: any) => ({ ...s, visa_support_answer: v }))

  return (
    <CardShell currentStep={3} totalSteps={3} onBack={() => onAction('back')}>
      {/* prevent SSR/extension diffs from throwing hydration warnings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" suppressHydrationWarning>
        <div className="lg:col-span-6">
          <h2 className="text-[28px] lg:text-[34px] font-semibold tracking-tight text-gray-900">
            We helped you land the job, now let’s help you secure your visa.
          </h2>

          <p className="mt-6 text-sm md:text-base text-gray-900">
            Is your company providing an immigration lawyer to help with your visa?*
          </p>

          <div className="mt-3 space-y-3">
            <label className="flex items-center gap-3 text-gray-900">
              <input
                type="radio"
                name="visa_intro"
                className="h-4 w-4"
                checked={answer === 'yes'}
                onChange={() => setAnswer('yes')}
                // keep Grammarly out
                data-gramm="false"
                data-gramm_editor="false"
                autoComplete="off"
              />
              <span>Yes</span>
            </label>

            <label className="flex items-center gap-3 text-gray-900">
              <input
                type="radio"
                name="visa_intro"
                className="h-4 w-4"
                checked={answer === 'no'}
                onChange={() => setAnswer('no')}
                data-gramm="false"
                data-gramm_editor="false"
                autoComplete="off"
              />
              <span>No</span>
            </label>
          </div>

          <hr className="my-6 border-gray-200" />

          <button
            onClick={() => answer && onAction(answer)}
            disabled={!answer}
            className="w-full inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium
                       border border-gray-300 bg-white text-gray-900
                       hover:bg-gray-100 hover:border-gray-400
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300
                       disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
          >
            Continue
          </button>
        </div>

        <div className="hidden lg:block lg:col-span-6 lg:self-start">
          <Image className="h-[360px]" />
        </div>
      </div>
    </CardShell>
  )
}
