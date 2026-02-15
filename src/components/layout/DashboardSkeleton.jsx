const DashboardSkeleton = () => (
  <div className="max-w-md mx-auto bg-white min-h-screen p-4 space-y-6 animate-pulse">
    {/* Header Skeleton */}
    <div className="flex items-center justify-between py-2">
      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
      <div className="h-4 w-32 bg-gray-200 rounded"></div>
      <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
    </div>

    {/* UserPanel Skeleton */}
    <div className="h-32 bg-gray-100 rounded-2xl w-full"></div>

    <div className="h-[1px] bg-gray-100 w-full"></div>

    {/* TimePanel Skeleton */}
    <div className="flex gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-10 bg-gray-100 rounded-lg flex-1"></div>
      ))}
    </div>

    {/* StatCards Skeleton */}
    <div className="grid grid-cols-3 gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-20 bg-gray-100 rounded-xl"></div>
      ))}
    </div>

    {/* List Skeleton */}
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-16 bg-gray-50 rounded-xl w-full"></div>
      ))}
    </div>
  </div>
);
