import React from "react";
import { useNavigate } from "react-router-dom";
import Aside from "../../Components/Aside";
import { create } from "../../../../services/category";
import { Formik } from "formik";
import TextField from "../../../../Components/TextField";
import TextArea from "../../../../Components/TextArea";

const AddCategory = ({ setMessage }) => {
  const navigate = useNavigate();

  let initial = {
    title: "",
    description: "",
    image: "",
  };

  return (
    <div className="flex flex-row h-full md:h-screen bg-gray-50 dark:bg-gray-900 ">
      <Aside />
      <main className=" px-6 flex-grow h-full md:h-auto">
        <Formik
          //   enableReinitialize
          initialValues={initial}
          onSubmit={async (data, { resetForm }) => {

            let newdata =  new FormData();
            newdata.append('image',data.image)
            newdata.append('title',data.title)
            newdata.append('description',data.description)
            // newdata.append('fileType','category')
          
            try {
              const response = await create(newdata);
              if (response) {
                setMessage({
                  message: "Category created..",
                  className: "success",
                });
                navigate(-1);
              }
            } catch (error) {
              console.log(error)
              let message 
              if(error.response){
                message = error.response.data.error
              }else{
                message = error.message 
              }
              setMessage({
                message: `${message }`,
                className: "warning",
              });
            }
          }}
        >
          {({ errors, handleChange, handleSubmit, values, setFieldValue }) => {
            return (
              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                className="relative bg-white rounded-lg shadow dark:bg-gray-700"
              >
                <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add category
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
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        // value={user.title || ""}
                        // onChange={handleInputChange}
                        placeholder="Enter title here..."
                        required
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="videos"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Videos
                      </label>
                      <TextField
                        type="number"
                        name="videos"
                        // className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        // value={user.title || ""}
                        // onChange={handleInputChange}
                        value={0}
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
                        placeholder="Enter description here..."
                        required
                        // value={values.description}
                        // className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        // onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Image
                      </label>
                      <input
                        type="file"
                        name="image"
                        onChange={(event) =>
                          setFieldValue("image", event.target.files[0])
                        }
                        required
                        // onClick={handleChange('image')}
                        // onChange={(e) => {
                        //   e.preventDefault();
                        //   setFieldValue("image", e.target.files[0]);
                        // }}
                        // required
                      />

                      {/* <img
                        className="w-full max-h-fit shadow-sm bg-gray-50 border p-2 rounded-md border-gray-300 text-gray-900 sm:text-sm  focus:ring-blue-600 focus:border-blue-600   dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        src={category.image}
                        alt=""
                      /> */}
                    </div>
                  </div>
                </div>

                <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add
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

export default AddCategory;
