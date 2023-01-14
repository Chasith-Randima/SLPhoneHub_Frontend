import React from "react";

const Breadcrum = ({ title }) => {
  return (
    <>
      {/* <!-- breadcrum --> */}
      <div class="py-1 md:py-4 container flex gap-3 items-center">
        <a href="index.html" class="text-primary text-base">
          <i class="fas fa-home"></i>
        </a>
        <span class="text-sm text-gray-400">
          <i class="fas fa-chevron-right"></i>
        </span>
        <p class="text-gray-600 font-medium uppercase">{title}</p>
      </div>
      {/* <!-- breadcrum end --> */}
    </>
  );
};

export default Breadcrum;
