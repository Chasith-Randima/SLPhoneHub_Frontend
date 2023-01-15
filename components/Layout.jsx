import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileMenuBar from "./MobileMenuBar";
import MobileSidebarMenu from "./MobileSidebarMenu";
import ErrorBoundary from "./ErrorBoundary";

const Layout = ({ children, search, filterOn, filter }) => {
  return (
    <>
      <ErrorBoundary>
        <Navbar search={search} />
        <MobileMenuBar filterOn={filterOn} filter={filter} />
        {/* <MobileSidebarMenu /> */}
        {children}
        <Footer />
      </ErrorBoundary>
    </>
  );
};

export default Layout;
