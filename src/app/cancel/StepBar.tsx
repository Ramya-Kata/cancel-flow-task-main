'use client';

type Props = {
  current: number;        // 1-based
  total?: number;         // default 3
  className?: string;
  completedColor?: string; 
};

export default function StepBar({
  current,
  total = 3,
  className,
  completedColor = 'bg-green-500',
}: Props) {
  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      {Array.from({ length: total }).map((_, i) => {
        const isCompleted = i < current - 1;    
        const isActive = i === current - 1;     
        const base = 'inline-block h-1.5 w-6 rounded-full transition-colors';
        const tone = isCompleted
          ? completedColor                
          : isActive
          ? 'bg-gray-900'                
          : 'bg-gray-300';               
        return <span key={i} className={`${base} ${tone}`} aria-hidden />;
      })}
    </div>
  );
}