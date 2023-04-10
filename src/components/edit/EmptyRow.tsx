type PropType = {
  numColumns: number;
};

const EmptyRow = ({ numColumns }: PropType) => {
  const cols = [];
  for (let i = 0; i < numColumns; i++) {
    cols.push(
      <td
        className="whitespace-nowrap py-6 px-5 text-center text-sm font-light text-dark-gray"
        key={`emptyRow${i}`}
      >
        <input
          type="text"
          className="input input-sm w-full overflow-ellipsis bg-white text-center capitalize
        text-dark-gray placeholder-light-gray disabled:border-none disabled:bg-white disabled:text-red disabled:placeholder-dark-gray"
          disabled={true}
        />
      </td>
    );
  }

  return (
    <>
      <tr className="border-y border-light-gray text-dark-gray shadow-xl">
        {cols}
        <td
          className="whitespace-nowrap text-center text-sm font-light text-dark-gray"
          key="edit"
        ></td>
      </tr>
    </>
  );
};

export default EmptyRow;
