import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CategoryCard from "../Components/CategoryCard";
import Loading from "../Components/Loading";
import NotExists from "../Components/NotExists";
import { getAllCategories } from "../services/category";

const Categories = ({ setMessage }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getAllCategories();
        setCategories(fetchedData);
        setIsLoading(false);
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
            Categories
          </span>
        </div>

        {isLoading ? (
          <Loading />
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3">
            {categories.map((category, index) => {
              return (
                <CategoryCard
                  key={index}
                  details={{
                    linkUrl: `/categories/${category.id}`,
                    imgUrl: category.image,
                    title: category.title,
                    description: category.description,
                    total_videos: category.videos.length,
                  }}
                />
              );
            })}
          </div>
        ) : (
          <NotExists name="categories" />
        )}
      </div>

      <Outlet />
    </>
  );
};

export default Categories;
