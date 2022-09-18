import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notification = ({ notify }) => {
  const { className, message } = notify;

  if (message === "undefined") {
    toast.error("Internal server error 500", {
      autoClose: 2000,
    });
  } else if (message === "token expired") {
    window.localStorage.clear();
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
