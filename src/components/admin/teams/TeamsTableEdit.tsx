import type { Team } from "@prisma/client";
import { IconCirclePlus } from "@tabler/icons";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "../../../utils/api";
import Modal from "../Modal";
import TeamsTableRowEdit from "./TeamsRowEdit";
import Error from "next/error";

const Table = () => {
  const [editRowIndex, setEditRowIndex] = useState(-1);
  const [deleteRowIndex, setDeleteRowIndex] = useState(-1);
  const [newRowCreated, setNewRowIndex] = useState(false);
  const [wait, setWait] = useState(false);

  const {
    data: teams,
    isLoading,
    isError,
    error,
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
      toast.loading("Deleting Team...");
    },
    onSuccess() {
      queryClient.team.getAllTeams.invalidate();
      toast.dismiss();
      toast.success("Successfully Deleted Team!");
    },
  });

  if (isLoading) {
    return <></>;
  } else if (isError) {
    return <Error statusCode={error.data?.httpStatus || 500} />;
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
      toast.dismiss();
      toast.error("Error Deleting Player");
    }
  };

  return (
    <div className="flex min-w-full flex-col items-center justify-center overflow-scroll px-[5%]">
      <Modal
        name="error"
        header="Invalid Input"
        content="Please make sure that all fields of the new row have been filled
            out with a team name"
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
                editRowIndex={editRowIndex}
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
            className="min-w-8 mt-4 mr-4 min-h-8
            transition duration-300 ease-in-out hover:scale-150 hover:text-red"
            onClick={() => addTemporaryRow(teams.length)}
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
