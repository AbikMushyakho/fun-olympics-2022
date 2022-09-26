import React, { useEffect, useState } from "react";
import Aside from "./Components/Aside";

import { FaUsers } from "react-icons/fa";
import { MdOutlineVideoSettings } from "react-icons/md";
import { BiCategory, BiNews } from "react-icons/bi";
import { TbDeviceWatchStats } from "react-icons/tb";
import UsersTable from "./Components/UsersTable";
import { getAll as getAllUsers } from "../../services/users";
import { getAllCategories } from "../../services/category";
import { getAll as getAllNews } from "../../services/news";
import { getAll as getAllVideos } from "../../services/video";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ setMessage }) => {
  const [users, setUsers] = useState([]);
  const [news, setNews] = useState([]);
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const fetchedUser = await getAllUsers();
      const fetchedNews = await getAllNews();
      const fetchedVideos = await getAllVideos();
      const fetchedCategories = await getAllCategories();
      setUsers(fetchedUser);
      setNews(fetchedNews);
      setVideos(fetchedVideos);
      setCategories(fetchedCategories);
    } catch (error) {
      setMessage({
        message: `${error.message || error.response.data.error}`,
        className: "error",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex  h-screen bg-gray-50 dark:bg-gray-900">
        <Aside />
        <main className="h-full grow mx-auto md:px-6 overflow-y-auto">
          <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Dashboard
          </h2>

          <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
            <div
              onClick={() => {
                navigate("/panel/users");
              }}
              className="cursor-pointer flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
            >
              <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                <FaUsers className="w-5 h-5" />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total users
                </p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {users ? users.length : 0}
                </p>
              </div>
            </div>

            <div
              onClick={() => {
                navigate("/panel/videos");
              }}
              className="cursor-pointer flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
            >
              <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                <MdOutlineVideoSettings className="w-5 h-5" />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total videos
                </p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {videos ? videos.length : 0}
                </p>
              </div>
            </div>

            <div
              onClick={() => {
                navigate("/panel/news");
              }}
              className="cursor-pointer flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
            >
              <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500">
                <BiNews className="w-5 h-5" />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total News
                </p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {news ? news.length : 0}
                </p>
              </div>
            </div>

            <div
              onClick={() => {
                navigate("/panel/categories");
              }}
              className="cursor-pointer flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800"
            >
              <div className="p-3 mr-4 text-teal-500 bg-teal-100 rounded-full dark:text-teal-100 dark:bg-teal-500">
                <BiCategory className="w-5 h-5" />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Categories
                </p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {categories ? categories.length : 0}
                </p>
              </div>
            </div>
          </div>

          <UsersTable setMessage={setMessage} />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
