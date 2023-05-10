import type { Practice } from "@prisma/client";
import { IconEdit, IconTrash, IconCheck, IconX } from "@tabler/icons";
import React, { useState } from "react";
import { api } from "../../../utils/api";
import {
  isEmptyString,
  daysToStringFormatted,
  dayStringToDays,
  dateToTimeStringRaw,
  timeStringToTimeAsDate,
  isWhitespace,
} from "../../../utils/helpers";
import toast from "react-hot-toast";
import EmptyRow from "../EmptyRow";

type PropType = {
  index: number;
  practiceId: string;
  teamId: string;
  practice: Practice;
  editRow: boolean;
  setEditRowIndex: React.Dispatch<React.SetStateAction<number>>;
  newRowCreated: boolean;
  setNewRowCreated: React.Dispatch<React.SetStateAction<boolean>>;
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
    setEditRowIndex,
    newRowCreated,
    setNewRowCreated,
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

  const [validInput, setValidInput] = useState(true);

  const queryClient = api.useContext();

  const resetRowEdits = () => {
    setRowEdits({
      location: "",
      days: "",
      startTime: "",
      endTime: "",
    });
  };

  const onSuccessFunction = () => {
    resetRowEdits();
    queryClient.practice.getPracticesByTeamId.invalidate({ teamId });
  };

  const createPractice = api.practice.createPractice.useMutation({
    onMutate() {
      setWait(true);
      toast.loading("Creating Practice...");
    },
    onSuccess() {
      onSuccessFunction();
      setNewRowCreated(false);
      toast.dismiss();
      toast.success("Successfully Created Practice");
    },
  });

  const updatePractice = api.practice.updatePractice.useMutation({
    onMutate() {
      setWait(true);
      toast.loading("Updating Practice...");
    },
    onSuccess() {
      onSuccessFunction();
      toast.dismiss();
      toast.success("Successfully Updated Practice");
    },
  });

  const handleSavePractice = () => {
    if (!checkValidInput()) {
      setValidInput(false);
      return;
    }

    if (wait) return;

    if (
      Object.entries(rowEdits).toString() ===
      Object.entries({
        location: "",
        days: "",
        startTime: "",
        endTime: "",
      }).toString()
    ) {
      setEditRowIndex(-1);
      return;
    }

    if (newRowCreated) {
      createPractice.mutate({
        days: dayStringToDays(rowEdits.days),
        location: rowEdits.location,
        startTime: timeStringToTimeAsDate(rowEdits.startTime),
        endTime: timeStringToTimeAsDate(rowEdits.endTime),
        teamId: teamId,
      });
    } else {
      updatePractice.mutate({
        id: practiceId,
        days: isEmptyString(rowEdits.days)
          ? practice.days
          : dayStringToDays(rowEdits.days),
        location: isEmptyString(rowEdits.location)
          ? practice.location
          : rowEdits.location,
        startTime: isEmptyString(rowEdits.startTime)
          ? practice.startTime
          : timeStringToTimeAsDate(rowEdits.startTime),
        endTime: isEmptyString(rowEdits.endTime)
          ? practice.endTime
          : timeStringToTimeAsDate(rowEdits.endTime),
        teamId: teamId,
      });
    }

    resetRowEdits();
  };

  const handleCancelChanges = () => {
    removeTemporaryRow();
    resetRowEdits();
  };

  const checkValidInput = () => {
    if (newRowCreated) {
      if (dayStringToDays(rowEdits.days).length === 0) return false;
      if (
        isEmptyString(rowEdits.days) ||
        isEmptyString(rowEdits.startTime) ||
        isEmptyString(rowEdits.endTime) ||
        isEmptyString(rowEdits.location)
      )
        return false;
    }

    if (rowEdits.days.length > 0 && dayStringToDays(rowEdits.days).length == 0)
      return false;

    if (rowEdits.startTime.length > 0 && rowEdits.startTime.charAt(2) != ":")
      return false;
    if (rowEdits.endTime.length > 0 && rowEdits.endTime.charAt(2) != ":")
      return false;

    if (
      rowEdits.startTime.length > 0 &&
      timeStringToTimeAsDate(rowEdits.startTime).toString() === "Invalid Date"
    )
      return false;
    if (
      rowEdits.endTime.length > 0 &&
      timeStringToTimeAsDate(rowEdits.endTime).toString() === "Invalid Date"
    )
      return false;

    if (
      isWhitespace(rowEdits.days) ||
      isWhitespace(rowEdits.startTime) ||
      isWhitespace(rowEdits.endTime) ||
      isWhitespace(rowEdits.location)
    )
      return false;

    setValidInput(true);
    return true;
  };

  if (wait && editRow) return <EmptyRow numColumns={4} />;

  return (
    <React.Fragment key={`practiceRow${index}`}>
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
              setRowEdits({ ...rowEdits, location: e.currentTarget.value });
            }}
            value={rowEdits.location}
          />
        </td>
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={
              practice.days.length === 0
                ? "Weekday"
                : daysToStringFormatted(practice.days)
            }
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRow}
            onChange={(e) => {
              setRowEdits({ ...rowEdits, days: e.currentTarget.value });
            }}
            value={rowEdits.days}
          />
        </td>
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={
              practice.startTime.toString() === "Invalid Date"
                ? "HH:MMAP"
                : dateToTimeStringRaw(practice.startTime)
            }
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRow}
            onChange={(e) => {
              setRowEdits({ ...rowEdits, startTime: e.currentTarget.value });
            }}
            value={rowEdits.startTime}
          />
        </td>
        <td className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray">
          <input
            type="text"
            placeholder={
              practice.endTime.toString() === "Invalid Date"
                ? "HH:MMAP"
                : dateToTimeStringRaw(practice.endTime)
            }
            className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
            text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
            disabled={!editRow}
            onChange={(e) => {
              setRowEdits({ ...rowEdits, endTime: e.currentTarget.value });
            }}
            value={rowEdits.endTime}
          />
        </td>
        <td
          className="whitespace-nowrap text-center text-sm font-light text-dark-gray"
          key="edit"
        >
          {!editRow && !wait ? (
            <div>
              <button onClick={() => setEditRowIndex(index)}>
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
                  <IconCheck className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:cursor-pointer hover:text-red" />
                </label>
              </button>
              <button onClick={handleCancelChanges}>
                <IconX className="mx-1 transition duration-300 ease-in-out hover:scale-150 hover:cursor-pointer hover:text-red" />
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
