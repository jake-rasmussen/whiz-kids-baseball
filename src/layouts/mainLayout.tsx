import type { LayoutProps } from "../types/pageWithLayout";
import Footer from "../components/footer";
import NavBar from "../components/navbar";

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
