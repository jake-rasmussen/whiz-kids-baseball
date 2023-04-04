import TeamsTableEdit from "../../components/edit/teams/TeamsTableEdit";
import EditLayout from "../../layouts/editLayout";
import { api } from "../../utils/api";
import type { NextPageWithLayout } from "../_app";
import type { ReactElement } from "react";

const TeamsPage: NextPageWithLayout = () => {

  return (
    <>
      <div className="w-full">
        <main className="flex min-h-screen min-w-full flex-col items-center justify-center">
          <section className="flex w-full items-center overflow-x-scroll">
            <TeamsTableEdit />
          </section>
        </main>
      </div>
    </>
  );
};

TeamsPage.getLayout = (page: ReactElement) => {
  return (
    <>
      <EditLayout>{page}</EditLayout>
    </>
  );
};

export default TeamsPage;
