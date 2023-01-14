import React from "react";
import SearchSection from "./SearchSection";
import { Brands } from "../data";

const Model = () => {
  let brandList = Brands.map((item, index) => (
    <div className="flex items-center overflow-y-auto " key={index}>
      <input
        type="checkbox"
        // id="cat-1"
        value={item}
        // checked={checkedState[index]}
        // checked={values.body.brandname == item ? true : false}
        // onChange={handleChange("brandname", index)}
        // checked={values.body.brandname == item}
        className="text-primary focus:ring-0 rounded-sm cursor-pointer"
      />
      <label htmlFor="cat-1" className="text-gray-600 ml-3 cursor-pointer">
        {item}
      </label>
      <div className="ml-auto text-gray-600 text-sm">(15)</div>
    </div>
  ));
  return (
    <>
      <div className="fixed bg-white top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full">
        <div class="relative w-full h-full max-w-md md:h-auto">
          <div class="relative p-5 pt-5 h-screen bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex">
              <i class="ml-auto text-2xl mb-5 fa-sharp fa-solid fa-xmark"></i>
            </div>
            <div>
              <SearchSection search={"mid"} />
            </div>
            {/* <!-- category filter --> */}
            <div className="pt-4 shadow">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Locations
              </h3>
              <div className="space-y-2">
                {/* <!-- single category --> */}
                <div className="flex items-center">
                  <select name="location" onChange={"handleChange('location')"}>
                    {"types"}
                  </select>
                  {/* <label
                      for="cat-1"
                      className="text-gray-600 ml-3 cursor-pointer"
                    >
                      bedroom
                    </label> */}
                  <div className="ml-auto text-gray-600 text-sm">(15)</div>
                </div>
              </div>
            </div>
            {/* <!-- price filter --> */}
            <div className="pt-4 shadow">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                price
              </h3>
              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  value={"price.minPrice"}
                  onChange={"priceHandle('minPrice')"}
                  className="w-full border-gray-300 focus:border-primary focus:ring-0 px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
                  placeholder="min"
                />
                <span className="mx-3 text-gray-500">-</span>
                <input
                  type="text"
                  value={"price.maxPrice"}
                  onChange={"priceHandle('maxPrice')"}
                  className="w-full border-gray-300 focus:border-primary focus:ring-0 px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
                  placeholder="max"
                />
              </div>
              <button
                className="block w-full py-1 mt-2 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                onClick={"setBodyPrice"}
              >
                Set Price
              </button>
            </div>
            <div>{brandList}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Model;
