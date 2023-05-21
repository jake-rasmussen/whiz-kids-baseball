import type { Tryout } from "@prisma/client";
import image from "../../assets/images/sample2.png";
import MainLayout from "../layouts/mainLayout";
import { api } from "../utils/api";
import type { NextPageWithLayout } from "./_app";
import Image from "next/image";
import type { ReactElement } from "react";
import React from "react";
import {
  dateToStringFormatted,
  dateToTimeStringFormatted,
} from "../utils/helpers";
import Loading from "../components/LoadingPage";
import { motion } from "framer-motion";
import InterestForm from "../components/InterestForm";
import Error from "next/error";

const Tryouts: NextPageWithLayout = () => {
  const {
    data: tryouts,
    isLoading,
    isError,
    error,
  } = api.tryout.getAllTryouts.useQuery();

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    return <Error statusCode={error.data?.httpStatus || 500} />;
  }

  return (
    <>
      <section className="relative w-full text-white">
        <div className="flex flex-col bg-dark-gray p-8 md:flex-row md:p-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="flex flex-col items-center justify-center space-y-8 bg-dark-gray p-4 md:min-h-[93vh] md:max-w-[40vh] md:p-10 md:px-12 lg:max-w-[60vh]"
          >
            <div>
              <h1 className="text-center text-4xl font-bold leading-none text-white lg:text-6xl">
                Interested in becoming a{" "}
                <span className="whitespace-nowrap text-red">Whiz Kid</span>?
              </h1>
              <p className="py-8 text-center text-xl font-medium text-white lg:text-2xl">
                Check out our available tryout schedule below, and fill out the
                interest form below!
              </p>
            </div>
          </motion.div>
          <div className="overflow-x-hidden">
            <Image
              priority
              src={image}
              alt="Whiz Kids Photo"
              className="fixed hidden h-full w-auto object-cover md:block"
            />
          </div>
        </div>
      </section>

      <main className="relative flex flex-col items-center overflow-x-scroll bg-white py-10 pb-20">
        <h1 className="p-4 pb-10 text-center text-3xl font-black uppercase leading-none tracking-wide text-dark-gray md:text-4xl">
          Tryout Dates
        </h1>
        {tryouts.length > 0 ? (
          <table className="w-[80%] md:w-[60%]">
            <thead>
              <tr className="w-full">
                <th className="text-md px-5 font-black text-red md:text-xl">
                  Location
                </th>
                <th className="text-md px-5 font-black text-red md:text-xl">
                  Date
                </th>
                <th className="text-md px-5 font-black text-red md:text-xl">
                  Time
                </th>
              </tr>
            </thead>

            <tbody>
              {tryouts.map((tryout: Tryout, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <tr
                      className="border-y border-light-gray text-dark-gray"
                      key={`tryout${index}`}
                    >
                      <td className="whitespace-nowrap py-4 text-center text-base font-light capitalize text-dark-gray md:text-lg">
                        {tryout.location}
                      </td>
                      <td className="whitespace-nowrap py-4 text-center text-base font-light text-dark-gray md:text-lg">
                        {dateToStringFormatted(tryout.dateTime)}
                      </td>
                      <td className="whitespace-nowrap py-4 text-center text-base font-light text-dark-gray md:text-lg">
                        {dateToTimeStringFormatted(tryout.dateTime)}
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        ) : (
          <>
            <span className="text-md w-[50%] px-5 text-center font-semibold text-red md:text-xl">
              <div className="divider before:bg-light-gray after:bg-light-gray"></div>
              There are currently no listed tryouts, <br />
              please check back at a later date!
              <div className="divider before:bg-light-gray after:bg-light-gray"></div>
            </span>
          </>
        )}
      </main>

      <section className="relative bg-dark-gray p-6 text-light-gray">
        <InterestForm />
      </section>
    </>
  );
};

Tryouts.getLayout = (page: ReactElement) => {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default Tryouts;
