import type { LayoutProps } from "../types/pageWithLayout";
import Footer from "../components/footer";
import Sidebar from "../components/edit/Sidebar";

const EditLayout: LayoutProps = ({ children }) => {
  return (
    <>
      <main className="flex flex-row">
        <Sidebar />
        {children}
      </main>
    </>
  );
};

export default EditLayout;
