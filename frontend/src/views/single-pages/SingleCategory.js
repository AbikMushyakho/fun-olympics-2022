import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Loading from "../../Components/Loading";
import NotExists from "../../Components/NotExists";
import VideoCard from "../../Components/VideoCard";
import { getOne } from "../../services/category";

const SingleCategory = ({ setMessage }) => {
  const [category, setCategory] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const fetchedData = await getOne(id);
        setCategory(fetchedData);
        setVideos(fetchedData.videos);
        setIsLoading(false);
      } catch (error) {
        setMessage({
          message: `${error.response.data.error}`,
          className: "error",
        });
      }
    };

    fetchData(id);
  }, []);

  return (
    <>
      <div className="w-full flex flex-col">
        <div className="mb-8 w-full flex justify-center">
          <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
            {category.title}
          </span>
        </div>

        {isLoading ? (
          <Loading />
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3">
            {videos.map((video, index) => {
              return (
                <VideoCard
                  key={video.id}
                  details={{
                    title: video.title,
                    linkUrl: `/categories/${video.category}/${video.id}`,
                    videoUrl: video.video_url,
                    views: video.views,
                    addedDate:video.addedDate
                  }}
                />
              );
            })}

          
          </div>
        ) : (
          <NotExists name="category videos" />
        )}
      </div>

      <Outlet />
    </>
  );
};

export default SingleCategory;
