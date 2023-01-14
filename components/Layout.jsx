import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileMenuBar from "./MobileMenuBar";
import MobileSidebarMenu from "./MobileSidebarMenu";

const Layout = ({ children, search, filterOn, filter }) => {
  return (
    <>
      <Navbar search={search} />
      <MobileMenuBar filterOn={filterOn} filter={filter} />
      {/* <MobileSidebarMenu /> */}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
