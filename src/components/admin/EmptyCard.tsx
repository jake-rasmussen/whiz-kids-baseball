const EmptyCard = () => {
  return (
    <div className="card w-96 bg-dark-gray shadow-xl" key={`emptyCard`}>
      <div className="card-body">
        <div className="flex flex-col justify-center">
          <div className="flex flex-row">
            <div>
              <p className="text-white">
                <input
                  type="text"
                  placeholder={""}
                  className="input input-sm w-full overflow-ellipsis bg-white capitalize
                      text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-dark-gray disabled:text-red disabled:placeholder-light-gray"
                  disabled={true}
                />
              </p>
              <p className="text-white">
                <input
                  type="text"
                  placeholder={""}
                  className="input input-sm w-full overflow-ellipsis bg-white capitalize
                      text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-dark-gray disabled:text-red disabled:placeholder-light-gray"
                  disabled={true}
                />
              </p>
              <p className="text-white">
                <input
                  type="text"
                  placeholder={""}
                  className="input input-sm w-full overflow-ellipsis bg-white capitalize
                      text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-dark-gray disabled:text-red disabled:placeholder-light-gray"
                  disabled={true}
                />
              </p>
              <p className="text-white">
                <input
                  type="text"
                  placeholder={""}
                  className="input input-sm w-full overflow-ellipsis bg-white capitalize
                      text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-dark-gray disabled:text-red disabled:placeholder-light-gray"
                  disabled={true}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCard;
