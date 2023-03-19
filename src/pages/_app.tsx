import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";
import { ModalContext } from "@/components/CommentProvider";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [modal, setModal] = useState(false);
  const [postid, setPostId] = useState<object>({});
  const toggleModal = () => setModal(!modal);
  const savePostId = (e: {}) => setPostId(e);
  return (
    <div className="flex">
      <ModalContext.Provider value={{ modal, toggleModal, postid, savePostId }}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ModalContext.Provider>
    </div>
  );
}
