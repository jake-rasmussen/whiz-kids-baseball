import MainLayout from "../../layouts/mainLayout";
import type { NextPageWithLayout } from "./../_app";
import { IconInfoCircle } from "@tabler/icons";
import type { ReactElement } from "react";
import { useState } from "react";
import React from "react";
import { api } from "../../utils/api";
import Error from "next/error";
import Loading from "../../components/LoadingPage";
import {
  dateToStringFormatted,
  dateToTimeStringFormatted,
} from "../../utils/helpers";
import { Toaster, toast } from "react-hot-toast";

const Trainings: NextPageWithLayout = () => {
  const [wait, setWait] = useState(false);

  const {
    data: trainings,
    isLoading: isLoadingTrainings,
    isError,
    error,
  } = api.training.getTrainingsForUserId.useQuery();

  const queryClient = api.useContext();

  const unregisterSelf = api.training.unregisterFromTrainingAsUser.useMutation({
    onMutate() {
      setWait(true);
      toast.loading("Unregistering You...");
    },
    onSuccess() {
      queryClient.training.getTrainingsForUserId.invalidate();

      setWait(false);

      toast.dismiss();
      toast.success("You've Successfully Unregistered!");
    },
    onError() {
      toast.dismiss();
      toast.error("Error, Please Try Again Later");
    },
  });

  if (isLoadingTrainings) {
    return <Loading />;
  } else if (isError) {
    return <Error statusCode={error.data?.httpStatus || 500} />;
  }

  const handleUnregisterSelf = (trainingId: string) => {
    if (wait) return;

    unregisterSelf.mutate({
      trainingId,
    });
  };

  return (
    <>
      <Toaster />
      <main className="flex min-h-adjusted w-full flex-col items-center justify-center bg-dark-gray py-10 pb-14">
        <h1 className="p-4 pb-10 text-center text-3xl font-black uppercase leading-none tracking-wide text-white md:text-4xl">
          My Trainings
        </h1>
        {trainings.length > 0 ? (
          <table className="w-[80%] pb-[10%]">
            <thead>
              <tr className="w-full">
                <th className="py-2 px-5 text-base font-black text-red">
                  Training Session
                </th>
                <th className="hidden py-2 px-5 text-base font-black text-red md:table-cell">
                  Player Registered
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
                <th className="py-2 px-2 text-base font-black text-red sm:px-5">
                  Unregister?
                </th>
              </tr>
            </thead>

            <tbody>
              {trainings.map((trainingOnUser: (typeof trainings)[0], index) => {
                return (
                  <React.Fragment key={index}>
                    <tr className="border-y border-light-gray">
                      <td className="py-2 text-center text-sm font-medium capitalize text-white">
                        {trainingOnUser.training?.name}
                      </td>
                      <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light capitalize text-white md:table-cell">
                        {trainingOnUser.playerName}
                      </td>
                      <td className="table-cell py-2 text-sm font-medium text-white md:hidden">
                        <div className="flex flex-row justify-center">
                          <label
                            htmlFor={`modal${index}`}
                            className="hover:cursor-pointer"
                          >
                            <IconInfoCircle className="text-white transition duration-300 ease-in-out hover:cursor-pointer hover:text-red" />
                          </label>

                          <input
                            type="checkbox"
                            id={`modal${index}`}
                            className="modal-toggle"
                          />
                          <div className="modal">
                            <div className="modal-box relative bg-white text-left text-dark-gray shadow-xl">
                              <label
                                htmlFor={`modal${index}`}
                                className="btn-ghost btn-sm btn absolute right-2 top-2 text-2xl"
                              >
                                ✕
                              </label>
                              <h1 className="py-4 pl-4 text-2xl font-black uppercase leading-tight tracking-wide text-red underline">
                                {trainingOnUser.training?.name}
                              </h1>
                              <p className="px-4 py-1 text-lg capitalize">
                                Player: {trainingOnUser.playerName}
                              </p>
                              <p className="px-4 py-1 text-lg capitalize">
                                Location: {trainingOnUser.training?.location}
                              </p>
                              <p className="px-4 py-1 text-lg capitalize">
                                Date:{" "}
                                {dateToStringFormatted(
                                  trainingOnUser.training?.dateTime
                                )}
                              </p>
                              <p className="px-4 py-1 text-lg capitalize">
                                Time:{" "}
                                {dateToTimeStringFormatted(
                                  trainingOnUser.training?.dateTime
                                )}
                              </p>
                              <p className="py- px-4 text-lg capitalize">
                                Price: ${trainingOnUser.training?.price}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light capitalize text-white md:table-cell">
                        {trainingOnUser.training?.location}
                      </td>
                      <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light capitalize text-white md:table-cell">
                        {dateToStringFormatted(
                          trainingOnUser.training?.dateTime
                        )}
                      </td>
                      <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light capitalize text-white md:table-cell">
                        {dateToTimeStringFormatted(
                          trainingOnUser.training?.dateTime
                        )}
                      </td>
                      <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light capitalize text-white md:table-cell">
                        {`$${trainingOnUser.training?.price}`}
                      </td>
                      <td className="whitespace-nowrap py-2 text-center text-sm font-light text-white">
                        <button>
                          <label
                            className="text-md btn self-center rounded-lg rounded border-none bg-gradient-to-r from-red to-secondary-red font-black uppercase tracking-wide text-white
                            transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer"
                            onClick={() =>
                              handleUnregisterSelf(trainingOnUser.trainingId)
                            }
                          >
                            Leave
                          </label>
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        ) : (
          <>
            <span className="text-md w-[80%] px-5 text-center font-semibold text-white md:w-[50%] md:text-xl">
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
