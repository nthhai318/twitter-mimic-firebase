import Head from "next/head";
import { Inter } from "next/font/google";
import Feeds from "@/components/Feeds";
import { fetchNews, getNews } from "@/utils/getNews";
import Widgets from "@/components/Widgets";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ newsResult }: { newsResult: fetchNews }) {
  const { results: news } = newsResult;

  return (
    <>
      <Head>
        <title>Twitter Mimic</title>
        <meta name="description" content="Something resembles twitter?" />
      </Head>
      <main className="flex">
        <Feeds />
        <Widgets news={news} />
      </main>
    </>
  );
}

export async function getStaticProps() {
  const newsResult = await getNews();
  return {
    props: { newsResult },
    revalidate: 3600,
  };
}
