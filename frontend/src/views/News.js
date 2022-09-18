import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import NewsCard from "../Components/NewsCard";
import { getAll } from "../services/news";

const News = ({ setMessage }) => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getAll();
        setNews(fetchedData);
      } catch (error) {
        setMessage({
          message: `${error.response.data.error}`,
          className: "error",
        });
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="mb-8 w-full flex justify-center">
          <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
            News
          </span>
        </div>
        <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3">
          {news.map((singleNews, index) => {
              return (
                <NewsCard
                  key={singleNews.id}
                  details={{
                    linkUrl: `/news/${singleNews.id}`,
                    imgUrl: singleNews.image,
                    title: singleNews.title,
                  }}
                />
              );
          })}
          {/* static data */}
          {/* <NewsCard
            details={{
              linkUrl: "/news/1",
              imgUrl: "/assets/news/news-1.jpg",
              title: `French breakers set the scene for Paris 2024 Olympic Games |
                Breaking Life`,
            }}
          />
          <NewsCard
            details={{
              linkUrl: "/news/1",
              imgUrl: "/assets/news/news-2.webp",
              title: `Key storylines from the 2022 Diamond League Final in Zurich`,
            }}
          />
          <NewsCard
            details={{
              linkUrl: "/news/3",
              imgUrl: "/assets/news/news-3.webp",
              title: `Canada Women’s Ice Hockey: Beijing2022 Medal Moments﻿`,
            }}
          /> */}
        </div>
      </div>
      <Outlet />
    </>
  );
};

// flex flex-col mt-4 space-y-4 md:flex-row md:space-x-4
export default News;
