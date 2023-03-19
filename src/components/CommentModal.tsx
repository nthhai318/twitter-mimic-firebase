import { useContext, useRef, useState } from "react";
import { ModalContext } from "./CommentProvider";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { IoImageOutline } from "react-icons/io5";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useRouter } from "next/router";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

type TargetedPost = {
  post: {
    user: string;
    userImg: string;
    email: string;
    timestamp: {
      seconds: number;
      nanoseconds: number;
    };
    image?: string;
    content: string;
  };
  id: string;
};

export default function CommentModal() {
  const { modal, toggleModal, postid, savePostId } = useContext(ModalContext);
  const { data: sessionData } = useSession();
  const targetedPost = postid as TargetedPost;
  const [comment, setComment] = useState<string>("");
  const [repImg, setRepImg] = useState<string | null>(null);
  const cmtFile = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const sendComment = async () => {
    const cmtRef = await addDoc(
      collection(db, "tweets", targetedPost.id, "comments"),
      {
        id: sessionData!.user.uid,
        user: sessionData!.user.name,
        email: sessionData!.user.email,
        content: comment,
        timestamp: serverTimestamp(),
        userImg: sessionData!.user?.image,
      }
    );

    const imgRef = ref(
      storage,
      `tweets/${targetedPost.id}/comments/${cmtRef.id}/img`
    );

    if (repImg) {
      await uploadString(imgRef, repImg, "data_url").then(async () => {
        const downloadUrl = await getDownloadURL(imgRef);
        await updateDoc(
          doc(db, "tweets", targetedPost.id, "comments", cmtRef.id),
          {
            image: downloadUrl,
          }
        );
      });
    }

    toggleModal();
    setComment("");
    setRepImg(null);
    router.push(`/tweets/${targetedPost.id}`);
  };

  const addImagetoReply = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setRepImg(() =>
        typeof readerEvent.target?.result == "string"
          ? readerEvent.target?.result
          : null
      );
    };
  };

  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className="fixed flex  justify-center w-full h-full bg-slate-700/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleModal}
        >
          <motion.div
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -250 }}
            className="w-[40vw] min-w-[340px] h-fit max-h-full overflow-auto rounded-xl p-5 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <p>{JSON.stringify(postid)}</p> */}
            <div className="flex gap-5 ">
              <div className=" relative flex flex-col gap-0 items-center">
                <Image
                  src={targetedPost.post.userImg}
                  width={100}
                  height={100}
                  alt={`${targetedPost.post.user} ava`}
                  className="w-[50px] h-[50px] rounded-full z-10"
                />
                <div className="h-full min-h-[50px] flex-1 w-[2px] bg-slate-500/20"></div>
              </div>
              <div className="pb-5">
                <p className="font-bold text-lg">{targetedPost.post.user}</p>
                <p>{targetedPost.post.content}</p>
              </div>
            </div>
            <div className="flex gap-5 bg-white rounded-xl m-[-10px] p-[10px]">
              <div>
                <Image
                  src={sessionData?.user.image!}
                  width={50}
                  height={50}
                  alt={sessionData?.user.name!}
                  className="rounded-full w-[50px] h-[50px]"
                />
              </div>

              <div className="flex-1 flex flex-col divide-y">
                <div className="">
                  <p className="font-bold text-[1.5rem]">
                    {sessionData?.user?.name}
                  </p>
                </div>
                <div className="pt-3 w-full">
                  <textarea
                    className="w-full outline-none p-1 divide-y resize-none text-[1.5rem]"
                    placeholder="Tweet your reply"
                    rows={3}
                    value={comment}
                    onChange={(e) => {
                      setComment(e.target.value);
                      e.target.style.height = "0";
                      e.target.style.height = `${Math.max(
                        e.target.scrollHeight,
                        116
                      )}px`;
                    }}
                  />
                </div>

                {repImg && (
                  <div className="group flex flex-col w-full justify-center">
                    <div className="relative w-fit mx-auto pointer-events-none hover:brightness-75">
                      <Image
                        src={repImg}
                        alt="Image"
                        width={1000}
                        height={1000}
                        className="max-w-full w-auto h-auto max-h-[300px] rounded-lg object-contain pointer-events-none"
                      />
                      <button
                        className="absolute top-2 right-2 bg-slate-600/50 text-white rounded-full pointer-events-auto p-1 hover:brightness-200 z-50"
                        onClick={() => setRepImg(null)}
                      >
                        <AiOutlineCloseCircle size={20} />
                      </button>
                    </div>
                    <div>
                      <p className="text-center">Image attached to tweet</p>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <div className="flex gap-5 pt-2">
                    <div
                      className="p-2 hover:hover:bg-slate-400/30 rounded-full"
                      onClick={() => cmtFile.current?.click()}
                    >
                      <IoImageOutline size={25} />
                      <input
                        type="file"
                        hidden
                        accept="image/png, image/gif, image/jpeg, image/webp"
                        ref={cmtFile}
                        onChange={addImagetoReply}
                      />
                    </div>
                    <div className="p-2 hover:hover:bg-slate-400/30 rounded-full">
                      <HiOutlineFaceSmile size={25} />
                    </div>
                  </div>
                  <button
                    disabled={comment ? false : true}
                    className="rounded-full bg-[rgb(29,155,240)] font-semibold px-4 py-2 text-white disabled:opacity-50"
                    onClick={sendComment}
                  >
                    Tweet
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
