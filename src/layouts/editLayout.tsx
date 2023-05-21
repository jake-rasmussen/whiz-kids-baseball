import { Toaster } from "react-hot-toast";
import Sidebar from "../components/admin/Sidebar";
import withAdminPrivilege from "../HOC/withAdminPrivilege";
import type { Layout } from "../types/pageWithLayout";

const EditLayout: Layout = ({ children }) => {
  return (
    <>
      <main className="flex hidden flex-row md:contents">
        <Toaster position="top-right" />
        <Sidebar />
        <main className="z-0 ml-60 flex h-0">{children}</main>
      </main>
      <main className="block h-screen w-screen items-center justify-center overflow-hidden md:hidden">
        <section className="flex h-full items-center bg-white text-dark-gray">
          <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
            <h1 className="text-4xl font-bold leading-none sm:text-5xl">
              <span className="text-red">Admin Edit</span> needs more space
            </h1>
            <p className="mt-8 mb-12 text-lg">
              Otherwise, it is difficult to use the interface. Because the page
              directly makes changes to the frontend, its a dangerous way to
              make modifications to the site.
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default withAdminPrivilege(EditLayout);
