import { Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../Components/TextField";
import { loginValidationSchema } from "../FormValidation/validationSchema";
import { login } from "../services/users";
import { ToastContainer, toast } from "react-toastify";

const Login = ({ setLoginStatus }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center py-8">
      <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <Formik
          onReset={console.log("Form being reset")}
          initialValues={{ email: "", password: "" }}
          onSubmit={async (data, { resetForm }) => {
            try {
              const response = await login(data);
              if (response) {
                resetForm({});
                toast.success("Login Success!", {
                  autoClose: 2000,
                });
                const user = JSON.stringify(response);
                window.localStorage.setItem("loggedInOlympicsUser", user);
                setLoginStatus(true);
                setTimeout(() => {
                  navigate("/live");
                }, 2000);
              }
            } catch (error) {
              toast.error(error.response.data.error);
            }
          }}
          validationSchema={loginValidationSchema}
        >
          {({ errors, handleChange, handleSubmit, values }) => {
            return (
              <form
                className="space-y-6"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <ToastContainer />
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                  Sign in to our platform
                </h5>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Your email
                  </label>
                  <TextField
                    type="email"
                    name="email"
                    placeholder="name@company.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Your password
                  </label>
                  <TextField
                    type="password"
                    name="password"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex items-start">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        required=""
                      />
                    </div>
                    <label
                      htmlFor="remember"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgetPw"
                    className="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Lost Password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Login to your account
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Not registered?
                  <Link
                    to="/signup"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Create account
                  </Link>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
