import type { GetServerSideProps } from "next";
import { useState } from "react";

import { type NextPage } from "next";
import Table from "../../../components/edit/Table";

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

export const mockTournamnets = [
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

const TeamPage: NextPage<Props> = ({ teamId }) => {
  const [tab, setTab] = useState("tournaments");

  const tournamentRows = mockTournamnets.map((data, index) => (
    <tr
      key={`tournamentRow${index}`}
      className="transition duration-200 ease-in-out"
    >
      <td className="hidden bg-white text-center text-sm text-dark-gray md:table-cell">
        <input
          type="text"
          placeholder={data.name}
          className="input-ghost input w-full max-w-xs"
        />
      </td>
      <td className="hidden bg-white text-center text-sm text-dark-gray md:table-cell">
        <input
          type="text"
          placeholder={data.date}
          className="input-ghost input w-full max-w-xs"
        />
      </td>
      <td className="hidden bg-white text-center text-sm text-dark-gray md:table-cell">
        <input
          type="text"
          placeholder={data.location}
          className="input-ghost input w-full max-w-xs"
        />
      </td>
      <td className="hidden bg-white text-center text-sm text-dark-gray md:table-cell">
        <input
          type="text"
          placeholder={data.type}
          className="input-ghost input w-full max-w-xs"
        />
      </td>
    </tr>
  ));

  return (
    <>
      <div className="w-full bg-dark-gray">
        <main className="flex min-h-screen min-w-full flex-col items-center justify-center gap-12">
          <div className="tabs">
            <a
              className={
                tab === "tournaments"
                  ? "tab tab-bordered tab-active"
                  : "tab tab-bordered"
              }
              onClick={() => setTab("tournaments")}
            >
              Tournaments
            </a>
            <a
              className={
                tab === "practices"
                  ? "tab tab-bordered tab-active"
                  : "tab tab-bordered"
              }
              onClick={() => setTab("practices")}
            >
              Practices
            </a>
            <a
              className={
                tab === "roster"
                  ? "tab tab-bordered tab-active"
                  : "tab tab-bordered"
              }
              onClick={() => setTab("roster")}
            >
              Roster
            </a>
          </div>

          {tab === "tournaments" ? (
            <Table name={"tournaments"} entries={mockTournamnets}></Table>
          ) : (
            <></>
          )}
          {tab === "practices" ? (
            <Table name={"practices"} entries={mockPractices}></Table>
          ) : (
            <></>
          )}

          <button className="btn-outline btn-error btn">Save</button>
        </main>
      </div>
    </>
  );
};

export default TeamPage;
