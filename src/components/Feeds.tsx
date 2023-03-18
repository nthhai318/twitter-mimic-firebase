import Post from "./Post";
import { useSession } from "next-auth/react";
import Input from "./Input";
import { useEffect, useState } from "react";
import {
  DocumentData,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function Feeds() {
  const [tweets, setTweets] = useState<DocumentData[]>([]);
  const { data: sessionData } = useSession();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "tweets"), orderBy("timestamp", "desc")),
      (snapshot) => {
        setTweets(snapshot.docs);
      }
    );
  }, []);

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
      {/* {dunmmyData.map((post) => (
        <Post key={post.id} post={post} />
      ))} */}
      {tweets.map((tweet) => (
        <div key={tweet.id}>
          <Post post={tweet.data()} id={tweet.id} />
        </div>
      ))}
    </div>
  );
}
