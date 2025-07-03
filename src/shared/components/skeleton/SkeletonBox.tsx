interface SkeletonBoxProps {
  className?: string;
}

export default function SkeletonBox({ className = "" }: SkeletonBoxProps) {
  return <div className={`animate-pulse rounded-md bg-gray-20 ${className}`} aria-hidden="true" />;
}
