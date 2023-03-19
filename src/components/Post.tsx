import Image from "next/image";
import { HiOutlineChat, HiOutlineDotsHorizontal } from "react-icons/hi";
import {
  AiOutlineHeart,
  AiOutlineRetweet,
  AiTwotoneHeart,
} from "react-icons/ai";
import { RiDeleteBinLine } from "react-icons/ri";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  DocumentData,
  deleteDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { ModalContext } from "./CommentProvider";

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

export default function Post({ post, id }: { post: Post; id: string }) {
  const { user, userImg, image, content, timestamp } = post;
  const { data: sessionData } = useSession();
  const [likes, setLikes] = useState<DocumentData[]>([]);
  const [comments, setComments] = useState<DocumentData[]>([]);
  const [hasLiked, setHasLiked] = useState(false);
  const { postid, savePostId, toggleModal } = useContext(ModalContext);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tweets", id, "comments"),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [id]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tweets", id, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );
  }, [id]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === sessionData?.user.uid) !== -1
        ? true
        : false
    );
  }, [likes, sessionData?.user.uid]);

  useEffect(() => {}, [id]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "tweets", id, "likes", sessionData?.user.uid!));
    } else {
      await setDoc(doc(db, "tweets", id, "likes", sessionData?.user.uid!), {
        username: sessionData?.user.name,
      });
    }
  };

  const deletePost = async () => {
    if (window.confirm("Are you sure you want to delete this tweet?")) {
      deleteDoc(doc(db, "tweets", id));
      if (post.image) {
        deleteObject(ref(storage, `tweets/${id}/img`));
      }
    }
  };

  const openCommentModal = (id: string) => {
    toggleModal();
    savePostId({ post, id });
  };

  return (
    <div className="flex px-4 py-2 gap-4 hover:bg-slate-400/20 duration-300">
      <div>
        <Image
          src={userImg}
          height={50}
          width={50}
          alt={`${user} ava`}
          className="mt-2 rounded-full w-[50px] h-[50px] object-cover"
        />
      </div>

      {/* Show tweets text content */}

      <div className="flex flex-1 flex-col gap-3 mb-5 overflow-hidden">
        <div className="flex justify-between items-center ">
          <div className="flex gap-[1ch] justify-start items-center flex-shrink">
            <span className="flex-shrink font-bold inline-block overflow-hidden whitespace-nowrap">
              {user}
            </span>
            <span className="flex-shrink whitespace-nowrap inline-block overflow-hidden text-sm">
              {timestamp && displayDate(Math.floor(timestamp.seconds / 60))}
            </span>
          </div>
          <div className="rounded-full hover:bg-red-900/20 w-[2.2rem] h-[2.2rem] flex items-center justify-center">
            <HiOutlineDotsHorizontal size={20} />
          </div>
        </div>
        <div>{content}</div>

        {/* Show tweet-image if any */}

        {image && (
          <div className="mt-3 flex w-full justify-center">
            <Image
              src={image}
              alt="Image"
              width={1000}
              height={1000}
              className="max-w-full w-auto h-auto max-h-[500px] rounded-lg object-contain"
            />
          </div>
        )}

        {/* Utility rows: comments - likes - deletes tweet */}

        <div className="grid grid-cols-4 justify-center gap-5 items-center px-5">
          <div className="mx-auto flex gap-3 items-center">
            <div
              onClick={() => openCommentModal(id)}
              className="mx-auto rounded-full hover:bg-slate-400/40 w-8 h-8 flex items-center justify-center"
            >
              <HiOutlineChat size={20} />
            </div>
            <span className="">{comments.length}</span>
          </div>
          <div className="mx-auto rounded-full hover:bg-slate-400/40 w-8 h-8 flex items-center justify-center">
            <AiOutlineRetweet size={20} />
          </div>
          <div className="mx-auto flex gap-3 items-center">
            {hasLiked ? (
              <div className=" rounded-full hover:bg-slate-400/40 w-8 h-8 flex items-center justify-center">
                <AiTwotoneHeart color="red" onClick={likePost} size={20} />
              </div>
            ) : (
              <div className=" rounded-full hover:bg-slate-400/40 w-8 h-8 flex items-center justify-center">
                <AiOutlineHeart size={20} onClick={likePost} />
              </div>
            )}
            <span className={hasLiked ? "text-red-700" : ""}>
              {likes.length}
            </span>
          </div>
          {sessionData?.user.uid === post.id && (
            <div className="mx-auto rounded-full hover:bg-slate-400/40 w-8 h-8 flex items-center justify-center">
              <RiDeleteBinLine onClick={deletePost} size={20} />
            </div>
          )}
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
