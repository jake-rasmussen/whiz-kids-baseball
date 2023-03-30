import type { Tournament } from "@prisma/client";
import { IconCirclePlus } from "@tabler/icons";
import React, { useState } from "react";
import { api } from "../../utils/api";
import Modal from "./Modal";
import TournamentRow from "./TournamentRow";
//Really bad practice to have two components named the same thing, like in component/team and component/edit u have the same component named and title 
// Change this one to like TournamentTableEdit or something and also its best to have the component name match the file name
type PropType = {
  name: string;
  teamId: string;
  tournaments: Tournament[];
};

const Table = ({ teamId }: PropType) => {
  //TODO: I changed the names but I think the naming convention needs to be better 
  const [editRowIdx, setEditRow] = useState(-1);
  const [deleteRowIdx, setDeleteRow] = useState(-1);
  const [newRowCreated, setNewRow] = useState(false);
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

  // I am pretty sure you don't need the wait thing but lets talk about it tomorrow
  if (isLoading) {
    return <>Loading...</>;
  } else if (isError) {
    return <div>Error...</div>;
  }

  const addTemporaryRow = (index: number) => {
    if (editRowIdx !== -1) return;

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
    if (newRowCreated) tournaments.pop();
    setEditRow(-1);
    setNewRow(false);
  };

  const handleDeleteTournament = () => {
    console.log(deleteRowIdx)// TODO: remove this
    if (wait) return;
    // TODO: add a check to the element is contained in the arr so you can get rid of the non-null assertion(the !)
    const tournamentToBeDeleted = tournaments[deleteRowIdx]
    if (tournamentToBeDeleted){
      deleteTournament.mutate({ id: tournamentToBeDeleted.id });
    } else {
      // Use toast to display error
      console.error("Tournament id not found")
    }
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
                newRow={newRowCreated}
                editRow={editRowIdx === index}
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
        {editRowIdx === -1 && !wait ? (
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
