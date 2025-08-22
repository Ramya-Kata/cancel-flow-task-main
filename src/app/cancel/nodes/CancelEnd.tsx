'use client';

type Props = { onAction: (a: 'back' |'finish') => void };

import Image from './Image';
import CardShell from './CardShell';

export default function CancelEnd({ onAction }: Props) {
    
  return (
    <CardShell
      title="Subscription Cancelled"
      totalSteps={3}
      currentStep={3}
      statusLabel="Completed"
      onBack={() => onAction('back')}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <h2 className="text-[28px] lg:text-[34px] font-semibold tracking-tight text-gray-900">
            Sorry to see you go, mate.
          </h2>

          <p className="mt-3 text-lg text-gray-900">
            Thanks for being with us, and you’re always welcome back.
          </p>

          <div className="mt-4 text-sm md:text-base text-gray-700 space-y-2">
            <p>
              Your subscription is set to end on <span className="font-medium">XX date</span>.
              You’ll still have full access until then. No further charges after that.
            </p>
            <p className="text-gray-600">
              Changed your mind? You can reactivate anytime before your end date.
            </p>
          </div>

          <hr className="my-6 border-gray-200" />

          <button
            onClick={() => onAction('finish')}
            className="w-full inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-medium
                       bg-[#7E57FF] text-white hover:opacity-90
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7E57FF]/40"
          >
            Back to Jobs
          </button>
        </div>

        {/* Right image */}
        <div className="hidden lg:block lg:col-span-6 lg:self-start">
          <Image className="h-[360px]" />
        </div>
      </div>
    </CardShell>
  );
}
