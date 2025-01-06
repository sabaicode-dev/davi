const SkeletonLoader = () => {
  return (
    <div className="flex flex-col space-y-3 w-full max-w-screen-xl mx-auto p-6">
    {/* Header Skeleton */}
    <div className="w-40 h-9 bg-gray-200 rounded animate-pulse mb-5"></div>
    
    {/* Skeleton Items */}
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="flex items-center px-7 py-5 bg-gray-50 rounded-lg hover:bg-gray-100"
      >
        {/* Left section with number and icon */}
        <div className="flex items-center space-x-5 min-w-[130px]">
          <span className="text-gray-200 text-lg animate-pulse">#{index + 1}</span>
          <span className="text-gray-200 text-lg">|</span>
          {/* Document icon placeholder */}
          <div className="w-6 h-8 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Middle section with title and date */}
        <div className="flex flex-col flex-grow gap-2">
          {/* Title placeholder */}
          <div className="w-72 h-6 bg-gray-200 rounded animate-pulse"></div>
          {/* Date placeholder */}
          <div className="w-56 h-5 bg-gray-200 rounded animate-pulse"></div>
        </div>
        
        {/* Right section with delete icon */}
        <div className="w-7 h-7 bg-gray-200 rounded animate-pulse mr-3"></div>
      </div>
    ))}
  </div>
    
);
};

export default SkeletonLoader;
