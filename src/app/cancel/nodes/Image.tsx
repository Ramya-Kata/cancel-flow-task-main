'use client';
import NextImage from 'next/image';
import skyline from '@/../public/empire-state-compressed.jpg';

type Props = {
  /** Height per breakpoint; override if a screen needs a different height */
  className?: string;
  /** Corner radius override (optional) */
  rounded?: string;
};

export default function Image({
  className = 'h-[220px] md:h-[260px] lg:h-[320px]',
  rounded = 'rounded-2xl',
}: Props) {
  return (
    <div className={`relative w-full ${className} ${rounded} overflow-hidden shadow-sm`}>
      <NextImage src={skyline} alt="City skyline" fill className="object-cover" priority />
    </div>
  );
}
