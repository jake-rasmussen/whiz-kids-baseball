import type { Tournament } from "@prisma/client";
import { IconCirclePlus } from "@tabler/icons";
import React, { useState } from "react";
import { api } from "../../utils/api";
import Modal from "./Modal";
import TournamentRow from "./TournamentRow";

type PropType = {
  name: string;
  teamId: string;
  tournaments: Tournament[];
};

const Table = ({ teamId }: PropType) => {
  const [editRow, setEditRow] = useState(-1);
  const [deleteRow, setDeleteRow] = useState(-1);
  const [newRow, setNewRow] = useState(false);
  const [wait, setWait] = useState(false);

  const {
    data: tournaments,
    isLoading,
    isError,
  } = api.tournament.getTournamnetsByTeamId.useQuery(
    { teamId },
    { refetchOnWindowFocus: false }
  );

  const queryClient = api.useContext();
  const deleteTournament = api.tournament.deleteTournament.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      queryClient.tournament.getTournamnetsByTeamId.invalidate({ teamId });
      setWait(false);
    },
  });

  if (isLoading) {
    return <>Loading...</>;
  } else if (isError) {
    return <div>Error...</div>;
  }

  const addTemporaryRow = (index: number) => {
    if (editRow !== -1) return;

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

    setEditRow(index);
    setNewRow(true);
  };

  const removeTemporaryRow = () => {
    if (newRow) tournaments.pop();
    setEditRow(-1);
    setNewRow(false);
  };

  const handleDeleteTournament = () => {
    console.log(deleteRow)
    if (wait) return;
    deleteTournament.mutate({ id: tournaments.at(deleteRow)!.id });
  };

  return (
    <div className="flex min-w-full flex-col items-center justify-center overflow-scroll px-[5%]">
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
              <TournamentRow
                index={index}
                teamId={teamId}
                tournamentId={tournament.id}
                tournament={tournament}
                newRow={newRow}
                editRow={editRow === index}
                removeTemporaryRow={removeTemporaryRow}
                setNewRow={setNewRow}
                setEditRow={setEditRow}
                wait={wait}
                setWait={setWait}
                setDeleteRow={setDeleteRow}
                key={`tournamentRow${index}`}
              ></TournamentRow>
            );
          })}
        </tbody>
      </table>
      <div className="flex w-full justify-end">
        {editRow === -1 && !wait ? (
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
