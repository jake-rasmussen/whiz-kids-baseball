import Footer from "../components/Footer";
import NavBar from "../components/Navbar";
import type { Layout } from "../types/pageWithLayout";

const MainLayout: Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default MainLayout;
