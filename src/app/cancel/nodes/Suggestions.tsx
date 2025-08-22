'use client'

import type { Dispatch, SetStateAction } from 'react'
import CardShell from './CardShell'
import Image from './Image'

type Props = {
  onAction: (a: 'back' | 'continue' | string) => void
  state: any
  setState: Dispatch<SetStateAction<any>>
}

const MIN = 25

export default function Suggestions({ onAction, state, setState }: Props) {
  const value: string = state?.improve_text ?? ''
  const setValue = (v: string) => setState((s: any) => ({ ...s, improve_text: v }))
  const canContinue = value.trim().length >= MIN

  return (
    <CardShell
      currentStep={2}
      totalSteps={3}
      onBack={() => onAction('back')}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: copy + textarea */}
        <div className="lg:col-span-6">
          <h2 className="text-[28px] lg:text-[34px] font-semibold tracking-tight text-gray-900">
            What’s one thing you wish we could’ve helped you with?
          </h2>

          <p className="mt-4 text-sm md:text-base text-gray-700">
            We’re always looking to improve, your thoughts can help us make Migrate Mate
            more useful for others.<sup className="text-gray-400">*</sup>
          </p>

          <div className="mt-5">
            <div className="relative">
              <textarea
                rows={6}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full resize-y rounded-md border border-gray-300 bg-white p-3 text-gray-900 shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
              />
              <div className="pointer-events-none absolute bottom-2 right-3 text-xs text-gray-500">
                Min {MIN} characters ({Math.min(value.trim().length, MIN)}/{MIN})
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          <button
            onClick={() => canContinue && onAction('continue')}
            disabled={!canContinue}
            className="w-full inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium
                       border border-gray-300 bg-white text-gray-900
                       hover:bg-gray-100 hover:border-gray-400
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300
                       disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-white disabled:hover:border-gray-300
                       transition-colors"
          >
            Continue
          </button>
        </div>

        {/* Right: image (desktop only) */}
        <div className="hidden lg:block lg:col-span-6 lg:self-start">
          <Image className="h-[360px]" />
        </div>
      </div>
    </CardShell>
  )
}