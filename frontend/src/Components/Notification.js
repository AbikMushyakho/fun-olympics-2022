import React from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Notification = ({ notify }) => {
  if (notify && notify.message) {
    if (notify.className === "success") {
      toast.success(notify.message, {
        autoClose: 2000,
      });
    } else if (notify.className === "info") {
      toast.info(notify.message, {
        autoClose: 2000,
      });
    } else if (notify.className === "warning") {
      toast.warning(notify.message, {
        autoClose: 2000,
      });
    } else if (notify.className === "error") {
      toast.error(notify.message, {
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
