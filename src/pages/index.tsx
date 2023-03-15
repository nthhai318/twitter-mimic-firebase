import Head from "next/head";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Twitter Mimic</title>
        <meta name="description" content="Something resembles twitter?" />
      </Head>
      <main className="">
        <div>Page</div>
      </main>
    </>
  );
}
