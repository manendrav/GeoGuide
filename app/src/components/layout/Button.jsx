import React from "react";

export default function Button({
  children,
  type = "button",
  bgColor = "",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-3 py-2 rounded-md shadow-md font-semibold bg-purple-500 text-white transition-all duration-300 hover:bg-purple-600 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
