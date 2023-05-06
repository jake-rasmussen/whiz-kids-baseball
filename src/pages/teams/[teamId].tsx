import Loading from "../../components/LoadingPage";
import Tab from "../../components/Tab";
import PracticeTable from "../../components/team/PracticeTable";
import Roster from "../../components/team/Roster";
import TournamentTable from "../../components/team/TournamentTable";
import MainLayout from "../../layouts/mainLayout";
import { api } from "../../utils/api";
import type { NextPageWithLayout } from "../_app";
import { useRouter } from "next/router";
import type { ReactElement } from "react";
import { useState } from "react";
import React from "react";
import { motion } from "framer-motion";

const TeamPage: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const id = router.query.teamId as string;

  const { data, isError, isLoading } = api.team.getTeamById.useQuery(
    {
      id,
    },
    { enabled: !!id }
  );

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    return <div>Error...</div>;
  }

  const { name: teamName, players, tournaments, practices } = data;

  return (
    <>
      <main className="flex min-h-[82vh] w-full flex-col items-center gap-8 overflow-x-hidden">
        <div className="inline-flex w-full items-center justify-center bg-dark-gray py-12">
          <h1 className="text-center text-2xl font-extrabold uppercase tracking-wide text-white md:min-w-max lg:text-4xl lg:text-6xl">
            {teamName}
          </h1>
        </div>

        <Tab activeTab={activeTab} setActiveTab={setActiveTab} />

        <section>
          {activeTab == 0 ? (
            <section className="pb-20 text-center">
              <motion.div
                variants={{
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                }}
                initial="initial"
                animate="animate"
              >
                <h1 className="p-4 pb-10 text-center text-3xl font-black uppercase leading-none tracking-wide text-dark-gray md:text-4xl">
                  Tournament Schedule
                </h1>
                {tournaments.length > 0 ? (
                  <TournamentTable tournaments={tournaments} />
                ) : (
                  <>
                    <span className="text-md px-5 text-center font-semibold text-red md:text-xl">
                      There are currently no listed tournaments
                    </span>
                  </>
                )}
              </motion.div>
            </section>
          ) : (
            <></>
          )}
          {activeTab == 1 ? (
            <section className="pb-20 text-center">
              <motion.div
                variants={{
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                }}
                initial="initial"
                animate="animate"
              >
                <h1 className="p-4 pb-10 text-center text-3xl font-black uppercase leading-none tracking-wide text-dark-gray md:text-4xl">
                  Practice Schedule
                </h1>
                {practices.length > 0 ? (
                  <PracticeTable practices={practices} />
                ) : (
                  <>
                    <span className="text-md px-5 text-center font-semibold text-red md:text-xl">
                      There are currently no listed practices
                    </span>
                  </>
                )}
              </motion.div>
            </section>
          ) : (
            <></>
          )}
          {activeTab == 2 ? (
            <section className="pb-20">
              <motion.div
                variants={{
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                }}
                initial="initial"
                animate="animate"
              >
                <h1 className="p-4 pb-10 text-center text-3xl font-black uppercase leading-none tracking-wide text-dark-gray md:text-4xl">
                  Team Roster
                </h1>
                <Roster playerData={players} />
              </motion.div>
            </section>
          ) : (
            <></>
          )}
        </section>
      </main>
    </>
  );
};

TeamPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export default TeamPage;
