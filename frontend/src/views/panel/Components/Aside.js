import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiCategory, BiLogOut, BiHome, BiNews } from "react-icons/bi";
import { ImVideoCamera } from "react-icons/im";
import { TbDeviceAnalytics } from "react-icons/tb";
import { FaUsers } from "react-icons/fa";
import { getOne } from "../../../services/users";
import { toast } from "react-toastify";

const Aside = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async () => {
      let loggedUser = window.localStorage.getItem("loggedInOlympicsUser");
      if (loggedUser) {
        const parsedUser = JSON.parse(loggedUser);
        try {
          const fetchedUser = await getOne(parsedUser.id);
          if (fetchedUser === undefined || fetchedUser.isAdmin === false) {
            navigate("/");
          }
        } catch (error) {
          toast.error(error.message || error.response.data.error, 2000);
        }
      }
    };
    fetchUser();
  });

  const glowText = `inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100`;
  const notGlow = `inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200`;
  const location = useLocation();
  //   console.log(location.pathname);
  const path = location.pathname;
  const glowAside = `absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg`;
  return (
    <>
      <aside className="hidden w-64 overflow-y-auto scroll bg-white dark:bg-gray-800 md:block flex-shrink-0">
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <Link
            className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
            to="/"
          >
            Admin panel
          </Link>
          <ul className="mt-6">
            <li className="relative px-6 py-3">
              <span
                className={path === "/panel" ? glowAside : ""}
                aria-hidden="true"
              ></span>
              <Link
                className={path === "/panel" ? glowText : notGlow}
                to="/panel"
              >
                <BiHome className="w-5 h-5" />
                <span className="ml-4">Dashboard</span>
              </Link>
            </li>
          </ul>
          <ul>
            <li className="relative px-6 py-3">
              <span
                className={path === "/panel/users" ? glowAside : ""}
                aria-hidden="true"
              ></span>
              <Link
                className={path === "/panel/users" ? glowText : notGlow}
                to="/panel/users"
              >
                <FaUsers className="w-5 h-5" />
                <span className="ml-4">Users</span>
              </Link>
            </li>
            <li className="relative px-6 py-3">
              <span
                className={path === "/panel/categories" ? glowAside : ""}
                aria-hidden="true"
              ></span>
              <Link
                className={path === "/panel/categories" ? glowText : notGlow}
                to="/panel/categories"
              >
                <BiCategory className="w-5 h-5" />
                <span className="ml-4">Categories</span>
              </Link>
            </li>
            <li className="relative px-6 py-3">
              <span
                className={path === "/panel/videos" ? glowAside : ""}
                aria-hidden="true"
              ></span>
              <Link
                className={path === "/panel/videos" ? glowText : notGlow}
                to="/panel/videos"
              >
                <ImVideoCamera className="w-5 h-5" />

                <span className="ml-4">Videos</span>
              </Link>
            </li>
            {/* <li className="relative px-6 py-3">
              <span
                className={path === "/panel/highlights" ? glowAside : ""}
                aria-hidden="true"
              ></span>
              <Link
                className={path === "/panel/highlights" ? glowText : notGlow}
                to="/panel/highlights"
              >
                <BiNews className="w-5 h-5" />

                <span className="ml-4">Highlights</span>
              </Link>
            </li> */}

            <li className="relative px-6 py-3">
              <span
                className={path === "/panel/news" ? glowAside : ""}
                aria-hidden="true"
              ></span>
              <Link
                className={path === "/panel/news" ? glowText : notGlow}
                to="/panel/news"
              >
                <BiNews className="w-5 h-5" />

                <span className="ml-4">News</span>
              </Link>
            </li>
            <li className="relative px-6 py-3">
              <span
                className={path === "/panel/analytics" ? glowAside : ""}
                aria-hidden="true"
              ></span>
              <Link
                className={path === "/panel/analytics" ? glowText : notGlow}
                to="/panel/analytics"
              >
                <TbDeviceAnalytics className="w-5 h-5" />

                <span className="ml-4">Analytics</span>
              </Link>
            </li>
          </ul>
          <div className="px-6 my-6">
            <Link
              to="/"
              className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
            >
              Back to home
              <span className="ml-2" aria-hidden="true">
                <BiLogOut />
              </span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Aside;
