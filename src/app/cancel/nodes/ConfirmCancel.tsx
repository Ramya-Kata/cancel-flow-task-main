type Props = { onAction: (a: 'yes' | 'no' | 'back') => void; state: any }
export default function ConfirmCancel({ onAction }: Props) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Are you sure you want to cancel?</h1>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => onAction('yes')}
          className="inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium bg-black text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black/30"
        >
          Yes, continue
        </button>
        <button
          onClick={() => onAction('no')}
          className="inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          No, keep it
        </button>
      </div>
      <button
        onClick={() => onAction('back')}
        className="text-sm text-gray-500 underline-offset-2 hover:underline"
      >
        Back
      </button>
    </div>
  )
}