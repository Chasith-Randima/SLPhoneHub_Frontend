import React from "react";

const Breadcrum = ({ title }) => {
  return (
    <>
      {/* <!-- breadcrum --> */}
      <div className="py-1 md:py-4 container flex gap-3 items-center">
        <a href="index.html" className="text-primary text-base">
          <i className="fas fa-home"></i>
        </a>
        <span className="text-sm text-gray-400">
          <i className="fas fa-chevron-right"></i>
        </span>
        <p className="text-gray-600 font-medium uppercase">{title}</p>
      </div>
      {/* <!-- breadcrum end --> */}
    </>
  );
};

export default Breadcrum;
