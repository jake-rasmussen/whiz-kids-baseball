import type { Tournament } from "@prisma/client";
import { IconCirclePlus } from "@tabler/icons";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { api } from "../../../utils/api";
import Modal from "../Modal";
import TournamentRowEdit from "./TournamentRowEdit";
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
    data: tournaments,
    isLoading,
    isError,
  } = api.tournament.getTournamnetsByTeamId.useQuery(
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
  const deleteTournament = api.tournament.deleteTournament.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      queryClient.tournament.getTournamnetsByTeamId.invalidate({ teamId });
    },
  });

  if (isLoading) {
    return <LoadingComponent />;
  } else if (isError) {
    return <div>Error...</div>;
  }

  const addTemporaryRow = (index: number) => {
    if (editRowIndex !== -1) return;

    tournaments.push({
      id: "",
      name: "Name",
      dates: [new Date("Invalid")],
      location: "Location",
      type: "Type",
      createdAt: new Date(),
      updatedAt: new Date(),
      teamId: teamId,
    });

    setEditRowIndex(index);
    setNewRowCreated(true);
  };

  const removeTemporaryRow = () => {
    if (newRowCreated) tournaments.pop();
    setEditRowIndex(-1);
    setNewRowCreated(false);
  };

  const handleDeleteTournament = () => {
    if (wait) return;
    const tournamentToBeDeleted = tournaments[deleteRowIndex];
    if (tournamentToBeDeleted) {
      deleteTournament.mutate({ id: tournamentToBeDeleted.id });
    } else {
      toast.error("Error Deleting Tournament");
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
        actionItem={handleDeleteTournament}
        confirmCancelButtons={true}
      ></Modal>
      <table className="table min-w-full table-auto text-center transition duration-300 ease-in-out">
        <thead>
          <tr className="w-full">
            <th className="px-5 text-xl font-black text-red">Name</th>
            <th className="px-5 text-xl font-black text-red">Location</th>
            <th className="px-5 text-xl font-black text-red">Date</th>
            <th className="px-5 text-xl font-black text-red">Format</th>
            <th className="px-5 text-xl font-black text-red">Edit</th>
          </tr>
        </thead>
        <tbody className="capitalize shadow-xl">
          {tournaments.map((tournament: Tournament, index) => {
            return (
              <TournamentRowEdit
                index={index}
                teamId={teamId}
                tournamentId={tournament.id}
                tournament={tournament}
                newRowCreated={newRowCreated}
                setNewRowCreated={setNewRowCreated}
                editRow={editRowIndex === index}
                removeTemporaryRow={removeTemporaryRow}
                setEditRowIndex={setEditRowIndex}
                wait={wait}
                setWait={setWait}
                setDeleteRow={setDeleteRowIndex}
                key={`tournamentRow${index}`}
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
            onClick={() => addTemporaryRow(tournaments.length)}
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
