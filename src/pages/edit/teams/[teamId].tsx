import Tab from "../../../components/Tab";
import EditLayout from "../../../layouts/editLayout";
import type { NextPageWithLayout } from "../../_app";
import type { GetServerSideProps } from "next";
import type { ReactElement } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { api } from "../../../utils/api";
import PracticeTableEdit from "../../../components/edit/team/PracticeTableEdit";
import TournamentTableEdit from "../../../components/edit/team/TournamentTableEdit";
import Roster from "../../../components/edit/Roster";
import Loading from "../../../components/Loading";

const TeamPage: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(0);

  const router = useRouter();
  const id = router.query.teamId as string;

  if (id === undefined) {
    return <Loading />;
  }

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
                name={"tournaments"}
                teamId={id}
              ></TournamentTableEdit>
            ) : (
              <></>
            )}
            {activeTab === 1 ? (
              <PracticeTableEdit
                name={"practices"}
                teamId={id}
              ></PracticeTableEdit>
            ) : (
              <></>
            )}
            {activeTab === 2 ? <Roster teamId={id} /> : <></>}
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
