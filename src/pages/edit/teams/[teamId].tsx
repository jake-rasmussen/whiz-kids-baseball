import type { GetServerSideProps } from "next";
import { ReactElement, useState } from "react";

import Table from "../../../components/edit/Table";
import EditLayout from "../../../layouts/editLayout";
import { NextPageWithLayout } from "../../_app";

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

const TeamPage: NextPageWithLayout<Props> = ({ teamId }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="w-full">
        <main className="flex min-h-screen min-w-full flex-col items-center">
          <nav className="flex w-full justify-center py-[4vh]">
            <div className="flex items-center text-dark-gray">
              <button
                className={
                  activeTab == 0
                    ? "border-b-4 border-red px-5 py-1 text-dark-gray"
                    : "border-b-4 border-light-gray px-5 py-1 text-light-gray transition duration-500 ease-in-out hover:text-red"
                }
                onClick={() => setActiveTab(0)}
              >
                Tournament Schedule
              </button>
              <button
                className={
                  activeTab == 1
                    ? "border-b-4 border-red px-5 py-1 text-dark-gray"
                    : "border-b-4 border-light-gray px-5 py-1 text-light-gray transition duration-500 ease-in-out hover:text-red"
                }
                onClick={() => setActiveTab(1)}
              >
                Practice Schedule
              </button>
              <button
                className={
                  activeTab == 2
                    ? "border-b-4 border-red px-5 py-1 text-dark-gray"
                    : "border-b-4 border-light-gray px-5 py-1 text-light-gray transition duration-500 ease-in-out hover:text-red"
                }
                onClick={() => setActiveTab(2)}
              >
                Team Roster
              </button>
            </div>
          </nav>

          <section className="flex w-full flex-grow flex-col items-center justify-start overflow-x-scroll">
            {activeTab === 0 ? (
              <Table name={"tournaments"} entries={mockTournamnets}></Table>
            ) : (
              <></>
            )}
            {activeTab === 1 ? (
              <Table name={"practices"} entries={mockPractices}></Table>
            ) : (
              <></>
            )}
            <button className="btn-outline btn-error btn flex flex-shrink">
              Save
            </button>
          </section>
        </main>
      </div>
    </>
  );
};

TeamPage.getLayout = (page: ReactElement) => {
  return (
    <>
      <EditLayout>{page}</EditLayout>
    </>
  );
};

export default TeamPage;
