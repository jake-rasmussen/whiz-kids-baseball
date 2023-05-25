import MainLayout from "../layouts/mainLayout";
import type { NextPageWithLayout } from "./_app";
import { IconInfoCircle } from "@tabler/icons";
import { ReactElement, use, useEffect } from "react";
import { useState } from "react";
import React from "react";
import { api } from "../utils/api";
import {
  dateToStringFormatted,
  dateToTimeStringFormatted,
  isEmptyString,
  isWhitespace,
} from "../utils/helpers";
import Loading from "../components/LoadingPage";
import Error from "next/error";
import { useUser } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

type TrainingWithSlots =
  | {
      availableSlots: number;
      id: string;
      name: string;
      location: string;
      dateTime: Date;
      totalSlots: number;
      price: number;
      createdAt: Date;
      updatedAt: Date;
    }
  | undefined;

const Trainings: NextPageWithLayout = () => {
  const {
    data: trainings,
    isLoading: isLoadingTrainings,
    isError,
    error,
  } = api.training.getTrainingsForUsers.useQuery();

  const { isSignedIn } = useUser();
  const { data: isAdmin } = api.user.isUserAdmin.useQuery(undefined, {
    enabled: !!isSignedIn,
  });

  const [playerName, setPlayerName] = useState("");
  const [validName, setValidName] = useState(false);

  const [targetTrainingId, setTargetTrainingId] = useState("");
  const [wait, setWait] = useState(false);

  useEffect(() => {
    if (isEmptyString(playerName) || isWhitespace(playerName)) {
      setValidName(false);
    } else {
      setValidName(true);
    }

    return () => {
      return;
    };
  }, [playerName]);

  const resetTrainingModalStates = () => {
    setPlayerName("");
    setValidName(false);
    setTargetTrainingId("");
  };

  const registerPlayer = api.training.registerForTraining.useMutation({
    onMutate() {
      setWait(true);
      toast.loading("Registering Player...");
    },
    onSuccess() {
      setWait(false);
      resetTrainingModalStates();

      toast.dismiss();
      toast.success("Successfully Registered Player!");
    },
    onError(error) {
      toast.dismiss();
      if (error.data?.httpStatus === 500) {
        toast.error("You've already signed up!");
      } else {
        toast.error("Error Registering for Training");
      }
    },
  });

  if (isLoadingTrainings) {
    return <Loading />;
  } else if (isError) {
    return <Error statusCode={error.data?.httpStatus || 500} />;
  }

  const handleRegister = () => {
    if (wait || targetTrainingId === "") return;

    if (!validName) {
      toast.dismiss();
      toast.error("Please Enter a Valid Name!");
      return;
    }

    registerPlayer.mutate({
      trainingId: targetTrainingId,
      playerName: playerName,
    });
  };

  return (
    <>
      <Toaster position="top-center" />
      <input type="checkbox" id="register-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-white text-left text-dark-gray shadow-xl">
          <h1 className="py-4 pl-4 text-2xl font-black uppercase leading-tight tracking-wide text-red underline">
            Training Session
          </h1>
          <p className="px-4 py-1 text-lg">Player Name</p>
          <form>
            <input
              type="name"
              className="input-bordered input mx-4 block w-[95%] rounded-md bg-white font-semibold text-dark-gray shadow-sm"
              value={playerName}
              onChange={(e) => setPlayerName(e.currentTarget.value)}
              required
            />

            <div className="modal-action py-4">
              <label
                htmlFor="register-modal"
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  resetTrainingModalStates();
                }}
              >
                Cancel
              </label>
              <label
                htmlFor={validName ? "register-modal" : ""}
                className="btn"
                onClick={(e) => {
                  e.preventDefault;
                  handleRegister();
                }}
              >
                Confirm
              </label>
            </div>
          </form>
        </div>
      </div>

      <input type="checkbox" id="request-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative gap-0 bg-white pb-14 pt-10 text-left">
          <label
            htmlFor="request-modal"
            className="btn-ghost btn-sm btn absolute right-2 top-2 text-dark-gray"
          >
            ✕
          </label>
          <h1 className="py-4 px-5 text-2xl font-black uppercase leading-tight tracking-wide text-red underline">
            Error Registering
          </h1>
          <p className="px-4 py-4 text-lg text-dark-gray">
            Please sign in or sign up to register for a training!
          </p>
        </div>
      </div>

      <div className="flex min-h-[82vh] w-full flex-col items-center overflow-x-scroll bg-dark-gray">
        <div className="invisible h-0 md:visible md:h-[60vh] md:w-full">
          <main className="flex h-full w-full justify-center bg-dark-gray">
            <video autoPlay muted loop>
              <source src="/whizkids.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </main>
        </div>

        <section className="w-full bg-white py-8 md:py-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="container mx-auto flex flex-col items-center justify-center space-y-8 p-4 md:p-10 md:px-24 xl:px-48"
          >
            <h1 className="text-center text-4xl font-bold leading-none md:text-6xl">
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
          </motion.div>
        </section>

        <main className="flex w-full flex-col items-center justify-center bg-dark-gray py-10 pb-14">
          <h1 className="p-4 pb-10 text-center text-3xl font-black uppercase leading-none tracking-wide text-white md:text-4xl">
            Training Dates
          </h1>
          {trainings !== undefined && trainings.length > 0 ? (
            <table className="w-[80%] pb-[10vh] capitalize">
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
                {trainings.map((training: TrainingWithSlots, index: number) => {
                  return (
                    <React.Fragment key={index}>
                      {training !== undefined ? (
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
                                    {dateToTimeStringFormatted(
                                      training.dateTime
                                    )}
                                  </p>
                                  <p className="py- px-4 text-lg capitalize">
                                    Price: ${training.price}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light capitalize text-white md:table-cell">
                            {training.location}
                          </td>
                          <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light capitalize text-white md:table-cell">
                            {dateToStringFormatted(training.dateTime)}
                          </td>
                          <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light capitalize text-white md:table-cell">
                            {dateToTimeStringFormatted(training.dateTime)}
                          </td>
                          <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light capitalize text-white md:table-cell">
                            {`$${training.price}`}
                          </td>
                          <td className="whitespace-nowrap py-2 text-center text-sm font-light text-white">
                            <label
                              className="text-md btn self-center rounded-lg rounded border-none bg-gradient-to-r from-red to-secondary-red font-black uppercase tracking-wide text-white
                            transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer"
                              htmlFor={
                                !isAdmin
                                  ? isSignedIn
                                    ? "register-modal"
                                    : "request-modal"
                                  : ""
                              }
                              onClick={() => setTargetTrainingId(training.id)}
                            >
                              Register
                            </label>
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <>
              <span className="text-md w-[50%] text-center font-semibold text-white md:px-5 md:text-xl">
                <div className="divider before:bg-light-gray after:bg-light-gray"></div>
                There are currently no listed trainings,{" "}
                <br className="hidden md:block" />
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
