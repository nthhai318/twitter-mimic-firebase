import Post from "./Post";
import { useSession } from "next-auth/react";
import Input from "./Input";

const dunmmyData = [
  {
    id: "1",
    name: "Emma",
    username: "@Emma",
    userImg:
      "https://i1-ngoisao.vnecdn.net/2013/03/21/emma2-568345-1368249026.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=uJzCHUGZzRvsamRPmGleAw",
    img: "https://images2.imgbox.com/f6/1f/kKL65zMF_o.jpg",
    // img: "https://images.unsplash.com/photo-1587410131477-f01b22c59e1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGFsbCUyMHRvd2VyfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
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
  const { data: sessionData } = useSession();
  return (
    <div className=" sm:ml-[100px] lg:ml-[300px] min-w-[300px] relative flex-1 max-w-[800px] divide-[rgb(239,243,244)] divide-y  border-r border-l border-[rgb(239,243,244)] xl:ml-[400px]">
      <button
        onClick={() => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        }}
        className="sticky w-full top-0  backdrop-blur-md"
      >
        {/* Home */}
        <div className="flex text-[1.5rem] h-14 items-center px-4 cursor-pointer ">
          <p className="font-bold ">Home</p>
        </div>
        {/* Tab Suggest-For you / Following
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
        </div> */}
      </button>
      {sessionData && <Input sessionData={sessionData} />}
      {dunmmyData.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}
