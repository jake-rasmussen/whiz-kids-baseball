import MainLayout from "../layouts/MainLayout";
import { api } from "../utils/api";
import type { NextPageWithLayout } from "./_app";
import Link from "next/link";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import React from "react";

const Teams: NextPageWithLayout = () => {
  const router = useRouter();
  const { data, isError, isLoading } = api.team.getAllTeams.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (isError) {
    return <div>Error...</div>;
  }

  return (
    <>
      <div className="flex min-h-[83vh] w-full justify-center bg-dark-gray">
        <div className="card w-full overflow-scroll rounded-none bg-white p-2 shadow-xl sm:my-20 sm:w-auto sm:rounded-xl">
          <div className="card-body flex flex-col justify-center">
            <h1 className="text-center text-5xl font-bold">
              Our <span className="text-red">Teams</span>
            </h1>
            <div className="tracking-none divider font-black text-light-gray">
              Select Your Team
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              {data.map((entry: any, index: number) => (
                <Link
                  href={`/teams/${index}`}
                  className="tracking-none tracking-none py-4 text-lg font-black uppercase text-dark-gray hover:text-red"
                  key={`team${index}`}
                >
                  {entry.name}
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
