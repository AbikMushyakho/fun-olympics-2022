import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div>
      <div className="w-full flex flex-col">
        <div className="mb-8 w-full flex-col justify-center space-y-5">
          <div className="flex flex-row w-full justify-center">
            <span className="text-wheatt text-xl font-bold md:text-2xl lg:text-3xl">
              About us
            </span>
          </div>
          <div className="flex flex-row w-full justify-center">
            <p className="text-justify">
              The Fun olympics 2022 games and websites are managed and operated
              by City of Bayjing.
              {/* OLYMPIC CHANNEL SERVICES, S.L., Calle Torrelaguna 75,
              28027 Madrid Corporate Registry entry: Volume: 33744, Book: 0,
              Page: 110, Section: 8, Sheet: M 607336, Tax identification number
              B87320867 */}
            </p>
          </div>
          <div className="flex flex-row w-full justify-center">
            <button
              onClick={() => {
                window.location = "mailto:abikmisst@gmail.com";
              }}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-thin lg:font-medium rounded-lg truncate text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Contact us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
