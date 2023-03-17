import Image from "next/image";
import { IoImageOutline } from "react-icons/io5";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import GetFeeds from "./Post";
import Post from "./Post";

const dunmmyData = [
  {
    id: "1",
    name: "Emma",
    username: "@Emma",
    userImg:
      "https://i1-ngoisao.vnecdn.net/2013/03/21/emma2-568345-1368249026.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=uJzCHUGZzRvsamRPmGleAw",
    // img: "https://images2.imgbox.com/f6/1f/kKL65zMF_o.jpg",
    img: "https://images.unsplash.com/photo-1587410131477-f01b22c59e1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGFsbCUyMHRvd2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    text: "What a beach!",
    timestamp: "3 hours ago",
  },
  {
    id: "2",
    name: "Keira",
    username: "@Keira",
    userImg:
      "https://c4.wallpaperflare.com/wallpaper/194/188/40/movie-pride-and-prejudice-keira-knightley-wallpaper-preview.jpg",
    img: "https://static.wikia.nocookie.net/janeausten/images/0/08/Elizabeth-keira-knightley-as-elizabeth-bennet-10470523-1250-840.jpg/revision/latest?cb=20131126184217",
    text: "Just",
    timestamp: "2 hours ago",
  },
];

export default function Feeds() {
  return (
    <div className=" sm:ml-[100px] lg:ml-[300px] min-w-[300px] relative flex-1 max-w-[600px] h-[10000px] divide-[rgb(239,243,244)] divide-y  border-r border-l border-[rgb(239,243,244)]">
      <div className="sticky w-full top-0  backdrop-blur-md">
        {/* Home */}
        <div className="flex text-[1.5rem] h-14 items-center px-4 cursor-pointer ">
          <p className="font-bold ">Home</p>
        </div>
        {/* Tab Suggest-For you / Following */}
        <div className="grid grid-cols-2 h-14 items-center cursor-pointer">
          <div className="w-full h-full hover: hover:duration-200 duration-200 hover:bg-slate-500/20">
            <div className="h-full border-b-4 border-black mx-auto w-fit flex items-center ">
              <span className="">For you</span>
            </div>
          </div>
          <div className="w-full h-full hover: hover:duration-200 duration-200 hover:bg-slate-500/20">
            <div className="h-full border-b-4 border-black mx-auto w-fit flex items-center ">
              <span className="">Following</span>
            </div>
          </div>
        </div>
      </div>
      <Input />
      {dunmmyData.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

function Input() {
  return (
    <div className="flex gap-4 p-4 divide-y-0 overflow-hidden">
      <Image
        src="https://i1-giaitri.vnecdn.net/2021/05/19/Emmawatson1-1621400705-7182-1621400757.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=ExMIZCSEwwZDEnqBYnlYjw"
        height={50}
        width={50}
        alt="user-ava"
        className="rounded-full w-[50px] h-[50px] object-cover"
      />
      <div className="flex-1 flex flex-col divide-y">
        <div className="">
          <textarea
            className="w-full outline-none p-1 divide-y resize-none"
            placeholder="What's happening?"
            rows={1}
            onChange={(e) => {
              e.target.style.height = "0";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
        </div>
        <div className="flex justify-between items-center p-2">
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
