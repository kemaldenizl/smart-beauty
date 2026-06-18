export function ProductSkeleton() {
    return (
      <div className="h-72 animate-pulse rounded-3xl border border-white/10 bg-white/5 p-5">
        <div className="h-36 rounded-2xl bg-white/10" />
        <div className="mt-5 h-5 w-2/3 rounded bg-white/10" />
        <div className="mt-3 h-4 w-full rounded bg-white/10" />
        <div className="mt-2 h-4 w-4/5 rounded bg-white/10" />
        <div className="mt-6 h-10 rounded-full bg-white/10" />
      </div>
    );
  }