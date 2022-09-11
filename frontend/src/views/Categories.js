import React from "react";
import { Outlet } from "react-router-dom";
import CategoryCard from "../Components/CategoryCard";

const Categories = () => {
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="mb-8 w-full flex justify-center">
          <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
            Categories
          </span>
        </div>
        <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3">
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
      <Outlet />
    </>
  );
};

export default Categories;
