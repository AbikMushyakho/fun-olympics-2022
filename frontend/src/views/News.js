import React from "react";
import {  Outlet } from "react-router-dom";
import NewsCard from "../Components/NewsCard";

const News = () => {
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="mb-8 w-full flex justify-center">
          <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
            News
          </span>
        </div>
        <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3">
        <NewsCard
           details={{
            linkUrl:"/news/1",
            imgUrl:"/assets/news/news-1.jpg",
            title:`French breakers set the scene for Paris 2024 Olympic Games |
                Breaking Life`
           }}
          />
          <NewsCard
            details={{
              linkUrl:"/news/1",
              imgUrl:"/assets/news/news-2.webp",
              title:`Key storylines from the 2022 Diamond League Final in Zurich`
            }}
          />
          <NewsCard
           details={{
            linkUrl:"/news/3",
            imgUrl:"/assets/news/news-3.webp",
            title:`Canada Women’s Ice Hockey: Beijing2022 Medal Moments﻿`
           }}
          />
          
        </div>
      </div>
      <Outlet />
    </>
  );
};

// flex flex-col mt-4 space-y-4 md:flex-row md:space-x-4
export default News;
