import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import NewsletterSignUp from "../../components/newsletterSignUp";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconInfoCircle } from "@tabler/icons";

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
      "Graduation Year": "YYYY",
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
      weekday: "Mon, Wed, Fri",
      start: "6pm",
      end: "8pm",
      location: "1234 Drive",
    },
    {
      name: "Diamond Nation",
      weekday: "Mon, Wed, Fri",
      start: "6pm",
      end: "8pm",
      location: "1234 Drive",
    },
    {
      name: "Diamond Nation",
      weekday: "Mon, Wed, Fri",
      start: "6pm",
      end: "8pm",
      location: "1234 Drive",
    },
    {
      name: "Diamond Nation",
      weekday: "Mon, Wed, Fri",
      start: "6pm",
      end: "8pm",
      location: "1234 Drive",
    },
    {
      name: "Diamond Nation",
      weekday: "Mon, Wed, Fri",
      start: "6pm",
      end: "8pm",
      location: "1234 Drive",
    },
    {
      name: "Diamond Nation",
      weekday: "Mon, Wed, Fri",
      start: "6pm",
      end: "8pm",
      location: "1234 Drive",
    },
    {
      name: "Diamond Nation",
      weekday: "Mon, Wed, Fri",
      start: "6pm",
      end: "8pm",
      location: "1234 Drive",
    },
    {
      name: "Diamond Nation",
      weekday: "Mon, Wed, Fri",
      start: "6pm",
      end: "8pm",
      location: "1234 Drive",
    },
  ];

  const [
    openPracticeModal,
    { toggle: togglePracticeModal, close: closePracticeModal },
  ] = useDisclosure(false);

  const [
    openTournamentModal,
    { toggle: toggleTournamentModal, close: closeTournamentModal },
  ] = useDisclosure(false);

  const practiceRows = mockPractices.map((data, index) => (
    <tr
      key={index}
      className="border-b border-light-gray transition duration-200 ease-in-out hover:bg-light-gray"
    >
      <td className="my-2 flex flex-row whitespace-nowrap py-2 text-center text-sm font-medium text-dark-gray">
        <div className="flex w-[70%] justify-center md:w-full">
          {data.weekday}
        </div>

        <button onClick={togglePracticeModal} className="bg-transparent">
          <IconInfoCircle className="mx-2 text-dark-gray transition duration-300 ease-in-out hover:text-red md:hidden" />
        </button>

        <Modal
          opened={openPracticeModal}
          onClose={closePracticeModal}
          className="text-xl font-black tracking-wide text-dark-gray md:hidden"
          centered
          title={data.weekday + " Practice"}
          withCloseButton={false}
          transition="fade"
          transitionDuration={300}
          exitTransitionDuration={300}
        >
          <div className="flex-col text-lg font-medium text-dark-gray">
            <div>
              <span className="font-black text-red">Location: </span>
              {data.location}
            </div>
            <div>
              <span className="font-black text-red">Start Time: </span>
              {data.end}
            </div>
            <div>
              <span className="font-black text-red">End Time: </span>
              {data.end}
            </div>
            <div className="flex justify-center py-5">
              <Button
                className="mx-3 bg-light-gray
                transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-dark-gray"
                onClick={togglePracticeModal}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
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
      key={index}
      className="border-b border-light-gray transition duration-200 ease-in-out hover:bg-light-gray"
    >
      <td className="my-2 flex flex-row whitespace-nowrap py-2 text-center text-sm font-medium text-dark-gray">
        <div className="flex w-[70%] justify-center md:w-full">
          {data.weekday}
        </div>

        <button onClick={toggleTournamentModal} className="bg-transparent">
          <IconInfoCircle className="mx-2 text-dark-gray transition duration-300 ease-in-out hover:text-red md:hidden" />
        </button>

        <Modal
          opened={openTournamentModal}
          onClose={closeTournamentModal}
          className="text-xl font-black tracking-wide text-dark-gray md:hidden"
          centered
          title={data.name + " Tournament"}
          withCloseButton={false}
          transition="fade"
          transitionDuration={300}
          exitTransitionDuration={300}
        >
          <div className="flex-col text-lg font-medium text-dark-gray">
            <div>
              <span className="font-black text-red">Location: </span>
              {data.location}
            </div>
            <div>
              <span className="font-black text-red">Date: </span>
              {data.weekday}
            </div>
            <div>
              <span className="font-black text-red">Start Time: </span>
              {data.start}
            </div>
            <div>
              <span className="font-black text-red">End Time: </span>
              {data.end}
            </div>
            <div className="flex justify-center py-5">
              <Button
                className="mx-3 bg-light-gray
                transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-dark-gray"
                onClick={toggleTournamentModal}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      </td>

      <td className="hidden  whitespace-nowrap py-2 text-center text-sm text-dark-gray md:table-cell">
        {data.start}
      </td>
      <td className="hidden whitespace-nowrap py-2 text-center text-sm text-dark-gray md:table-cell">
        {data.end}
      </td>
      <td className="hidden py-2 text-center text-sm text-dark-gray md:table-cell">
        {data.location}
      </td>
    </tr>
  ));

  const cards = cardData.map((data, index) => (
    <main key={index} className="group lg:w-[45%] xl:w-[30%]">
      <div
        className="rounded-md bg-white p-3 transition duration-300
          ease-in-out group-hover:scale-[110%] group-hover:bg-red"
      >
        <table className="w-full table-auto space-x-2 text-sm text-dark-gray group-hover:text-white">
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
    </main>
  ));

  return (
    <>
      <main className="flex min-h-screen w-screen flex-col items-center">
        <main className="flex w-full bg-dark-gray pb-[8vh] pt-[15vh]">
          <div className="inline-flex w-full items-center justify-center">
            <hr className="mt-8 h-1 w-[1000px] -translate-y-4 border-0 bg-red" />
            <span className="absolute left-1/2 -translate-x-1/2 bg-dark-gray px-3 text-white">
              <h1 className="text-center text-3xl font-extrabold uppercase tracking-wide text-white md:text-6xl">
                Whiz Kids National
              </h1>
            </span>
          </div>
        </main>

        <main className="flex w-full justify-center overflow-scroll py-[8vh]">
          <div className="mx-10 flex w-full flex-col md:place-content-center md:px-5 xl:flex-row xl:space-x-10">
            <div className="flex flex-col items-center pb-10">
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
                      Dates
                    </th>
                    <th className="hidden py-2 px-4 text-sm font-black uppercase tracking-wide text-red md:table-cell">
                      Style
                    </th>
                    <th className="hidden py-2 px-4 text-sm font-black uppercase tracking-wide text-red md:table-cell">
                      Location
                    </th>
                  </tr>
                </thead>
                <tbody>{tournamentRows}</tbody>
              </table>
            </div>

            <div className="flex flex-col items-center">
              <div className="top-0 mb-10 flex w-full overflow-x-auto md:place-content-center">
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

              <div className="flex hidden justify-center rounded-2xl bg-light-gray p-[5vh] md:block md:h-[50%] md:w-[70%]">
                <NewsletterSignUp
                  teamId={teamId}
                  teamName={"Sample Team Name"}
                />{" "}
                {/* TODO: Change this */}
              </div>
            </div>
          </div>
        </main>
      </main>

      <main className="bg-dark-gray">
        <main className="mx-auto w-[70%] bg-dark-gray pt-[5vh]">
          <div className="inline-flex w-full items-center justify-center">
            <hr className="mt-8 h-1 w-[700px] -translate-y-4 border-0 bg-red" />
            <span className="absolute left-1/2 -translate-x-1/2 bg-dark-gray px-3 text-white">
              <h1 className="text-3xl font-extrabold uppercase tracking-wide text-white md:text-6xl">
                Roster
              </h1>
            </span>
          </div>
        </main>

        <div className="mx-auto flex w-full max-w-7xl flex-wrap place-content-center gap-5 py-[5vh] px-5">
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
