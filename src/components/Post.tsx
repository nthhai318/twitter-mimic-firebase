import Image from "next/image";
import { HiOutlineChat, HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { FiBarChart2 } from "react-icons/fi";
import { MdOutlineIosShare } from "react-icons/md";

type Post = {
  id: string;
  name: string;
  username: string;
  userImg: string;
  img: string;
  text: string;
  timestamp: string;
};

export default function Post({ post }: { post: Post }) {
  const { id, name, username, userImg, img, text, timestamp } = post;
  return (
    <div className="flex px-4 py-2 gap-4">
      <Image
        src={userImg}
        height={50}
        width={50}
        alt={`${username} ava`}
        className="mt-2 rounded-full w-[50px] h-[50px] object-cover"
      />
      <div className="flex flex-1 flex-col gap-3 mb-5 overflow-hidden">
        <div className="flex justify-between items-center ">
          <div className="flex gap-[1ch] justify-start flex-shrink">
            <span className="flex-shrink font-bold inline-block overflow-hidden whitespace-nowrap">
              {username}
            </span>
            <span className="flex-shrink whitespace-nowrap inline-block overflow-hidden">
              {username}
            </span>
            <span className="flex-shrink whitespace-nowrap inline-block overflow-hidden">
              {timestamp}
            </span>
          </div>
          <div className="rounded-full hover:bg-red-900/20 w-[2.2rem] h-[2.2rem] flex items-center justify-center">
            <HiOutlineDotsHorizontal size={20} />
          </div>
        </div>
        <div>{text}</div>
        <div className="flex w-full justify-center">
          <Image
            src={img}
            alt="Image"
            width={1000}
            height={1000}
            className="max-w-full w-auto h-auto max-h-[500px] rounded-lg object-contain"
          />
        </div>
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
