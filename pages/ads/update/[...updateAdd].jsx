import React from "react";
import { useEffect, useState } from "react";
import { oneAccessory, updateAccessory } from "../../../actions/accessory";

import { onePhone, updatePhone } from "../../../actions/ads";
import { getCookie, isAuth } from "../../../actions/auth";
import { oneWanted, updateWanted } from "../../../actions/wanted";
import Breadcrum from "../../../components/Breadcrum";
import Layout from "../../../components/Layout";
import Sidebar from "../../../components/Sidebar";
import Router from "next/router";
import Message from "../../../components/Message";

const UpdateAdd = ({ add, type }) => {
  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });
  const [values, setValues] = useState({
    name: "",
    user: "",
    condition: "",
    brandname: "",
    model: "",
    slug: "",
    network: "",
    sim: "",
    os: "",
    memory: "",
    main_camera: "",
    selfie_camera: "",
    sound: "",
    wifi: "",
    bluetooth: "",
    radio: "",
    usb: "",
    sensors: "",
    location: "",
    phoneNumber: "",
    price: "",
    createdAt: "",
    description: "",
    formData: "",
    // images: [],
  });
  const [accessoryValues, setAccessoryValues] = useState({
    name: "",
    user: "",
    condition: "",
    itemType: "",
    brand: "",
    title: "",
    description: "",
    negotiobale: "",
    location: "",
    phoneNumber: "",
    price: "",
    formDataAccessory: "",
    // images: "",
  });
  const [wantedValues, setWantedValues] = useState({
    name: "",
    user: "",
    title: "",
    description: "",
    email: "",
    phoneNumber: "",
  });
  const [mobile, setMobile] = useState(false);
  const [accessory, setAccessory] = useState(false);
  const [wanted, setWanted] = useState(false);
  const { formData } = values;
  const { formDataAccessory } = accessoryValues;

  useEffect(() => {
    add.images = undefined;
    setAlert({ ...alert, loading: true });

    if (type == "mobile") {
      setMobile(true);
      setValues({ ...values, ...add, formData: new FormData() });
    } else if (type == "accessory") {
      setAccessory(true);
      add.user = isAuth()._id;
      setAccessoryValues({
        ...values,
        ...add,
        formDataAccessory: new FormData(),
      });
    } else if (type == "wanted") {
      setWanted(true);
      setWantedValues({ ...values, ...add });
    }
    setAlert({ ...alert, loading: false });
  }, []);

  const handleChange = (name) => (e) => {
    e.preventDefault();
    if (type == "mobile") {
      let value = name == "images" ? e.target.files[0] : e.target.value;
      // console.log(name, values, e.target.value);
      // formData.apend(name, value);
      if (name == "images") {
        formData.append(name, value);
        setValues({ ...values, [name]: value, formData });
      } else {
        setValues({ ...values, [name]: value });
      }

      // console.log(values);
      // setValues({ ...values, [name]: e.target.value });
    } else if (type == "accessory") {
      let value = name == "images" ? e.target.files[0] : e.target.value;
      // console.log(name, values, e.target.value);
      // formData.apend(name, value);
      if (name == "images") {
        formDataAccessory.append(name, value);
        setAccessoryValues({
          ...accessoryValues,
          [name]: value,
          formDataAccessory,
        });
      } else {
        setAccessoryValues({ ...accessoryValues, [name]: value });
      }

      // setAccessoryValues({ ...accessoryValues, [name]: e.target.value });
    } else if (type == "wanted") {
      setWantedValues({ ...wantedValues, [name]: e.target.value });
    }
  };

  const updateAddClick = (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });
    let token = getCookie("token");
    let phone = {
      name: values.name,
      condition: values.condition,
      brandname: values.brandname,
      model: values.model,
      network: values.network,
      sim: values.sim,
      os: values.os,
      memory: values.memory,
      main_camera: values.main_camera,
      selfie_camera: values.selfie_camera,
      sound: values.sound,
      wifi: values.wifi,
      bluetooth: values.bluetooth,
      radio: values.radio,
      usb: values.usb,
      sensors: values.sensors,
      location: values.location,
      phoneNumber: values.phoneNumber,
      price: values.price,
      // images: values.images,
      description: values.description,
    };
    for (const key in phone) {
      formData.append(key, phone[key]);
      setValues({ ...values, formData });
      // console.log(`${key}: ${phone[key]}`);
    }

    // console.log(phone);
    let addId = add._id;
    return updatePhone(addId, values.formData, token)
      .then((data) => {
        if (data.status && data.status == "success") {
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
          // console.log(data);
          Router.push(`/ads`);
          // setAccessories([...data.doc]);
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
  const updateAccessoryClick = (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });
    let token = getCookie("token");
    let accessory = {
      name: accessoryValues.name,
      user: accessoryValues.user,
      condition: accessoryValues.condition,
      itemType: accessoryValues.itemType,
      brand: accessoryValues.brand,
      title: accessoryValues.title,
      description: accessoryValues.description,
      model: accessoryValues.model,
      negotiobale: accessoryValues.negotiobale,
      location: accessoryValues.location,
      phoneNumber: accessoryValues.phoneNumber,
      price: accessoryValues.price,
      // images: accessoryValues.images,
    };
    for (const key in accessory) {
      formDataAccessory.append(key, accessory[key]);
      setAccessoryValues({ ...values, formDataAccessory });
      // console.log(`${key}: ${accessory[key]}`);
    }

    let addId = add._id;
    return updateAccessory(addId, accessoryValues.formDataAccessory, token)
      .then((data) => {
        // console.log(data);
        if (data.status && data.status == "success") {
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

          Router.push(`/ads`);
          // setAccessories([...data.doc]);
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
  const updateWantedClick = (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });
    let token = getCookie("token");
    let wanted = {
      name: wantedValues.name,
      user: wantedValues.user,
      title: wantedValues.title,
      description: wantedValues.description,
      email: wantedValues.email,
      phoneNumber: wantedValues.phoneNumber,
    };
    let addId = add._id;
    return updateWanted(addId, wanted, token)
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
          Router.push(`/ads`);
          // setAccessories([...data.doc]);
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

  const showAddForm = () => {
    return (
      <>
        <div className="col-span-9 shadow rounded px-6 pt-5 pb-7 mt-6 lg:mt-0">
          <form action="">
            <h3 className="text-lg font-medium capitalize mb-4">create post</h3>
            <div className="space-y-4">
              {/* <!-- Form row --> */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 mb-2 block">Condition</label>
                  <select
                    className="input-box"
                    value={values.condition}
                    onChange={handleChange("condition")}
                  >
                    <option>Brandnew</option>
                    <option>Used</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">Brandname</label>
                  <select
                    className="input-box"
                    value={values.brandname}
                    onChange={handleChange("brandname")}
                  >
                    <option>Samsung</option>
                    <option>Apple</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 mb-2 block">Model</label>
                  <select
                    className="input-box"
                    value={values.model}
                    onChange={handleChange("model")}
                  >
                    <option>11 Pro</option>
                    <option>12 Pro</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Network(Optional)
                  </label>
                  <select
                    className="input-box"
                    value={values.network}
                    onChange={handleChange("network")}
                  >
                    <option>2G</option>
                    <option>3G</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 mb-2 block">Sim</label>
                  <select
                    className="input-box"
                    value={values.sim}
                    onChange={handleChange("sim")}
                  >
                    <option>Single Sim</option>
                    <option>Dual Sim</option>
                    <option>Thriple Sim</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Operating System(Optional)
                  </label>
                  <select
                    className="input-box"
                    value={values.os}
                    onChange={handleChange("os")}
                  >
                    <option>Android</option>
                    <option>IOS</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Memory(Optional)
                  </label>
                  <input
                    type="text"
                    className="input-box"
                    value={values.memory}
                    onChange={handleChange("memory")}
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Main Camera(Optional)
                  </label>
                  <input
                    type="text"
                    className="input-box"
                    value={values.main_camera}
                    onChange={handleChange("main_camera")}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Selfie Camera(Optional)
                  </label>
                  <input
                    type="text"
                    className="input-box"
                    value={values.selfie_camera}
                    onChange={handleChange("selfie_camera")}
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Sound (Optional)
                  </label>
                  <input
                    type="text"
                    className="input-box"
                    value={values.sound}
                    onChange={handleChange("sound")}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Wifi(Optional)
                  </label>
                  <select
                    className="input-box"
                    value={values.wifi}
                    onChange={handleChange("wifi")}
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">Bluetooth</label>
                  <select
                    className="input-box"
                    value={values.bluetooth}
                    onChange={handleChange("bluetooth")}
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Radio (Optional)
                  </label>
                  <select
                    className="input-box"
                    value={values.radio}
                    onChange={handleChange("radio")}
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    USB (Optional)
                  </label>
                  <select
                    className="input-box"
                    value={values.usb}
                    onChange={handleChange("usb")}
                  >
                    <option>USB Type-B Port</option>
                    <option>USB Type-C Port</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Sensors (Optional)
                  </label>
                  <input
                    type="text"
                    className="input-box"
                    value={values.sensors}
                    onChange={handleChange("sensors")}
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Price (Optional)
                  </label>
                  <input
                    type="text"
                    className="input-box"
                    value={values.price}
                    onChange={handleChange("price")}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Location (City)
                  </label>
                  <input
                    type="text"
                    className="input-box"
                    value={values.location}
                    onChange={handleChange("location")}
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="input-box"
                    value={values.phoneNumber}
                    onChange={handleChange("phoneNumber")}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* <!-- Single input --> */}
                <div>
                  <label className="text-gray-600 mb-2 block">Name</label>
                  <input
                    type="text"
                    className="input-box"
                    value={values.name}
                    //   onChange={handleChange("name")}
                  />
                </div>
                {/* <div className="grid sm:grid-cols-2 gap-4"> */}
                {/* <!-- Single input --> */}
                {/* <div>
                  <label className="text-gray-600 mb-2 block">Name</label>
                  <input
                    type="text"
                    className="input-box"
                    value={accessoryValues.name}
                    //   onChange={handleChange("name")}
                  />
                </div> */}

                {/* <!-- single input end --> */}
                {/* <!-- single input --> */}
                {/* <div>
                    <label className="text-gray-600 mb-2 block">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="input-box"
                      value="+123 456 789"
                    />
                  </div> */}
                {/* <!-- Single input end --> */}
                {/* </div> */}
                {/* <!-- single input end --> */}
                {/* <!-- single input --> */}
                {/* <div>
                    <label className="text-gray-600 mb-2 block">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="input-box"
                      value="+123 456 789"
                    />
                  </div> */}
                {/* <!-- Single input end --> */}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* <!-- Single input --> */}

                <div>
                  <label className="text-gray-600 mb-2 block">
                    Description
                  </label>
                  <textarea
                    type="text"
                    rows="10"
                    // cols="70"
                    className="input-box w-full"
                    value={values.description}
                    onChange={handleChange("description", "mobile")}
                  ></textarea>
                </div>
                {/* <!-- single input end --> */}
                {/* <!-- single input --> */}
                {/* <div>
                    <label className="text-gray-600 mb-2 block">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="input-box"
                      value="+123 456 789"
                    />
                  </div> */}
                {/* <!-- Single input end --> */}
                {/* </div> */}
                {/* <!-- single input end --> */}
                {/* <!-- single input --> */}
                {/* <div>
                    <label className="text-gray-600 mb-2 block">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="input-box"
                      value="+123 456 789"
                    />
                  </div> */}
                {/* <!-- Single input end --> */}
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {/* <!-- Single input --> */}
                <div>
                  <label className="text-gray-600 mb-2 block">Image 1</label>
                  <input
                    onChange={handleChange("images", "mobile")}
                    type="file"
                    name="images"
                    accept="image/*"
                    // hidden
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Image 2 (Optional)
                  </label>
                  <input
                    onChange={handleChange("images", "mobile")}
                    type="file"
                    name="images"
                    accept="image/*"
                    // hidden
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Image 3 (Optional)
                  </label>
                  <input
                    onChange={handleChange("images", "mobile")}
                    type="file"
                    name="images"
                    accept="image/*"
                    // hidden
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Image 4 (Optional)
                  </label>
                  <input
                    onChange={handleChange("images", "mobile")}
                    type="file"
                    name="images"
                    accept="image/*"
                    // hidden
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Image 5 (Optional)
                  </label>
                  <input
                    onChange={handleChange("images", "mobile")}
                    type="file"
                    name="images"
                    accept="image/*"
                    // hidden
                  />
                </div>

                {/* <!-- single input end --> */}
                {/* <!-- single input --> */}
                {/* <div>
                    <label className="text-gray-600 mb-2 block">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="input-box"
                      value="+123 456 789"
                    />
                  </div> */}
                {/* <!-- Single input end --> */}
              </div>

              {/* <!-- Form row end --> */}

              {/* <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-600 mb-2 block">City</label>
                    <select className="input-box">
                      <option>Dhaka-North</option>
                      <option>Dhaka-South</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-600 mb-2 block">Area</label>
                    <select className="input-box">
                      <option>Notun Bazar</option>
                      <option>Gulshan</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">Address</label>
                  <input
                    type="text"
                    className="input-box"
                    value="Badda Notun Bazar"
                  />
                </div> */}
            </div>
            {alert.error && <Message message={alert.message} display={true} />}
            {alert.success && (
              <Message message={alert.message} display={true} />
            )}
            {alert.loading && (
              <Message message={"Loading...Please Waite..."} display={true} />
            )}
            <div className="mt-6">
              <button
                type="submit"
                onClick={updateAddClick}
                className="px-6 py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                Save change
              </button>
            </div>
          </form>
        </div>
      </>
    );
  };
  const showAccessoryForm = () => {
    return (
      <>
        {/* <!-- account content --> */}
        <div className="col-span-9 shadow rounded px-6 pt-5 pb-7 mt-6 lg:mt-0">
          <form action="">
            <h3 className="text-lg font-medium capitalize mb-4">
              create accessory
            </h3>
            <div className="space-y-4">
              {/* <!-- Form row --> */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 mb-2 block">Condition</label>
                  <select
                    className="input-box"
                    value={accessoryValues.condition}
                    onChange={handleChange("condition", "accessory")}
                  >
                    <option>Brandnew</option>
                    <option>Used</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">Brandname</label>
                  <select
                    className="input-box"
                    value={accessoryValues.brand}
                    onChange={handleChange("brand", "accessory")}
                  >
                    <option>Samsung</option>
                    <option>Apple</option>
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 mb-2 block">Item Type</label>
                  <select
                    className="input-box"
                    value={accessoryValues.itemType}
                    onChange={handleChange("itemType", "accessory")}
                  >
                    <option>11 Pro</option>
                    <option>12 Pro</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">Price</label>
                  <input
                    type="text"
                    className="input-box"
                    value={accessoryValues.price}
                    onChange={handleChange("price", "accessory")}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 mb-2 block">Title</label>
                  <select
                    className="input-box"
                    value={accessoryValues.title}
                    onChange={handleChange("title", "accessory")}
                  >
                    <option>11 Pro</option>
                    <option>12 Pro</option>
                  </select>
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">Location</label>
                  <input
                    type="text"
                    className="input-box"
                    value={accessoryValues.location}
                    onChange={handleChange("location", "accessory")}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Negotiobale
                  </label>
                  <input
                    type="text"
                    className="input-box"
                    value={accessoryValues.negotiobale}
                    onChange={handleChange("negotiobale", "accessory")}
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="input-box"
                    value={accessoryValues.phoneNumber}
                    onChange={handleChange("phoneNumber", "accessory")}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* <!-- Single input --> */}
                <div>
                  <label className="text-gray-600 mb-2 block">Name</label>
                  <input
                    type="text"
                    className="input-box"
                    value={accessoryValues.name}
                    //   onChange={handleChange("name")}
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Description
                  </label>
                  <textarea
                    type="text"
                    rows="10"
                    // cols="70"
                    className="input-box w-full"
                    value={accessoryValues.description}
                    onChange={handleChange("description", "accessory")}
                  ></textarea>
                </div>
                {/* <!-- single input end --> */}
                {/* <!-- single input --> */}
                {/* <div>
                    <label className="text-gray-600 mb-2 block">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="input-box"
                      value="+123 456 789"
                    />
                  </div> */}
                {/* <!-- Single input end --> */}
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                {/* <!-- Single input --> */}
                <div>
                  <label className="text-gray-600 mb-2 block">Image 1</label>
                  <input
                    onChange={handleChange("images", "accessory")}
                    type="file"
                    name="images"
                    accept="image/*"
                    // hidden
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Image 2 (Optional)
                  </label>
                  <input
                    onChange={handleChange("images", "accessory")}
                    type="file"
                    name="images"
                    accept="image/*"
                    // hidden
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Image 3 (Optional)
                  </label>
                  <input
                    onChange={handleChange("images", "accessory")}
                    type="file"
                    name="images"
                    accept="image/*"
                    // hidden
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Image 4 (Optional)
                  </label>
                  <input
                    onChange={handleChange("images", "accessory")}
                    type="file"
                    name="images"
                    accept="image/*"
                    // hidden
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Image 5 (Optional)
                  </label>
                  <input
                    onChange={handleChange("images", "accessory")}
                    type="file"
                    name="images"
                    accept="image/*"
                    // hidden
                  />
                </div>

                {/* <!-- single input end --> */}
                {/* <!-- single input --> */}
                {/* <div>
                    <label className="text-gray-600 mb-2 block">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="input-box"
                      value="+123 456 789"
                    />
                  </div> */}
                {/* <!-- Single input end --> */}
              </div>

              {/* <!-- Form row end --> */}

              {/* <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-600 mb-2 block">City</label>
                    <select className="input-box">
                      <option>Dhaka-North</option>
                      <option>Dhaka-South</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-600 mb-2 block">Area</label>
                    <select className="input-box">
                      <option>Notun Bazar</option>
                      <option>Gulshan</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">Address</label>
                  <input
                    type="text"
                    className="input-box"
                    value="Badda Notun Bazar"
                  />
                </div> */}
            </div>
            {alert.error && <Message message={alert.message} display={true} />}
            {alert.success && (
              <Message message={alert.message} display={true} />
            )}
            {alert.loading && (
              <Message message={"Loading...Please Waite..."} display={true} />
            )}
            <div className="mt-6">
              <button
                type="submit"
                onClick={updateAccessoryClick}
                className="px-6 py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                Save change
              </button>
            </div>
          </form>
        </div>
        {/* <!-- account content end --> */}
      </>
    );
  };

  const showWantedForm = () => {
    return (
      <>
        {/* <!-- account content --> */}
        <div className="col-span-9 shadow rounded px-6 pt-5 pb-7 mt-6 lg:mt-0">
          <form action="">
            <h3 className="text-lg font-medium capitalize mb-4">
              create accessory
            </h3>
            <div className="space-y-4">
              {/* <!-- Form row --> */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-600 mb-2 block">Title</label>
                  <input
                    type="text"
                    className="input-box"
                    value={wantedValues.title}
                    onChange={handleChange("title", "wanted")}
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="input-box"
                    value={wantedValues.phoneNumber}
                    onChange={handleChange("phoneNumber", "wanted")}
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* <!-- Single input --> */}
                <div>
                  <label className="text-gray-600 mb-2 block">Email</label>
                  <input
                    type="text"
                    className="input-box"
                    value={wantedValues.email}
                    // onChange={handleChange("title", "wanted")}
                  />
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">Name</label>
                  <input
                    type="text"
                    className="input-box"
                    value={wantedValues.name}
                    //   onChange={handleChange("name")}
                  />
                </div>

                {/* <!-- single input end --> */}
                {/* <!-- single input --> */}
                {/* <div>
                    <label className="text-gray-600 mb-2 block">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="input-box"
                      value="+123 456 789"
                    />
                  </div> */}
                {/* <!-- Single input end --> */}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {/* <!-- Single input --> */}

                <div>
                  <label className="text-gray-600 mb-2 block">
                    Description
                  </label>
                  <textarea
                    type="text"
                    className="input-box"
                    rows="10"
                    cols="70"
                    value={wantedValues.description}
                    onChange={handleChange("description", "wanted")}
                  ></textarea>
                </div>

                {/* <!-- single input end --> */}
                {/* <!-- single input --> */}
                {/* <div>
                    <label className="text-gray-600 mb-2 block">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="input-box"
                      value="+123 456 789"
                    />
                  </div> */}
                {/* <!-- Single input end --> */}
              </div>
              {/* <!-- Form row end --> */}

              {/* <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-gray-600 mb-2 block">City</label>
                    <select className="input-box">
                      <option>Dhaka-North</option>
                      <option>Dhaka-South</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-gray-600 mb-2 block">Area</label>
                    <select className="input-box">
                      <option>Notun Bazar</option>
                      <option>Gulshan</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-gray-600 mb-2 block">Address</label>
                  <input
                    type="text"
                    className="input-box"
                    value="Badda Notun Bazar"
                  />
                </div> */}
            </div>
            {alert.error && <Message message={alert.message} display={true} />}
            {alert.success && (
              <Message message={alert.message} display={true} />
            )}
            {alert.loading && (
              <Message message={"Loading..Please Waite..."} display={true} />
            )}
            <div className="mt-6">
              <button
                type="submit"
                onClick={updateWantedClick}
                className="px-6 py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
              >
                Save change
              </button>
            </div>
          </form>
        </div>
        {/* <!-- account content end --> */}
      </>
    );
  };
  return (
    <Layout>
      {/* <!-- breadcrum --> */}
      <Breadcrum title={`${type} Update`} />
      {/* <!-- breadcrum end --> */}

      {/* <!-- account wrapper --> */}
      <div className="container  lg:grid grid-cols-12 items-start gap-6 pt-4 pb-16">
        {/* <!-- sidebar --> */}
        <div className="hidden col-span-3 md:flex">
          <Sidebar />
        </div>
        {/* <!-- sidebar end --> */}

        {/* <!-- account content --> */}
        {mobile && showAddForm()}
        {accessory && showAccessoryForm()}
        {wanted && showWantedForm()}
        {/* <!-- account content end --> */}
      </div>
      {/* <!-- account wrapper end --> */}
    </Layout>
  );
};

UpdateAdd.getInitialProps = ({ query }) => {
  if (query.updateAdd[1] == "mobile") {
    return onePhone(query.updateAdd[0]).then((data) => {
      return { add: data.doc, type: query.updateAdd[1] };
    });
  } else if (query.updateAdd[1] == "accessory") {
    return oneAccessory(query.updateAdd[0]).then((data) => {
      return { add: data.doc, type: query.updateAdd[1] };
    });
  } else if (query.updateAdd[1] == "wanted") {
    return oneWanted(query.updateAdd[0]).then((data) => {
      return { add: data.doc, type: query.updateAdd[1] };
    });
  }
};

export default UpdateAdd;
