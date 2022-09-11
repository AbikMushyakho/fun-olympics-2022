import React from "react";
import CategoryCard from "../Components/CategoryCard";
import NewsCard from "../Components/NewsCard";

const Home = () => {
  return (
    <div className="w-full flex flex-col ">
      <div className=" flex flex-col lg:flex-row justify-center ">
        <div className="my-4">
          <img
            className="min-w-sm md:max-w-md rounded-lg transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0"
            src="/assets/random-images/home-img.jpg"
            alt="img"
          />
        </div>
        <div className="my-4 p-4 space-x-2 ">
          <h1 className="mb-4 text-2xl font-bold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Personalise your
            <span className="text-blue-600 dark:text-blue-500">Olympic</span>
            experience
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Watch original Olympic content and documentaries for free.
          </p>
        </div>
      </div>
      {/* Categories */}
      <div className="mt-6">
        <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
          Categories
        </span>
        <hr className=" mt-4 h-1" />

        <div className="flex flex-col lg:flex-row space-y-4  lg:space-x-4 mt-8 overflow-hidden justify-start md:justify-between items-stretch md:items-baseline">
          <CategoryCard
            details={{
              linkUrl: "/categories/1",
              imgUrl: "/assets/category/swimming.jpg",
              title: "Swimming",
              description: `Swimming has been a sport at every modern Summer Olympics. It has been open 
                to women since 1912. Swimming has the second-highest number of Olympic medal 
                contested events after athletics.`,
            }}
          />
          <CategoryCard
            details={{
              linkUrl: "/categories/1",
              imgUrl: "/assets/category/badminton.jpg",
              title: "Badminton",
              description: `Badminton had its debut as an official event on the 1992 Summer
            Olympics and has been contested in eight Olympiads. 74 different
            nations have appeared in the Olympic badminton competitions,
            with 18 appearing all eight times.`,
            }}
          />

          <CategoryCard
            details={{
              linkUrl: "/categories/3",
              imgUrl: "/assets/category/basketball.jpg",
              title: "Basketball",
              description: `Basketball at the Summer Olympics has been a sport for men
            consistently since 1936. Prior to its inclusion as a medal
            sport, basketball was held as a demonstration event in 1904. The
            United States are the defending champions in both.`,
            }}
          />
        </div>
      </div>
      {/* News */}
      <div className="mt-6">
        <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
          News
        </span>
        <hr className=" mt-4 h-1" />

        <div className="flex flex-col mt-8 space-y-4 lg:flex-row lg:space-x-6 overflow-hidden justify-start items-stretch md:items-baseline">
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
    </div>
  );
};

export default Home;
