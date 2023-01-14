import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import {
  getCookie,
  isAuth,
  removeCookie,
  setCookie,
  updateMyPassword,
} from "../../actions/auth";
import Breadcrum from "../../components/Breadcrum";
import Layout from "../../components/Layout";
import Sidebar from "../../components/Sidebar";

const changePassword = () => {
  const [values, setValues] = useState({
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  });

  const [alert, setAlert] = useState({
    message: "",
    error: "",
    loading: false,
  });

  useEffect(() => {
    setValues({
      ...values,
      name: isAuth().name,
      email: isAuth().email,
      id: isAuth()._id,
    });
  }, []);

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setValues({ ...values, [name]: e.target.value });
  };

  const submitPasswordUpdate = (e) => {
    e.preventDefault();
    let user = {
      passwordCurrent: values.passwordCurrent,
      password: values.password,
      passwordConfirm: values.passwordConfirm,
    };
    let token = getCookie("token");
    return updateMyPassword(values.id, user, token)
      .then((data) => {
        if ((data.status = "success")) {
          removeCookie("token");
          setCookie("token", data.token);
          setValues({
            passwordCurrent: "",
            password: "",
            passwordConfirm: "",
          });

          console.log(data);
          return data;
        } else {
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: data.error,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Layout>
        {/* <!-- breadcrum --> */}
        <Breadcrum title={"Change Password"} />
        {/* <!-- breadcrum end --> */}

        {/* <!-- account wrapper --> */}
        <div className="container grid lg:grid-cols-12 items-start gap-6 pt-4 pb-16">
          {/* <!-- sidebar --> */}
          <div className="order-2 col-span-9 md:order-1 md:col-span-3 ">
            <Sidebar />
          </div>
          {/* <!-- sidebar end --> */}

          {/* <!-- account content --> */}
          <div className="order-1 md:order-2 col-span-9 shadow rounded px-6 pt-5 pb-7 mt-6 lg:mt-0">
            <form action="">
              <h3 className="text-lg font-medium capitalize mb-4">
                Change password
              </h3>
              <div className="space-y-4 max-w-sm">
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Current Password
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-3 text-sm text-gray-500 cursor-pointer">
                      <i className="far fa-eye-slash"></i>
                    </span>
                    <input
                      type="text"
                      value={values.passwordCurrent}
                      onChange={handleChange("passwordCurrent")}
                      className="input-box"
                      placeholder="enter current password"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    New Password
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-3 text-sm text-gray-500 cursor-pointer">
                      <i className="far fa-eye-slash"></i>
                    </span>
                    <input
                      type="text"
                      value={values.password}
                      onChange={handleChange("password")}
                      className="input-box"
                      placeholder="enter new password"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="absolute right-3 top-3 text-sm text-gray-500 cursor-pointer">
                      <i className="far fa-eye-slash"></i>
                    </span>
                    <input
                      type="text"
                      value={values.passwordConfirm}
                      onChange={handleChange("passwordConfirm")}
                      className="input-box"
                      placeholder="enter confirm password"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  onClick={submitPasswordUpdate}
                  className="px-6 py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                >
                  Save change
                </button>
              </div>
            </form>
          </div>
          {/* <!-- account content end --> */}
        </div>
        {/* <!-- account wrapper end --> */}
      </Layout>
    </>
  );
};

export default changePassword;
