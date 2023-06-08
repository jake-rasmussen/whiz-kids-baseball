import Tab from "../../../components/Tab";
import EditLayout from "../../../layouts/editLayout";
import type { NextPageWithLayout } from "../../_app";
import type { ReactElement } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import PracticeTableEdit from "../../../components/admin/team/PracticeTableEdit";
import TournamentTableEdit from "../../../components/admin/team/TournamentTableEdit";
import Roster from "../../../components/admin/team/Roster";
import Loading from "../../../components/LoadingPage";
import toast from "react-hot-toast";

const TeamEditPage: NextPageWithLayout = () => {
  const [activeTab, setActiveTab] = useState(0);

  const router = useRouter();
  const id = router.query.teamId as string;

  if (id === undefined) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full">
        <main className="flex min-h-[100vh] min-w-full flex-col items-center">
          <section className="py-[4vh]" onClick={() => toast.remove()}>
            <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
          </section>

          <section className="mb-20 flex w-full flex-grow flex-col items-center justify-start overflow-x-scroll">
            {activeTab === 0 ? (
              <TournamentTableEdit teamId={id}></TournamentTableEdit>
            ) : (
              <></>
            )}
            {activeTab === 1 ? (
              <PracticeTableEdit teamId={id}></PracticeTableEdit>
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

TeamEditPage.getLayout = (page: ReactElement) => {
  return (
    <>
      <EditLayout>{page}</EditLayout>
    </>
  );
};

export default TeamEditPage;
