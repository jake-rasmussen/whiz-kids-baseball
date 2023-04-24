import Loading from "../../components/LoadingPage";
import Tab from "../../components/Tab";
import PracticeTable from "../../components/team/PracticeTable";
import Roster from "../../components/team/Roster";
import TournamentTable from "../../components/team/TournamentTable";
import MainLayout from "../../layouts/MainLayout";
import { api } from "../../utils/api";
import type { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { useState } from "react";
import React from "react";

const TeamPage: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const id = router.query.teamId as string;

  // TODO: figure out how to handle if id is undefined

  const { data, isError, isLoading } = api.team.getTeamById.useQuery({
    id,
  });

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    return <div>Error...</div>;
  }

  const { name: teamName, players, tournaments, practices } = data;

  return (
    <>
      <main className="flex w-full flex-col items-center gap-8 overflow-hidden">
        <div className="inline-flex w-full items-center justify-center bg-dark-gray py-12">
          <h1 className="text-center text-2xl font-extrabold uppercase tracking-wide text-white md:min-w-max lg:text-4xl lg:text-6xl">
            {teamName}
          </h1>
        </div>

        <Tab activeTab={activeTab} setActiveTab={setActiveTab} />

        <section>
          {activeTab == 0 ? (
            <section className="pb-20">
              <h1 className="p-4 pb-10 text-center text-3xl font-black uppercase leading-none tracking-wide text-dark-gray md:text-4xl">
                Tournament Schedule
              </h1>
              <TournamentTable tournaments={tournaments} />
            </section>
          ) : (
            <></>
          )}
          {activeTab == 1 ? (
            <section className="pb-20">
              <h1 className="p-4 pb-10 text-center text-3xl font-black uppercase leading-none tracking-wide text-dark-gray md:text-4xl">
                Practice Schedule
              </h1>
              <PracticeTable practices={practices} />
            </section>
          ) : (
            <></>
          )}
          {activeTab == 2 ? (
            <section className="pb-20">
              <h1 className="p-4 pb-10 text-center text-3xl font-black uppercase leading-none tracking-wide text-dark-gray md:text-4xl">
                Team Roster
              </h1>
              <Roster playerData={players} />
            </section>
          ) : (
            <></>
          )}
        </section>
      </main>
      <div className="w-full bg-dark-gray">
        <div className="container mx-auto flex flex-col flex-wrap content-center justify-center p-4 py-20 md:p-10">
          <h1 className="text-center text-5xl font-semibold leading-none text-white antialiased">
            Get Our Updates
          </h1>
          <p className="pt-2 pb-8 text-center text-xl text-light-gray antialiased">
            Find out about events and other news
          </p>
          <div className="flex flex-row">
            <input
              type="text"
              placeholder="example@email.com"
              className="w-3/5 rounded-l-lg bg-white p-3 sm:w-2/3"
            />
            <button
              type="button"
              className="w-2/5 rounded-r-lg bg-red p-3 font-semibold text-white sm:w-1/3"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

TeamPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default TeamPage;
