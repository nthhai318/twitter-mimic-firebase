import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="flex">
      <Sidebar />

      <Component {...pageProps} />
      <Widgets />
    </div>
  );
}
