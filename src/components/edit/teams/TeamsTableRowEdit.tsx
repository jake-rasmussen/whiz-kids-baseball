import { Team, Tournament } from "@prisma/client";
import { IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons";
import React, { useState } from "react";
import { api } from "../../../utils/api";

type PropType = {
  index: number;
  team: Team;
  editRow: boolean;
  setEditRow: React.Dispatch<React.SetStateAction<number>>;
  newRowCreated: boolean;
  setNewRow: React.Dispatch<React.SetStateAction<boolean>>;
  wait: boolean;
  setWait: React.Dispatch<React.SetStateAction<boolean>>;
  removeTemporaryRow: () => void;
  setDeleteRow: React.Dispatch<React.SetStateAction<number>>;
};

const TeamsRowEdit = (props: PropType) => {
  const {
    index,
    team,
    editRow,
    setEditRow,
    newRowCreated: newRowCreated,
    setNewRow,
    wait,
    setWait,
    removeTemporaryRow,
    setDeleteRow,
  } = props;

  const [rowEdits, setRowEdits] = useState({
    name: ""
  });
  const [validInput, setValidInput] = useState(true); // Determines if the current input is in a valid state

  const queryClient = api.useContext();

  const onSuccessFn = () => {
    setRowEdits({
      name: ""
    });
    setEditRow(-1);
    setWait(false);
  };

  const updateTeam = api.team.updateTeamName.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      onSuccessFn();
    },
  });

  const createTeam = api.team.createTeam.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      onSuccessFn();
      setNewRow(false);
    },
  })

  const handleSaveTeam = () => {
    if (!checkValidInput()) {
      setValidInput(false);
      return true;
    }
    setEditRow(-1);

    if (rowEdits.name === "") return;
    if (wait) return;

    if (newRowCreated) {
      createTeam.mutate({
        name: rowEdits.name
      })
    } else {
      updateTeam.mutate({
        name: rowEdits.name,
        id: team.id
      });
    }
  }

  const checkValidInput = () => {
    if (newRowCreated) {
      if (rowEdits.name === "") return false;
    }
    return true;
  };

  return (
    <React.Fragment key={`tournamentRow${index}`}>
      <tr
        className="border-y border-light-gray text-dark-gray shadow-xl"
        key={`practiceTable${index}`}
      >
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={team.name}
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRow}
            onChange={(e) => {
              rowEdits.name = e.currentTarget.value;
            }}
          />
        </td>
        <td
          className="whitespace-nowrap text-center text-sm font-light text-dark-gray"
          key="edit"
        >
          {!editRow && !wait ? (
            <div>
              <button onClick={() => setEditRow(index)}>
                <IconEdit className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
              </button>
              <button>
                <label
                  htmlFor="delete-modal"
                  onClick={() => setDeleteRow(index)}
                >
                  <IconTrash className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                </label>
              </button>
            </div>
          ) : editRow && !wait ? (
            <div>
              <button onClick={handleSaveTeam}>
                <label htmlFor={validInput ? "" : "error-modal"}>
                  <IconCheck className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                </label>
              </button>
              <button onClick={removeTemporaryRow}>
                <IconX className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
              </button>
            </div>
          ) : (
            <div>
              <button>
                <IconEdit className="mx-1 text-light-gray" />
              </button>
              <button>
                <IconTrash className="mx-1 text-light-gray" />
              </button>
            </div>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
};

export default TeamsRowEdit;
