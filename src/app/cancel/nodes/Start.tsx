'use client'
import type { Dispatch, SetStateAction } from 'react'
import CardShell from './CardShell'
import Image from './Image'

type Props = {
  onAction: (a: 'job_yes' | 'job_no') => void
  state: any
  setState: Dispatch<SetStateAction<any>>
}

export default function Start({ onAction, setState }: Props) {
  const choose = (reason: 'found_job' | 'still_looking') => {
    setState((s: any) => ({ ...s, reason }))
    onAction(reason === 'found_job' ? 'job_yes' : 'job_no')
  }

  return (
    <CardShell>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* image: top on mobile, right on desktop */}
        <div className="lg:order-2 lg:col-span-6">
          <Image />
        </div>

        {/* copy + actions */}
        <div className="lg:order-1 lg:col-span-6 flex flex-col justify-center">
          <div className="space-y-4">
            <h2 className="text-[32px] lg:text-[36px] font-semibold leading-tight tracking-tight text-gray-900">
              Hey mate,<br />Quick one before you go.
            </h2>
            <p className="text-[22px] lg:text-[26px] italic font-semibold text-gray-900">
              Have you found a job yet?
            </p>
            <p className="text-sm md:text-base text-gray-600 max-w-prose">
              Whatever your answer, we just want to help you take the next step. With visa support, or by hearing how we can do better.
            </p>
          </div>

          <hr className="my-6 border-gray-200" />

          <div className="flex flex-col gap-3 max-w-sm">
          <button
            onClick={() => choose('found_job')}
            className=" inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium
                        border border-gray-300 bg-white text-gray-900
                        hover:bg-gray-100 hover:border-gray-400
                        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300
                        transition-colors">
              Yes, I’ve found a job
            </button>
            <button
              onClick={() => choose('still_looking')}
              className=" inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium
                          border border-gray-300 bg-white text-gray-900
                         hover:bg-gray-100 hover:border-gray-400
                          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-300
                          transition-colors">
              Not yet - I’m still looking
            </button>
          </div>
        </div>
      </div>
    </CardShell>
  )
}