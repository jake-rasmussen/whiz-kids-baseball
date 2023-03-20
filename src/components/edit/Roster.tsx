import { IconCheck, IconEdit, IconTrash } from "@tabler/icons";
import React, { useState } from "react";

interface PropType {
  playerData: any;
}

const Roster = (props: PropType) => {
  const { playerData } = props;
  const [edit, setEdit] = useState(-1);

  function handleRemove(index: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-wrap place-content-center gap-5 pb-10">
      {playerData.map((data: any, index: number) => (
        <div
          className="card w-96 bg-dark-gray shadow-xl"
          key={`roster${index}`}
        >
          <div className="card-body">
            <div className="flex flex-col justify-center">
              <div className="flex flex-row">
                <div>
                  <p className="text-white">
                    Name:
                    <input
                      type="text"
                      placeholder={`${data.firstName} ${data.lastName}`}
                      className="input input-sm w-full overflow-ellipsis bg-light-gray capitalize
                        text-red placeholder-dark-gray disabled:border-none disabled:bg-dark-gray disabled:text-red disabled:placeholder-light-gray"
                      disabled={edit !== index}
                    />
                  </p>
                  <p className="text-white">
                    Graduation Year:
                    <input
                      type="text"
                      placeholder={`${data.graduationYear}`}
                      className="input input-sm w-full overflow-ellipsis bg-light-gray capitalize
                          text-red placeholder-dark-gray disabled:border-none disabled:bg-dark-gray disabled:text-red disabled:placeholder-light-gray"
                      disabled={edit !== index}
                    />
                  </p>
                  <p className="text-white">
                    School:
                    <input
                      type="text"
                      placeholder={`${data.school}`}
                      className="input input-sm w-full overflow-ellipsis bg-light-gray capitalize
                          text-red placeholder-dark-gray disabled:border-none disabled:bg-dark-gray disabled:text-red disabled:placeholder-light-gray"
                      disabled={edit !== index}
                    />
                  </p>
                  <p className="text-white">
                    Position:
                    <input
                      type="text"
                      placeholder={data.positions.map(
                        (position: string, index: number) =>
                          index != data.positions.length - 1
                            ? `${position}`
                            : ` ${position}`
                      )}
                      className="input input-sm w-full overflow-ellipsis bg-light-gray capitalize
                          text-red placeholder-dark-gray disabled:border-none disabled:bg-dark-gray disabled:text-red disabled:placeholder-light-gray"
                      disabled={edit !== index}
                    />
                  </p>
                </div>

                {edit === -1 ? (
                  <div className="flex flex-col p-2">
                    <button onClick={() => setEdit(index)}>
                      <IconEdit className="mx-2 text-white transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                    </button>
                    <button onClick={() => handleRemove(index)}>
                      <IconTrash className="mx-2 text-white transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                    </button>
                  </div>
                ) : edit === index ? (
                  <div className="flex flex-col p-2">
                    <button onClick={() => setEdit(-1)}>
                      <IconCheck className="mx-2 text-white transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                    </button>
                    <button>
                      <IconTrash className="mx-2 text-white transition duration-300 ease-in-out hover:scale-150 hover:text-red" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col p-2">
                    <button>
                      <IconEdit className="mx-2 text-light-gray" />
                    </button>
                    <button>
                      <IconTrash className="mx-2 text-light-gray" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Roster;
