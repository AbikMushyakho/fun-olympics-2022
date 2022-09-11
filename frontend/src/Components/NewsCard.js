import React from "react";
import { Link } from "react-router-dom";

const NewsCard = ({details}) => {
const { linkUrl, imgUrl, title } = details;
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
        <div className="p-5">
          <Link to={linkUrl}>
            <p className="mb-3 hover:underline font-bold  text-wheatt dark:text-gray-400">
              {title}
            </p>
          </Link>
          <Link
            to={linkUrl}
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Read more
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
    </>
  );
};

export default NewsCard;
