import type { Practice } from "@prisma/client";
import { IconCirclePlus } from "@tabler/icons";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../utils/api";
import Modal from "../Modal";
import PracticeRowEdit from "./PracticeRowEdit";
import LoadingComponent from "../../LoadingComponent";
import Error from "next/error";

type PropType = {
  teamId: string;
};

const Table = ({ teamId }: PropType) => {
  const [editRowIndex, setEditRowIndex] = useState(-1);
  const [deleteRowIndex, setDeleteRowIndex] = useState(-1);
  const [newRowCreated, setNewRowCreated] = useState(false);
  const [wait, setWait] = useState(false);

  const {
    data: practices,
    isLoading,
    isError,
    error,
  } = api.practice.getPracticesByTeamId.useQuery(
    { teamId },
    {
      refetchOnWindowFocus: false,
      onSuccess() {
        setEditRowIndex(-1);
        setWait(false);
      },
    }
  );

  const queryClient = api.useContext();
  const deletePractice = api.practice.deletePractice.useMutation({
    onMutate() {
      setWait(true);
      toast.loading("Deleting Practice...");
    },
    onSuccess() {
      queryClient.practice.getPracticesByTeamId.invalidate({ teamId });
      toast.dismiss();
      toast.success("Successfully Deleted Practice!");
    },
  });

  if (isLoading) {
    return <LoadingComponent />;
  } else if (isError) {
    return <Error statusCode={error.data?.httpStatus || 500} />;
  }

  const addTemporaryRow = (index: number) => {
    if (editRowIndex !== -1 || wait) return;

    practices.push({
      id: "",
      days: [],
      location: "Location",
      startTime: new Date("Invalid"),
      endTime: new Date("Invalid"),
      createdAt: new Date(),
      updatedAt: new Date(),
      teamId: teamId,
    });

    setEditRowIndex(index);
    setNewRowCreated(true);
  };

  const removeTemporaryRow = () => {
    if (newRowCreated) practices.pop();
    setEditRowIndex(-1);
    setNewRowCreated(false);
  };

  const handleDeletePractice = () => {
    if (wait) return;
    const practiceToBeDeleted = practices[deleteRowIndex];
    if (practiceToBeDeleted) {
      deletePractice.mutate({ id: practiceToBeDeleted.id });
    } else {
      toast.dismiss();
      toast.error("Error Deleting Practice");
    }
  };

  return (
    <div className="z-0 flex min-w-full flex-col items-center justify-center overflow-scroll px-[5%]">
      <Modal
        name="error"
        header="Invalid Input"
        content="Please make sure that all fields of the new row have been filled
            out, that the date and time field is formatted properly, that a valid
            date and time has been provided, and that a valid weekday has been
            provided"
        confirmCancelButtons={false}
      ></Modal>
      <Modal
        name="delete"
        header="Confirm Delete"
        content="Are you sure you want to delete this row?"
        actionItem={handleDeletePractice}
        confirmCancelButtons={true}
      ></Modal>
      <table className="table min-w-full table-auto text-center transition duration-300 ease-in-out">
        <thead>
          <tr className="w-full">
            <th className="px-5 text-xl font-black text-red">Location</th>
            <th className="px-5 text-xl font-black text-red">Weekday</th>
            <th className="px-5 text-xl font-black text-red">Start Time</th>
            <th className="px-5 text-xl font-black text-red">End Time</th>
            <th className="px-5 text-xl font-black text-red">Edit</th>
          </tr>
        </thead>
        <tbody className="capitalize shadow-xl">
          {practices.map((practice: Practice, index) => {
            return (
              <PracticeRowEdit
                index={index}
                teamId={teamId}
                practiceId={practice.id}
                practice={practice}
                editRowIndex={editRowIndex}
                setEditRowIndex={setEditRowIndex}
                newRowCreated={newRowCreated}
                setNewRowCreated={setNewRowCreated}
                wait={wait}
                setWait={setWait}
                removeTemporaryRow={removeTemporaryRow}
                setDeleteRow={setDeleteRowIndex}
                key={`practiceRow${index}`}
              />
            );
          })}
        </tbody>
      </table>
      <div className="flex w-full justify-end">
        {editRowIndex === -1 && !wait ? (
          <button
            className="min-w-8 min-h-8 mt-4 mr-4
            transition duration-300 ease-in-out hover:scale-150 hover:text-red"
            onClick={() => addTemporaryRow(practices.length)}
          >
            <IconCirclePlus />
          </button>
        ) : (
          <button className="min-w-8 min-h-8 mt-4 mr-4 text-light-gray">
            <IconCirclePlus />
          </button>
        )}
      </div>
    </div>
  );
};

export default Table;
