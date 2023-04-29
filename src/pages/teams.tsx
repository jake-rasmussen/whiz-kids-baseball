import type { Team } from "@prisma/client";
import MainLayout from "../layouts/MainLayout";
import { api } from "../utils/api";
import type { NextPageWithLayout } from "./_app";
import Link from "next/link";
import type { ReactElement } from "react";
import React from "react";
import Loading from "../components/LoadingPage";

const Teams: NextPageWithLayout = () => {
  const { data: teams, isError, isLoading } = api.team.getAllTeams.useQuery();

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    return <div>Error...</div>;
  }

  return (
    <>
      <div className="flex min-h-[83vh] w-full justify-center bg-dark-gray">
        <div className="card w-full overflow-scroll rounded-none bg-white p-2 shadow-xl sm:my-20 sm:w-auto sm:rounded-xl">
          <div className="card-body flex flex-col justify-center">
            <h1 className="text-center text-5xl font-bold sm:px-24">
              Our <span className="text-red">Teams</span>
            </h1>
            <h3 className="tracking-none divider font-black text-light-gray">
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
