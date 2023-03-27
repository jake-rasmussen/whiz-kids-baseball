import type { Tournament } from "@prisma/client";
import { IconCirclePlus } from "@tabler/icons";
import React, { useState } from "react";
import { api } from "../../utils/api";
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
  } = api.tournament.getTournamnetsByTeamId.useQuery({ teamId }, { refetchOnWindowFocus: false },);

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
    if (wait) return;
    if (tournaments.at(deleteRow) === undefined) return;
    deleteTournament.mutate({ id: tournaments.at(deleteRow)!.id });
  };

  return (
    <div className="flex min-w-full flex-col items-center justify-center overflow-scroll px-[5%]">
      {/* Start of input error modal */}
      <input type="checkbox" id="error-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Invalid Input</h3>
          <p className="py-4">
            Please make sure that all fields of the new row have been filled
            out, that the date field is formatted properly, and that a valid
            date has been provided
          </p>
          <div className="modal-action">
            <label htmlFor="error-modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
      {/* End of input error modal */}

      {/* This is the modal for when things are being deleted */}
      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Confirm Delete</h3>
          <p className="py-4">Are you sure you want to delete this row?</p>
          <div className="modal-action">
            <label htmlFor="delete-modal" className="btn-outline btn-error btn">
              Cancel
            </label>
            <label
              htmlFor="delete-modal"
              className="btn"
              onClick={handleDeleteTournament}
            >
              Yes I&apos;m Sure
            </label>
          </div>
        </div>
      </div>
      {/* End of delete modal */}

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
                setDeleteRow={setDeleteRow}
                wait={wait}
                setWait={setWait}
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
