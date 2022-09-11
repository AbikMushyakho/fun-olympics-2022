import React from "react";
import NewsCard from "../../Components/NewsCard";
const SingleNews = () => {
  return (
    <div >
    <div className="flex flex-col w-full space-y-4 text-center">
        {/* Title */}
        <div className="mb-2 w-full flex justify-center">
        <span className="text-wheatt font-bold text-xl md:text-2xl lg:text-3xl">
          The French Teams have qualified for the Paris 2024 Olympic Games –
          European Hockey Federation
        </span>
      </div>

      {/* Image */}
      <img
        className="w-full max-w-xl h-auto rounded-lg mx-auto"
        src="/assets/news/news-1.jpg"
        alt=" description"
      />
      {/* Description */}
      <p className="md:text-xl">
        France is a cultural melting pot. It’s also one of the biggest countries
        for Breaking with more than a thousand battles every year and some of
        the greatest international competitions. It’s also in Paris 2024 that
        Breaking will make its Olympic debut. Dany Dann came to France from
        French Guyana to pursue a life in dance. Now, he juggles early morning
        shifts as a nurse, daily training and being a father – always with an
        eye on the next battle. Now reigning national champion, he trains with
        French national team members B-Girl Carlota and B-Boy Marlone for the
        WDSF World Breaking Championship in Paris.
        <br />
        {/* Upload date */}
        <span className="text-base">Uploaded date: <mark className="m-2 p-0.5 rounded-md text-purple-900 hover:underline hover:bg-yellow-300">2022-09-07</mark></span>
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
  );
};

export default SingleNews;
