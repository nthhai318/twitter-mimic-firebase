import Head from "next/head";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Twitter Mimic</title>
        <meta name="description" content="Something resembles twitter?" />
      </Head>
      <main className="">
        <Sidebar />
      </main>
    </>
  );
}
