'use client'

import type { Dispatch, SetStateAction } from 'react'
import CardShell from './CardShell'
import Image from './Image'

type Props = {
  onAction: (a: 'back' | 'done') => void
  state: any
  setState: Dispatch<SetStateAction<any>>
}

export default function VisaYes({ onAction, state, setState }: Props) {
  const visaType: string = state?.visa_type_yes ?? ''
  const setVisa = (v: string) =>
    setState((s: any) => ({ ...s, visa_type_yes: v }))

  const canFinish = visaType.trim().length > 0

  return (
    <CardShell currentStep={3} totalSteps={3} onBack={() => onAction('back')}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <h2 className="text-[28px] lg:text-[34px] font-semibold tracking-tight text-gray-900">
            We helped you land the job, now let’s help you secure your visa.
          </h2>

          {/* Show only Yes radio */}
          <p className="mt-6 text-sm md:text-base text-gray-900">
            Is your company providing an immigration lawyer to help with your visa?*
          </p>
          <div className="mt-3">
            <label className="flex items-center gap-3 select-none">
              <input
                type="radio"
                className="h-4 w-4"
                name="company_lawyer"
                checked
                readOnly
              />
              <span className="text-gray-900">Yes</span>
            </label>
          </div>

          <p className="mt-6 text-sm md:text-base text-gray-900">
            What visa will you be applying for?*
          </p>

          <input
            type="text"
            value={visaType}
            onChange={(e) => setVisa(e.target.value)}
            placeholder="Enter visa type…"
            className="mt-3 w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 shadow-sm outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-200"
          />

          <hr className="my-6 border-gray-200" />

          <button
            onClick={() => canFinish && onAction('done')}
            disabled={!canFinish}
            className="w-full inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium
                       border border-gray-300 bg-white text-gray-900
                       hover:bg-gray-100 hover:border-gray-400
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300
                       disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
          >
            Complete cancellation
          </button>
        </div>

        <div className="hidden lg:block lg:col-span-6 lg:self-start">
          <Image className="h-[360px]" />
        </div>
      </div>
    </CardShell>
  )
}
