import Image from "next/image";
import { ReactComponentElement } from "react";
import { IconType } from "react-icons";
import {
  HiOutlineBell,
  HiOutlineBookmark,
  HiOutlineClipboardList,
  HiOutlineDotsCircleHorizontal,
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlineMail,
  HiOutlineUser,
} from "react-icons/hi";

export default function Sidebar() {
  return (
    <div className="bg-slate-500/20 w-[300px] flex flex-col justify-between fixed h-full overflow-y-auto">
      <div className="flex flex-col gap-7">
        {/* Incorporation Logo */}
        <Image
          src="/random.svg"
          alt="logo"
          width={300}
          height={300}
          className="w-[200px] mt-7 h-[50px] mx-auto object-cover"
        />

        {/* SidebarMenu Items */}
        <div className=" flex flex-col gap-3 w-fit mx-auto">
          <MenuItem menu="home" Icon={HiOutlineHome} />
          <MenuItem menu="explore" Icon={HiOutlineHashtag} />
          <MenuItem menu="notifications" Icon={HiOutlineBell} />
          <MenuItem menu="messages" Icon={HiOutlineMail} />
          <MenuItem menu="bookmarks" Icon={HiOutlineBookmark} />
          <MenuItem menu="list" Icon={HiOutlineClipboardList} />
          <MenuItem menu="profile" Icon={HiOutlineUser} />
          <MenuItem menu="more" Icon={HiOutlineDotsCircleHorizontal} />
        </div>

        {/* Tweet button */}
        <button className="rounded-full w-[150px] text-white text-[1.5rem] font-semibold bg-[rgb(29,155,240)] px-8 py-2 mx-auto">
          Tweet
        </button>
      </div>

      {/* User Profile */}
      <UserProfile />
    </div>
  );
}

function MenuItem({ Icon, menu }: { Icon: IconType; menu: string }) {
  return (
    <div>
      <div className="text-[1.5rem] flex items-center rounded-full p-2 pr-5 hover:bg-slate-500/20 hover:duration-100 duration-75 ">
        <Icon size={"1em"} className="inline-block mx-2 mt-1" />
        <span className="capitalize">{menu}</span>
      </div>
    </div>
  );
}

function UserProfile() {
  return (
    <div className="flex rounded-full  p-2 w-[210px] mx-auto justify-center items-center gap-2 hover:bg-slate-500/20 hover:duration-100 duration-75  mt-7 mb-5">
      <Image
        src="https://i1-giaitri.vnecdn.net/2021/05/19/Emmawatson1-1621400705-7182-1621400757.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=ExMIZCSEwwZDEnqBYnlYjw"
        height={50}
        width={50}
        alt="user-ava"
        className="rounded-full w-[50px] h-[50px] object-cover"
      />
      <div className="flex-1">
        <p className="font-bold">User Name</p>
        <p>@username</p>
      </div>
    </div>
  );
}
