import React from "react";
import ReactPlayer from "react-player/lazy";
import { Link } from "react-router-dom";

const VideoCard = ({ details }) => {
  const { title, thumbnailUrl, linkUrl, videoUrl } = details;
  return (
    <>
      <div className="max-w-lg md:max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="rounded-t-lg h-52 w-full md:h-60">
          <Link to={linkUrl}>
            <ReactPlayer
              url={videoUrl}
              light={thumbnailUrl}
              width="100%"
              height="100%"
              controls={true}
              muted={true}
            />
          </Link>
        </div>
        <div className="p-5">
          <Link to="/categories/1/1">
            <h5 className="mb-2 text-xl tracking-tight text-gray-900 hover:underline dark:text-white">
              {title}
            </h5>
          </Link>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
