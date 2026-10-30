export default function UsersLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between">
        <div className="h-8 w-32 animate-pulse rounded bg-zinc-200" />
        <div className="h-10 w-32 animate-pulse rounded-lg bg-zinc-200" />
      </div>
      <div className="overflow-hidden rounded-lg border border-zinc-200">
        <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-3">
          <div className="h-4 w-48 animate-pulse rounded bg-zinc-200" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 border-b border-zinc-100 px-4 py-3"
          >
            <div className="h-4 w-32 animate-pulse rounded bg-zinc-200" />
            <div className="h-4 w-48 animate-pulse rounded bg-zinc-200" />
            <div className="ml-auto h-4 w-20 animate-pulse rounded bg-zinc-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
