import React from "react";
import moment from "moment";
import Link from "next/link";

const SingleAdd = ({ add }) => {
  // console.log(add);
  return (
    <>
      <div className="bg-white shadow rounded overflow-hidden group">
        {/* <!-- product image --> */}
        <div className="relative">
          <img
            src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/phones/image/${add.images[0]}`}
            alt=""
            className="w-full"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group group-hover:opacity-100 transition">
            <Link
              href={`/ads/${add._id}`}
              className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            >
              <i className="fas fa-search"></i>
            </Link>
            <a
              href="#"
              className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
            >
              <i className="fas fa-heart"></i>
            </a>
          </div>
        </div>

        {/* <!-- product content --> */}
        <div className="pt-4 pb-3 px-4">
          <Link href={`/ads/${add._id}`}>
            <h4 className="font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
              {`${add.brandname} ${add.model} ${add.condition}`}
            </h4>
          </Link>
          <div className="flex items-baseline mb-1 space-x-2 font-roboto">
            <p className="text-xl text-primary font-semibold">{add.location}</p>
            {/* <p className="text-sm text-gray-400 line-through">
                    Category
                  </p> */}
          </div>
          <div className="flex justify-between items-center">
            {/* <div className="flex gap-1 text-sm text-yellow-400">
                    <span>
                      <i className="fas fa-star"></i>
                    </span>
                    <span>
                      <i className="fas fa-star"></i>
                    </span>
                    <span>
                      <i className="fas fa-star"></i>
                    </span>
                    <span>
                      <i className="fas fa-star"></i>
                    </span>
                    <span>
                      <i className="fas fa-star"></i>
                    </span>
                  </div> */}
            <div className="text-xs text-gray-500  ">{add.brandname}</div>
            <div>{moment(add.createdAt).fromNow()}</div>
          </div>
        </div>
        <Link
          href={`/ads/${add._id}`}
          className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
        >
          {add.price}
        </Link>
      </div>
    </>
  );
};

export default SingleAdd;
