import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import type { LayoutProps } from "../types/pageWithLayout";

const MainLayout: LayoutProps = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
