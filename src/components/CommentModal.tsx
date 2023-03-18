import { useContext } from "react";
import { ModalContext } from "./CommentProvider";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { IoImageOutline } from "react-icons/io5";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiOutlineFaceSmile } from "react-icons/hi2";

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
  return (
    <AnimatePresence>
      {modal && (
        <motion.div
          className="fixed flex items-center justify-center w-full h-full bg-slate-700/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleModal}
        >
          <motion.div
            initial={{ opacity: 0, y: -300 }}
            animate={{ opacity: 1, y: -200 }}
            exit={{ opacity: 0, y: -250 }}
            className="w-[40vw] translate-y-[-200px] min-w-[340px]  bg-white rounded-xl p-5"
            onClick={(e) => {}}
          >
            {/* <p>{JSON.stringify(postid)}</p> */}
            <div className="flex gap-5 ">
              <Image
                src={targetedPost.post.userImg}
                width={100}
                height={100}
                alt={`${targetedPost.post.user} ava`}
                className="w-[50px] h-[50px] rounded-full"
              />
              <div>
                <p className="font-bold text-lg">{targetedPost.post.user}</p>
                <p>{targetedPost.post.content}</p>
              </div>
            </div>
            <div className="mt-10 mx-auto w-fit">
              <p className="">
                Reply to{" "}
                <span className="font-bold">{targetedPost.post.user}</span>
              </p>
            </div>
            <div className="mt-5 flex gap-5 ">
              <Image
                src={sessionData?.user.image!}
                width={50}
                height={50}
                alt={sessionData?.user.name!}
                className="rounded-full w-[50px] h-[50px]"
              />
            </div>
            <div>
              <div className="flex-1 flex flex-col divide-y">
                <div className="">
                  <p className="font-bold">{sessionData?.user?.name}</p>
                </div>
                <div className="py-3">
                  <textarea
                    className="w-full outline-none p-1 divide-y resize-none"
                    placeholder="What's happening?"
                    rows={1}
                    onChange={(e) => {
                      e.target.style.height = "0";
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                  />
                  <div className="flex justify-between items-center p-2">
                    <div className="flex gap-5 p-2">
                      <div className="p-2 hover:hover:bg-slate-400/30 rounded-full">
                        <IoImageOutline size={25} />
                        <input
                          type="file"
                          hidden
                          accept="image/png, image/gif, image/jpeg, image/webp"
                        />
                      </div>
                      <div className="p-2 hover:hover:bg-slate-400/30 rounded-full">
                        <HiOutlineFaceSmile size={25} />
                      </div>
                    </div>
                    <button className="rounded-full bg-[rgb(29,155,240)] font-semibold px-4 py-2 text-white disabled:opacity-50">
                      Tweet
                    </button>
                  </div>
                </div>

                {/* {tweetImg && (
          <div className="group flex flex-col w-full justify-center">
            <div className="relative w-fit mx-auto pointer-events-none hover:brightness-75">
              <Image
                src={tweetImg}
                alt="Image"
                width={1000}
                height={1000}
                className="max-w-full w-auto h-auto max-h-[400px] rounded-lg object-contain pointer-events-none"
              />
              <button
                className="absolute top-2 right-2 bg-slate-600/50 text-white rounded-full pointer-events-auto p-1 hover:brightness-200 z-50"
                onClick={() => setTweetImg(null)}
              >
                <AiOutlineCloseCircle size={20} />
              </button>
            </div>
            <div>
              <p className="text-center">Image attached to tweet</p>
            </div>
          </div>
        )} */}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
