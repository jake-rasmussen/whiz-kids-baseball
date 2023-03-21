import React from "react";

interface PropType {
  playerData: any;
}

const Roster = (props: PropType) => {
  const { playerData } = props;

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-wrap place-content-center gap-5 pb-10">
      {playerData.map((data: any, index: number) => (
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
                    ? `${position}, `
                    : `${position}`}
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
