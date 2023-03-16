export default function Feeds() {
  return (
    <div className="ml-[300px] relative max-w-[600px] h-[10000px]  bg-red-900/20  ">
      <div className="sticky w-full top-0 bg-red-900/20">
        {/* Home */}
        <div className="flex text-[1.5rem] h-14 items-center px-4 cursor-pointer">
          <p className="font-bold ">Home</p>
        </div>
        {/* Tab Suggest-For you / Following */}
        <div className="grid grid-cols-2 text-[1.5rem] h-14 items-center cursor-pointer">
          <div className="w-full h-full hover:bg-red-900/20 hover:duration-200 duration-200">
            <div className="h-full border-b-4 border-black mx-auto w-fit flex items-center">
              <span className="">For you</span>
            </div>
          </div>
          <div className="w-full h-full hover:bg-red-900/20 hover:duration-200 duration-200">
            <div className="h-full border-b-4 border-black mx-auto w-fit flex items-center">
              <span className="">Following</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
