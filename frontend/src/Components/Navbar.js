import React, { useState } from "react";
import { BiMenu } from "react-icons/bi";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Navigate } from 'react-router-dom'

const Navbar = ({ loginStatus, setLoginStatus }) => {
  // const [loggedIn, setLoggedIn] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;

  const lightText =
    "block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white";
  const normalText =
    "block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

  if (loginStatus) {
    var ur = window.localStorage.getItem("loggedInOlympicsUser");
    var user = JSON.parse(ur);
  }

  return (
    <div className="left-0 dark">
      <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/" className="flex items-center ">
            <img
              src="/olympics.png"
              className="mr-3 h-6 sm:h-9"
              alt="Olympics Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Olympics
            </span>
          </Link>

          <div className="flex flex-row md:order-2 left-0">
            {loginStatus ? (
              // <Link
              //   to="/profile"
              //   className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              // >
              //   Go to profile
              // </Link>
              <>
                <button
                  className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowUserMenu(!showUserMenu);
                  }}
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/assets/profile-img/profile-1.png"
                    alt="user-img"
                  />
                </button>
                <div
                  className={`${
                    showUserMenu ? "block" : "hidden"
                  } absolute right-16 top-16 md:right-5 md:top-14 text-base list-none bg-white rounded-lg divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600`}
                  onClick={() => {
                    setShowUserMenu(false);
                  }}
                >
                  <div className="py-3 px-4">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {user.username}
                    </span>
                    <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
                      {user.email}
                    </span>
                  </div>
                  <ul className="py-1" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        to="/"
                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/"
                        className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Earnings
                      </Link>
                    </li>
                    <li>
                      <button
                        className="block py-2 w-full text-left px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                        onClick={(e) => {
                          e.preventDefault();
                          setLoginStatus(false);
                          window.localStorage.removeItem(
                            "loggedInOlympicsUser"
                          );
                          navigate("/");
                        }}
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Join now
                </Link>
              </>
            )}
            <button
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={(e) => {
                e.preventDefault();
                setShowMenu(!showMenu);
              }}
            >
              <span className="sr-only">Open main menu</span>
              <BiMenu className="w-7 h-7" />
            </button>
          </div>
          <div
            className={`${
              showMenu ? "block" : "hidden"
            } justify-between items-center w-full md:flex md:w-auto md:order-1`}
            onClick={() => {
              setShowMenu(false);
            }}
          >
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/"
                  className={path === "/" ? lightText : normalText}
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className={path === "/news" ? lightText : normalText}
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className={path === "/categories" ? lightText : normalText}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/live"
                  className={path === "/live" ? lightText : normalText}
                >
                  Live
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
