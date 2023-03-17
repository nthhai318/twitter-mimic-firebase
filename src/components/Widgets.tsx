import { FiSearch } from "react-icons/fi";

export default function Widgets() {
  return (
    <div className="p-5 flex-shrink sm:w-[100px] lg:w-[300px] max-w-[600px] bg-blue-900/20 hidden sm:inline">
      {/* Search bar */}
      <div className="py-2 px-3 w-fit lg:w-full mx-auto rounded-full border-gray-600/50 border">
        <input
          type="text"
          placeholder="Search Twitter"
          className="bg-transparent outline-none p-0 hidden lg:inline"
        />
        <FiSearch size={20} className="lg:hidden" />
      </div>
    </div>
  );
}
