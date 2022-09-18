import React, { useEffect, useState } from "react";
import CategoryCard from "../../Components/CategoryCard";
import NewsCard from "../../Components/NewsCard";
import { getAll } from "../../services/news";
import { getAllCategories } from "../../services/category";
import Loading from "../../Components/Loading";
import NotExists from "../../Components/NotExists";

const Search = ({ searchText,setMessage }) => {
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

  const { query } = searchText;
  return (
    <>
      <div className="w-full flex flex-col">
        <p>
          Search:
          <span className="text-base font-bold ml-3">
            {query.length > 0 ? query : "No categories or video searched!!"}
          </span>
        </p>
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
    </>
  );
};

export default Search;
