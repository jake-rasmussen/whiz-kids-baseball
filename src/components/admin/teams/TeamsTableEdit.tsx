import type { Team } from "@prisma/client";
import { IconCirclePlus } from "@tabler/icons";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { api } from "../../../utils/api";
import Modal from "../Modal";
import TeamsTableRowEdit from "./TeamsRowEdit";

const Table = () => {
  const [editRowIndex, setEditRowIndex] = useState(-1);
  const [deleteRowIndex, setDeleteRowIndex] = useState(-1);
  const [newRowCreated, setNewRowIndex] = useState(false);
  const [wait, setWait] = useState(false);

  const {
    data: teams,
    isLoading,
    isError,
  } = api.team.getAllTeams.useQuery(undefined, {
    refetchOnWindowFocus: false,
    onSuccess() {
      setEditRowIndex(-1);
      setWait(false);
    },
  });

  const queryClient = api.useContext();
  const deleteTeam = api.team.deleteTeam.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      queryClient.team.getAllTeams.invalidate();
    },
  });

  if (isLoading) {
    return <>Loading...</>;
  } else if (isError) {
    return <div>Error...</div>;
  }

  const addTemporaryRow = (index: number) => {
    if (editRowIndex !== -1) return;

    teams.push({
      id: "",
      name: "Name",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    setEditRowIndex(index);
    setNewRowIndex(true);
  };

  const removeTemporaryRow = () => {
    if (newRowCreated) teams.pop();
    setEditRowIndex(-1);
    setNewRowIndex(false);
  };

  const handleDeleteTeam = () => {
    if (wait) return;
    const teamToBeDeleted = teams[deleteRowIndex];
    if (teamToBeDeleted) {
      deleteTeam.mutate({ id: teamToBeDeleted.id, deletePlayers: false });
    } else {
      toast.error("Error Deleting Player");
    }
  };

  return (
    <div className="flex min-w-full flex-col items-center justify-center overflow-scroll px-[5%]">
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
        actionItem={handleDeleteTeam}
        confirmCancelButtons={true}
      ></Modal>
      <table className="table min-w-full table-auto text-center transition duration-300 ease-in-out">
        <thead>
          <tr className="w-full">
            <th className="px-5 text-xl font-black text-red">Team</th>
            <th className="px-5 text-xl font-black text-red">Edit</th>
          </tr>
        </thead>
        <tbody className="capitalize shadow-xl">
          {teams.map((team: Team, index) => {
            return (
              <TeamsTableRowEdit
                index={index}
                team={team}
                editRow={editRowIndex === index}
                setEditRowIndex={setEditRowIndex}
                newRowCreated={newRowCreated}
                setNewRowCreated={setNewRowIndex}
                wait={wait}
                setWait={setWait}
                removeTemporaryRow={removeTemporaryRow}
                setDeleteRow={setDeleteRowIndex}
                key={`teamsRow${index}`}
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
            onClick={() => addTemporaryRow(teams.length)}
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