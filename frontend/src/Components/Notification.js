import React from "react";
// import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = ({ setUser,notify }) => {
  // const navigate = useNavigate()
  const { className, message } = notify;

  if (message === "undefined") {
    toast.error("Internal server error 500", {
      autoClose: 2000,
    });
  } 
  else if(message === "Bad request!"){
    // window.location.href='/login'
    window.localStorage.clear();
    setUser(null)
    toast.error(message, {
      autoClose: 2000,
    });
  }
  
  else if (message === "token expired") {
    window.localStorage.clear();
    setUser(null)
    // window.location.href='/login'
    toast.warning(message, {
      autoClose: 2000,
    });
  } else if (className && message !== "undefined") {
    if (className === "success") {
      toast.success(message, {
        autoClose: 2000,
      });
    } else if (className === "info") {
      toast.info(message, {
        autoClose: 2000,
      });
    } else if (className === "warning") {
      toast.warning(message, {
        autoClose: 2000,
      });
    } else if (className === "error") {
      toast.error(message, {
        autoClose: 2000,
      });
    }
  }
  return (
    <>
      <ToastContainer position="top-right" />
    </>
  );
};

export default Notification;
