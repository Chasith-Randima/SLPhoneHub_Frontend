import Link from "next/link";
import Router from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { isAuth, logOut } from "../actions/auth";

const Sidebar = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    id: "",
    loggedIn: false,
  });

  useEffect(() => {
    if (isAuth()) {
      setUser({
        ...user,
        name: isAuth().name,
        email: isAuth().email,
        id: isAuth()._id,
        loggedIn: true,
      });
    } else {
      Router.push(`/user/login`);
    }
  }, []);

  return (
    <>
      {/* <!-- sidebar --> */}
      <div class="col-span-3">
        {/* <!-- account profile --> */}
        <div class="px-4 py-3 shadow flex items-center gap-4">
          <div class="flex-shrink-0">
            <img
              src="images/avatar.png"
              class="rounded-full w-14 h-14 p-1 border border-gray-200 object-cover"
            />
          </div>
          <div>
            <p class="text-gray-600">Hello,</p>
            <h4 class="text-gray-800 capitalize font-medium">{user.name}</h4>
          </div>
        </div>
        {/* <!-- account profile end --> */}

        {/* <!-- profile links --> */}
        <div class="mt-6 bg-white shadow rounded p-4 divide-y divide-gray-200 space-y-4 text-gray-600">
          {/* <!-- single link --> */}
          <div class="space-y-1 pl-8">
            <a
              href="account.html"
              class="relative text-base font-medium capitalize hover:text-primary transition block"
            >
              Manage account
              <span class="absolute -left-8 top-0 text-base">
                <i class="far fa-address-card"></i>
              </span>
            </a>
            <Link
              href={`/profile/${user.id}`}
              //   onClick={() => Router.push(`/profile/${user.id}`)}
              class="hover:text-primary transition capitalize block"
            >
              Update Profile
            </Link>
            <Link
              href={`/profile/changePassword`}
              class="hover:text-primary transition capitalize block"
            >
              Change Password
            </Link>
            {/* <a
              href="change-password.html"
              class="hover:text-primary transition capitalize block"
            >
              change password
            </a> */}
          </div>
          {/* <!-- single link end --> */}
          {/* <!-- single link --> */}
          <div class="space-y-1 pl-8 pt-4">
            <a
              href="#"
              class="relative medium capitalize text-gray-800 font-medium hover:text-primary transition block"
            >
              My Adds
              <span class="absolute -left-8 top-0 text-base">
                <i class="fas fa-gift"></i>
              </span>
            </a>
            <Link
              href={`/ads/myAdds/${user.id}`}
              class="hover:text-primary transition block capitalize"
            >
              Phones - Accessories - Wanted
            </Link>
            <Link
              href={`/ads/myAdds/${user.id}`}
              class="hover:text-primary transition block capitalize"
            >
              Update & Delete Adds
            </Link>

            {/* <a href="#" class="hover:text-primary transition block capitalize">
              my reviews
            </a> */}
          </div>
          {/* <!-- single link end --> */}
          {/* <!-- single link --> */}
          <div class="space-y-1 pl-8 pt-4">
            <a
              //   href="#"
              class="relative medium capitalize text-gray-800 font-medium hover:text-primary transition block"
            >
              Post a Add
              <span class="absolute -left-8 top-0 text-base">
                <i class="far fa-credit-card"></i>
              </span>
            </a>
            <Link
              href={`/ads/selectAdType`}
              class="hover:text-primary transition block capitalize"
            >
              Post a Phone
            </Link>
            <a
              href={`/ads/selectAdType`}
              class="hover:text-primary transition block capitalize"
            >
              Post a Accessory
            </a>
            <a
              href={`/ads/selectAdType`}
              class="hover:text-primary transition block capitalize"
            >
              Post a Wanted
            </a>
          </div>
          {/* <!-- single link end --> */}
          {/* <!-- single link --> */}
          {/* <div class="pl-8 pt-4">
            <a
              href="wishlist.html"
              class="relative medium capitalize font-medium hover:text-primary transition block text-primary"
            >
              my wishlist
              <span class="absolute -left-8 top-0 text-base">
                <i class="far fa-heart"></i>
              </span>
            </a>
          </div> */}
          {/* <!-- single link end --> */}
          {/* <!-- single link --> */}
          <div class="pl-8 pt-4">
            <a
              onClick={() => logOut(() => Router.reload())}
              class="relative medium capitalize text-gray-800 font-medium hover:text-primary transition block"
            >
              logout
              <span class="absolute -left-8 top-0 text-base">
                <i class="fas fa-sign-out-alt"></i>
              </span>
            </a>
          </div>
          {/* <!-- single link end --> */}
        </div>
        {/* <!-- profile links end --> */}
      </div>
      {/* <!-- sidebar end --> */}
    </>
  );
};

export default Sidebar;
