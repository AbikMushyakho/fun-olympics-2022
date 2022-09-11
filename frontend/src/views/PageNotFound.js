import React from "react";
import { FaPage4, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="w-full flex h-full justify-center">
      <div className="flex flex-col space-y-5 my-16 w-full items-center ">
        <div>
        <FaPage4 size="5em" />
        </div>
        <p className="text-center">
          <span className="text-purple-600 font-bold">404</span>
          <br />
          <span className="font-bold text-2xl">Page not found.</span>
          <br />
          <span className="text-sm">
            Sorry, we couldn't find the page you're looking for.
          </span>
        </p>
        <Link
          to="/"
          className="inline-flex font-bold text-purple-600 hover:underline focus:ring-gray-50"
        >
          Go back home{" "}
          <FaArrowRight className="self-center w-4 h-4 mx-2 hover:bg-grayy hover:rounded-lg" />{" "}
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
