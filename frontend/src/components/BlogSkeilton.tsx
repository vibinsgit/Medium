import { Circle } from "./BlogCard";

export const BlogSkeliton = () => {
  return (
    <div>
      <div role="status" className=" animate-pulse">
        <div>
          <div className="border-b border-slate-200 pt-6 max-w-screen-md cursor-pointer">
            <div className="flex">
              <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
              <div className="font-extralight pl-2 flex justify-center flex-col">
                <div className="h-2 w-48 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-4 w-48 bg-gray-200 rounded-full mb-2.5"></div>
              </div>
              <div className="flex justify-center flex-col pl-2">
                <Circle />
              </div>
              <div className="pl-1 font-thin text-slate-500 flex justify-center flex-col">
                <div className="h-2 w-48 bg-gray-200 rounded-full mb-2.5"></div>
              </div>
            </div>
            <div className="font-xl font-semibold text-lg pt-2">
              <div className="h-2 w-48 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="font-md font-thin pt-1">
              <div className="h-2 w-48 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-slate-400 text-sm font-thin pt-2">
              <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
