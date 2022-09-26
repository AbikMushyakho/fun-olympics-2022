import React from "react";

const Profile = ({user}) => {
  return (
    <>
      <div className="h-full bg-gray-50 dark:bg-gray-900 py-10">
        <div className="border-b-2 border-b-gray-700  flex flex-col space-y-4 md:space-y-0 md:flex-row   ">
          {/* p-4 w-full max-w-sm  rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 */}
          <div className="w-full md:w-2/5 p-4 sm:p-6 lg:p-8 rounded-lg dark:bg-gray-800 dark:border-gray-700 shadow-md">
            <div className="flex justify-between  ">
              <span className="text-xl font-semibold block">User Profile</span>
              <button className="-mt-2 text-md font-bold text-white bg-gray-700 rounded-full px-5 py-2 hover:bg-gray-800">
                Edit
              </button>
            </div>

            <span className="text-gray-600">
              This information is secret so be careful
            </span>
            <div className="w-full p-8 mx-2 flex justify-center">
              <img
                id="showImage"
                className="max-w-xs w-32 items-center border"
                src="/assets/profile-img/profile-1.png"
                alt=""
              />
            </div>
          </div>

          <div className="w-full md:w-3/5 p-8  dark:bg-gray-800 rounded-lg dark:border-gray-700 lg:ml-4 shadow-md">
            <div className="rounded  shadow p-6">
              <div className="pb-6">
                <label
                  htmlFor="name"
                  className="font-semibold text-gray-700 block pb-1 dark:text-gray-300"
                >
                  Name
                </label>
                <div className="flex">
                  <input
                    disabled
                    id="username"
                    className="border-1  rounded-xl px-4 py-2 w-full  dark:bg-gray-800 dark:border-gray-700 "
                    type="text"
                    value={user?user.username:""}
                  />
                </div>
              </div>
              <div className="pb-4">
                <label
                  htmlFor="about"
                  className="font-semibold text-gray-700 block pb-1 dark:text-gray-300  "
                >
                  Email
                </label>
                <input
                  disabled
                  id="email"
                  className="border-1  rounded-xl px-4 py-2 w-full dark:bg-gray-800 dark:border-gray-700"
                  type="email"
                  value={user?user.email:""}
                />
                <span className="text-gray-600 pt-4 block opacity-70 dark:text-gray-300">
                  Personal login information of your account
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
