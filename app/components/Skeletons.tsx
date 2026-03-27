const shimmer = "animate-pulse bg-bg-secondary rounded";

function StoryItemSkeleton() {
  return (
    <div className="py-2 flex flex-col w-full mb-2 border-b border-border-primary">
      <div className={`h-5 w-3/4 ${shimmer} mb-2`} />
      <div className={`h-3 w-24 ${shimmer} mb-2`} />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`h-3 w-10 ${shimmer}`} />
          <div className={`h-3 w-10 ${shimmer}`} />
          <div className={`h-3 w-10 ${shimmer}`} />
        </div>
        <div className={`h-3 w-12 ${shimmer}`} />
      </div>
    </div>
  );
}

export function StoryListSkeleton() {
  return (
    <div className="flex-1">
      {Array.from({ length: 10 }).map((_, i) => (
        <StoryItemSkeleton key={i} />
      ))}
    </div>
  );
}

function CommentSkeleton({ level = 0 }: { level?: number }) {
  return (
    <div
      className="pt-0 pr-2 pb-1 pl-3 flex flex-col my-2 border-l-2 border-border-primary"
      style={{ marginLeft: `calc(16px * ${level})` }}
    >
      <div className={`h-4 w-20 ${shimmer} mb-2`} />
      <div className={`h-3 w-full ${shimmer} mb-1`} />
      <div className={`h-3 w-5/6 ${shimmer} mb-1`} />
      <div className={`h-3 w-2/3 ${shimmer}`} />
    </div>
  );
}

export function StoryDetailSkeleton() {
  return (
    <div className="flex flex-col flex-1 mb-8">
      <div className={`h-6 w-16 ${shimmer} mb-2`} />
      <div className="flex flex-col p-4 border border-border-primary rounded">
        <div className={`h-6 w-3/4 ${shimmer} mb-2`} />
        <div className={`h-3 w-32 ${shimmer} mb-2`} />
        <div className="flex items-center gap-3 mb-2">
          <div className={`h-3 w-10 ${shimmer}`} />
          <div className={`h-3 w-10 ${shimmer}`} />
          <div className={`h-3 w-10 ${shimmer}`} />
        </div>
        <div className={`h-3 w-28 ${shimmer}`} />
      </div>
      <div className="mt-4">
        <CommentSkeleton level={0} />
        <CommentSkeleton level={1} />
        <CommentSkeleton level={2} />
        <CommentSkeleton level={1} />
        <CommentSkeleton level={0} />
        <CommentSkeleton level={1} />
      </div>
    </div>
  );
}
