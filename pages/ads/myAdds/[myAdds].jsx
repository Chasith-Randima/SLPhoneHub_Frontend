import React from "react";
import { allMyAdds, deletePhone } from "../../../actions/ads";
import Layout from "../../../components/Layout";
import Router from "next/router";
import { getCookie } from "../../../actions/auth";
import Link from "next/link";
import { allMyAccessories, deleteAccessory } from "../../../actions/accessory";
import { allMyWanted, deleteWanted } from "../../../actions/wanted";
import { useState } from "react";
import { useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import Breadcrum from "../../../components/Breadcrum";
import Message from "../../../components/Message";

const MyAdds = ({ adds, user }) => {
  const [accessories, setAccessories] = useState([]);
  const [wanted, setWanted] = useState([]);

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  useEffect(() => {
    setAlert({ ...alert, loading: true });
    allMyAccessories(user)
      .then((data) => {
        if (data.status && data.status == "success") {
          // console.log(data);
          setAccessories([...data.doc]);
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });
          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1500);
        } else {
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: true,
            success: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: data.message,
          error: true,
          success: false,
        });
      });
    setAlert({ ...alert, loading: true });
    allMyWanted(user)
      .then((data) => {
        // console.log(data);

        if (data.status && data.status == "success") {
          setWanted([...data.doc]);
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });
          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1500);
        } else {
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: true,
            success: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: data.message,
          error: true,
          success: false,
        });
      });
  }, []);
  const deleteOnClick = (id) => {
    setAlert({ ...alert, loading: true });
    let token = getCookie("token");
    return deletePhone(id, token)
      .then((data) => {
        // console.log(data);

        if (data.status && data.status == "success") {
          // console.log(data);
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });
          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1500);
          Router.reload();

          return data;
        } else {
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: true,
            success: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: data.message,
          error: true,
          success: false,
        });
      });
  };
  const deleteAccessoryClick = (id) => {
    setAlert({ ...alert, loading: true });
    let token = getCookie("token");
    return deleteAccessory(id, token)
      .then((data) => {
        if (data.status == "success") {
          // console.log(data);
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });
          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1500);
          Router.reload();
          return data;
        } else {
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: true,
            success: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: data.message,
          error: true,
          success: false,
        });
      });
  };
  const deleteWantedClick = (id) => {
    setAlert({ ...alert, loading: true });
    let token = getCookie("token");
    return deleteWanted(id, token)
      .then((data) => {
        if (data.data.status == "success") {
          // console.log(data);
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: false,
            success: true,
          });
          window.setTimeout(() => {
            setAlert({ ...alert, success: false, message: "" });
          }, 1500);
          Router.reload();
          return data;
        } else {
          setAlert({
            ...alert,
            loading: false,
            message: data.message,
            error: true,
            success: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert({
          ...alert,
          loading: false,
          message: err.message,
          error: true,
          success: false,
        });
      });
  };
  return (
    <Layout>
      {/* <!-- breadcrum --> */}

      <Breadcrum title={"My Adds"} />
      {/* <!-- breadcrum end --> */}

      {/* <!-- account wrapper --> */}
      <div class="container grid  lg:grid-cols-12 items-start gap-6 pt-4 pb-16">
        {/* <!-- sidebar --> */}
        <div className="hidden md:flex order-2 col-span-9 md:order-1 md:col-span-3">
          <Sidebar />
        </div>
        {/* <!-- sidebar end --> */}

        {/* <!-- account content --> */}
        <div class="order-1 md:order-2 col-span-9 mt-6 lg:mt-0 space-y-4">
          {alert.error && <Message message={alert.message} display={true} />}
          {alert.success && <Message message={alert.message} display={true} />}
          {alert.loading && (
            <Message message={"Loading..Please Waite..."} display={true} />
          )}

          {adds.map((add, key) => {
            return (
              <>
                {/* <!-- single wishlist --> */}
                <div
                  class="flex items-center md:justify-between gap-4 md:gap-6 p-4 border border-gray-200 rounded flex-wrap md:flex-nowrap"
                  key={key}
                >
                  {/* <!-- cart image --> */}
                  <div class="w-28 flex-shrink-0">
                    <img
                      src={"/image"}
                      // src={`http://127.0.0.1:3000/api/v1/phones/image/${add.image[0]}`}
                      class="w-full"
                    />
                  </div>
                  {/* <!-- cart image end --> */}
                  {/* <!-- cart content --> */}
                  <div class="md:w-1/3 w-full">
                    <h2 class="text-gray-800 mb-1 xl:text-xl textl-lg font-medium uppercase">
                      {`${add.model} ${add.brandname} ${add.condition}`}
                    </h2>
                    <p class="text-gray-500 text-sm">
                      Ad Type: <span class="text-green-600">Add</span>
                    </p>
                  </div>
                  <div class="">
                    <p class="text-primary text-lg font-semibold">
                      {add.price}
                    </p>
                  </div>
                  <Link
                    href="#"
                    onClick={() => Router.push(`/ads/update/${add._id}/mobile`)}
                    class="ml-auto md:ml-0 block px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                  >
                    Update
                  </Link>
                  <div class="text-gray-600 hover:text-primary cursor-pointer">
                    <i
                      class="fas fa-trash"
                      onClick={() => deleteOnClick(add._id)}
                    ></i>
                  </div>
                </div>
              </>
            );
          })}
          {accessories.map((add, key) => {
            // console.log(add, "asscesoory");
            return (
              <>
                {/* <!-- single wishlist --> */}
                <div
                  class="flex items-center md:justify-between gap-4 md:gap-6 p-4 border border-gray-200 rounded flex-wrap md:flex-nowrap"
                  key={key}
                >
                  {/* <!-- cart image --> */}
                  <div class="w-28 flex-shrink-0">
                    <img src={``} class="w-full" />
                  </div>
                  {/* <!-- cart image end --> */}
                  {/* <!-- cart content --> */}
                  <div class="md:w-1/3 w-full">
                    <h2 class="text-gray-800 mb-1 xl:text-xl textl-lg font-medium uppercase">
                      {`${add.brand} ${add.itemType} ${add.condition}`}
                    </h2>
                    <p class="text-gray-500 text-sm">
                      Ad Type: <span class="text-green-600">Accessory</span>
                    </p>
                  </div>
                  <div class="">
                    <p class="text-primary text-lg font-semibold">
                      {add.price}
                    </p>
                  </div>
                  <Link
                    href="#"
                    onClick={() =>
                      Router.push(`/ads/update/${add._id}/accessory`)
                    }
                    class="ml-auto md:ml-0 block px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                  >
                    Update
                  </Link>
                  <div class="text-gray-600 hover:text-primary cursor-pointer">
                    <i
                      class="fas fa-trash"
                      onClick={() => deleteAccessoryClick(add._id)}
                    ></i>
                  </div>
                </div>
              </>
            );
          })}
          {wanted.map((add, key) => {
            return (
              <>
                {/* <!-- single wishlist --> */}
                <div
                  class="flex items-center md:justify-between gap-4 md:gap-6 p-4 border border-gray-200 rounded flex-wrap md:flex-nowrap"
                  key={key}
                >
                  {/* <!-- cart image --> */}
                  <div class="w-28 flex-shrink-0">
                    <img src="images/products/product9.jpg" class="w-full" />
                  </div>
                  {/* <!-- cart image end --> */}
                  {/* <!-- cart content --> */}
                  <div class="md:w-1/3 w-full">
                    <h2 class="text-gray-800 mb-1 xl:text-xl textl-lg font-medium uppercase">
                      {`${add.title} `}
                    </h2>
                    <p class="text-gray-500 text-sm">
                      Ad Type: <span class="text-green-600">Wanted</span>
                    </p>
                  </div>
                  <div class="">
                    <p class="text-primary text-lg font-semibold">
                      {/* {add.price} */}
                    </p>
                  </div>
                  <Link
                    href="#"
                    onClick={() => Router.push(`/ads/update/${add._id}/wanted`)}
                    class="ml-auto md:ml-0 block px-6 py-2 text-center text-sm text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                  >
                    Update
                  </Link>
                  <div class="text-gray-600 hover:text-primary cursor-pointer">
                    <i
                      class="fas fa-trash"
                      onClick={() => deleteWantedClick(add._id)}
                    ></i>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        {/* <!-- account content end --> */}
      </div>
      {/* <!-- account wrapper end --> */}
    </Layout>
  );
};

MyAdds.getInitialProps = ({ query }) => {
  let user = query.myAdds;

  return allMyAdds(user).then((data) => {
    return { adds: data.data.doc, user: user };
  });
};

export default MyAdds;
