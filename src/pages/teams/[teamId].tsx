import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import NewsletterSignUp from "../../components/newsletterSignUp";

import type { NextPageWithLayout } from "../_app";

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
  console.log(teamId);

  const cardData: Array<{
    Name: string;
    "Position(s)": string;
    "High School": string;
    "Graduation Year": string;
  }> = [];
  for (let i = 0; i < 25; i++) {
    cardData.push({
      Name: "John Smith",
      "Position(s)": "Position 1, Position 2, Position 3 Position 4",
      "High School":
        "Abraham Lincoln High School LONG NAMEN digbsd igbasdiugabe giuadbfiuasb",
      "Graduation Year": "YYYY",
    });
  }

  const mockPractices = [
    { weekday: "Mon, Wed, Fri", start: "6pm", end: "8pm" },
    { weekday: "Sat, Sun", start: "6pm", end: "8pm" },
    { weekday: "Sat, Sun", start: "6pm", end: "8pm" },
  ];
  const mockTournamnets = [
    { weekday: "Mon, Wed, Fri", start: "6pm", end: "8pm" },
    { weekday: "Sat, Sun", start: "6pm", end: "8pm" },
    { weekday: "Mon, Wed, Fri", start: "6pm", end: "8pm" },
    { weekday: "Sat, Sun", start: "6pm", end: "8pm" },
    { weekday: "Mon, Wed, Fri", start: "6pm", end: "8pm" },
    { weekday: "Sat, Sun", start: "6pm", end: "8pm" },
    { weekday: "Mon, Wed, Fri", start: "6pm", end: "8pm" },
    { weekday: "Sat, Sun", start: "6pm", end: "8pm" },
  ];

  const practiceRows = mockPractices.map((data, index) => (
    <tr key={index} className="border-b border-dark-gray hover:bg-gray-200">
      <td className="whitespace-nowrap py-2 text-center text-sm font-medium text-dark-gray">
        {data.weekday}
      </td>
      <td className="whitespace-nowrap py-2 text-center text-sm font-light text-dark-gray">
        {data.start}
      </td>
      <td className="whitespace-nowrap py-2 text-center text-sm font-light text-dark-gray">
        {data.end}
      </td>
      <td className="py-2 text-center text-sm  text-dark-gray">
        asofbaobaoabdsgkjakd sjsajkdbgsdkjgbsdkjgbsdkj
      </td>
    </tr>
  ));

  const tournamentRows = mockTournamnets.map((data, index) => (
    <tr key={index} className="border-b border-dark-gray hover:bg-gray-200">
      <td className="whitespace-nowrap py-2 text-center text-sm text-dark-gray">
        {data.weekday}
      </td>
      <td className="whitespace-nowrap  py-2 text-center text-sm text-dark-gray">
        {data.start}
      </td>
      <td className="whitespace-nowrap py-2 text-center text-sm  text-dark-gray">
        {data.end}
      </td>
      <td className="py-2 text-center text-sm  text-dark-gray">
        asofbaob aoabdsgk jakdsjsaj kdbgsdkjgbsdkjgbm sdkj
      </td>
    </tr>
  ));

  const cards = cardData.map((data, index) => (
    <div
      key={index}
      className="rounded-md bg-light-gray p-3 hover:scale-105 hover:bg-red lg:w-[45%] xl:w-[30%]"
    >
      <table className="w-full table-auto space-x-2 text-sm text-white">
        {Object.entries(data).map(([key, val]) => {
          return (
            <tr key={index + key}>
              <td className="whitespace-nowrap py-1 align-text-top font-bold">
                {key}:
              </td>
              <td className="justify-start py-1 align-text-top font-semibold">
                {val}
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  ));

  return (
    <>
      <main className="flex flex-col items-center">
        <div className="mt-36 w-full px-1 sm:mt-28 sm:px-5 lg:mx-auto lg:max-w-7xl">
          <div className="inline-flex w-full items-center justify-center">
            <hr className="mt-8 h-[0.175rem] w-full -translate-y-4 border-0 bg-red md:h-1" />
            <span className="absolute left-1/2 -translate-x-1/2 bg-white text-center text-3xl font-extrabold uppercase text-dark-gray md:px-2 lg:text-4xl">
              {teamId} : Whiz Kids National Team
            </span>
          </div>
        </div>
      </main>

      <main>
        <div className="pt-16 pb-5 text-center text-3xl font-extrabold uppercase tracking-tight text-dark-gray">
          Practices and Tournaments
        </div>

        <div className="flex flex-col md:place-content-center md:px-5 xl:flex-row xl:space-x-10">
          <div className="flex overflow-x-auto  md:place-content-center">
            <table className=" h-auto w-full table-auto">
              <thead className="border-b border-dark-gray">
                <tr className="border-b border-dark-gray">
                  <th
                    colSpan={4}
                    className="py-2 text-xl font-extrabold uppercase tracking-tight text-dark-gray sm:text-2xl"
                  >
                    Our Tournament Schedule
                  </th>
                </tr>
                <tr>
                  <th className="text-md py-2 px-4 font-bold text-red">
                    Tournament
                  </th>
                  <th className="text-md py-2 px-4 font-bold text-red">
                    Dates
                  </th>
                  <th className="text-md py-2 px-4 font-bold text-red">
                    Style
                  </th>
                  <th className="text-md py-2 px-4 font-bold text-red">
                    Location
                  </th>
                </tr>
              </thead>
              <tbody>{tournamentRows}</tbody>
            </table>
          </div>

          <div className="flex flex-col">
            <div className="top-0 mb-10 flex overflow-x-auto md:place-content-center ">
              <table className="h-auto w-full table-auto">
                <thead className="border-b border-dark-gray">
                  <tr className="border-b border-dark-gray">
                    <th
                      colSpan={4}
                      className="py-2 text-xl font-extrabold uppercase tracking-tight text-dark-gray sm:text-2xl"
                    >
                      Our Practice Schedule
                    </th>
                  </tr>
                  <tr>
                    <th className="text-md py-2 px-4 font-bold text-red">
                      Days Of the Week
                    </th>
                    <th className="text-md py-2 px-4 font-bold text-red">
                      Start Time
                    </th>
                    <th className="text-md py-2 px-4 font-bold text-red">
                      End Time
                    </th>
                    <th className="text-md py-2 px-4 font-bold text-red">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody>{practiceRows}</tbody>
              </table>
            </div>
            <NewsletterSignUp teamId={teamId} teamName={"Sample Team Name"} />{" "}
            {/* TODO: Change this */}
          </div>
        </div>
      </main>

      <main>
        <div className="pt-12 text-center text-3xl font-extrabold uppercase tracking-tight text-dark-gray">
          Our Roster
        </div>

        <div className="mx-auto flex w-full max-w-7xl flex-wrap place-content-center gap-5 py-5 px-5">
          {cards}
        </div>
      </main>
    </>
  );
};

TeamPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default TeamPage;
