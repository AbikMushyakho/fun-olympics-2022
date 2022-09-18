import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../../Components/NewsCard";
import { getAll, getOne } from "../../services/news";
const SingleNews = ({ setMessage }) => {
  const [news, setNews] = useState({});
  const [relatedNews, setRelatedNews] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const fetchedData = await getOne(id);
        setNews(fetchedData);
      } catch (error) {
        setMessage({
          message: `${error.response.data.error}`,
          className: "error",
        });
      }
    };
    fetchData(id);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getAll();
        setRelatedNews(fetchedData);
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
    <div>
      <div className="flex flex-col w-full space-y-4 text-center">
        {/* Title */}
        <div className="mb-2 w-full flex justify-center">
          <span className="text-wheatt font-bold text-xl md:text-2xl lg:text-3xl">
            {news.title}
          </span>
        </div>

        {/* Image */}
        <img
          className="w-full max-w-xl h-auto rounded-lg mx-auto"
          src={news.image}
          alt=" description"
        />
        {/* Description */}
        <p className="md:text-xl">
          {news.description}
          <br />
          {/* Upload date */}
          <span className="text-base">
            Uploaded date:
            <span className="m-2 p-0.5 rounded-md text-wheatt hover:underline hover:bg-gray-500">
              {news.addedDate}
            </span>
          </span>
        </p>
      </div>
      {/* Related News */}
      <div className="my-8 w-full flex flex-col">
        <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
          Related News
        </span>
        <hr className=" mt-4 h-1" />
      </div>
      <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3">
        {relatedNews.map((singleNews, index) => {
          if (index < 6) {
            if (singleNews.id !== id) {
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
            } else {
              return <>No Related news</>;
            }
          }
        })}
        {/* Static news */}
        {/* <NewsCard
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
  );
};

export default SingleNews;
