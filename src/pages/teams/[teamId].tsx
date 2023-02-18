import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import MainLayout from "../../layouts/MainLayout";
import NewsletterSignUp from "../../components/newsletterSignUp";
import { IconInfoCircle } from "@tabler/icons";

import type { NextPageWithLayout } from "../_app";
import { mockdataTeam } from "../../components/navbar";
import PracticeModal from "../../components/practiceModal";
import TournamentModal from "../../components/tournamentModal";

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


  const practiceRows = mockPractices.map((data, index) => (
    <tr
      key={`practiceRow${index}`}
      className="border-b border-light-gray transition duration-200 ease-in-out hover:bg-light-gray"
    >
      <td className="my-2 flex flex-row whitespace-nowrap py-2 text-center text-sm font-medium text-dark-gray">
        <div className="flex w-[70%] justify-center md:w-full">
          {data.weekday}
        </div>

        <label
          htmlFor={`practiceModal-${index}`}
          className="bg-transparent"
        >
          <IconInfoCircle className="mx-2 text-dark-gray transition duration-300 ease-in-out hover:text-red md:hidden" />
        </label>
        <PracticeModal
          modalId={`practiceModal-${index}`}
          title={`${data.weekday} Practice`}
          location={data.location}
          startTime={data.start}
          endTime={data.end}
        />
      </td>

      <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light text-dark-gray md:table-cell">
        {data.start}
      </td>
      <td className="hidden whitespace-nowrap py-2 text-center text-sm font-light text-dark-gray md:table-cell">
        {data.end}
      </td>
      <td className="hidden py-2 text-center text-sm text-dark-gray md:table-cell">
        {data.location}
      </td>
    </tr>
  ));

  const tournamentRows = mockTournamnets.map((data, index) => (
    <tr
      key={`tournamentRow${index}`}
      className="border-b border-light-gray transition duration-200 ease-in-out hover:bg-light-gray"
    >
      <td className="my-2 flex flex-row whitespace-nowrap py-2 text-center text-sm font-medium text-dark-gray">
        <div className="flex w-[70%] justify-center md:w-full">{data.name}</div>

        <label htmlFor={`tournamentModal-${index}`} className="bg-transparent">
          <IconInfoCircle className="mx-2 text-dark-gray transition duration-300 ease-in-out hover:text-red md:hidden" />
        </label>

        <TournamentModal
          modalId={`tournamentModal-${index}`}
          tournamentName={data.name}
          location={data.location}
          date={data.date}
          type={data.type}
        />
      </td>

      <td className="hidden  whitespace-nowrap py-2 text-center text-sm text-dark-gray md:table-cell">
        {data.date}
      </td>
      <td className="hidden whitespace-nowrap py-2 text-center text-sm text-dark-gray md:table-cell">
        {data.location}
      </td>
      <td className="hidden py-2 text-center text-sm text-dark-gray md:table-cell">
        {data.type}
      </td>
    </tr>
  ));

  const teamName = <>{mockdataTeam[teamId]?.title}</>;

  return (
    <>
      <main className="flex w-full flex-col items-center">
        <div className="inline-flex w-full items-center justify-center bg-dark-gray py-12">
          <hr className="mt-8 h-1 w-[75%] -translate-y-4 border-0 bg-red" />
          <span className="absolute left-1/2  w-auto -translate-x-1/2 bg-dark-gray px-3">
            <h1 className="text-center text-2xl font-extrabold uppercase tracking-wide text-white md:min-w-max lg:text-4xl lg:text-6xl">
              {teamName}
            </h1>
          </span>
        </div>

        <div className="flex w-full justify-center py-[4vh]">
          <div className="mx-10 flex w-full flex-col md:place-content-center md:px-5 lg:flex-row lg:space-x-10 ">
            <div className="flex flex-col items-center overflow-x-hidden pb-10 lg:w-1/2">
              <table className="h-auto w-full table-auto">
                <thead className="border-b border-light-gray">
                  <tr className="border-b border-light-gray">
                    <th colSpan={4} className="py-2 text-dark-gray sm:text-2xl">
                      Tournament Schedule
                    </th>
                  </tr>
                  <tr>
                    <th className="py-2 px-4 text-sm font-black uppercase tracking-wide text-red">
                      Tournament
                    </th>
                    <th className="hidden py-2 px-4 text-sm font-black uppercase tracking-wide text-red md:table-cell">
                      Date(s)
                    </th>
                    <th className="hidden py-2 px-4 text-sm font-black uppercase tracking-wide text-red md:table-cell">
                      Location
                    </th>
                    <th className="hidden py-2 px-4 text-sm font-black uppercase tracking-wide text-red md:table-cell">
                      Type
                    </th>
                  </tr>
                </thead>
                <tbody>{tournamentRows}</tbody>
              </table>
            </div>

            <div className="flex flex-col items-center lg:w-1/2">
              <div className="top-0 mb-8 flex w-full overflow-x-hidden md:place-content-center">
                <table className="h-auto w-full table-auto">
                  <thead className="border-b border-light-gray">
                    <tr className="border-b border-light-gray">
                      <th
                        colSpan={4}
                        className="py-2 text-dark-gray sm:text-2xl"
                      >
                        Practice Schedule
                      </th>
                    </tr>
                    <tr>
                      <th className="py-2 px-4 text-sm font-black uppercase tracking-wide text-red">
                        Days Of the Week
                      </th>
                      <th className="hidden py-2 px-4 text-sm font-black uppercase tracking-wide text-red md:table-cell">
                        Start Time
                      </th>
                      <th className="hidden py-2 px-4 text-sm font-black uppercase tracking-wide text-red md:table-cell">
                        End Time
                      </th>
                      <th className="hidden py-2 px-4 text-sm font-black uppercase tracking-wide text-red md:table-cell">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody>{practiceRows}</tbody>
                </table>
              </div>

              <div className="hidden justify-center rounded-xl bg-light-gray py-[3vh] px-[3vh] md:flex lg:px-[6vh] xl:w-4/5">
                <NewsletterSignUp
                  teamId={teamId}
                  teamName={"Sample Team Name"}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <main className="w-full bg-dark-gray">
        <div className="mx-auto w-[70%] bg-dark-gray pt-[5vh]">
          <div className="inline-flex w-full items-center justify-center">
            <hr className="mt-8 hidden h-1 w-2/3 -translate-y-4 border-0 bg-red sm:inline" />
            <span className="absolute left-1/2 -translate-x-1/2 bg-dark-gray px-3 text-white">
              <h1 className="text-2xl font-extrabold uppercase tracking-wide text-white lg:text-3xl">
                Roster
              </h1>
            </span>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-wrap place-content-center gap-5 py-[5vh] px-5">
          {cardData.map((data, index) => (
            <main
              key={`player${index}`}
              className="group lg:w-[45%] lg:w-[30%]"
            >
              <div
                className="rounded-md bg-white p-3 transition duration-300
                  ease-in-out group-hover:scale-[110%] group-hover:bg-red"
              >
                <div className="group">
                  {Object.entries(data).map(([key, val], cardIndex) => {
                    return (
                      <div key={`card${cardIndex}`}>
                        <span className="text-sm font-black uppercase text-red group-hover:text-white">
                          {key}:
                        </span>
                        <span className="text-sm text-dark-gray"> {val}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </main>
          ))}
        </div>
      </main>
    </>
  );
};

TeamPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default TeamPage;
