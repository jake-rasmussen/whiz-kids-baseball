import { Practice } from "@prisma/client";
import { IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons";
import React, { useState } from "react";
import { api } from "../../../utils/api";
import {
  stringToDates,
  stringToDate,
  datesToString,
  isEmptyString,
  daysToString,
  stringToDays,
  dateToTimeString,
  stringToTimeAsDate,
} from "../../../utils/helpers";
type PropType = {
  index: number;
  practiceId: string;
  teamId: string;
  practice: Practice;
  editRow: boolean;
  setEditRow: React.Dispatch<React.SetStateAction<number>>;
  newRowCreated: boolean;
  setNewRow: React.Dispatch<React.SetStateAction<boolean>>;
  wait: boolean;
  setWait: React.Dispatch<React.SetStateAction<boolean>>;
  removeTemporaryRow: () => void;
  setDeleteRow: React.Dispatch<React.SetStateAction<number>>;
};

const PracticeRow = (props: PropType) => {
  const {
    index,
    teamId,
    practiceId,
    practice,
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
    location: "",
    days: "",
    startTime: "",
    endTime: "",
  });
  const [validInput, setValidInput] = useState(true); // Determines if the current input is in a valid state

  const queryClient = api.useContext();

  const onSuccessFn = () => {
    setRowEdits({
      location: "",
      days: "",
      startTime: "",
      endTime: "",
    });
    setEditRow(-1);
    setWait(false);
  };

  const updatePractice = api.practice.updatePractice.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      queryClient.practice.getPracticesByTeamId.invalidate({ teamId });
      onSuccessFn();
    },
  });

  const createPractice = api.practice.createPractice.useMutation({
    onMutate() {
      setWait(true);
    },
    onSuccess() {
      queryClient.practice.getPracticesByTeamId.invalidate({ teamId });
      onSuccessFn();
      setNewRow(false);
    },
  });

  const handleSavePractice = () => {
    if (!checkValidInput()) {
      setValidInput(false);
      return;
    }
    setEditRow(-1);

    if (
      Object.entries(rowEdits).toString() ===
      Object.entries({
        location: "",
        days: "",
        startTime: "",
        endTime: "",
      }).toString()
    )
      return;

    if (wait) return;

    if (newRowCreated) {
      createPractice.mutate({
        days: stringToDays(rowEdits.days),
        location: rowEdits.location,
        startTime: stringToTimeAsDate(rowEdits.startTime),
        endTime: stringToTimeAsDate(rowEdits.endTime),
        teamId: teamId,
      });
    } else {
      updatePractice.mutate({
        id: practiceId,
        days: isEmptyString(rowEdits.days)
          ? practice.days
          : stringToDays(rowEdits.days),
        location: isEmptyString(rowEdits.location)
          ? practice.location
          : rowEdits.location,
        startTime: isEmptyString(rowEdits.startTime)
          ? practice.startTime
          : stringToTimeAsDate(rowEdits.startTime),
        endTime: isEmptyString(rowEdits.endTime)
          ? practice.endTime
          : stringToTimeAsDate(rowEdits.endTime),
        teamId: teamId,
      });
    }
  };

  const checkValidInput = () => {
    if (newRowCreated) {
      if (stringToDays(rowEdits.days).length === 0) return false;
      if (
        isEmptyString(rowEdits.days) ||
        isEmptyString(rowEdits.startTime) ||
        isEmptyString(rowEdits.endTime) ||
        isEmptyString(rowEdits.location)
      )
        return false;
    } else {
      if (rowEdits.days.length > 0 && stringToDays(rowEdits.days).length == 0)
        return false;
      if (rowEdits.startTime.length > 0 && rowEdits.startTime.charAt(2) != ":")
        return false;
      if (rowEdits.endTime.length > 0 && rowEdits.endTime.charAt(2) != ":")
        return false;

      if (
        rowEdits.startTime.length > 0 &&
        stringToTimeAsDate(rowEdits.startTime).toString() === "Invalid Date"
      )
        return false;
      if (
        rowEdits.endTime.length > 0 &&
        stringToTimeAsDate(rowEdits.endTime).toString() === "Invalid Date"
      )
        return false;
    }

    setValidInput(true);
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
            placeholder={practice.location}
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRow}
            onChange={(e) => {
              rowEdits.location = e.currentTarget.value;
            }}
          />
        </td>
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={
              practice.days.length === 0
                ? "Weekday"
                : daysToString(practice.days)
            }
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRow}
            onChange={(e) => {
              rowEdits.days = e.currentTarget.value;
            }}
          />
        </td>
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={
              practice.startTime.toString() === "Invalid Date"
                ? "HH:MM"
                : dateToTimeString(practice.startTime)
            }
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRow}
            onChange={(e) => {
              rowEdits.startTime = e.currentTarget.value;
            }}
          />
        </td>
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={
              practice.endTime.toString() === "Invalid Date"
                ? "HH:MM"
                : dateToTimeString(practice.endTime)
            }
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRow}
            onChange={(e) => {
              rowEdits.endTime = e.currentTarget.value;
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
              <button onClick={handleSavePractice}>
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

export default PracticeRow;
