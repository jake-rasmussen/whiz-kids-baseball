import MainLayout from "../layouts/mainLayout";
import type { NextPageWithLayout } from "./_app";
import { IconInfoCircle } from "@tabler/icons";
import { ReactElement, useState } from "react";
import React from "react";
import { api } from "../utils/api";
import { Training } from "@prisma/client";
import {
  dateToStringFormatted,
  dateToTimeStringFormatted,
} from "../utils/helpers";
import Loading from "../components/LoadingPage";
import Error from "next/error";

const Trainings: NextPageWithLayout = () => {
  const {
    data: trainings,
    isLoading,
    isError,
    error
  } = api.training.getTrainingWithAvailability.useQuery();

  const [playerName, setPlayerName] = useState("");

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    return <Error statusCode={error.data?.httpStatus || 500} />;
  }

  return (
    <>
      <input type="checkbox" id="register-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-white text-left text-dark-gray shadow-xl">
          <h1 className="py-4 pl-4 text-2xl font-black uppercase leading-tight tracking-wide text-red underline">
            Training Session
          </h1>
          <p className="px-4 py-1 text-lg">
            Player Name
          </p>
          <form>
            <input
              type="name"
              className="input-bordered input block w-full rounded-md bg-white font-semibold text-dark-gray shadow-sm"
              value={playerName}
              onChange={(e) => setPlayerName(e.currentTarget.value)}
              required
            />

            <div className="modal-action py-4">
              <label htmlFor="register-modal" className="btn">
                Cancel
              </label>
              <button type="submit" className="btn">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex w-full flex-col items-center overflow-x-scroll bg-dark-gray">
        <div className="invisible h-0 md:visible md:h-[60vh] md:w-full">
          <main className="flex h-full w-full w-full justify-center">
            <iframe
              src={
                "https://www.youtube.com/embed/XF_q1VIMXTk?controls=0&showinfo=0&autoplay=1&loop=1&mute=1&playlist=XF_q1VIMXTk"
              }
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              title="Whiz Kids Practice Video"
              className="w-full"
            />
          </main>
        </div>

        <section className="w-full bg-white py-6">
          <div className="container mx-auto flex flex-col items-center justify-center space-y-8 p-4 md:p-10 md:px-24 xl:px-48">
            <h1 className="text-center text-5xl font-bold leading-none">
              Level up your game at one of our{" "}
              <span className="text-red">trainings</span>
            </h1>
            <p className="pt-2 pb-8 text-center text-xl font-medium">
              This is an environment where normal baseball players with big
              dreams show up to work consistently and ultimately transform
              themselves. We aim to mentor players who eventually get recruited.
              We are passionate, straight forward and very well informed. Our
              mission is to always be equipped to push you further.
            </p>
          </div>
        </section>

        <main className="flex w-full flex-col items-center justify-center bg-dark-gray py-10 pb-14">
          <h1 className="p-4 pb-10 text-center text-3xl font-black uppercase leading-none tracking-wide text-white md:text-4xl">
            Training Dates
          </h1>
          {trainings.length > 0 ? (
            <table className="w-[80%] pb-[10vh]">
              <thead>
                <tr className="w-full">
                  <th className="py-2 px-5 text-base font-black text-red">
                    Training Session
                  </th>
                  <th className="text-md table-cell px-5 font-black text-red md:hidden md:text-xl">
                    {/* Info */}
                  </th>
                  <th className="hidden py-2 px-5 text-base font-black text-red md:table-cell">
                    Location
                  </th>
                  <th className="hidden py-2 px-5 text-base font-black text-red md:table-cell">
                    Date
                  </th>
                  <th className="hidden py-2 px-5 text-base font-black text-red md:table-cell">
                    Time
                  </th>
                  <th className="hidden py-2 px-5 text-base font-black text-red md:table-cell">
                    Price
                  </th>
                  <th className="py-2 px-5 text-base font-black text-red">
                    Interested?
                  </th>
                </tr>
              </thead>

              <tbody>
                {trainings.map((training: any, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className="border-y border-light-gray">
                        <td className="py-2 text-center text-sm font-medium text-white">
                          {training.name}
                        </td>
                        <td className="table-cell py-2 text-sm font-medium text-white md:hidden">
                          <div className="flex flex-row justify-center">
                            <label
                              htmlFor="modal"
                              className="hover:cursor-pointer"
                            >
                              <IconInfoCircle className="mx-2 text-white transition duration-300 ease-in-out hover:cursor-pointer hover:text-red" />
                            </label>

                            <input
                              type="checkbox"
                              id="modal"
                              className="modal-toggle"
                            />
                            <div className="modal">
                              <div className="modal-box relative bg-white text-left text-dark-gray shadow-xl">
                                <label
                                  htmlFor="modal"
                                  className="btn-ghost btn-sm btn absolute right-2 top-2"
                                >
                                  ✕
                                </label>
                                <h1 className="py-4 pl-4 text-2xl font-black uppercase leading-tight tracking-wide text-red underline">
                                  Training Session
                                </h1>
                                <p className="px-4 py-1 text-lg capitalize">
                                  Location: {training.location}
                                </p>
                                <p className="px-4 py-1 text-lg capitalize">
                                  Date:{" "}
                                  {dateToStringFormatted(training.dateTime)}
                                </p>
                                <p className="px-4 py-1 text-lg capitalize">
                                  Time:{" "}
                                  {dateToTimeStringFormatted(training.dateTime)}
                                </p>
                                <p className="py- px-4 text-lg capitalize">
                                  Price: ${training.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light text-white md:table-cell capitalize">
                          {training.location}
                        </td>
                        <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light text-white md:table-cell capitalize">
                          {dateToStringFormatted(training.dateTime)}
                        </td>
                        <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light text-white md:table-cell capitalize">
                          {dateToTimeStringFormatted(training.dateTime)}
                        </td>
                        <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light text-white md:table-cell capitalize">
                          {`$${training.price}`}
                        </td>
                        <td className="whitespace-nowrap py-2 text-center text-sm font-light text-white">
                          <label
                            className="text-md btn self-center rounded-lg rounded border-none bg-gradient-to-r from-red to-secondary-red font-black uppercase tracking-wide text-white
                            transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer"
                            htmlFor="register-modal"
                          >
                            Register
                          </label>
                        </td>
                      </tr>
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <>
              <span className="text-md px-5 text-center font-semibold text-white md:text-xl w-[50%]">
                <div className="divider before:bg-light-gray after:bg-light-gray"></div>
                There are currently no listed trainings, <br />
                please check back at a later date!
                <div className="divider before:bg-light-gray after:bg-light-gray"></div>
              </span>
            </>
          )}
        </main>
      </div>
    </>
  );
};

Trainings.getLayout = (page: ReactElement) => {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default Trainings;
