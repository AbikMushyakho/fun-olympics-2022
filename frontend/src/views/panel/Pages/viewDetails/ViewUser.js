import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Aside from "../../Components/Aside";
import { MdDeleteOutline, MdOutlineVideoSettings } from "react-icons/md";
import { BiNews } from "react-icons/bi";
import { TbDeviceWatchStats } from "react-icons/tb";
import { FaEdit, FaStar, FaUsers } from "react-icons/fa";
import { getOne } from "../../../../services/users";

const ViewUser = ({ setMessage }) => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUser = async (id) => {
      try {
        const fetchedUser = await getOne(id);
        setUser(fetchedUser);
      } catch (error) {
        setMessage({
          message: `${error.response.data.error}`,
          className: "error",
        });
      }
    };

    fetchUser(id);
  }, []);
  return (
    <div className="flex  h-screen bg-gray-50 dark:bg-gray-900">
      <Aside />
      <main className="h-full grow overflow-y-auto">
        <div className="container md:px-6 mx-auto grid">
          <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            User details
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col space-y-3  w-full h-full p-4 rounded-xl shadow-xs dark:bg-gray-800">
              <div className="flex flex-row justify-center w-full mx-auto">
                <img
                  src="/assets/profile-img/profile-1.png"
                  className="rounded-full p-2"
                  width={100}
                  height={100}
                  alt=""
                />
              </div>
              <div className="flex flex-row justify-center w-full mx-auto">
                <span className="text-bold text-wheatt text-xl">
                  {user.username}
                </span>
              </div>
              <div className="flex flex-row justify-center w-full mx-auto">
                <span className=" text-gray-600 text-sm">{user.email}</span>
              </div>
              <div className="flex flex-row space-x-3 pt-5 justify-center w-full mx-auto">
                <button
                  onClick={() => navigate(`/panel/users/edit/${id}`)}
                  className="text-white flex content-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-thin lg:font-medium rounded-lg truncate text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <FaEdit className="w-5 h-5" />
                  <span> Edit</span>
                </button>
                <button className="text-white flex content-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-thin lg:font-medium rounded-lg truncate text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                  <MdDeleteOutline className="w-5 h-5" />

                  <span>Delete</span>
                </button>
              </div>
            </div>

            <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-2">
              <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <div className="p-3 mr-4 text-orange-500 bg-orange-100 rounded-full dark:text-orange-100 dark:bg-orange-500">
                  <FaStar className="w-5 h-5" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Favourites
                  </p>
                  <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                   {user.favourites?user.favourites.length:0}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-white rounded-lg shadow-xs dark:bg-gray-800">
                <div className="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500">
                  <MdOutlineVideoSettings className="w-5 h-5" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                    Video watched
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
                  News read
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewUser;
