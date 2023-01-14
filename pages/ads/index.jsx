import React from "react";
import { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import { allPhones } from "../../actions/ads";
import { withRouter } from "next/router";
import { Locations, Brands } from "../../data";
import SingleAdd from "../../components/adds/SingleAdd";
import BreadCrum from "../../components/Breadcrum";
import SearchSection from "../../components/SearchSection";
// import Model from "../../components/Model";

let search = "top";

const index = ({ adds_list, results, totalCount }) => {
  // console.log(totalCount);
  const [filter, setFilter] = useState(false);
  const [adds, setAdds] = useState(adds_list);
  const [values, setValues] = useState({
    success: "",
    error: "",
    body: {},
  });
  const [price, setPrice] = useState({
    minPrice: undefined,
    maxPrice: undefined,
  });

  const [limit, setLimit] = useState(3);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalCount / limit));

  const [alert, setAlert] = useState({
    message: "",
    error: "",
    loading: false,
  });

  const { success, error, body } = values;

  const [checkedState, setCheckedState] = useState(
    new Array(Brands.length).fill(false)
  );

  // useEffect(() => {}, [values.body]);
  const handleChange = (name, position) => (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    let value = name == "photo" ? e.target.files[0] : e.target.value;
    // value = name == "All" ? undefined : e.target.value;
    // value = e.target.type === "checkbox" ? e.target.value : e.target.checked;

    // if (e.target.value == "All" && name == "location") {
    //   console.log(e.target.value, name);
    //   setValues({ ...values, body: { brandname: values.body.brandname } });
    // } else {
    //   setValues({ ...values, body: { ...body, [name]: value } });
    // }
    // if (e.target.value == "All" && name == "brandname") {
    //   setValues({ ...values, body: { location: values.body.location } });
    // } else {
    setValues({ ...values, body: { ...body, [name]: value } });
    // }
    setPage(1);

    const updatedCheckedState = checkedState.map((item, index) =>
      index == position ? !item : item
    );

    setCheckedState(updatedCheckedState);
  };

  // ------------------------------------------------------------------------------------
  const nextPage = () => {
    setPage((oldPage) => {
      let nextPage = oldPage + 1;
      if (nextPage > totalPages) {
        nextPage = 0;
      }
      return nextPage;
    });
  };
  const prevPage = () => {
    setPage((oldPage) => {
      let prevPage = oldPage - 1;
      if (prevPage < 0) {
        prevPage = totalPages;
      }
      return prevPage;
    });
  };

  // let router = useRouter();

  // useEffect(() => {
  //   if (router.isReady) {
  //     let { brandname } = router.query;

  //     if (brandname) {
  //       setValues({ ...values, body: { ...body, brandname } });
  //       filterSet();
  //     }
  //   }
  // }, []);

  const handlePage = (index) => {
    setPage(index);
  };
  // ------------------------------------------------------------------------------------

  useEffect(() => {
    // setPage(1);
    filterSet();
  }, [values.body, price, page]);

  const filterSet = () => {
    // console.log(price);
    let paramsData = {
      limit,
      page,
      brandname: values.body.brandname,
      location: values.body.location,
      priceMax: price.maxPrice,
      priceMin: price.minPrice,
      sort: values.body.priceSort,
    };

    if (paramsData.brandname && paramsData.brandname == "All") {
      delete paramsData.brandname;
    }
    if (paramsData.location && paramsData.location == "All") {
      delete paramsData.location;
    }
    // console.log(paramsData);
    return allPhones(paramsData).then((data) => {
      if (data.data.status == "success") {
        setAdds([...data.data.doc]);
        totalCount = data.data.totalCount;
        setTotalPages(Math.ceil(totalCount / limit));
      } else {
        setAlert({
          ...alert,
          loading: false,
          message: data.message,
          error: data.error,
        });
      }
      // console.log(totalCount);
      // setPage(page + 1);
    });
  };

  // const loadMore = async () => {
  //   // console.log(limit, page, results);
  //   let paramsData = {
  //     limit,
  //     page,
  //     brandname: values.body.brandname,
  //     location: values.body.location,
  //     priceMin: price.priceMin,
  //     priceMax: price.priceMax,
  //     sort: values.body.priceSort,
  //   };
  //   return await allPhones(paramsData).then((data) => {
  //     setAdds([...adds, ...data.data.doc]);
  //     setPage(page + 1);
  //   });
  // };
  // limit,
  // page,
  // values.body.brandname,
  // values.body.location,
  // values.body.priceMin,
  // values.body.priceMax,
  // values.body.priceSort

  const priceHandle = (name) => (e) => {
    e.preventDefault();
    const value = e.target.value;

    setPrice({ ...price, [name]: value });
    setPage(1);
    // console.log(price);
  };

  // const handleResetFilter = (name) => (e) => {
  //   if (name == "brandname") {
  //     setValues({ ...values, body: { location: values.body.location } });
  //     setCheckedState(new Array(Brands.length).fill(false));
  //   }
  //   // if(name == "location")
  // };

  const setBodyPrice = () => {
    setValues({
      ...values,
      body: { ...body, minPrice: price.minPrice, maxPrice: price.maxPrice },
    });
  };

  let types = Locations.map((item, index) => (
    <option key={index} value={item}>
      {item}
    </option>
  ));

  // console.log(values);
  let brandList = Brands.map((item, index) => (
    <div className="flex items-center" key={index}>
      <input
        type="checkbox"
        // id="cat-1"
        value={item}
        checked={checkedState[index]}
        // checked={values.body.brandname == item ? true : false}
        onChange={handleChange("brandname", index)}
        // checked={values.body.brandname == item}
        className="text-primary focus:ring-0 rounded-sm cursor-pointer"
      />
      <label htmlFor="cat-1" className="text-gray-600 ml-3 cursor-pointer">
        {item}
      </label>
      <div className="ml-auto text-gray-600 text-sm">(15)</div>
    </div>
  ));
  return (
    <>
      <Layout search={search} filterOn={setFilter} filter={filter}>
        {/* <!-- bread crums --> */}
        <BreadCrum title={"Home"} />

        {/* Model */}

        <div
          className={
            filter
              ? " fixed bg-white top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
              : "hidden fixed bg-white top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
          }
        >
          <div class="relative w-full h-full max-w-md md:h-auto">
            <div class="relative p-5 pt-5 h-screen bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex">
                <i
                  class="ml-auto text-2xl mb-5 fa-sharp fa-solid fa-xmark"
                  onClick={() => setFilter(!filter)}
                ></i>
              </div>
              <div>
                <SearchSection search={"mid"} />
              </div>
              {/* <!-- category filter --> */}
              <div className="pt-4 shadow">
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                  Locations
                </h3>
                <div className="space-y-2">
                  {/* <!-- single category --> */}
                  <div className="flex items-center">
                    <select name="location" onChange={handleChange("location")}>
                      {types}
                    </select>
                    {/* <label
                      for="cat-1"
                      className="text-gray-600 ml-3 cursor-pointer"
                    >
                      bedroom
                    </label> */}
                    <div className="ml-auto text-gray-600 text-sm">(15)</div>
                  </div>
                </div>
              </div>
              {/* <!-- price filter --> */}
              <div className="pt-4 shadow">
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                  price
                </h3>
                <div className="mt-4 flex items-center">
                  <input
                    type="text"
                    value={price.minPrice}
                    onChange={priceHandle("minPrice")}
                    className="w-full border-gray-300 focus:border-primary focus:ring-0 px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
                    placeholder="min"
                  />
                  <span className="mx-3 text-gray-500">-</span>
                  <input
                    type="text"
                    value={price.maxPrice}
                    onChange={priceHandle("maxPrice")}
                    className="w-full border-gray-300 focus:border-primary focus:ring-0 px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
                    placeholder="max"
                  />
                </div>
                <button
                  className="block w-full py-1 mt-2 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                  onClick={setBodyPrice}
                >
                  Set Price
                </button>
              </div>
              <div>{brandList}</div>
              <div className="flex mt-5">
                <button
                  className="block w-full py-1 mr-2 mt-2 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                  onClick={() => {
                    setValues({ ...values, body: {} });
                    setCheckedState(new Array(Brands.length).fill(false));
                  }}
                >
                  Clear All
                </button>
                <button
                  className="block w-full py-1 ml-2 mt-2 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                  onClick={() => setFilter(!filter)}
                >
                  Set Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- shop wrapper --> */}
        <div className="container grid grid-cols-all   lg:grid-cols-5 gap-6 pt-4 pb-16 items-start">
          {/* <!-- sidebar --> */}
          <div className="hidden md:flex md:col-span-1 lg:col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden">
            <div className="divide-y divide-gray-200 space-y-5">
              {/* <!-- category filter --> */}
              <div>
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                  categories
                </h3>
                <div className="space-y-2">
                  {/* <!-- single category --> */}

                  {brandList}
                </div>
              </div>

              {/* <!-- category filter --> */}
              <div className="pt-4">
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                  Locations
                </h3>
                <div className="space-y-2">
                  {/* <!-- single category --> */}
                  <div className="flex items-center">
                    <select name="location" onChange={handleChange("location")}>
                      {types}
                    </select>
                    {/* <label
                      for="cat-1"
                      className="text-gray-600 ml-3 cursor-pointer"
                    >
                      bedroom
                    </label> */}
                    <div className="ml-auto text-gray-600 text-sm">(15)</div>
                  </div>
                </div>
              </div>

              {/* <!-- price filter --> */}
              <div className="pt-4">
                <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                  price
                </h3>
                <div className="mt-4 flex items-center">
                  <input
                    type="text"
                    value={price.minPrice}
                    onChange={priceHandle("minPrice")}
                    className="w-full border-gray-300 focus:border-primary focus:ring-0 px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
                    placeholder="min"
                  />
                  <span className="mx-3 text-gray-500">-</span>
                  <input
                    type="text"
                    value={price.maxPrice}
                    onChange={priceHandle("maxPrice")}
                    className="w-full border-gray-300 focus:border-primary focus:ring-0 px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
                    placeholder="max"
                  />
                </div>
                <button
                  className="block w-full py-1 mt-2 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
                  onClick={setBodyPrice}
                >
                  Set Price
                </button>
              </div>
            </div>
          </div>
          {/* <!-- product-------------------------------------------- --> */}
          <div className="col-span-3">
            {/* <!-- sorting --> */}
            {/* <Model /> */}
            {/* <SearchSection search={"mid"} /> */}
            <div className="flex mt-1 items-center mb-4">
              <select
                name=""
                id=""
                className="w-44 text-sm text-gray-600 shadow-sm rounded focus:ring-primary focus:border-primary"
                onChange={handleChange("priceSort")}
              >
                <option value="-createdAt">Default Sorting</option>
                <option value="createdAt">Oldest to latest</option>
                <option value="price">Price Low - High</option>
                <option value="-price">Price High - Low</option>
              </select>

              <div className="flex gap-2 ml-auto">
                <div className="border border-primary w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
                  {/* <i
                    className="fas fa-th"
                    onClick={() => setFilter(!filter)}
                  ></i> */}
                  <i
                    class="fa-solid fa-arrow-down-short-wide"
                    onClick={() => setFilter(!filter)}
                  ></i>
                </div>
                {/* <div className="border border-gray-300 w-10 h-9 flex items-center justify-center text-gray-600 rounded cursor-pointer">
                  <i className="fas fa-li text-gray-600"></i>
                </div> */}
              </div>
            </div>

            {/* <!-- product grid --> */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* <!-- single product --> */}

              {adds.map((add, index) => {
                return <SingleAdd key={index} add={add} />;
              })}
              {/* <!-- single product --> */}
            </div>

            {/* <button
              href="#"
              className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
              onClick={loadMore}
            >
              Load More
            </button> */}
          </div>
        </div>

        <div
          aria-label="Page navigation example"
          className="flex justify-center"
        >
          <ul className="inline-flex -space-x-px">
            <li>
              <a
                href="#"
                onClick={prevPage}
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>
            {[...Array(totalPages)].map((val, index) => {
              return (
                <li key={index}>
                  <a
                    href="#"
                    onClick={() => setPage(index + 1)}
                    className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    {index + 1}
                  </a>
                </li>
              );
            })}

            {/* <li>
              <a
                href="#"
                className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Previous
              </a>
            </li>

            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="px-3 py-2 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                4
              </a>
            </li>
            <li>
              <a
                href="#"
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                5
              </a>
            </li> */}
            <li>
              <a
                href="#"
                onClick={nextPage}
                className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Next
              </a>
            </li>
          </ul>
        </div>
      </Layout>
    </>
  );
};

index.getInitialProps = async () => {
  let page = 1;
  let limit = 9;
  let brandname;
  let location;
  let priceMin;
  let priceMax;
  let sort;

  return await allPhones(
    limit,
    page,
    brandname,
    location,
    priceMin,
    priceMax,
    sort
  ).then((data) => {
    // console.log(data.data.doc);

    return {
      adds_list: data.data.doc,
      results: data.data.results,
      totalCount: data.data.totalCount,
    };
    // return {};
  });
};

export default withRouter(index);
