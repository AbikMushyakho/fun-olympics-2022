import React, { useState } from "react";
import { useField } from "formik";

const TextArea = (props) => {
  const [field, meta] = useField(props.name);

  const [showError, setShowError] = useState(false);

  return (
    <>
      <textarea
        {...field}
        {...props}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
        onFocus={(e) => {
          e.preventDefault();
          setShowError(true);
        }}
      />
      <span className={`text-red-500 ${showError ? "block" : "hidden"}`}>
        {meta.error}
      </span>
    </>
  );
};

export default TextArea;
