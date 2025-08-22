type Props = { onAction: (a: 'back' | 'continue') => void; state: any }
export default function JobFound({ onAction }: Props) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Great—congrats on the new job!</h1>
      <p className="text-gray-600">Placeholder screen. Send the next Figma for this branch and I’ll wire it.</p>
      <div className="flex gap-3">
        <button className="inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium border border-gray-300 hover:bg-gray-50" onClick={() => onAction('back')}>Back</button>
        <button className="inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium bg-black text-white" onClick={() => onAction('continue')}>Continue</button>
      </div>
    </div>
  )
}