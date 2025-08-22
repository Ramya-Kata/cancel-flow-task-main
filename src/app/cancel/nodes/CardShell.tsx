'use client'

type Props = {
  title?: string
  onClose?: () => void
  onBack?: () => void
  className?: string
  children: React.ReactNode

  currentStep?: number
  totalSteps?: number
  statusLabel?: string
}

export default function CardShell({
  title = 'Subscription Cancellation',
  onClose,
  onBack,
  className,
  children,
  currentStep,        // ❌ no default
  totalSteps,         // ❌ no default
  statusLabel,
}: Props) {
  const showSteps =
    typeof totalSteps === 'number' &&
    (typeof currentStep === 'number' || !!statusLabel);

  const bars = showSteps
    ? Array.from({ length: totalSteps! }, (_, i) => {
        const stepNum = i + 1;
        const isCompleted =
          !!statusLabel || (typeof currentStep === 'number' && stepNum < currentStep);
        const isActive =
          !statusLabel && typeof currentStep === 'number' && stepNum === currentStep;

        const tone = isCompleted
          ? 'bg-emerald-500'
          : isActive
          ? 'bg-gray-900'
          : 'bg-gray-300';

        return (
          <span
            key={i}
            className={`h-1.5 w-6 rounded-full ${tone}`}
            aria-label={`Step ${stepNum} ${isCompleted ? 'completed' : isActive ? 'current' : 'upcoming'}`}
            aria-current={isActive ? 'step' : undefined}
          />
        );
      })
    : null;

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

          <div className="absolute left-0 right-0 flex justify-center pointer-events-none">
            <div className="text-sm font-medium text-gray-600">{title}</div>
          </div>

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

        {/* Steps row — only when step props are provided */}
        {showSteps && (
          <div className="px-5 pb-2">
            <div className="flex items-center justify-end gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">{bars}</div>
              <span>{statusLabel ?? `Step ${currentStep} of ${totalSteps}`}</span>
            </div>
          </div>
        )}
      </div>

      <div className="px-5 pb-6 pt-5">{children}</div>
    </div>
  )
}
