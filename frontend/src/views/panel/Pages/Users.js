import React from "react";
import Aside from "../Components/Aside";
import UsersTable from "../Components/UsersTable";

const Users = ({ setMessage }) => {
  return (
    <div className="flex w-full h-auto md:h-screen bg-gray-50 dark:bg-gray-900 ">
      <Aside />
      <main className="md:px-6 mx-auto w-full grow overflow-y-auto">
        {/* <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Users
          </h2> */}
        <UsersTable setMessage={setMessage} />
      </main>
    </div>
  );
};

export default Users;
