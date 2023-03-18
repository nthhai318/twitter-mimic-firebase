import { Session } from "next-auth";
import Image from "next/image";
import { useRef, useState } from "react";
import { HiOutlineFaceSmile } from "react-icons/hi2";
import { IoImageOutline } from "react-icons/io5";
import { db, storage } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { AiOutlineCloseCircle } from "react-icons/ai";

export default function Input({ sessionData }: { sessionData: Session }) {
  const [input, setInput] = useState<string>("");
  const [tweetImg, setTweetImg] = useState<string | null>(null);
  const imgFile = useRef<HTMLInputElement>(null);

  const sendTweet = async () => {
    const docRef = await addDoc(collection(db, "tweets"), {
      id: sessionData.user.uid,
      user: sessionData.user.name,
      email: sessionData.user.email,
      content: input,
      timestamp: serverTimestamp(),
      userImg: sessionData.user?.image,
    });

    const imgRef = ref(storage, `tweets/${docRef.id}/img`);

    if (tweetImg) {
      await uploadString(imgRef, tweetImg, "data_url").then(async () => {
        const downloadUrl = await getDownloadURL(imgRef);
        await updateDoc(doc(db, "tweets", docRef.id), {
          image: downloadUrl,
        });
      });
    }
    setInput("");
    setTweetImg(null);
  };

  // Fix type any
  const addImagetoTweet = (e: any) => {
    const reader = new FileReader();
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setTweetImg(() =>
        typeof readerEvent.target?.result == "string"
          ? readerEvent.target?.result
          : null
      );
      // setTweetImg(readerEvent.target?.result);
    };
  };
  return (
    <div className="flex gap-4 p-4 divide-y-0 overflow-hidden ">
      <Image
        src={sessionData.user?.image!}
        height={50}
        width={50}
        alt="user-ava"
        className="rounded-full w-[50px] h-[50px] object-cover"
      />
      <div className="flex-1 flex flex-col divide-y">
        <div className="">
          <p className="font-bold">{sessionData.user?.name}</p>
        </div>
        <div className="py-3">
          <textarea
            className="w-full outline-none p-1 divide-y resize-none"
            placeholder="What's happening?"
            rows={1}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              e.target.style.height = "0";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
          />
        </div>
        {tweetImg && (
          <div className="flex flex-col w-full justify-center">
            <div className="relative w-fit mx-auto">
              <Image
                src={tweetImg}
                alt="Image"
                width={1000}
                height={1000}
                className="max-w-full w-auto h-auto max-h-[400px] rounded-lg object-contain"
              />
              <AiOutlineCloseCircle
                size={20}
                className="absolute top-2 right-2"
                onClick={() => setTweetImg(null)}
              />
            </div>
            <div>
              <p className="text-center">Image attached to tweet</p>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center p-2">
          <div className="flex gap-5 p-2">
            <div className="p-1" onClick={() => imgFile.current?.click()}>
              <IoImageOutline size={25} />
              <input
                type="file"
                hidden
                ref={imgFile}
                accept="image/png, image/gif, image/jpeg"
                onChange={addImagetoTweet}
              />
            </div>
            <div className="p-1">
              <HiOutlineFaceSmile size={25} />
            </div>
          </div>
          <button
            disabled={input ? false : true}
            className="rounded-full bg-[rgb(29,155,240)] font-semibold px-4 py-2 text-white disabled:opacity-50"
            onClick={sendTweet}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
}
