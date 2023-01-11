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
  return (
    <div className="mb-10 inline-flex w-full items-center justify-center pt-28">
      <hr className="mt-8 h-1 w-[800px] -translate-y-4 border-0 bg-red" />
      <span className="absolute left-1/2 -translate-x-1/2 bg-white px-3 text-5xl font-bold uppercase tracking-wide text-dark-gray">
        {teamId} : 15U Kids
      </span>
    </div>
  );
};

TeamPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default TeamPage;
