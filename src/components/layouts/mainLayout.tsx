import type { LayoutProps } from "../../types/nextPageWithLayout";
import Footer from "../footer";
import NavBar from "../navbar";

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
