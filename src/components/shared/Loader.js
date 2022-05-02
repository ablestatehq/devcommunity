import React from "react";
export const Loader = ({ title, body }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-center">
        <div className="text-3xl font-bold">{title}</div>
        <div className="text-2xl">{body}</div>
      </div>
    </div>
  );
};

export default Loader;