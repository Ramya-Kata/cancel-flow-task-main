'use client'

import CardShell from './CardShell'
import Image from './Image'

type Props = {
  onAction: (a: 'finish' | 'back') => void
  /** optional overrides */
  contactName?: string
  contactEmail?: string
  avatarSrc?: string // put your image in /public and pass its path or use the default here
}

export default function CancelDoneVisaHelpNo({
  onAction,
  contactName = 'Mihailo Bozic',
  contactEmail = 'mihailo@migratemate.co',
  avatarSrc = '/mihailo-profile.jpeg', // <-- change to your actual filename in /public
}: Props) {
  return (
    <CardShell title="Subscription Cancelled" currentStep={3} totalSteps={3}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left copy */}
        <div className="lg:col-span-6">
          <h2 className="text-[28px] lg:text-[34px] font-semibold tracking-tight text-gray-900">
            Your cancellation’s all sorted, mate, no more charges.
          </h2>

          {/* Contact card */}
          <div className="mt-5 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <img
                src={avatarSrc}
                alt={contactName}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="min-w-0">
                <div className="font-medium text-gray-900 truncate">{contactName}</div>
                <div className="text-xs text-gray-600 truncate">{contactEmail}</div>
              </div>
            </div>

            <div className="mt-4 space-y-3 text-sm text-gray-800">
              <p className="font-medium">
                I’ll be reaching out soon to help with the visa side of things.
              </p>
              <p>
                We’ve got your back, whether it’s questions, paperwork, or just figuring
                out your options.
              </p>
              <p>
                Keep an eye on your inbox, I’ll be in touch <span className="underline">shortly</span>.
              </p>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          <button
            onClick={() => onAction('finish')}
            className="w-full inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium
                       bg-[#7E57FF] text-white hover:opacity-90
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7E57FF]/40"
          >
            Finish
          </button>
        </div>

        {/* Right image */}
        <div className="hidden lg:block lg:col-span-6 lg:self-start">
          <Image className="h-[360px]" />
        </div>
      </div>
    </CardShell>
  )
}
