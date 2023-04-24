import React from "react";
// This is no good, playerData should be specific so I fixed below, do this in the future as well
import type { Player } from "@prisma/client";
import { positionToAcronym } from "../../utils/helpers";
interface PropType {
  playerData: Player[];
}

const Roster = (props: PropType) => {
  const { playerData } = props;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-wrap place-content-center gap-5 pb-10">
      {playerData.map((data: Player, index: number) => (
        <div
          className="card w-96 bg-dark-gray shadow-xl"
          key={`roster${index}`}
        >
          <div className="card-body">
            <h2 className="card-title text-red">{`${data.firstName} ${data.lastName}`}</h2>
            <p className="text-white">Graduation Year: {data.graduationYear}</p>
            <p className="text-white">School: {data.school}</p>
            <p className="text-white">
              Position:{" "}
              {data.positions.map((position: string, index: number) => (
                <React.Fragment key={`position${index}`}>
                  {index != data.positions.length - 1
                    ? `${positionToAcronym(position)}, `
                    : `${positionToAcronym(position)}`}
                </React.Fragment>
              ))}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Roster;
