import { Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "../Components/TextField";
import { signupValidationSchema } from "../FormValidation/validationSchema";
import { signup } from "../services/users";

const Signup = ({setMessage}) => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex justify-center py-8 ">
      <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 ">
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={async (data, { resetForm }) => {
            try {
              const response = await signup(data);
              if (response) {
                resetForm({})
                setMessage({message:`Welcome ${response.username}. Please verify your email and continue!`, className:'success' })
                window.localStorage.setItem(
                  "signupEmail",
                  JSON.stringify(response.email)
                );
                 
                    navigate("/verify");    
                     
              }
            } catch (error) {
              setMessage({message:`${error.response.data.error}`, className:'warning' })
            }
          }}
          validationSchema={signupValidationSchema}
        >
          {({ errors, handleChange, handleSubmit, values }) => {
            return (
              <form
                className="space-y-6"
                onSubmit={handleSubmit}
                autoComplete="off"
              >
                <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                  Sign up to Fun Olympics 2022
                </h5>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Username
                  </label>
                  <TextField
                    type="text"
                    name="username"
                    placeholder="username"
                  />
                </div>
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
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Confirm password
                  </label>
                  <TextField
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign up
                </button>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                  Already registered?
                  <Link
                    to="/login"
                    className="text-blue-700 hover:underline dark:text-blue-500"
                  >
                    Login to your account
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

export default Signup;
