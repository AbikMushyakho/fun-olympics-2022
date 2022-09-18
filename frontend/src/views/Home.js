import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../Components/CategoryCard";
import NewsCard from "../Components/NewsCard";
import { getAll } from "../services/news";
import { getAllCategories } from "../services/category";
import Loading from "../Components/Loading";
import NotExists from "../Components/NotExists";

const Home = ({ setMessage }) => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState({
    category: true,
    news: true,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await getAllCategories();
        const fetchedNews = await getAll();
        setCategories(fetchedCategories);
        setNews(fetchedNews);
        setIsLoading({ category: false, news: false });
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
          <br />
          <Link
            to="/live"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Watch live
          </Link>
        </div>
      </div>
      {/* Categories */}
      <div className="mt-6">
        <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
          Categories
        </span>
        <hr className=" mt-4 h-1" />

        {isLoading.category ? (
          <Loading />
        ) : categories.length > 0 ? (
          <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3 mt-8">
            {categories.map((category, index) => {
              if (index < 6)
                return (
                  <CategoryCard
                    key={category.id}
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
      {/* News */}
      <div className="mt-6">
        <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
          News
        </span>
        <hr className=" mt-4 h-1" />

        {isLoading.news ? (
          <Loading />
        ) : news.length > 0 ? (
          <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3 mt-8">
            {news.map((singleNews, index) => {
              if (index < 6)
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
          </div>
        ) : (
          <NotExists name="news" />
        )}
      </div>
    </div>
  );
};

export default Home;
