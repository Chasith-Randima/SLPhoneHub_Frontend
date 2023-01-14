import React from "react";
import Link from "next/link";

const MobileMenuBar = ({ filterOn, filter }) => {
  return (
    <>
      {/* <!-- mobile menubar --> */}
      <div class="fixed w-full border-t border-gray-200 shadow-sm bg-white py-3 bottom-0 left-0 flex justify-around items-start px-6 lg:hidden z-40">
        <Link
          href={`/`}
          class="block text-center text-gray-700 hover:text-primary transition relative"
        >
          <div class="text-2xl" id="menuBar">
            <i class="fa-solid fa-house"></i>
          </div>
          <div class="text-xs leading-3">Home</div>
        </Link>
        <Link
          href={`/ads/selectAdType`}
          class="block text-center text-gray-700 hover:text-primary transition relative"
        >
          <div class="text-2xl">
            <i className="fa-solid fa-plus"></i>
          </div>
          <div class="text-xs leading-3">Post</div>
        </Link>
        <a
          href="#"
          class="block text-center text-gray-700 hover:text-primary transition relative"
        >
          <div class="text-2xl">
            <i class="fas fa-search"></i>
          </div>
          <div
            class="text-xs leading-3"
            onClick={() => filterOn && filterOn(!filter)}
          >
            Search
          </div>
        </a>
        <Link
          href={`/user/login`}
          class="text-center text-gray-700 hover:text-primary transition relative"
        >
          {/* <span class="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">
            3
          </span> */}
          <div class="text-2xl">
            <i class="fa-solid fa-right-to-bracket"></i>
          </div>
          <div class="text-xs leading-3">LogIn</div>
        </Link>
      </div>
      {/* <!-- mobile menu end --> */}
      {/* <!-- mobile sidebar menu --> */}
      <div
        class="fixed left-0 top-0 w-full h-full z-50 bg-black bg-opacity-30 shadow hidden"
        id="mobileMenu"
      >
        <div class="absolute left-0 top-0 w-72 h-full z-50 bg-white shadow">
          <div
            id="closeMenu"
            class="text-gray-400 hover:text-primary text-lg absolute right-3 top-3 cursor-pointer"
          >
            <i class="fas fa-times"></i>
          </div>
          {/* <!-- navlink --> */}
          <h3 class="text-xl font-semibold text-gray-700 mb-1 font-roboto pl-4 pt-4">
            Menu
          </h3>
          <div class="">
            <a
              href="index.html"
              class="block px-4 py-2 font-medium transition hover:bg-gray-100"
            >
              Home
            </a>
            <a
              href="shop.html"
              class="block px-4 py-2 font-medium transition hover:bg-gray-100"
            >
              Shop
            </a>
            <a
              href="#"
              class="block px-4 py-2 font-medium transition hover:bg-gray-100"
            >
              About Us
            </a>
            <roa
              href="#"
              class="block px-4 py-2 font-medium transition hover:bg-gray-100"
            >
              Contact Us
            </roa>
          </div>
          {/* <!-- navlinks end --> */}
        </div>
      </div>
      {/* <!-- mobile sidebar menu end --> */}
    </>
  );
};

export default MobileMenuBar;
