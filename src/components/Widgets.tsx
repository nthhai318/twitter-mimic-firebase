import { New, fetchNews, getNews } from "@/utils/getNews";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";

export default function Widgets({ news }: { news: New[] }) {
  const [numOfNews, setNumOfNews] = useState<number>(3);
  const displayNew = news.slice(0, numOfNews);

  return (
    <div className="p-5 flex-shrink min-w-[200px] max-w-[600px] w-[20vw]   hidden md:inline">
      {/* Search bar */}
      <div className="flex items-center gap-2 py-2 px-3 w-fit lg:w-full mx-auto rounded-full  focus-within:bg-transparent bg-slate-400/10 sticky">
        <FiSearch size={20} className="" />
        <input
          type="text"
          placeholder="Search Twitter"
          className="bg-transparent w-full outline-none p-0"
        />
      </div>

      {/* News Widget */}
      <div className="mt-5 py-3 rounded-xl flex flex-col gap-3 bg-slate-400/10">
        <p className="font-bold px-3 mb-3 text-[1.1rem] lg:text-[1.2rem]">
          Trending News
        </p>
        <div className="flex flex-col gap-0">
          <AnimatePresence mode="wait">
            {displayNew.map((article, idx) => (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0, transition: { delay: 0.2 * idx } }}
                exit={{ opacity: 0, x: 100 }}
                className="py-2 px-3 group hover:bg-slate-500/10"
                key={article.link}
              >
                <Link className=" flex flex-col gap-0" href={article.link}>
                  <p className="font-semibold group-hover:underline">
                    {article.title}
                  </p>
                  <p className="italic ">{article.source_id}</p>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {numOfNews < news.length && (
          <button
            className="font-bold text-blue-900 "
            onClick={() =>
              setNumOfNews(() =>
                numOfNews + 3 <= news.length ? numOfNews + 3 : news.length
              )
            }
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}
