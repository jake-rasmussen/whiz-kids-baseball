import type { Alumni } from "@prisma/client";
import { IconCirclePlus } from "@tabler/icons";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { api } from "../../../utils/api";
import Modal from "../Modal";
import AlumniRowEdit from "./AlumniRowEdit";
import Error from "next/error";

const Table = () => {
  const [editRowIndex, setEditRowIndex] = useState(-1);
  const [deleteRowIndex, setDeleteRowIndex] = useState(-1);
  const [newRowCreated, setNewRowCreated] = useState(false);
  const [wait, setWait] = useState(false);

  const {
    data: alumni,
    isLoading,
    isError,
    error,
  } = api.alumni.getAllAlumni.useQuery(undefined, {
    refetchOnWindowFocus: false,
    onSuccess() {
      setEditRowIndex(-1);
      setWait(false);
    },
  });

  const queryClient = api.useContext();
  const deleteAlumni = api.alumni.deleteAlumni.useMutation({
    onMutate() {
      setWait(true);
      toast.loading("Deleting Alumni...");
    },
    onSuccess() {
      queryClient.alumni.getAllAlumni.invalidate();
      toast.dismiss();
      toast.success("Succesfully Deleted Alumn!");
    },
  });

  if (isLoading) {
    return <></>;
  } else if (isError) {
    return <Error statusCode={error.data?.httpStatus || 500} />;
  }

  const addTemporaryRow = (index: number) => {
    if (editRowIndex !== -1) return;

    alumni.push({
      id: "",
      firstName: "Full",
      lastName: "Name",
      organization: "Organization",
      year: -1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    setEditRowIndex(index);
    setNewRowCreated(true);
  };

  const removeTemporaryRow = () => {
    if (newRowCreated) alumni.pop();
    setEditRowIndex(-1);
    setNewRowCreated(false);
  };

  const handleDeleteAlumni = () => {
    if (wait) return;
    const alumnToBeDeleted = alumni[deleteRowIndex];
    if (alumnToBeDeleted) {
      deleteAlumni.mutate({ id: alumnToBeDeleted.id });
    } else {
      toast.dismiss();
      toast.error("Error Deleting Alumn");
    }
  };

  return (
    <div className="z-0 flex min-w-full flex-col items-center justify-center px-[5%]">
      <Modal
        name="error"
        header="Invalid Input"
        content="Please make sure that all fields of the new row have been filled
            out, a first and last name has been provided, and that the year is properly
            formatted"
        confirmCancelButtons={false}
      ></Modal>
      <Modal
        name="delete"
        header="Confirm Delete"
        content="Are you sure you want to delete this row?"
        actionItem={handleDeleteAlumni}
        confirmCancelButtons={true}
      ></Modal>
      <table className="table min-w-full table-auto text-center transition duration-300 ease-in-out">
        <thead>
          <tr className="w-full">
            <th className="px-5 text-xl font-black text-red">Name</th>
            <th className="px-5 text-xl font-black text-red">Organization</th>
            <th className="px-5 text-xl font-black text-red">Year</th>
            <th className="px-5 text-xl font-black text-red">Edit</th>
          </tr>
        </thead>
        <tbody className="capitalize shadow-xl">
          {alumni.map((alumn: Alumni, index) => {
            return (
              <AlumniRowEdit
                index={index}
                alumn={alumn}
                editRowIndex={editRowIndex}
                setEditRowIndex={setEditRowIndex}
                newRowCreated={newRowCreated}
                setNewRowCreated={setNewRowCreated}
                wait={wait}
                setWait={setWait}
                removeTemporaryRow={removeTemporaryRow}
                setDeleteRow={setDeleteRowIndex}
                key={`alumniRow${index}`}
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
            onClick={() => addTemporaryRow(alumni.length)}
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
