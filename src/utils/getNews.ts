const api = `https://newsdata.io/api/1/news?apikey=${process.env.NEWS_API}&country=us&&category=technology&language=en`

export type fetchNews = {
  status: string,
  totalResults: number,
  results: New[] | FailNews,
  code?: string,
}

export type New = {
  "title": string,
  "link": string,
  "keywords": string[],
  "creator": string[],
  "video_url": string | null,
  "description": string,
  "content": string,
  "pubDate": string,
  "image_url": string,
  "source_id": string,
  "category": string[],
  "country": string[],
  "language": string
};

export type FailNews = {
  message: string,
  code: string,
}

export async function getNews() {
  const res = await fetch(api);
  
  // if (!res.ok) {
  //   throw new Error("cannot fetch news");
  // }
  const data:fetchNews = await res.json();
  return data;
}