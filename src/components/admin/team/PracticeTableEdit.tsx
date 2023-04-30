import type { Practice } from "@prisma/client";
import { IconCirclePlus } from "@tabler/icons";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { api } from "../../../utils/api";
import Modal from "../Modal";
import PracticeRowEdit from "./PracticeRowEdit";
import LoadingComponent from "../../LoadingComponent";

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
    },
    onSuccess() {
      queryClient.practice.getPracticesByTeamId.invalidate({ teamId });
    },
  });

  if (isLoading) {
    return <LoadingComponent />;
  } else if (isError) {
    return <div>Error...</div>;
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
      toast.error("Error Deleting Practice");
    }
  };

  return (
    <div className="z-0 flex min-w-full flex-col items-center justify-center overflow-scroll px-[5%]">
      <Toaster position="top-right" />
      <Modal
        name="error"
        header="Invalid Input"
        content="Please make sure that all fields of the new row have been filled
            out, that the date field is formatted properly, and that a valid
            date has been provided"
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
                editRow={editRowIndex === index}
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
