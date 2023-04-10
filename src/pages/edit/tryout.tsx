import TryoutTableEdit from "../../components/edit/tryouts/TryoutTableEdit";
import EditLayout from "../../layouts/editLayout";
import type { NextPageWithLayout } from "../_app";
import type { ReactElement } from "react";

const AlumniPageEdit: NextPageWithLayout = () => {
  return (
    <div className="w-full">
      <main className="flex min-h-screen min-w-full flex-col items-center justify-center">
        <section className="my-20 flex w-full items-center overflow-x-scroll">
          <TryoutTableEdit />
        </section>
      </main>
    </div>
  );
};

AlumniPageEdit.getLayout = (page: ReactElement) => {
  return (
    <>
      <EditLayout>{page}</EditLayout>
    </>
  );
};

export default AlumniPageEdit;
