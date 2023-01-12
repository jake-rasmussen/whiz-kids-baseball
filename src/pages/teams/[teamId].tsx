import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import MainLayout from "../../components/layouts/MainLayout";

import type { NextPageWithLayout } from "../_app";

interface Props {
  teamId: string;
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const teamId = context.params?.teamId as string;

  return {
    props: {
      teamId,
    },
  };
};

const TeamPage: NextPageWithLayout<Props> = ({ teamId }) => {
  console.log(teamId);

  const mockdata = [
    { weekday: "Sunday", start: "6pm", end: "8pm" },
    { weekday: "Monday", start: "6pm", end: "8pm" },
    { weekday: "Tuesday", start: "6pm", end: "8pm" },
    { weekday: "Wednesday", start: "6pm", end: "8pm" },
    { weekday: "Thursday", start: "6pm", end: "8pm" },
    { weekday: "Friday", start: "6pm", end: "8pm" },
    { weekday: "Saturday", start: "6pm", end: "8pm" },
  ];

  const rows = mockdata.map((data) => (
    <tr key={data.weekday} className="border-b">
      <td className="whitespace-nowrap px-6 py-2 text-center text-sm font-medium text-dark-gray">
        {data.weekday}
      </td>
      <td className="whitespace-nowrap px-6 py-2 text-center text-sm font-light text-dark-gray">
        {data.start}
      </td>
      <td className="whitespace-nowrap px-6 py-2 text-center text-sm font-light text-dark-gray">
        {data.end}
      </td>
    </tr>
  ));
  return (
    <>
      <main className="xs:pt-28 flex flex-col items-center pt-32">
        <div className=" w-full lg:mx-auto lg:max-w-7xl">
          <div className="mb-10 inline-flex w-full items-center justify-center">
            <hr className="mx-1 mt-8 h-[0.175rem] w-full max-w-7xl -translate-y-4 border-0 bg-red sm:mx-5 md:h-1" />
            <span className="absolute left-1/2 -translate-x-1/2 bg-white text-center text-xl font-extrabold uppercase tracking-wide text-dark-gray md:px-2  md:text-3xl lg:text-4xl">
              {teamId} : Whiz Kids National Team
            </span>
          </div>
        </div>
      </main>
      <div className="flex place-content-center py-5">
        <div className="overflow-x-auto overflow-y-auto">
          <table className="table-auto">
            <thead className="border-b">
              <tr className="border-b">
                <th
                  colSpan={3}
                  className=" text-md py-2 text-center text-lg font-medium text-dark-gray"
                >
                  Our Practice Schedule
                </th>
              </tr>
              <tr>
                <th
                  scope="col"
                  className="px-6 py-2 text-center text-sm font-medium text-dark-gray"
                >
                  Day Of the Week
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-center text-sm font-medium text-dark-gray"
                >
                  Start Time
                </th>
                <th
                  scope="col"
                  className="px-6 py-2 text-center text-sm font-medium text-dark-gray"
                >
                  End Time
                </th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    </>
  );
};

TeamPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default TeamPage;
