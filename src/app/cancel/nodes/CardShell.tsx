'use client'

type Props = {
  title?: string
  onClose?: () => void
  onBack?: () => void
  className?: string
  children: React.ReactNode

  // progress / header extras
  currentStep?: number
  totalSteps?: number
  statusLabel?: string        // <-- NEW (e.g. "Completed")
}

export default function CardShell({
  title = 'Subscription Cancellation',
  onClose,
  onBack,
  className,
  children,
  currentStep = 1,
  totalSteps = 3,
  statusLabel,
}: Props) {
  const bars = Array.from({ length: totalSteps }, (_, i) => {
    // if statusLabel is set, treat as completed (all green)
    const base =
      statusLabel
        ? 'bg-emerald-500'
        : i + 1 === currentStep
          ? 'bg-gray-900'     // active
          : 'bg-gray-300'     // inactive

    return (
      <span key={i} className={`h-1.5 w-6 rounded-full ${base}`} />
    )
  })

  return (
    <div
      className={
        'w-[320px] md:w-[680px] lg:w-[1000px] ' +
        'rounded-2xl border border-gray-200 bg-white overflow-hidden ' +
        'shadow-[0_10px_30px_rgba(0,0,0,.12)] ' +
        (className ?? '')
      }
      role="dialog"
      aria-label={title}
    >
      {/* Title + controls */}
      <div className="border-b">
        <div className="relative flex items-center justify-between px-5 py-3">
          {/* Back (only if provided) */}
          {onBack ? (
            <button
              aria-label="Back"
              onClick={onBack}
              className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back
            </button>
          ) : <span />}

          {/* Centered title */}
          <div className="absolute left-0 right-0 flex justify-center pointer-events-none">
            <div className="text-sm font-medium text-gray-600">{title}</div>
          </div>

          {/* Close */}
          <button
            aria-label="Close"
            onClick={onClose ?? (() => history.back())}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Steps row */}
        <div className="px-5 pb-2">
          <div className="flex items-center justify-end gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-1">{bars}</div>
            <span>{statusLabel ?? `Step ${currentStep} of ${totalSteps}`}</span>
          </div>
        </div>
      </div>

      <div className="px-5 pb-6 pt-5">{children}</div>
    </div>
  )
}
