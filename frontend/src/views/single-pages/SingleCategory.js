import React from "react";
import {  Outlet } from "react-router-dom";
import VideoCard from "../../Components/VideoCard";

const SingleCategory = () => {
  return (
    <>
      <div className="w-full flex flex-col">
        <div className="mb-8 w-full flex justify-center">
          <span className="text-wheatt font-bold md:text-2xl lg:text-3xl">
            Swimming
          </span>
        </div>
        <div className="grid grid-cols-1 grid-flow-row gap-4 md:grid-cols-3">
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
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default SingleCategory;
