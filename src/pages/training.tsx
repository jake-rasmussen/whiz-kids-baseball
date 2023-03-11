import MainLayout from "../layouts/MainLayout";
import type { NextPageWithLayout } from "./_app";
import { IconInfoCircle } from "@tabler/icons";
import type { ReactElement } from "react";
import React from "react";

interface TrainingData {
  training: string;
  location: string;
  date: string;
  time: string;
  price: number;
}

const Training: NextPageWithLayout = () => {
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
        <div className=" h-0 md:visible md:h-[60vh] md:w-full invisible">
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
                    <tr className="  border-y border-light-gray">
                      <td className="py-2 text-center text-sm font-medium text-white">
                        <div className="flex flex-row justify-center">
                          {trainingInfo.training}
                          <button className="bg-transparent"></button>

                          <label htmlFor="modal">
                            <IconInfoCircle className="mx-2 text-white transition duration-300 ease-in-out hover:text-red md:hidden" />
                          </label>

                          <input
                            type="checkbox"
                            id="modal"
                            className="modal-toggle"
                          />
                          <div className="modal">
                            <div className="modal-box relative bg-dark-gray text-left">
                              <label
                                htmlFor="modal"
                                className="btn-ghost btn-sm btn absolute right-2 top-2"
                              >
                                ✕
                              </label>
                              <h1 className="py-4 px-5 font-black uppercase leading-tight tracking-wide text-red">
                                Training Session
                              </h1>
                              <p className="px-4 py-1 text-lg">
                                Location: {trainingInfo.location}
                              </p>
                              <p className="px-4 py-1 text-lg">
                                Date: {trainingInfo.date}
                              </p>
                              <p className="px-4 py-1 text-lg">
                                Time: {trainingInfo.time}
                              </p>
                              <p className="py- px-4 text-lg">
                                Price: ${trainingInfo.price}
                              </p>
                            </div>
                          </div>
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
                          className="text-md btn self-center rounded-lg rounded border-none bg-gradient-to-r from-red to-secondary-red font-black uppercase tracking-wide text-white
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
