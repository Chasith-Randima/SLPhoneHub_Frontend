import React from "react";
import Layout from "../../components/Layout";
import Breadcrum from "../../components/Breadcrum";
import Sidebar from "../../components/Sidebar";

const account = () => {
  return (
    <>
      <Layout>
        <Breadcrum title={"My Account"} />
        {/* <!-- account wraper --> */}
        <div class="container grid grid-cols-3 lg:grid-cols-12 items-start gap-6 pt-4 pb-16">
          {/* <!-- sidebar --> */}
          <div className="col-span-3 order-2 md:order-1">
            <Sidebar />
          </div>
          {/* <!-- sidebar end --> */}
          {/* <!-- account content --> */}
          <div className=" order-1 col-span-3 md:order-2 md:flex justify-center md:col-span-8 text-align-center">
            <span className="text-gray-900 text-9xl">Hi</span>
            <h1 className="text-gray-500 tex-xl">
              How was your day<span className="text-9xl text-gray-900">?</span>
            </h1>
          </div>

          {/* <!-- account content end --> */}
        </div>
        {/* <!-- account wraper end --> */}
      </Layout>
    </>
  );
};

export default account;
