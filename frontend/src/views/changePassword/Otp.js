import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { send_mail, verify_otp } from "../../services/changePassword";

const Otp = ({ setMessage }) => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const email = window.localStorage.getItem("ChangePasswordEmail");
    if (!email) {
      setMessage({
        message: `Please provide your email!`,
        className: "warning",
      });
      navigate("/forget");
    } else {
      setEmail(email);
    }
  }, []);

  const verifyOTP = async (e) => {
    e.preventDefault();

    if (code === "") {
      setMessage({
        message: "Please enter the OPT code!",
        className: "warning",
      });
    } else {
      const data = {
        email: email,
        code: parseInt(code),
      };
      try {
        const response = await verify_otp(data);
        if (response) {
          navigate("/change_password");
          setMessage({ message: "Otp Verified", className: "success" });
        }
      } catch (error) {
        setMessage({
          message: `${error.response.data.error}`,
          className: "error",
        });
      }
    }
  };
  return (
    <div className="w-full flex justify-center py-8">
      <div className="p-4 w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="bg-white dark:bg-gray-800 dark:border-gray-700 min-h-80 rounded-lg text-center">
          <h1 className="text-xl font-medium text-gray-900 dark:text-white mb-4">
            OTP Verification
          </h1>
          <div className="mt-4 w-full items-center flex flex-col h-auto dark:text-blackk">
            <div className="flex flex-row justify-start w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Your Email
              </label>
            </div>

            <input
              className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              type="email"
              value={email}
              disabled
            />

            <div className="flex flex-row justify-start w-full">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Otp code
              </label>
            </div>
            <input
              className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              type="tel"
              maxLength="6"
              placeholder="Enter otp code here"
              onChange={(e) => {
                e.preventDefault();
                setCode(e.target.value);
              }}
            />
            <button
              onClick={verifyOTP}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Verify Otp
            </button>
          </div>

          <div className="flex justify-center text-center mt-5">
            <div className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
              <button
                onClick={async () => {
                  try {
                    const data = { email: email };
                    const response = await send_mail(data);
                    if (response) {
                      window.localStorage.setItem("ChangePasswordEmail", email);
                      setMessage({
                        message: "Otp resent successfully",
                        className: "success",
                      });
                    }
                  } catch (error) {
                    setMessage({
                      message: `${error.response.data.error}`,
                      className: "error",
                    });
                  }
                }}
                className="font-thin"
              >
                Resend OTP
              </button>
              <i className="bx bx-caret-right ml-1"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Otp;
