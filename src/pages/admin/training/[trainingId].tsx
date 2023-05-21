import EditLayout from "../../../layouts/editLayout";
import type { NextPageWithLayout } from "../../_app";
import type { ReactElement } from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Loading from "../../../components/LoadingPage";
import { api } from "../../../utils/api";
import Error from "next/error";
import type { TrainingsOnUsers } from "@prisma/client";
import { IconTrash } from "@tabler/icons";
import Modal from "../../../components/admin/Modal";
import { toast } from "react-hot-toast";

const TrainingEditPage: NextPageWithLayout = () => {
  const router = useRouter();
  const id = router.query.trainingId as string;

  const [targetUserId, setTargetUserId] = useState("");
  const [wait, setWait] = useState(false);

  const {
    data: trainings,
    isLoading,
    isError,
    error,
  } = api.training.getTrainingByIdForAdmin.useQuery(
    { id },
    { enabled: !!id, refetchOnWindowFocus: false }
  );

  const queryClient = api.useContext();

  const unregisterPlayer =
    api.training.unregisterPlayerFromTrainingAsAdmin.useMutation({
      onMutate() {
        setWait(true);
        toast.loading("Unregistering Player...");
      },
      onSuccess() {
        setWait(false);
        setTargetUserId("");

        queryClient.training.getTrainingByIdForAdmin.invalidate({ id });

        toast.dismiss();
        toast.success("Successfully Unregistered Player!");
      },
    });

  if (isLoading) {
    return <Loading />;
  } else if (isError) {
    return <Error statusCode={error.data?.httpStatus || 500} />;
  }

  const handleUnregisterPlayer = () => {
    unregisterPlayer.mutate({
      userId: targetUserId,
      trainingId: id,
    });
  };

  return (
    <>
      <div className="w-full">
        <Modal
          name="delete"
          header="Confirm Delete"
          content="Are you sure you want to delete this row?"
          actionItem={handleUnregisterPlayer}
          confirmCancelButtons={true}
        ></Modal>
        <main className="flex min-h-screen min-w-full flex-col items-center justify-center">
          <section className="my-20 flex w-full items-center overflow-x-scroll">
            <div className="flex min-w-full flex-col items-center justify-center overflow-scroll px-[5%]">
              <table className="table min-w-full table-auto text-center transition duration-300 ease-in-out">
                <thead>
                  <tr className="w-full">
                    <th className="px-5 text-xl font-black text-red">
                      Player Registered
                    </th>
                    <th className="px-5 text-xl font-black text-red">Remove</th>
                  </tr>
                </thead>
                <tbody className="capitalize shadow-xl">
                  {trainings.participants.map(
                    (training: TrainingsOnUsers, index: number) => {
                      return (
                        <tr
                          className="border-y border-light-gray text-dark-gray shadow-xl"
                          key={`training${index}`}
                        >
                          <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
                            <input
                              type="text"
                              placeholder={training.playerName}
                              className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
                          text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
                              disabled
                            />
                          </td>
                          <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
                            {!wait ? (
                              <button>
                                <label
                                  htmlFor="delete-modal"
                                  onClick={() =>
                                    setTargetUserId(training.userId)
                                  }
                                >
                                  <IconTrash className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:cursor-pointer hover:text-red" />
                                </label>
                              </button>
                            ) : (
                              <IconTrash className="mx-1 text-light-gray" />
                            )}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
              <div className="flex w-full justify-end"></div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

TrainingEditPage.getLayout = (page: ReactElement) => {
  return (
    <>
      <EditLayout>{page}</EditLayout>
    </>
  );
};

export default TrainingEditPage;
