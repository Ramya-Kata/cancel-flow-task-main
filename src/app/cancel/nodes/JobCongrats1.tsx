'use client'

import type { Dispatch, SetStateAction } from 'react'
import CardShell from './CardShell'
import Image from './Image'

type Props = {
  onAction: (a: 'back' | 'continue' | string) => void
  state: any
  setState: Dispatch<SetStateAction<any>>
}

type QKey =
  | 'foundViaMM'
  | 'rolesAppliedRange'
  | 'companiesEmailedRange'
  | 'companiesInterviewedRange'

const RANGES_ROLES = ['0', '1 – 5', '6 – 20', '20+'] as const
const RANGES_EMAIL = ['0', '1–5', '6–20', '20+'] as const
const RANGES_INTERV = ['0', '1–2', '3–5', '5+'] as const

export default function JobCongrats1({ onAction, state, setState }: Props) {
  const survey = state?.job_survey ?? {}

  const setAnswer = (key: QKey, value: string | boolean) =>
    setState((s: any) => ({
      ...s,
      job_survey: { ...(s?.job_survey ?? {}), [key]: value },
    }))

  const canContinue =
    typeof survey.foundViaMM === 'boolean' &&
    !!survey.rolesAppliedRange &&
    !!survey.companiesEmailedRange &&
    !!survey.companiesInterviewedRange

  const continueNext = () => {
    if (!canContinue) return
    onAction('continue')
  }

  return (
    <CardShell onBack={() => onAction('back')} currentStep={1} totalSteps={3}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Image: first on mobile, right on desktop */}
        <div className="order-1 lg:order-2 lg:col-span-6 lg:self-start">
          <Image className="h-[200px] sm:h-[240px] md:h-[280px] lg:h-[360px]" />
        </div>

        {/* Form */}
        <div className="order-2 lg:order-1 lg:col-span-6">
          <h2 className="text-[28px] lg:text-[34px] font-semibold tracking-tight text-gray-900">
            Congrats on the new role! <span aria-hidden>🎉</span>
          </h2>

          {/* Q1 */}
          <div className="mt-6">
            <Label>Did you find this job with MigrateMate?*</Label>
            <TwoChoice
              left="Yes"
              right="No"
              value={survey.foundViaMM}
              onChange={(v) => setAnswer('foundViaMM', v)}
            />
          </div>

          {/* Q2 */}
          <div className="mt-5">
            <Label>
              How many roles did you <u>apply</u> for through Migrate Mate?*
            </Label>
            <PillGroup
              options={[...RANGES_ROLES]}
              value={survey.rolesAppliedRange as string}
              onChange={(v) => setAnswer('rolesAppliedRange', v)}
            />
          </div>

          {/* Q3 */}
          <div className="mt-5">
            <Label>
              How many companies did you <u>email</u> directly?*
            </Label>
            <PillGroup
              options={[...RANGES_EMAIL]}
              value={survey.companiesEmailedRange as string}
              onChange={(v) => setAnswer('companiesEmailedRange', v)}
            />
          </div>

          {/* Q4 */}
          <div className="mt-5">
            <Label>
              How many different companies did you <u>interview</u> with?*
            </Label>
            <PillGroup
              options={[...RANGES_INTERV]}
              value={survey.companiesInterviewedRange as string}
              onChange={(v) => setAnswer('companiesInterviewedRange', v)}
            />
          </div>

          {/* Divider + Continue */}
          <hr className="my-6 border-gray-200" />

          <button
            onClick={continueNext}
            disabled={!canContinue}
            className="
              w-full inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium
              border border-gray-300 bg-white text-gray-900
              hover:bg-gray-100 hover:border-gray-400
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300
              disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-white disabled:hover:border-gray-300
              transition-colors
            "
          >
            Continue
          </button>
        </div>
      </div>
    </CardShell>
  )
}

/* ---------- small UI helpers ---------- */

function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-2 text-sm font-medium text-gray-700">{children}</p>
}

function Pill({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'h-10 rounded-md border px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 ' +
        (active
          ? 'border-gray-900 bg-gray-100 text-gray-900'
          : 'border-gray-300 bg-white text-gray-900 hover:bg-gray-100 hover:border-gray-400')
      }
    >
      {children}
    </button>
  )
}

function PillGroup({
  options,
  value,
  onChange,
}: {
  options: readonly string[]
  value?: string
  onChange: (v: string) => void
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {options.map((opt) => (
        <Pill key={opt} active={value === opt} onClick={() => onChange(opt)}>
          {opt}
        </Pill>
      ))}
    </div>
  )
}

function TwoChoice({
  left,
  right,
  value,
  onChange,
}: {
  left: string
  right: string
  value?: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Pill active={value === true} onClick={() => onChange(true)}>
        {left}
      </Pill>
      <Pill active={value === false} onClick={() => onChange(false)}>
        {right}
      </Pill>
    </div>
  )
}
