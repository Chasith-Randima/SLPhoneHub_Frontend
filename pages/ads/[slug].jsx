import React from "react";
import { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import { onePhone, allPhones } from "../../actions/ads";
import SingleAdd from "../../components/adds/SingleAdd";
import Message from "../../components/Message";
import Breadcrum from "../../components/Breadcrum";

let search = "top";

const OneProduct = ({ add }) => {
  const [related, setRelated] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  let new_one = Object.keys(add);

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });
  useEffect(() => {
    setAlert({ ...alert, loading: true });
    let paramsData = {
      limit: 4,
      page: 1,
      brandname: add.brandname,
    };
    allPhones(paramsData)
      .then((data) => {
        // console.log(data);
        if (data.data.status == "success") {
          setRelated([...related, ...data.data.doc]);
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
        setAlert({
          ...alert,
          loading: false,
          message: err.message,
          error: true,
          success: false,
        });
      });
  }, []);

  // add.map(item) => {
  //   if (
  //     item != "images" &&
  //     item != "price" &&
  //     item != "createdAt" &&
  //     item != "location" &&
  //     item != "slug" &&
  //     item != "phoneNumber"
  //   ) {
  //     setFeatures([...features].push(item));
  //   }
  // });

  const showImages = () => {
    return (
      <>
        <div className="">
          {/* <Image
              src={"/images/products/product1.jpg"}
              width="10"
              height="20"
            /> */}
          {/* {console.log(add.images)} */}
          <img
            src="./images/NoImage_Image.jpg"
            alt=""
            className="w-full h-60"
          />
          <div className="grid grid-cols-5 gap-4 mt-4">
            <img src="./images/NoImage_Image.jpg" alt="" className="w-full" />
            <img src="./images/NoImage_Image.jpg" alt="" className="w-full" />
            <img src="./images/NoImage_Image.jpg" alt="" className="w-full" />
            <img src="./images/NoImage_Image.jpg" alt="" className="w-full" />
            <img src="./images/NoImage_Image.jpg" alt="" className="w-full" />
          </div>
        </div>
      </>
    );
  };
  const showImagesServer = (images) => {
    return (
      <>
        <div className="">
          {/* <Image
          src={"/images/products/product1.jpg"}
          width="10"
          height="20"
        /> */}
          {/* {console.log(add.images)} */}
          <div>
            <img
              src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/phones/image/${images[imageIndex]}`}
              alt=""
              className="w-full h-60"
            />
          </div>
          <div className="grid grid-cols-5 gap-4 mt-4">
            {images.map((image, key) => {
              return (
                <img
                  key={key}
                  src={`${process.env.NEXT_PUBLIC_API_DEVELOPMENT}/phones/image/${image}`}
                  onClick={() => setImageIndex(key)}
                  alt=""
                  className={
                    imageIndex == key
                      ? `w-full border-4 border-primary rounded-b`
                      : `w-full`
                  }
                />
              );
            })}
          </div>
        </div>
      </>
    );
  };
  return (
    <>
      <Layout search={search}>
        {/* <!-- bread crums --> */}
        {/* {alert.error && <Message message={alert.error} display={true} />} */}

        {/* <div className="container py-4 flex items-center gap-3">
          <a href="#" className="text-primary text-base">
            <i className="fas fa-home"></i>
          </a>
          <span className="text-sm text-gray-400">
            <i className="fas fa-chevron-right"> </i>
          </span>
          <p className="text-gray-600 font-medium">Product View</p>
        </div> */}
        <Breadcrum title={"Product View"} />

        {alert.success && <Message message={alert.message} display={true} />}
        {alert.error && <Message message={alert.error} display={true} />}
        {alert.loading && (
          <Message message={"Loading Please Waite..."} display={true} />
        )}

        {/* <!-- product view --> */}
        {/* <div className="container grid grid-cols-[repeat(1,_900px)_100px] gap-4"> */}
        <div className="container pt-4 pb-6 grid lg:grid-cols-[repeat(1,_900px)_100px] gap-6">
          {/* <div className="container grid grid-cols-2 gap-4"> */}
          {/* <!-- product image --> */}

          {add.images ? showImagesServer(add.images) : showImages()}

          {/* <!-- product content --> */}
          <div></div>

          {/* <!-- product view details end --> */}
          {/* <!-- product content --> */}
          <div>
            <div>
              <h2 className="text-3xl font-medium uppercase mb-2">{`${add.brandname} ${add.model} ${add.condition}`}</h2>
              <div className="flex items-center mb-4">
                <div className="flex gap-1 text-sm text-yellow-400">
                  {/* <span>
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
                  </span> */}
                </div>
                {/* <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div> */}
              </div>
              <div className="space-y-2">
                {new_one.map((key, index) => {
                  if (
                    key == "brandname" ||
                    key == "model" ||
                    key == "condition"
                  ) {
                    return (
                      <p
                        key={index}
                        className="text-gray-800 font-semibold space-x-2"
                      >
                        <span>
                          {key} : {add[key]}{" "}
                        </span>
                        {/* <span className="text-green-600">In Stock</span> */}
                      </p>
                    );
                  }
                })}
              </div>
              <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                {/* <p className="text-2xl text-primary font-semibold">{add.price}</p> */}
                {/* <p className="text-base text-gray-400 line-through">$55.00</p> */}
              </div>
              {/* <p className="mt-4 text-gray-600">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed,
                possimus!
              </p> */}

              {/* <!-- cart button --> */}
              <div className="flex gap-3 border-b border-gray-200 pb-5 mt-6">
                <a
                  href="#"
                  className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
                >
                  <i className="fas fa-shopping-bag"></i>
                  {add.price}
                </a>
                <a
                  href="#"
                  className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary border-primary transition"
                >
                  <i className="fas fa-heart"></i>
                  {add.phoneNumber}
                </a>
              </div>

              {/* <!-- social share --> */}
              {/* <div className="flex gap-3 mt-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
                >
                  <i className="fa-brands fa-twitter"></i>
                </a>
              </div> */}
            </div>
            {/* <!-- product view details --> */}
            <div>
              <h3 className="border-b border-gray-200 font-roboto tex-gray-800 bp-3 font-medium">
                Product Features
              </h3>
              {/* <!-- table --> */}
              <table className="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
                <tbody>
                  {new_one.map((key, index) => {
                    if (
                      key != "user" &&
                      key != "images" &&
                      key != "createdAt" &&
                      key != "location" &&
                      key != "price" &&
                      key != "slug" &&
                      key != "_id" &&
                      key != "__v" &&
                      key != "description" &&
                      key != "updatedAt" &&
                      add[key] != ""
                    ) {
                      return (
                        <tr key={index}>
                          <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                            {key}
                          </th>
                          <td className="py-2 px-4 border border-gray-300">
                            {add[key]}
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
            <div className="container pb-16 mt-10">
              <h3 className="border-b border-gray-200 font-roboto text-xl tex-gray-800 bp-3 font-medium">
                Product Description
              </h3>
              <div className="w-9/10 pt-6">
                <div className="text-gray-600 space-y-3">{add.description}</div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- product wrapper --> */}
        <div className="container pb-16">
          <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
            Related Products
          </h2>

          {/* <!-- product grid --> */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* <!-- single product --> */}
            {related.map((add, key) => {
              return <SingleAdd key={key} add={add} />;
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

OneProduct.getInitialProps = async ({ query }) => {
  // console.log(query);
  return await onePhone(query.slug)
    .then((data) => {
      return { add: data.doc };
    })
    .catch((err) => {
      console.log(err);
    });
};

export default OneProduct;
