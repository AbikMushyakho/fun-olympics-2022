import React, { useState } from "react";
import { verify } from "../services/loginSignup";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const verifyOTP = async (e) => {
    e.preventDefault();

    const email = window.localStorage.getItem("signupEmail");
    const data = {
      email: JSON.parse(email),
      code: parseInt(code),
    };
    try {
      const response = await verify(data);
      if (response) {
        toast.success(`Email verified..`, {
          autoClose:2000
        });
        window.localStorage.removeItem("signupEmail");
          setInterval(() => {
            navigate("/login");
          }, 2000);
       
      }
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center py-8 ">
        <div className="container mx-auto p-5">
          <div className="max-w-sm mx-auto md:max-w-lg">
            <div className="w-full">
              <ToastContainer />
              <div className="bg-white dark:bg-blackk min-h-80 py-7 rounded-lg text-center">
                <h1 className="text-2xl font-bold">OTP Verification</h1>
                <div className="flex flex-col mt-4">
                  <span>Enter the OTP you received at</span>
                  <span className="font-semibold">your gmail</span>
                </div>

                <div className=" w-full items-center px-5 flex flex-col h-auto dark:text-blackk">
                  <input
                    className=" my-4 bg-gray-50 border w-full py-3 font-bold text-lg border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    type="tel"
                    maxLength="6"
                    placeholder="Enter otp code"
                    onChange={(e) => {
                      e.preventDefault();
                      setCode(e.target.value);
                    }}
                  />
                  <button
                    onClick={verifyOTP}
                    className="btn-primary mx-auto block bg-gray-500 px-4 py-2.5 rounded-lg text-white hover:bg-gray-700"
                  >
                    Verify Otp
                  </button>
                </div>

                <div className="flex justify-center text-center mt-5">
                  {/* <a className="flex items-center text-blue-700 hover:text-blue-900 cursor-pointer">
                    <span className="font-bold">Resend OTP</span>
                    <i className="bx bx-caret-right ml-1"></i>
                  </a> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verify;
