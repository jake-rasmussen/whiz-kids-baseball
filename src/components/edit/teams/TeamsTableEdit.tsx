import type { Team, Tournament } from "@prisma/client";
import { IconCirclePlus } from "@tabler/icons";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { api } from "../../../utils/api";
import Modal from "../Modal";
import TeamsTableRowEdit from "./TeamsTableRowEdit";

const Table = () => {
  const [editRowIndex, setEditRow] = useState(-1);
  const [deleteRowIndex, setDeleteRow] = useState(-1);
  const [newRowCreated, setNewRow] = useState(false);
  const [wait, setWait] = useState(false);

  const queryClient = api.useContext();

  const {
    data: teams,
    isLoading,
    isError,
  } = api.team.getAllTeams.useQuery();

  const deleteTeam = api.team.deleteTeam.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      queryClient.team.getAllTeams.invalidate();
      setWait(false);
      setEditRow(-1);
    },
  })

  if (isLoading) {
    return <>Loading...</>;
  } else if (isError) {
    return <div>Error...</div>;
  };

  const addTemporaryRow = (index: number) => {
    if (editRowIndex !== -1) return;

    teams.push({
      id: "",
      name: "Name",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    setEditRow(index);
    setNewRow(true);
  };

  const removeTemporaryRow = () => {
    if (newRowCreated) teams.pop();
    setEditRow(-1);
    setNewRow(false);
  };

  const handleDeleteTeam = () => {
    if (wait) return;
    const teamToBeDeleted = teams[deleteRowIndex];
    if (teamToBeDeleted) {
      deleteTeam.mutate({ id: teamToBeDeleted.id, deletePlayers : false})
    } else {
      toast.error("Error Deleting Player");
    }
  };

  return (
    <div className="flex min-w-full flex-col items-center justify-center overflow-scroll px-[5%]">
      <Toaster position="bottom-center" />
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
                setEditRow={setEditRow}
                newRowCreated={newRowCreated}
                setNewRow={setNewRow}
                wait={wait}
                setWait={setWait}
                removeTemporaryRow={removeTemporaryRow}
                setDeleteRow={setDeleteRow} 
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