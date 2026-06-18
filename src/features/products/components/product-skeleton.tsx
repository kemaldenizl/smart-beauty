interface ProductSkeletonProps {
  featured?: boolean;
}

export function ProductSkeleton({ featured = false }: ProductSkeletonProps) {
  return (
    <div
      className={`min-h-[360px] animate-pulse overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl ${
        featured ? "md:col-span-2" : ""
      }`}
    >
      <div className="h-44 rounded-[1.5rem] bg-white/10" />
      <div className="mt-5 h-3 w-24 rounded-full bg-pink-200/20" />
      <div className="mt-4 h-6 w-2/3 max-w-full rounded-full bg-white/10" />
      <div className="mt-4 space-y-2">
        <div className="h-4 w-full rounded-full bg-white/10" />
        <div className="h-4 w-4/5 max-w-full rounded-full bg-white/10" />
      </div>
      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="h-7 w-24 rounded-full bg-white/10" />
        <div className="h-11 w-32 max-w-[45%] rounded-full bg-white/10" />
      </div>
    </div>
  );
}
