import TeamsTableEdit from "../../components/admin/tryouts/TryoutTableEdit";
import EditLayout from "../../layouts/editLayout";
import type { NextPageWithLayout } from "../_app";
import type { ReactElement } from "react";

const TeamsPageEdit: NextPageWithLayout = () => {
  return (
    <div className="w-full">
      <main className="flex min-h-screen min-w-full flex-col items-center justify-center">
        <section className="my-20 flex w-full items-center overflow-x-scroll">
          <TeamsTableEdit />
        </section>
      </main>
    </div>
  );
};

TeamsPageEdit.getLayout = (page: ReactElement) => {
  return (
    <>
      <EditLayout>{page}</EditLayout>
    </>
  );
};

export default TeamsPageEdit;
