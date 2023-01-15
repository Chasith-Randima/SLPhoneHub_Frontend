import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { logIn, isAuth, authenticate } from "../../actions/auth";
import Router from "next/router";
import Message from "../../components/Message";
import Link from "next/link";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const [alert, setAlert] = useState({
    message: "",
    error: false,
    loading: false,
    success: false,
  });

  useEffect(() => {
    if (isAuth()) {
      Router.push(`/`);
    }
  }, []);

  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert({ ...alert, loading: true });
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    await logIn(user)
      .then((data) => {
        // console.log(data);
        if (data.status && data.status == "success") {
          data.data.token = data.token;
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
          // console.log(data.error);
          authenticate(data.data, () => {
            if (isAuth()) {
              Router.push(`/`);
            }
          });
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

  const handleChange = (name) => (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, [name]: e.target.value });
  };
  return (
    <>
      <Layout>
        {/* <!-- Login --> */}

        <div class="container py-16">
          <div class="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 class="text-2xl uppercase font-medium mb-1">Login</h2>
            <p class="text-gray-600 mb-6 text-sm">
              Login if you are a returning customer
            </p>

            <form action="">
              <div class="space-y-4">
                <div>
                  <label class="text-gray-600 mb-2 block">Email Address</label>
                  <input
                    type="text"
                    value={email}
                    onChange={handleChange("email")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                    placeholder="Enter your email address"
                  />
                </div>
                <div>
                  <label class="text-gray-600 mb-2 block">Password</label>
                  <input
                    type="text"
                    value={password}
                    onChange={handleChange("password")}
                    class="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                    placeholder="Enter your Password"
                  />
                </div>
                {/* <div class="flex items-center justify-between mt-6">
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      id="agreement"
                      class="text-primary focus:ring-0 rounded-sm cursor-pointer"
                    />
                    <label
                      for="agreement"
                      class="text-gray-600 ml-3 cursor-pointer"
                    >
                      Remember Me
                    </label>
                  </div>
                  <a href="#" class="text-primary">
                    Forgot Password
                  </a>
                </div> */}
                {alert.error && (
                  <Message message={alert.message} display={true} />
                )}
                {alert.success && (
                  <Message message={alert.message} display={true} />
                )}
                {alert.loading && (
                  <Message
                    message={"Loading...Please Waite..."}
                    display={true}
                  />
                )}
                <div class="mt-4">
                  <button
                    class="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
                    onClick={handleSubmit}
                  >
                    login
                  </button>
                </div>
              </div>
            </form>

            {/* <!-- login with --> */}

            {/* <div class="mt-6 flex justify-center relative">
              <div class="text-gray-600 uppercase px-3 bg-white z-10 relative">
                Or login with
              </div>
              <div class="absolute left-0 top-3 w-full border-b-2 border-gray-200"></div>
            </div>
            <div class="flex mt-4 gap-4">
              <a
                href="#"
                class="w-1/2 py-2 text-center text-white bg-blue-800 rounded uppercase font-roboto font-medium text-sm hover:bg-blue-700"
              >
                Facebook
              </a>
              <a
                href="#"
                class="w-1/2 py-2 text-center text-white bg-yellow-600 rounded uppercase font-roboto font-medium text-sm hover:bg-yellow-500"
              >
                Facebook
              </a>
            </div> */}
            <p class="mt-4 text-gray-600 text-center">
              Dont have an account?
              <Link href={`/user/signUp`} class="text-primary">
                Register Now
              </Link>
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Login;
