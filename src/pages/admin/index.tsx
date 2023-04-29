import type { ReactElement } from "react";
import EditLayout from "../../layouts/editLayout";
import Link from "next/link";

const EditGuide = () => {
  return (
    <section className="flex h-screen w-full items-center bg-white text-dark-gray">
      <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
        <h1 className="text-4xl font-bold leading-none sm:text-5xl">
          Welcome to the Whiz Kids
          <span className="text-red"> Admin Edit</span>
        </h1>
        <p className="mt-8 mb-12 text-lg">
          Use the Sidebar to navigate to which page you want to edit, the use
          each table to modify the page&rsquo;s data. Please note that any
          changes will automatically be sent to the page to be updated, so be
          careful when editing.
        </p>
        <div className="flex flex-wrap justify-center">
          <button className="btn btn-active btn-lg bg-dark-gray text-white">
            <Link href={"/admin/support"}>Questions?</Link>
          </button>
        </div>
      </div>
    </section>
  );
};

EditGuide.getLayout = (page: ReactElement) => {
  return (
    <>
      <EditLayout>{page}</EditLayout>
    </>
  );
};

export default EditGuide;
