import Sidebar from "../components/edit/Sidebar";
import Footer from "../components/footer";
import type { LayoutProps } from "../types/pageWithLayout";

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
