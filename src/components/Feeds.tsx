import Image from "next/image";
import { IoImageOutline } from "react-icons/io5";
import { HiOutlineFaceSmile } from "react-icons/hi2";

export default function Feeds() {
  return (
    <div className="ml-[300px] relative max-w-[600px] h-[10000px] divide-[rgb(239,243,244)] divide-y bg-red-900/20 ">
      <div className="sticky w-full top-0 bg-red-900/20 backdrop-blur-md">
        {/* Home */}
        <div className="flex text-[1.5rem] h-14 items-center px-4 cursor-pointer ">
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
      <Input />
    </div>
  );
}

function Input() {
  return (
    <div className="flex gap-4 p-4 divide-y-0">
      <Image
        src="https://i1-giaitri.vnecdn.net/2021/05/19/Emmawatson1-1621400705-7182-1621400757.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=ExMIZCSEwwZDEnqBYnlYjw"
        height={75}
        width={75}
        alt="user-ava"
        className="rounded-full w-[75px] h-[75px] object-cover"
      />
      <div className="flex-1 flex flex-col divide-y">
        <div className="">
          <textarea
            className="w-full outline-none p-1 divide-y resize-none"
            rows={3}
            placeholder="What's happening?"
            onChange={(e) => {
              e.target.style.height = "0";
              e.target.style.height = `${Math.max(
                e.target.scrollHeight,
                80
              )}px`;
            }}
          />
        </div>
        <div className="flex justify-between items-center px-2">
          <div className="flex gap-3 p-2">
            <IoImageOutline size={20} />
            <HiOutlineFaceSmile size={20} />
          </div>
          <button
            disabled
            className="rounded-full bg-[rgb(29,155,240)] font-semibold px-4 py-2 text-white disabled:opacity-50"
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
