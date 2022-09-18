import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ details }) => {
  const { linkUrl, imgUrl, title, description, total_videos } = details;
  return (
    <>
      <div className="max-w-lg md:max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <Link to={linkUrl}>
          <img
            className="rounded-t-lg w-full h-auto md:h-60"
            src={imgUrl}
            alt="img1"
          />
        </Link>
        <div className="p-5 ">
          <Link to={linkUrl}>
            <h5 className="mb-2 hover:underline text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {title}
            </h5>
          </Link>
          <Link to={linkUrl}>
            <p className=" font-normal hover:underline truncate hover:text-clip text-gray-700 dark:text-gray-400">
              {description}
            </p>
            <span className="text-gray-700 dark:text-gray-400 font-thin">{total_videos} videos</span>
          </Link>
          <div className="flex justify-end mt-3">
            <Link
              to={linkUrl}
              className="inline-flex items-center py-2 px-3 right-0 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Watch videos
              <svg
                aria-hidden="true"
                className="ml-2 -mr-1 w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
