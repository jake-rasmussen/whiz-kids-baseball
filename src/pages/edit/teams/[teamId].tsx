import Tab from "../../../components/Tab";
import EditLayout from "../../../layouts/editLayout";
import type { NextPageWithLayout } from "../../_app";
import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { api } from "../../../utils/api";
import PracticeTable from "../../../components/edit/PracticeTable";
import TournamentTableEdit from "../../../components/edit/TournamentTableEdit";
import Roster from "../../../components/edit/Roster";
import Loading from "../../../components/Loading";

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
      <div className="w-full">
        <main className="flex min-h-screen min-w-full flex-col items-center">
          <section className="py-[4vh]">
            <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
          </section>

          <section className="flex w-full flex-grow flex-col items-center justify-start overflow-x-scroll">
            {activeTab === 0 ? (
              <TournamentTableEdit
                name={"practices"}
                teamId={id}
                tournaments={tournaments}
              ></TournamentTableEdit>
            ) : (
              <></>
            )}
            {activeTab === 1 ? (
              <PracticeTable
                name={"practices"}
                entries={practices}
              ></PracticeTable>
            ) : (
              <></>
            )}
            {activeTab === 2 ? <Roster playerData={players}></Roster> : <></>}
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
