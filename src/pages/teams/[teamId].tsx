import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import { useState } from "react";
import MainLayout from "../../layouts/MainLayout";

import type { NextPageWithLayout } from "../_app";
import { mockdataTeam } from "../../components/navbar";
import React from "react";
import { IconInfoCircle } from "@tabler/icons";

interface Props {
  teamId: number;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const teamId = context.params?.teamId as unknown as number;

  return {
    props: {
      teamId,
    },
  };
};

const TeamPage: NextPageWithLayout<Props> = ({ teamId }) => {
  const cardData: Array<{
    Name: string;
    "Position(s)": string;
    "High School": string;
    "Graduation Year": string;
  }> = [];
  for (let i = 0; i < 15; i++) {
    cardData.push({
      Name: "John Smith",
      "Position(s)": "Position 1, Position 2",
      "High School": "Abraham Lincoln High School",
      "Graduation Year": "2021",
    });
  }

  const mockPractices = [
    {
      weekday: "Mon, Wed, Fri",
      start: "6pm",
      end: "8pm",
      location: "Lasalle College High School",
    },
    {
      weekday: "Sat, Sun",
      start: "6pm",
      end: "8pm",
      location: "Lasalle College High School",
    },
    {
      weekday: "Sat, Sun",
      start: "6pm",
      end: "8pm",
      location: "Lasalle College High School",
    },
  ];

  const mockTournamnets = [
    {
      name: "Diamond Nation",
      date: "June 16th",
      type: "Tournament",
      location: "1234 Drive",
    },
    {
      name: "Diamond Nation",
      date: "June 16th",
      type: "Showcase",
      location: "1234 Drive",
    },
    {
      name: "Diamond Nation",
      date: "June 16th",
      type: "Tournament",
      location: "1234 Drive",
    },
    {
      name: "Diamond Nation",
      date: "June 16th",
      type: "Tournament",
      location: "1234 Drive",
    },
    {
      name: "Diamond Nation",
      date: "June 16th",
      type: "Tournament",
      location: "1234 Drive",
    },
    {
      name: "Diamond Nation",
      date: "June 16th",
      type: "Showcase",
      location: "1234 Drive",
    },
    {
      name: "Diamond Nation",
      date: "June 16th",
      type: "Tournament",
      location: "1234 Drive",
    },
    {
      name: "Diamond Nation",
      date: "June 16th",
      type: "Showcase",
      location: "1234 Drive",
    },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const teamName = <>{mockdataTeam[teamId]?.title}</>;

  return (
    <>
      <main className="flex w-full flex-col items-center overflow-hidden">
        <div className="inline-flex w-full items-center justify-center bg-dark-gray py-12">
          <h1 className="text-center text-2xl font-extrabold uppercase tracking-wide text-white md:min-w-max lg:text-4xl lg:text-6xl">
            {teamName}
          </h1>
        </div>

        <div className="flex w-full justify-center py-[4vh]">
          <div className="flex items-center text-dark-gray">
            <button
              className={
                activeTab == 0
                  ? "border-b-4 border-red px-5 py-1 text-dark-gray"
                  : "border-b-4 border-light-gray px-5 py-1"
              }
              onClick={() => setActiveTab(0)}
            >
              Tournament Schedule
            </button>
            <button
              className={
                activeTab == 1
                  ? "border-b-4 border-red px-5 py-1 text-dark-gray"
                  : "border-b-4 border-light-gray px-5 py-1"
              }
              onClick={() => setActiveTab(1)}
            >
              Practice Schedule
            </button>
            <button
              className={
                activeTab == 2
                  ? "border-b-4 border-red px-5 py-1 text-dark-gray"
                  : "border-b-4 border-light-gray px-5 py-1"
              }
              onClick={() => setActiveTab(2)}
            >
              Team Roster
            </button>
          </div>
        </div>
        <section>
          {activeTab == 0 ? (
            <>
              <section className="w-full pb-20">
                <h1 className="p-4 text-center text-3xl font-black uppercase leading-none tracking-wide text-dark-gray md:text-4xl">
                  Tournament Schedule
                </h1>
                <table className="w-full table-auto">
                  <thead>
                    <tr className="w-full">
                      <th className="text-md px-5 font-black text-red md:text-xl">
                        Name
                      </th>
                      <th className="text-md hidden px-5 font-black text-red md:table-cell md:text-xl">
                        Location
                      </th>
                      <th className="text-md hidden px-5 font-black text-red md:table-cell md:text-xl">
                        Date
                      </th>
                      <th className="text-md px-5 font-black text-red md:text-xl">
                        Format
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {mockTournamnets?.map((tournamentData, index) => {
                      return (
                        <React.Fragment key={index}>
                          <tr
                            className="border-y border-light-gray text-dark-gray"
                            key={`tryout${index}`}
                          >
                            <td className="py-2 text-center text-sm font-medium text-dark-gray">
                              <div className="flex flex-row items-center justify-center">
                                <span className="px-2 py-4">
                                  {tournamentData.name}
                                </span>
                                <button className="bg-transparent"></button>

                                <label htmlFor="modal">
                                  <IconInfoCircle className="mx-2 text-dark-gray transition duration-300 ease-in-out hover:text-red md:hidden" />
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
                                      className="btn-ghost btn-sm btn absolute right-2 top-2 text-white"
                                    >
                                      ✕
                                    </label>
                                    <h1 className="py-4 px-5 font-black uppercase leading-tight tracking-wide text-red">
                                      {tournamentData.name}
                                    </h1>
                                    <p className="px-4 py-4 text-lg text-white">
                                      Location: {tournamentData.location}
                                    </p>
                                    <p className="px-4 py-4 text-lg text-white">
                                      Date: {tournamentData.date}
                                    </p>
                                    <p className="px-4 py-4 text-lg text-white">
                                      Time: {tournamentData.type}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="hidden whitespace-nowrap py-6 text-center text-sm font-light text-dark-gray md:table-cell">
                              {tournamentData.location}
                            </td>
                            <td className="hidden whitespace-nowrap py-6 text-center text-sm font-light text-dark-gray md:table-cell">
                              {tournamentData.date}
                            </td>
                            <td className="whitespace-nowrap py-6 text-center text-sm font-light text-dark-gray">
                              {tournamentData.type}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </section>
            </>
          ) : (
            <></>
          )}
          {activeTab == 1 ? (
            <>
              <section className="w-full pb-20">
                <h1 className="p-4 text-center text-3xl font-black uppercase leading-none tracking-wide text-dark-gray md:text-4xl">
                  Practice Schedule
                </h1>
                <table className="w-full table-auto pb-10">
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
                    {mockPractices?.map((practiceData, index) => {
                      return (
                        <React.Fragment key={index}>
                          <tr
                            className="border-y border-light-gray text-dark-gray"
                            key={`tryout${index}`}
                          >
                            <td className="whitespace-nowrap py-8 text-center text-base font-light text-dark-gray md:text-lg">
                              {practiceData.weekday}
                            </td>
                            <td className="whitespace-nowrap py-8 text-center text-base font-light text-dark-gray md:text-lg">
                              {practiceData.start}
                            </td>
                            <td className="whitespace-nowrap py-8 text-center text-base font-light text-dark-gray md:text-lg">
                              {practiceData.end}
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </section>
            </>
          ) : (
            <></>
          )}
          {activeTab == 2 ? (
            <>
              <section className="w-full pb-20">
                <h1 className="p-4 text-center text-3xl font-black uppercase leading-none tracking-wide text-dark-gray md:text-4xl">
                  Team Roster
                </h1>
                <div className="mx-auto flex w-full max-w-7xl flex-wrap place-content-center gap-5 pb-10">
                  {cardData.map((data, index) => (
                    <div
                      className="card w-96 bg-dark-gray shadow-xl"
                      key={`entry${index}`}
                    >
                      <div className="card-body">
                        {Object.entries(data).map(([key, val], cardIndex) => {
                          return (
                            <div key={`card${cardIndex}`}>
                              <span className="text-sm font-black uppercase text-red">
                                {key}:
                              </span>
                              <span className="text-sm text-dark-gray text-white">
                                {" "}
                                {val}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : (
            <></>
          )}
        </section>
      </main>
      <div className="w-full bg-dark-gray">
        <div className="container mx-auto flex flex-col flex-wrap content-center justify-center p-4 py-20 md:p-10">
          <h1 className="text-center text-5xl font-semibold leading-none text-white antialiased">
            Get Our Updates
          </h1>
          <p className="pt-2 pb-8 text-center text-xl text-light-gray antialiased">
            Find out about events and other news
          </p>
          <div className="flex flex-row">
            <input
              type="text"
              placeholder="example@email.com"
              className="w-3/5 rounded-l-lg bg-white p-3 sm:w-2/3"
            />
            <button
              type="button"
              className="w-2/5 rounded-r-lg bg-red p-3 font-semibold text-white sm:w-1/3"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

TeamPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default TeamPage;
