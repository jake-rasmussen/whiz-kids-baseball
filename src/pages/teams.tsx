import type { Team } from "@prisma/client";
import MainLayout from "../layouts/mainLayout";
import { api } from "../utils/api";
import type { NextPageWithLayout } from "./_app";
import Link from "next/link";
import type { ReactElement } from "react";
import React from "react";
import Loading from "../components/LoadingPage";
import Error from "next/error";

const Teams: NextPageWithLayout = () => {
  const {
    data: teams,
    isError,
    isLoading,
    error,
  } = api.team.getAllTeams.useQuery();

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    return <Error statusCode={error.data?.httpStatus || 500} />;
  }

  return (
    <>
      <div className="flex min-h-[82vh] w-full justify-center bg-dark-gray">
        <div className="card w-full overflow-scroll rounded-none bg-white p-2 shadow-xl md:my-20 md:w-auto md:rounded-xl">
          <div className="card-body flex flex-col justify-center">
            <h1 className="text-center text-5xl font-bold md:px-24">
              Our <span className="text-red">Teams</span>
            </h1>
            <h3 className="tracking-none divider sm:mx-14 font-black uppercase text-light-gray md:mx-0">
              Select Your Team
            </h3>
            <div className="flex flex-col items-center justify-center text-center">
              {teams.map((team: Team, index: number) => (
                <Link
                  href={`/teams/${team.id}`}
                  className="tracking-none tracking-none py-4 text-lg font-black uppercase text-dark-gray transition  duration-300 ease-in-out hover:scale-110 hover:text-red"
                  key={`team${index}`}
                >
                  {team.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Teams.getLayout = (page: ReactElement) => {
  return (
    <>
      <MainLayout>{page}</MainLayout>
    </>
  );
};

export default Teams;
