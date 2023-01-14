import React from "react";
import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from "fontawesome/react-fontawesome";
// import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { isAuth, logOut } from "./../actions/auth";
import { searchPhones } from "./../actions/ads";
import Link from "next/link";
import Router from "next/router";
import SearchSection from "./SearchSection";

// console.log(isAuth());

const Navbar = ({ search }) => {
  const [show, setShow] = useState();
  // const [values, setValues] = useState({
  //   searchState: undefined,
  //   results: [],
  //   searched: false,
  //   message: "",
  // });

  // let { searchState, results, searched, message } = values;

  // const searchSubmit = async (e) => {
  //   e.preventDefault();

  //   await searchPhones({ search: searchState }).then((data) => {
  //     console.log(data);
  //     setValues({
  //       ...values,
  //       results: data.data,
  //       searched: true,
  //       message: `${data.data.length} adds found..`,
  //     });
  //   });
  // };

  // const handleChange = (e) => {
  //   setValues({
  //     ...values,
  //     searchState: e.target.value,
  //     searched: false,
  //     results: [],
  //   });
  //   searchSubmit(e);
  //   console.log(searchState);
  //   // if (searchState == "") {
  //   //   setValues({ ...values, results: [], searched: false });
  //   // }
  // };

  useEffect(() => {
    if (!isAuth()) {
      setShow(false);
    } else if (isAuth()) {
      setShow(true);
    }
  }, []);
  // console.log(isAuth());

  // const searchResults = (results = []) => {
  //   return (
  //     <div className="w-1/3 bg-white flex flex-col mt-5 justify-center  absolute top-10 left-1/3 z-10">
  //       {message && (
  //         <h3 className="w-2/3 text-primary p-2 justify-self-center mx-auto">
  //           {message}
  //           <span
  //             className="ml-3"
  //             onClick={() =>
  //               setValues({
  //                 ...values,
  //                 searchState: undefined,
  //                 results: [],
  //                 searched: false,
  //               })
  //             }
  //           >
  //             <i className="fa-sharp text-lg w-10 h-10 fa-solid fa-circle-xmark"></i>
  //           </span>
  //         </h3>
  //       )}
  //       {results.map((phn, key) => {
  //         return (
  //           <h2
  //             key={key}
  //             className="w-2/3 p-2 pb-2 justify-self-center mx-auto text-gray-600 font-bold text-bold hover:text-primary cursor-pointer"
  //             onClick={() => Router.push(`/ads/${phn._id}`)}
  //           >
  //             {phn.brandname} {phn.model} {phn.condition}
  //           </h2>
  //         );
  //       })}
  //     </div>
  //   );
  // };
  // const searchCom = () => (
  //   <div className="w-full max-w-xl relative flex">
  //     <span className="absolute left-4 top-3 text-lg text-gray-400">
  //       <i className="fas fa-search"></i>
  //     </span>
  //     <input
  //       type="text"
  //       onChange={handleChange}
  //       className="w-full border border-primary border-r-0 pl-12 py-3 pr-3 rounded-l-md focus:outline-none"
  //       placeholder="Search"
  //     />
  //     <button
  //       className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition"
  //       onClick={searchSubmit}
  //     >
  //       Search
  //     </button>

  //     {/* {searchResults()} */}
  //   </div>
  // );
  return (
    <>
      <header className=" w-full py-4 shadow-sm bg-white xl:bg-white">
        <div className="container flex items-center justify-between relative">
          {/* <!-- logo --> */}
          <Link
            href="/"
            className="font-bold text-2xl text-gray-500 hover:text-primary transition"
          >
            {process.env.NEXT_PUBLIC_APP_NAME}
            {/* <img
              src="./images/icons/icons8-duolingo-logo.svg"
              className="w-22 h-15"
            /> */}
          </Link>
          {/* <!-- sidebar --> */}

          {search == "top" ? <SearchSection search={search} /> : <div></div>}
          {/* {searchState && searchResults(results)} */}

          {/* <!-- icons --> */}
          <div className="flex items-center space-x-4">
            <Link
              href={`/ads/selectAdType`}
              className="text-center text-gray-700 hover:text-primary transition relative"
            >
              <div className="text-2xl">
                {/* <i className="fas fa-shopping-bag"> </i> */}
                <i className="fa-solid fa-plus"></i>
              </div>
              <div className="text-xs leading-3">Post</div>
              <span className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs hidden"></span>
            </Link>
            {show == true ? (
              <a
                // href="#"
                onClick={() => Router.push(`/ads/myAdds/${isAuth()._id}`)}
                className="lg:block text-center text-gray-700 hover:text-primary transition relative"
              >
                <div className="text-2xl">
                  <i className="fas fa-heart"> </i>
                </div>
                <div className="text-xs leading-3">My Adds</div>
                <span className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs hidden"></span>
              </a>
            ) : (
              <a
                // href="#"
                onClick={() => Router.push(`/user/login`)}
                className="lg:block text-center text-gray-700 hover:text-primary transition relative"
              >
                <div className="text-2xl">
                  <i className="fas fa-heart"> </i>
                </div>
                <div className="text-xs leading-3">My Adds</div>
                <span className="absolute right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs hidden"></span>
              </a>
            )}

            {/* {console.log(typeof isAuth)} */}
            {show != false ? (
              <Link
                // href={`/profile/${isAuth()._id}`}
                href={"/profile/account"}
                // onClick={() => Router.push(`/profile/${isAuth()._id}`)}
                className="text-center text-gray-700 hover:text-primary transition relative"
              >
                <div className="text-2xl">
                  <i className="fas fa-user"> </i>
                </div>
                <div className="text-xs leading-3">Account</div>
              </Link>
            ) : (
              <Link
                href={"/user/login"}
                className="text-center text-gray-700 hover:text-primary transition relative"
              >
                <div className="text-2xl">
                  <i className="fas fa-user"> </i>
                </div>
                <div className="text-xs leading-3">Account</div>
              </Link>
            )}
          </div>
        </div>
      </header>
      <nav className=" w-full bg-gray-800 hidden lg:block">
        <div className="container flex">
          {/* <!-- all Categories --> */}
          <div className="px-8 py-4 bg-primary flex items-center cursor-pointer relative group">
            <span className="text-white">
              <i className="fas fa-bars"> </i>
            </span>
            <span className="capitalize ml-2 text-white">All Categories</span>

            <div className="absolute w-full left-0 top-full bg-white shadow-md py-3 divide-y divide-gray-300 divide-dashed opacity-0 group-hover:opacity-100 transition duration-300 invisible group-hover:visible">
              <a
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="./images/icons/bed.svg"
                  alt=""
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Apple</span>
              </a>
              <a
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="./images/icons/bed.svg"
                  alt=""
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Samsung</span>
              </a>
              <a
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="./images/icons/bed.svg"
                  alt=""
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Sony</span>
              </a>
              <a
                href="#"
                className="flex items-center px-6 py-3 hover:bg-gray-100 transition"
              >
                <img
                  src="./images/icons/bed.svg"
                  alt=""
                  className="w-5 h-5 object-contain"
                />
                <span className="ml-6 text-gray-600 text-sm">Xiaomi</span>
              </a>
            </div>
          </div>
          {/* 
        <!-- all Categories end -->
        <!-- navbar links --> */}
          <div className="hidden sm:flex items-center justify-between flex-grow pl-12">
            <div className="flex items-center space-x-6 capitalize">
              <Link
                href="/ads"
                className="text-gray-200 hover:text-white transition"
              >
                All
              </Link>
              <Link
                href="/ads/selectAdType"
                className="text-gray-200 hover:text-white transition"
              >
                Post Ad
              </Link>
              {/* <a href="#" className="text-gray-200 hover:text-white transition">
                All
              </a> */}
              {/* <a
                href="./shop.html"
                className="text-gray-200 hover:text-white transition"
              >
                Shop
              </a>
              <a
                href="./view.html"
                className="text-gray-200 hover:text-white transition"
              >
                About Us
              </a>
              <a href="#" className="text-gray-200 hover:text-white transition">
                Contact Us
              </a> */}
            </div>
            {/* <a href="#" className="text-gray-200 hover:text-white transition">
              Login/Register
            </a> */}
            {show ? (
              <a
                href="#"
                className="text-gray-200 hover:text-white transition"
                onClick={() => logOut(() => Router.reload())}
              >
                SignOut
              </a>
            ) : (
              <a
                href="#"
                className="text-gray-200 hover:text-white transition"
                onClick={() => Router.push(`/user/login`)}
              >
                Login
              </a>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
