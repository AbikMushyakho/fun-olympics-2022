import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../Components/Loading";
import NewsCard from "../../Components/NewsCard";
import NotExists from "../../Components/NotExists";
import { getAll, getOne } from "../../services/news";
const SingleNews = ({ setMessage }) => {
  const [news, setNews] = useState({});
  const [relatedNews, setRelatedNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const fetchedNews = await getOne(id);
        const allNews = await getAll();
        setNews(fetchedNews);
        const filtered = allNews.filter((n) => n.id !== id);
        setRelatedNews(filtered);
        setIsLoading(false);
      } catch (error) {
        setMessage({
          message: `${error.response.data.error}`,
          className: "error",
        });
      }
    };
    fetchData(id);
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
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
      )}

      {/* Related News */}
      <div className="my-8 w-full flex flex-col">
        <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
          Related News
        </span>
        <hr className=" mt-4 h-1" />
      </div>

      {relatedNews.length > 0 ? (
        <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3">
          {relatedNews.map((singleNews, index) => {
            if (index < 6)
              return (
                <NewsCard
                  key={index}
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
        <NotExists name="related news" />
      )}
    </div>
  );
};

export default SingleNews;
