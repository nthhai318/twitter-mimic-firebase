import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <div className="flex">
      <RecoilRoot>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </RecoilRoot>
    </div>
  );
}
