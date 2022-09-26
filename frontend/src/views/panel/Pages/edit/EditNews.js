import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Aside from "../../Components/Aside";
import { getOne, update } from "../../../../services/news";
import { Formik } from "formik";
import TextField from "../../../../Components/TextField";
import TextArea from "../../../../Components/TextArea";

const EditNews = ({ setMessage }) => {
  const { id } = useParams();
  const [news, setNews] = useState({});
  const navigate = useNavigate();
  const fetchNews = async (id) => {
    try {
      const fectchedNews = await getOne(id);
      setNews(fectchedNews);
    } catch (error) {
      setMessage({
        message: `${error.response.data.error}`,
        className: "error",
      });
    }
  };
  useEffect(() => {
    fetchNews(id);
  }, []);

  let initial = {
    title: news.title || "",
    description: news.description || "",
  };

  return (
    <div className="flex flex-row h-full md:h-screen bg-gray-50 dark:bg-gray-900 ">
      <Aside />
      <main className=" px-6 flex-grow h-full md:h-auto">
        <Formik
          enableReinitialize
          initialValues={initial}
          onSubmit={async (data, { resetForm }) => {
            try {
              const response = await update(id, data);
              if (response) {
                setMessage({ message: "News updated..", className: "success" });
                navigate(-1);
              }
            } catch (error) {
              setMessage({
                message: `${error.response.data.error}`,
                className: "warning",
              });
            }
          }}
        >
          {({ errors, handleChange, handleSubmit, values }) => {
            return (
              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="relative bg-white rounded-lg shadow dark:bg-gray-700"
              >
                <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Edit News
                  </h3>
                  <div
                    className="text-gray-400 cursor-pointer bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-6 gap-6 ">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Title
                      </label>
                      <TextField
                        type="text"
                        name="title"
                        value={values.title}
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Uploader
                      </label>
                      <TextField
                        type="text"
                        name="uploader"
                        value={news.user?news.user.username:"" }
                        disabled
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Description
                      </label>
                      <TextArea
                        rows={10}
                        type="text"
                        name="description"
                        value={values.description}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Image
                      </label>
                      <img
                        className="w-full max-h-fit shadow-sm bg-gray-50 border p-2 rounded-md border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600   dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        src={news.image}
                        alt=""
                      />
                    </div>
                    
                  </div>
                </div>

                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save all
                  </button>
                  <div
                    className="text-white bg-gray-700 cursor-pointer hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-500 dark:focus:ring-gray-300"
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Cancel
                  </div>
                </div>
              </form>
            );
          }}
        </Formik>
      </main>
    </div>
  );
};

export default EditNews;
