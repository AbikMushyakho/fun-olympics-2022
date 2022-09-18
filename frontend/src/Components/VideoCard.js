import React from "react";
import ReactPlayer from "react-player/lazy";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const VideoCard = ({ details }) => {
  const { title, linkUrl, videoUrl, views, addedDate } = details;
  return (
    <>
      <div className="max-w-lg md:max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="rounded-t-lg h-52 w-full md:h-60">
          <Link to={linkUrl}>
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              controls={false}
              muted={true}
            />
          </Link>
        </div>
        <div className="p-5">
          <Link to={linkUrl}>
            <h5 className="mb-2 text-xl tracking-tight text-gray-900 hover:underline dark:text-white">
              {title}
            </h5>
            <div className="flex justify-between ">
              <span>{views} views</span>
              <Moment fromNow>{addedDate}</Moment>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
