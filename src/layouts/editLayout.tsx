import Sidebar from "../components/admin/Sidebar";
import withAdminPrivelage from "../HOC/withAdminPrivelage";
import type { Layout } from "../types/pageWithLayout";

const EditLayout: Layout = ({ children }) => {
  return (
    <>
      <main className="flex flex-row">
        <Sidebar />
        <main className="flex h-screen w-full pl-60">{children}</main>
      </main>
    </>
  );
};

export default withAdminPrivelage(EditLayout);
