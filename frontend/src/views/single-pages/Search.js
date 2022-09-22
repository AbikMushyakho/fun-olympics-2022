import React, { useEffect, useState } from "react";
import CategoryCard from "../../Components/CategoryCard";
import NewsCard from "../../Components/NewsCard";
import { getAll as getAllNews } from "../../services/news";
import { getAllCategories } from "../../services/category";
import { getAll as getAllVideos } from "../../services/video";

import Loading from "../../Components/Loading";
import NotExists from "../../Components/NotExists";
import VideoCard from "../../Components/VideoCard";

const Search = ({ searchText, setMessage }) => {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const [filteredVideo, setFilteredVideo] = useState([]);

  const [isLoading, setIsLoading] = useState({
    category: true,
    news: true,
    videos: true,
  });
  const { query } = searchText;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedCategories = await getAllCategories();
        const fetchedNews = await getAllNews();
        const fetchedVideos = await getAllVideos();
        setCategories(fetchedCategories);
        setNews(fetchedNews);
        setVideos(fetchedVideos);
        setFilteredNews(fetchedNews);
        setFilteredCategories(fetchedCategories);
        setFilteredVideo(fetchedVideos);
        setIsLoading({ category: false, news: false, videos: false });
      } catch (error) {
        setMessage({
          message: `${error.response.data.error}`,
          className: "error",
        });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const newsResult = news.filter((newss, index) =>
      newss.title.toLowerCase().match(query.toLowerCase())
    );
    setFilteredNews(newsResult);

    const categoryResult = categories.filter((category, index) =>
      category.title.toLowerCase().match(query.toLowerCase())
    );
    setFilteredCategories(categoryResult);
    const videoResult = videos.filter((video, index) =>
      video.title.toLowerCase().match(query.toLowerCase())
    );
    setFilteredVideo(videoResult);
  }, [query]);

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
            Videos
          </span>
          <hr className=" mt-4 h-1" />
          {isLoading.videos ? (
            <Loading />
          ) : filteredVideo.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3">
              {filteredVideo.map((video, index) => {
                return (
                  <VideoCard
                    key={video.id}
                    details={{
                      title: video.title,
                      linkUrl: `/categories/${video.category}/${video.id}`,
                      videoUrl: video.video_url,
                      views: video.views,
                      addedDate: video.addedDate,
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <NotExists name="category videos" />
          )}
        </div>

        <div className="mt-6">
          <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
            Categories
          </span>
          <hr className=" mt-4 h-1" />

          {isLoading.category ? (
            <Loading />
          ) : filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3 mt-8">
              {filteredCategories.map((category, index) => {
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
          ) : filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3 mt-8">
              {filteredNews.map((singleNews, index) => {
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
