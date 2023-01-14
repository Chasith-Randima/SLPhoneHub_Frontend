import React from "react";
import { getProfile, updateProfile } from "../../actions/user";
import { getCookie, isAuth } from "../../actions/auth";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import Sidebar from "../../components/Sidebar";
import Breadcrum from "../../components/Breadcrum";
import Message from "../../components/Message";

const profile = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    success: false,
    error: false,
    loading: false,
  });

  const [alert, setAlert] = useState({
    message: "",
    error: "",
    loading: false,
  });

  // const userId = JSON.parse(isAuth())._id;

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    const token = getCookie("token");
    const userId = isAuth()._id;
    return getProfile(userId, token).then((data) => {
      // console.log(data);
      if (data) {
        setValues({ ...values, name: data.doc.name, email: data.doc.email });
      }
    });
  };

  const handleChange = (name) => (e) => {
    e.preventDefault();

    setValues({ ...values, [name]: e.target.value });
    console.log(values);
  };

  const updateSubmit = () => {
    const token = getCookie("token");
    const userId = isAuth()._id;
    let user = {
      name: values.name,
      email: values.email,
    };
    // console.log(user, userId);
    return updateProfile(userId, user, token)
      .then((data) => {
        // console.log(data);
        if (data.status) {
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
        setAlert({
          ...alert,
          loading: false,
          message: data.message,
          error: data.error,
        });
      });
  };
  return (
    <>
      <Layout>
        <Breadcrum title={"Profile Info"} />
        {/* <!-- account wrapper --> */}
        <div className="container grid grid-cols-12 items-start gap-6 pt-4 pb-16">
          {/* <!-- sidebar --> */}
          <div className="hidden col-span-3 md:flex">
            <Sidebar />
          </div>
          {/* <!-- profile info --> */}
          <div className="col-span-12 shadow  md:col-span-9  rounded px-6 pt-5 pb-7">
            {alert.error ? (
              <Message message={alert.error} display={true} />
            ) : (
              ""
            )}
            <h4 className="text-lg font-medium capitalize mb-4">
              Profile Information
            </h4>
            <div className="space-y-4">
              {/* <!-- form row --> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <!-- single input --> */}
                <div>
                  <label for="" className="text-gray-600 mb-2 block">
                    Name
                  </label>
                  <input
                    type="text"
                    value={values.name}
                    onChange={handleChange("name")}
                    className="input-box"
                  />
                </div>
                {/* <!-- single input --> */}
                <div>
                  <label for="" className="text-gray-600 mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={values.email}
                    onChange={handleChange("email")}
                    className="input-box"
                  />
                </div>
              </div>

              {/* <!-- form row end --> */}
              <div className="mt-4">
                <button
                  type="submit"
                  onClick={updateSubmit}
                  className="block text-center bg-primary border border-primary text-white px-4 py-3 font-medium rounded-md hover:bg-transparent hover:border-primary hover:text-primary transition"
                >
                  save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

// profile.getInitialProps = ({ query }) => {
//   let id = query.slug;
//   let token = getCookie("token");
//   console.log(id, token);
//   return getProfile(id, token).then((data) => {
//     // console.log(...data);
//     return {};
//   });
// };

export default profile;
