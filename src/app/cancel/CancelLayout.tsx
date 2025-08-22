'use client'

export default function CancelLayout({ children }: { children: React.ReactNode }) {
  if (typeof window !== 'undefined') console.log('[CancelLayout] overlay v4 (light) in use')

  return (
    <div className="fixed inset-0 z-50 bg-gray-100/90 backdrop-blur-[2px]">
      <div className="h-full w-full overflow-y-auto p-4 md:p-10 flex items-center justify-center">
        <div role="dialog" aria-modal="true">
          {children}
        </div>
      </div>
    </div>
  )
}
