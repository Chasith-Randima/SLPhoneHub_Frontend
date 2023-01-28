import React from "react";
import Breadcrum from "../../components/Breadcrum";
import Layout from "../../components/Layout";
import Sidebar from "../../components/Sidebar";

const selectAdType = () => {
  return (
    <>
      <Layout>
        {/* <!-- breadcrum --> */}
        <Breadcrum title={"Post A Add"} />
        {/* <!-- breadcrum end --> */}

        {/* <!-- account wrapper --> */}
        <div class="container grid lg:grid-cols-12 items-start gap-6 pt-4 pb-16">
          {/* <!-- sidebar --> */}
          <div className="order-2 col-span-9 md:order-1 md:col-span-3">
            <Sidebar />
          </div>
          {/* <!-- sidebar end --> */}

          {/* <!-- account content --> */}
          <div className="order-1 col-span-9 grid md:order-2 md:grid-cols-3 gap-4 mt-6 lg:mt-0">
            {/* <!-- single card --> */}
            <div class="shadow rounded bg-white px-4 pt-6 pb-8">
              <div class="items center mb-4">
                <h3 class="font-medium capitalize text-gray-800 text-lg">
                  Post Mobile Phone Add
                </h3>
                <a
                  href={`/ads/createAdd?type=mobile`}
                  className="block w-full py-1 mt-5 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                >
                  POST
                </a>
              </div>
              {/* <div class="space-y-1">
                <h4 class="text-gray-700 font-medium">Russell Ahmed</h4>
                <p class="text-gray-800">example@mail.com</p>
                <p class="text-gray-800">(123) 456-789</p>
              </div> */}
            </div>
            {/* <!-- single card end --> */}
            {/* <!-- single card --> */}
            <div class="shadow rounded bg-white px-4 pt-6 pb-8">
              <div class=" items center mb-4">
                <h3 class="font-medium capitalize text-gray-800 text-lg">
                  Post Accessory Add
                </h3>
                <a
                  href={`/ads/createAdd?type=accessory`}
                  className="block w-full py-1 mt-5 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                >
                  POST
                </a>
                {/* <a href="#" class="text-primary">
                  Edit
                </a> */}
              </div>
              {/* <div class="space-y-1">
                <h4 class="text-gray-700 font-medium">Russell Ahmed</h4>
                <p class="text-gray-800">3891 Ranchview Dr.</p>
                <p class="text-gray-800">Richardson, Califora</p>
                <p class="text-gray-800">(123) 456-789</p>
              </div> */}
            </div>
            {/* <!-- single card end --> */}
            {/* <!-- single card --> */}
            <div class="shadow rounded bg-white px-4 pt-6 pb-8">
              <div class=" items center mb-4">
                <h3 class="font-medium capitalize text-gray-800 text-lg">
                  Post Wanted Add
                </h3>
                <a
                  href={`/ads/createAdd?type=wanted`}
                  className="block w-full py-1 mt-5 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                >
                  POST
                </a>
                {/* <a href="#" class="text-primary">
                  Edit
                </a> */}
              </div>
              {/* <div class="space-y-1">
                <h4 class="text-gray-700 font-medium">Russell Ahmed</h4>
                <p class="text-gray-800">3891 Ranchview Dr.</p>
                <p class="text-gray-800">Richardson, Califora</p>
                <p class="text-gray-800">(123) 456-789</p>
              </div> */}
            </div>
            {/* <!-- single card end --> */}
          </div>
          {/* <!-- account content end --> */}
        </div>
        {/* <!-- account wrapper end --> */}
      </Layout>
    </>
  );
};

export default selectAdType;
