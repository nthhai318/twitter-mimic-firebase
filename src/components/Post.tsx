import Image from "next/image";
import { HiOutlineChat, HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { FiBarChart2 } from "react-icons/fi";
import { MdOutlineIosShare } from "react-icons/md";

type Post = {
  id: string;
  user: string;
  userImg: string;
  image?: string;
  content: string;
  timestamp: {
    seconds: number;
    nanosecond: number;
  };
};

export default function Post({ post }: { post: Post }) {
  const { user, userImg, image, content, timestamp } = post;
  return (
    <div className="flex px-4 py-2 gap-4 hover:bg-slate-400/10">
      <Image
        src={userImg}
        height={50}
        width={50}
        alt={`${user} ava`}
        className="mt-2 rounded-full w-[50px] h-[50px] object-cover"
      />
      <div className="flex flex-1 flex-col gap-3 mb-5 overflow-hidden">
        <div className="flex justify-between items-center ">
          <div className="flex gap-[1ch] justify-start flex-shrink">
            <span className="flex-shrink font-bold inline-block overflow-hidden whitespace-nowrap">
              {user}
            </span>
            <span className="flex-shrink whitespace-nowrap inline-block overflow-hidden">
              {timestamp && displayDate(Math.floor(timestamp.seconds / 60))}
            </span>
          </div>
          <div className="rounded-full hover:bg-red-900/20 w-[2.2rem] h-[2.2rem] flex items-center justify-center">
            <HiOutlineDotsHorizontal size={20} />
          </div>
        </div>
        <div>{content}</div>
        {image && (
          <div className="flex w-full justify-center">
            <Image
              src={image}
              alt="Image"
              width={1000}
              height={1000}
              className="max-w-full w-auto h-auto max-h-[500px] rounded-lg object-contain"
            />
          </div>
        )}
        <div className="flex justify-between">
          <HiOutlineChat size={20} />
          <AiOutlineRetweet size={20} />
          <AiOutlineHeart size={20} />
          <FiBarChart2 size={20} />
          <MdOutlineIosShare size={20} />
        </div>
      </div>
    </div>
  );
}

function displayDate(minute: number) {
  const difference = Math.floor(Date.now() / 60000) - minute;
  if (difference < 5) {
    return `just now`;
  } else if (difference < 60) {
    return `${difference}m`;
  } else if (difference < 1440) {
    return `${Math.floor(difference / 60)}h`;
  } else {
    return new Date(minute * 60 * 1000).toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
}
