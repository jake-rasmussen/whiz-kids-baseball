import Footer from "../components/footer";
import NavBar from "../components/navbar";
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
