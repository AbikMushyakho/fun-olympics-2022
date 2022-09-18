import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import VideoCard from "../../Components/VideoCard";
import { getOne } from "../../services/category";

const SingleCategory = ({ setMessage }) => {
  const [category, setCategory] = useState({});
  const [videos, setVideos] =useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const fetchedData = await getOne(id);
        console.log(fetchedData);
        setCategory(fetchedData);
        setVideos(fetchedData.videos)
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
        <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3">
          {videos.map((video, index) => {
            return (
              <VideoCard
                key={video.id}
                details={{
                  title: video.title,
                  thumbnailUrl: "/assets/thumbnails/swimming.jpg",
                  linkUrl: `/categories/${video.category}/${video.id}`,
                  videoUrl: video.video_url,
                }}
              />
            );
          })}

          {/* Static Videos */}
          {/* <VideoCard
            details={{
              title:
                "Michael Phelps Last Olympic Race - Swimming Men's 4x100m Medley Relay Final | Rio",
              thumbnailUrl: "/assets/thumbnails/swimming.jpg",
              linkUrl: "/categories/1/1",
              videoUrl: "/assets/live-video/swimming.mp4",
            }}
          />
          <VideoCard
            details={{
              title:
                "Michael Phelps Last Olympic Race - Swimming Men's 4x100m Medley Relay Final | Rio",
              thumbnailUrl: "/assets/thumbnails/swimming.jpg",
              linkUrl: "/categories/1/1",
              videoUrl: "/assets/live-video/swimming.mp4",
            }}
          />
          <VideoCard
            details={{
              title:
                "Michael Phelps Last Olympic Race - Swimming Men's 4x100m Medley Relay Final | Rio",
              thumbnailUrl: "/assets/thumbnails/swimming.jpg",
              linkUrl: "/categories/1/1",
              videoUrl: "/assets/live-video/swimming.mp4",
            }}
          /> */}
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default SingleCategory;
