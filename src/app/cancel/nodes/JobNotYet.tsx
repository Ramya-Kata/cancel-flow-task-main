type Props = { onAction: (a: 'back' | 'continue') => void; state: any }
export default function JobNotYet({ onAction }: Props) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Working on it, Sorry.</h1>
      <p className="text-gray-600">In Process!!!</p>
      <div className="flex gap-3">
        <button className="inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium border border-gray-300 hover:bg-gray-50" onClick={() => onAction('back')}>Back</button>
        <button className="inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium bg-black text-white" onClick={() => onAction('continue')}>Continue</button>
      </div>
    </div>
  )
}