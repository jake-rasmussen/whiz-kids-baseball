import type { LayoutProps } from "../../types/pageWithLayout";
import Footer from "../footer";
import NavBar from "../navbar";

const MainLayout: LayoutProps = ({ children }) => {
  return (
    <div className="overflow-y-scroll">
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
