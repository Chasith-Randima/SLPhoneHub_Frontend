// import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "@next/font/google";
// import styles from "../styles/Home.module.css";
// import Navbar from "../components/Navbar";
import Link from "next/link";
import Layout from "./../components/Layout";
import SearchSection from "./../components/SearchSection";

// const inter = Inter({ subsets: ["latin"] });

let search = "mid";

export default function Home() {
  return (
    <>
      <Layout search={search}>
        <div className="flex pt-20 justify-center container py-16">
          <SearchSection search={search} />
        </div>
        <div className="flex justify-center text-center  mx-auto rounded-10">
          <Link href={`/ads`}>
            <h2 className="text-center text-white bg-primary text-xl border border-primary p-5 ">
              All Adds
            </h2>
          </Link>
        </div>
        <div className="contiainer bg-white py-10 md:px-10 mx-5">
          <div className="grid grid-cols-3 gap-4 ">
            <div className="py-3 text-center border border-primary rounded">
              <Link href={`/ads?brandname=samsung`}>
                <h2 className="text-xl text-primary">Samsung</h2>
              </Link>
              <span className="text-primary">224</span>
            </div>
            <div className="py-3 text-center border border-primary rounded">
              <Link href={`/ads?brandname=apple`}>
                <h2 className="text-xl text-primary">Apple</h2>
              </Link>
              <span className="text-primary">78</span>
            </div>
            <div className="py-3 text-center border border-primary rounded">
              <h2 className="text-xl text-primary">Sony</h2>
              <span className="text-primary">55</span>
            </div>
            <div className="py-3 text-center border border-primary rounded">
              <h2 className="text-xl text-primary">Huawei</h2>
              <span className="text-primary">156</span>
            </div>
            <div className="py-3 text-center border border-primary rounded">
              <h2 className="text-xl text-primary">Xiomi</h2>
              <span className="text-primary">121</span>
            </div>
            <div className="py-3 text-center border border-primary rounded">
              <h2 className="text-xl text-primary">Google</h2>
              <span className="text-primary">33</span>
            </div>
            <div className="py-3 text-center border border-primary rounded">
              <h2 className="text-xl text-primary">Mycrosoft</h2>
              <span className="text-primary">16</span>
            </div>
            <div className="py-3 text-center border border-primary rounded">
              <h2 className="text-xl text-primary">Oppo</h2>
              <span className="text-primary">23</span>
            </div>
            <div className="py-3 text-center border border-primary rounded">
              <h2 className="text-xl text-primary">Vivo</h2>
              <span className="text-primary">12</span>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
