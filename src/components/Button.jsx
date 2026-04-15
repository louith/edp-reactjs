import React from "react";

const MyButton = ({ title, onClick, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer ${className}`}
    >
      {title}
    </button>
  );
};

export default MyButton;
