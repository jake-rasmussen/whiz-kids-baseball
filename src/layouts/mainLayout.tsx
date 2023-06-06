import Footer from "../components/footer";
import NavBar from "../components/navbar";
import type { Layout } from "../types/pageWithLayout";

const MainLayout: Layout = ({ children }) => {
  return (
    <div className="absolute inset-0">
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
