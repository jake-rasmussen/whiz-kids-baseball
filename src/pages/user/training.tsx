import MainLayout from "../../layouts/mainLayout";
import type { NextPageWithLayout } from "./../_app";
import { IconInfoCircle } from "@tabler/icons";
import { ReactElement, useState } from "react";
import React from "react";
import { api } from "../../utils/api";
import Error from "next/error";
import { useUser } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../components/LoadingPage";
import { Training, TrainingsOnUsers } from "@prisma/client";

const Trainings: NextPageWithLayout = () => {
  const {
    data: trainings,
    isLoading: isLoadingTrainings,
    isError,
    error,
  } = api.training.getTrainingsForUserId.useQuery();

  const [playerName, setPlayerName] = useState("");
  const [validName, setValidName] = useState(false);

  const [targetTrainingId, setTargetTrainingId] = useState("");
  const [wait, setWait] = useState(false);

  if (isLoadingTrainings) {
    return <Loading />;
  } else if (isError) {
    return <Error statusCode={error.data?.httpStatus || 500} />;
  }

  return (
    <>
      <main className="flex min-h-[82vh] w-full flex-col items-center justify-center bg-dark-gray py-10 pb-14">
        <h1 className="p-4 pb-10 text-center text-3xl font-black uppercase leading-none tracking-wide text-white md:text-4xl">
          My Trainings
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
                  Unregister?
                </th>
              </tr>
            </thead>

            <tbody>
              {trainings.map((trainingOnUser: TrainingsOnUsers, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr className="border-y border-light-gray">
                      <td className="py-2 text-center text-sm font-medium text-white">
                        {trainingOnUser.playerName}
                      </td>
                      <td className="table-cell py-2 text-sm font-medium text-white md:hidden">
                        <div className="flex flex-row justify-center">
                          <label
                            htmlFor="modal"
                            className="hover:cursor-pointer"
                          >
                            <IconInfoCircle className="mx-2 text-white transition duration-300 ease-in-out hover:cursor-pointer hover:text-red" />
                          </label>
                        </div>
                      </td>
                      <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light capitalize text-white md:table-cell">
                        {/* {trainingOnUser.location} */}
                      </td>
                      <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light capitalize text-white md:table-cell"></td>
                      <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light capitalize text-white md:table-cell"></td>
                      <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light capitalize text-white md:table-cell">
                        {/* {`$${training.price}`} */}
                      </td>
                      <td className="whitespace-nowrap py-2 text-center text-sm font-light text-white">
                        <label
                          className="text-md btn self-center rounded-lg rounded border-none bg-gradient-to-r from-red to-secondary-red font-black uppercase tracking-wide text-white
                          transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer"
                          // onClick={() => setTargetTrainingId(training.id)}
                        >
                          Unregister
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
            <span className="text-md w-[50%] px-5 text-center font-semibold text-white md:text-xl">
              <div className="divider before:bg-light-gray after:bg-light-gray"></div>
              You are currently not signed up for any trainings!
              <div className="divider before:bg-light-gray after:bg-light-gray"></div>
            </span>
          </>
        )}
      </main>
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
