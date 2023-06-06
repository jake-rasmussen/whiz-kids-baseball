import type { Training } from "@prisma/client";
import { IconCirclePlus } from "@tabler/icons";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "../../../utils/api";
import Modal from "../Modal";
import TrainingRowEdit from "./TrainingRowEdit";
import Error from "next/error";

const Table = () => {
  const [editRowIndex, setEditRowIndex] = useState(-1);
  const [deleteRowIndex, setDeleteRowIndex] = useState(-1);
  const [newRowCreated, setNewRowIndex] = useState(false);
  const [wait, setWait] = useState(false);

  const {
    data: trainings,
    isLoading,
    isError,
    error,
  } = api.training.getAllTrainingsForAdmin.useQuery(undefined, {
    refetchOnWindowFocus: false,
    onSuccess() {
      setEditRowIndex(-1);
      setWait(false);
    },
  });

  const queryClient = api.useContext();

  const deleteTraining = api.training.deleteTraining.useMutation({
    onMutate() {
      setWait(true);
      toast.loading("Deleting Training...");
    },
    onSuccess() {
      queryClient.training.getAllTrainingsForAdmin.invalidate();
      toast.dismiss();
      toast.success("Successfully Deleted Training!");
    },
  });

  if (isLoading) {
    return <></>;
  } else if (isError) {
    return <Error statusCode={error.data?.httpStatus || 500} />;
  }

  const addTemporaryRow = (index: number) => {
    if (editRowIndex !== -1) return;

    trainings.push({
      id: "",
      name: "Name",
      location: "Location",
      dateTime: new Date("Invalid"),
      totalSlots: -1,
      price: -1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    setEditRowIndex(index);
    setNewRowIndex(true);
  };

  const removeTemporaryRow = () => {
    if (newRowCreated) trainings.pop();
    setEditRowIndex(-1);
    setNewRowIndex(false);
  };

  const handleDeleteTryout = () => {
    if (wait) return;
    const trainingToBeDeleted = trainings[deleteRowIndex];
    if (trainingToBeDeleted) {
      deleteTraining.mutate({ id: trainingToBeDeleted.id });
    } else {
      toast.dismiss();
      toast.error("Error Deleting Training");
    }
  };

  return (
    <div className="flex min-w-full flex-col items-center justify-center overflow-scroll px-[5%]">
      <Modal
        name="error"
        header="Invalid Input"
        content="Please make sure that all fields of the new row have been filled
          out, that the date and time field is formatted properly, that a valid
          date and time has been provided, that a valid weekday has been
          provided, and that the price and slots are numbers"
        confirmCancelButtons={false}
      ></Modal>
      <Modal
        name="delete"
        header="Confirm Delete"
        content="Are you sure you want to delete this row?"
        actionItem={handleDeleteTryout}
        confirmCancelButtons={true}
      ></Modal>
      <table className="table min-w-full table-auto text-center transition duration-300 ease-in-out">
        <thead>
          <tr className="w-full">
            <th className="px-5 text-xl font-black text-red">Name</th>
            <th className="px-5 text-xl font-black text-red">Location</th>
            <th className="px-5 text-xl font-black text-red">Date</th>
            <th className="px-5 text-xl font-black text-red">Time</th>
            <th className="px-5 text-xl font-black text-red">Slots</th>
            <th className="px-5 text-xl font-black text-red">Price</th>
            <th className="px-5 text-xl font-black text-red">Edit</th>
          </tr>
        </thead>
        <tbody className="capitalize shadow-xl">
          {trainings.map((training: Training, index: number) => {
            return (
              <TrainingRowEdit
                index={index}
                training={training}
                editRowIndex={editRowIndex}
                setEditRowIndex={setEditRowIndex}
                newRowCreated={newRowCreated}
                setNewRowCreated={setNewRowIndex}
                wait={wait}
                setWait={setWait}
                removeTemporaryRow={removeTemporaryRow}
                setDeleteRow={setDeleteRowIndex}
                key={`trainingRow${index}`}
              />
            );
          })}
        </tbody>
      </table>
      <div className="flex w-full justify-end">
        {editRowIndex === -1 && !wait ? (
          <button
            className="min-w-8 mt-4 mr-4 min-h-8
            transition duration-300 ease-in-out hover:scale-150 hover:text-red"
            onClick={() => addTemporaryRow(trainings.length)}
          >
            <IconCirclePlus />
          </button>
        ) : (
          <button className="min-w-8 mt-4 mr-4 min-h-8 text-light-gray">
            <IconCirclePlus />
          </button>
        )}
      </div>
    </div>
  );
};

export default Table;
