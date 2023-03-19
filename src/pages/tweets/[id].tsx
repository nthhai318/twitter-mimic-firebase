import CommentModal from "@/components/CommentModal";
import Sidebar from "@/components/Sidebar";
import {
  onSnapshot,
  query,
  collection,
  doc,
  DocumentData,
  orderBy,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import Post from "@/components/Post";
import Link from "next/link";
import Comment from "@/components/Comment";

export default function Tweet() {
  const router = useRouter();
  const { id } = router.query;
  const [tweet, setTweet] = useState<DocumentData | null>();
  const [comments, setComments] = useState<DocumentData[] | null>();

  useEffect(() => {
    if (typeof id === "string") {
      onSnapshot(doc(db, "tweets", id), (snapshot) => setTweet(snapshot));
    }
  }, [id]);

  useEffect(() => {
    if (typeof id === "string") {
      onSnapshot(
        query(
          collection(db, "tweets", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      );
    }
  }, [id]);

  return (
    <>
      <main className="flex w-full mx-auto">
        {/* Feeds but only tweets */}
        <div
          role="Feed"
          className=" sm:ml-[100px] lg:ml-[300px] min-w-[300px] relative flex-1 max-w-[800px] divide-[rgb(239,243,244)] divide-y  border-r border-l border-[rgb(239,243,244)] xl:ml-[400px]"
        >
          <button
            onClick={() => {
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
            className="sticky w-full top-0  backdrop-blur-md"
          >
            {/* Home */}
            <div className="flex text-[1.5rem] h-14 items-center px-4 cursor-pointer ">
              <p className="font-bold ">Original tweet</p>
            </div>
          </button>
          {tweet && (
            <div id="original-tweet" className="scroll-py-14">
              <Post post={tweet.data()} id={tweet.id} />
            </div>
          )}
          {tweet &&
            comments &&
            comments.map((comment) => (
              <div key={comment.id}>
                <p>
                  Reply to{" "}
                  <Link
                    href="#original-tweet"
                    className="underline text-blue-800"
                  >
                    {tweet.data().user}&apos;s tweet
                  </Link>
                </p>
                {typeof id === "string" && (
                  <Comment
                    post={comment.data()}
                    tweetid={id}
                    cmtid={comment.id}
                  />
                )}
              </div>
            ))}
        </div>

        <CommentModal />
      </main>
    </>
  );
}
