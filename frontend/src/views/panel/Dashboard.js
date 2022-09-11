import React from "react";
import Aside from "./Components/Aside";

import Table from "./Components/Table";
import { FaUsers } from "react-icons/fa";
import { MdOutlineVideoSettings } from "react-icons/md";
import { BiNews } from "react-icons/bi";
import { TbDeviceWatchStats } from "react-icons/tb";

const Dashboard = () => {
  return (
    <>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Aside />
        <main className="h-full overflow-y-auto">
          <div className="container px-6 mx-auto grid">
            <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
              Dashboard
            </h2>

            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
              <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                  <FaUsers className="w-5 h-5" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total users
                  </p>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    6389
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                  <MdOutlineVideoSettings className="w-5 h-5" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total videos
                  </p>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    25
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                  <BiNews className="w-5 h-5" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total News
                  </p>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    376
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                  <TbDeviceWatchStats className="w-5 h-5" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Watch time
                  </p>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    01:10 h
                  </p>
                </div>
              </div>
            </div>

            <Table />
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
