const SkeletonLoader = () => {
  return (
    <div className="flex flex-col space-y-5 overflow-auto mt-4 h-full p-2 border-1 pb-12 w-full">
      <div className="flex justify-end">
        <div className="w-32 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
      </div>
      {[...Array(5)].map((_, _index) => (
        <div className="flex justify-between items-center p-5 border-2 border-gray-200 shadow-xl rounded-xl cursor-pointer transition-all bg-white">
          <div className="flex flex-row space-x-4">
            {/* Placeholder for the image */}
            <div className="w-12 h-12 bg-gray-300 animate-pulse rounded-full"></div>
            <div className="flex flex-col space-y-2">
              {/* Placeholder for the title */}
              <div className="w-64 h-4 bg-gray-300 rounded-md animate-pulse"></div>
              {/* Placeholder for the description */}
              <div className="w-80 h-4 bg-gray-300 rounded-md animate-pulse"></div>
              {/* Placeholder for the date */}
              <div className="w-56 h-4 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
          </div>
          <div className="flex flex-row space-x-4">
            {/* Placeholder for Delete and Edit buttons */}
            <div className="w-10 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="w-10 h-10 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
