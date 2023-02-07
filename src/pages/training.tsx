import MainLayout from "../layouts/MainLayout";
import type { ReactElement } from "react";

import type { NextPageWithLayout } from "./_app";
import React from "react";
import { Modal } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import { useDisclosure } from "@mantine/hooks";

interface TrainingData {
  training: string;
  location: string;
  date: string;
  time: string;
  price: number;
}

const Training: NextPageWithLayout = () => {
  const [openModal, { toggle: toggleModal, close: closeModal }] =
    useDisclosure(false);

  const mockdata: TrainingData[] = [
    {
      training: "Catchers",
      location: "Steelyard",
      date: "10/24/2023",
      time: "7:00PM",
      price: 400,
    },
    {
      training: "Catchers",
      location: "Steelyard",
      date: "10/24/2023",
      time: "7:00PM",
      price: 400,
    },
    {
      training: "Catchers",
      location: "Steelyard",
      date: "10/24/2023",
      time: "7:00PM",
      price: 400,
    },
    {
      training: "Catchers",
      location: "Steelyard",
      date: "10/24/2023",
      time: "7:00PM",
      price: 400,
    },
    {
      training: "Catchers",
      location: "Steelyard",
      date: "10/24/2023",
      time: "7:00PM",
      price: 400,
    },
  ];

  return (
    <>
      <div className="flex w-full flex-col items-center bg-dark-gray">
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

        <main className="w-full bg-white py-12">
          <div className="inline-flex w-full items-center justify-center">
            <hr className="mt-8 h-1 w-[75%] -translate-y-4 border-0 bg-red" />
            <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-white">
              <h1 className="text-3xl font-extrabold uppercase tracking-wide text-dark-gray md:text-6xl">
                Training
              </h1>
            </span>
          </div>

          <h5 className="mx-5 flex justify-center pt-[2vh] text-center text-base font-black uppercase tracking-wide text-light-gray">
            Level up your game by attending one of our trainings
          </h5>

          <h6 className="mx-[15%] flex justify-center pt-[4vh] text-center text-base text-dark-gray">
            Put a blurb about what training is and differentiate it from what
            practices are Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Dolorem voluptate officia excepturi voluptatibus id
            blanditiis? Molestias adipisci tenetur ex blanditiis! Laudantium
            dolores ipsa est accusantium ut velit molestiae, cupiditate odit.
          </h6>
        </main>

        <main className="flex w-full items-center bg-dark-gray py-[8vh]">
          <table className="mx-[10%] w-full table-auto pb-[10vh]">
            <thead>
              <tr className="w-full">
                <th className="py-2 px-5 text-base font-black text-red">
                  Training Session
                </th>
                <th className="hidden py-2 px-5 text-base font-black text-red md:table-cell">
                  Location
                </th>
                <th className="hidden py-2 px-5 text-base font-black text-red md:table-cell">
                  Dates
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
              {mockdata?.map((trainingInfo: TrainingData, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr className="border-y border-light-gray">
                      <td className="whitespace-nowrap py-2 text-center text-sm font-medium text-white">
                        <div className="flex flex-row justify-center">
                          {trainingInfo.training}
                          <button
                            onClick={toggleModal}
                            className="bg-transparent"
                          >
                            <IconInfoCircle className="mx-2 text-white transition duration-300 ease-in-out hover:text-red md:hidden" />
                          </button>

                          <Modal
                            opened={openModal}
                            onClose={closeModal}
                            className="text-xl font-black tracking-wide text-dark-gray md:hidden"
                            centered
                            title={trainingInfo.training}
                            withCloseButton={false}
                            transition="fade"
                            transitionDuration={300}
                            exitTransitionDuration={300}
                          >
                            <div className="flex-col text-lg font-medium text-dark-gray">
                              <div>
                                <span className="font-black text-red">
                                  Location:{" "}
                                </span>
                                {trainingInfo.location}
                              </div>
                              <div>
                                <span className="font-black text-red">
                                  Date:{" "}
                                </span>
                                {trainingInfo.date}
                              </div>
                              <div>
                                <span className="font-black text-red">
                                  Time:{" "}
                                </span>
                                {trainingInfo.time}
                              </div>
                              <div>
                                <span className="font-black text-red">
                                  Price:{" "}
                                </span>
                                {`$${trainingInfo.price}`}
                              </div>
                              <div className="flex justify-center py-5">
                                <button
                                  className="mx-3 rounded-lg bg-gradient-to-r from-red to-secondary-red p-3
                                  transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                                >
                                  Register
                                </button>
                                <button
                                  className="mx-3 rounded-lg bg-light-gray p-3 text-white
                                  transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-dark-gray"
                                  onClick={toggleModal}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </Modal>
                        </div>
                      </td>
                      <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light text-white md:table-cell">
                        {trainingInfo.location}
                      </td>
                      <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light text-white md:table-cell">
                        {trainingInfo.date}
                      </td>
                      <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light text-white md:table-cell">
                        {trainingInfo.time}
                      </td>
                      <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light text-white md:table-cell">
                        {`$${trainingInfo.price}`}
                      </td>
                      <td className="whitespace-nowrap py-2 text-center text-sm font-light text-white">
                        <button
                          className="mx-3 rounded-lg bg-gradient-to-r from-red to-secondary-red p-4
                        transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
                        >
                          Register
                        </button>
                      </td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
};

Training.getLayout = (page: ReactElement) => {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default Training;
