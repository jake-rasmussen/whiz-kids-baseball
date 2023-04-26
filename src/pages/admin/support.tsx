import type { ReactElement } from "react";
import EditLayout from "../../layouts/editLayout";
import Link from "next/link";

const EditSupport = () => {
  return (
    <section className="bg-white w-full h-screen flex items-center text-dark-gray">
      <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:py-32 md:px-10 lg:px-32 xl:max-w-3xl">
        <h1 className="text-4xl font-bold leading-none sm:text-5xl">
          Welcome to the Support Page
        </h1>
        <p className="mt-8 mb-12 text-lg">
          Hi! I&rsquo;m <span className="text-red font-bold">Jake</span>, and I created the website. If you ever run into any issues
          or have any questions, feel free to reach my at <span className="text-red font-semibold whitespace-nowrap">(610) 316-7252</span>, and I
          will get back to you as soon as possible
        </p>
      </div>
    </section>
  );

}

EditSupport.getLayout = (page: ReactElement) => {
  return (
    <>
      <EditLayout>{page}</EditLayout>
    </>
  );
};

export default EditSupport;