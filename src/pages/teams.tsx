import type { ReactElement } from "react";
import React from "react";
import type { NextPageWithLayout } from "./_app";
import MainLayout from "../layouts/MainLayout";
import Link from "next/link";

const Teams: NextPageWithLayout = () => {
  const mockTeams = [
    "Whiz Kids National",
    "Whiz Kids Elite",
    "Whiz Kids American",
    "Whiz Kids Play Ball Stars",
    "Whiz Kids Futures",
    "Whiz Kids 12U",
    "Whiz Kids Stars",
    "Whiz Kids Futures",
    "Whiz Kids Stars",
  ];

  return (
    <>
      <div className="flex min-h-[83vh] w-full justify-center bg-dark-gray">
        <div className="card w-full overflow-scroll rounded-none bg-white p-2 shadow-xl sm:my-20 sm:w-auto sm:rounded-xl">
          <div className="card-body flex flex-col justify-center">
            <h1 className="text-center text-5xl font-bold leading-none">
              Our <span className="text-red">Teams</span>
            </h1>
            <div className="tracking-none divider font-black text-light-gray">
              Select Your Team
            </div>
            <div className="flex flex-col items-center justify-center text-center">
              {mockTeams.map((entry, index) => (
                <Link
                  href={`/teams/${index}`}
                  className="tracking-none btn-ghost btn text-lg font-black text-dark-gray hover:text-red"
                  key={`team${index}`}
                >
                  {entry}
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
