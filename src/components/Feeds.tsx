import Post from "./Post";
import { useSession } from "next-auth/react";
import Input from "./Input";
import { useEffect, useState } from "react";
import {
  DocumentData,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AnimatePresence, motion } from "framer-motion";

export default function Feeds() {
  const [tweets, setTweets] = useState<DocumentData[]>([]);
  const { data: sessionData } = useSession();
  const [numberofTweets, setNumberofTweets] = useState<number>(5);

  useEffect(() => {});

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "tweets"),
        orderBy("timestamp", "desc"),
        limit(numberofTweets)
      ),
      (snapshot) => {
        setTweets(snapshot.docs);
      }
    );
  }, [numberofTweets]);

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

      <AnimatePresence>
        {tweets.map(
          (tweet) =>
            tweet &&
            tweet.data() && (
              <motion.div
                key={tweet.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
              >
                <Post post={tweet.data()} id={tweet.id} />
              </motion.div>
            )
        )}
      </AnimatePresence>
      <div className="w-full flex justify-center hover:bg-slate-400/20 duration-300">
        <button
          className="mb-10 mx-auto "
          onClick={() => setNumberofTweets((num) => num + 5)}
        >
          Show more
        </button>
      </div>
    </div>
  );
}
