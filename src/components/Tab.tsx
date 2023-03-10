interface PropType {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const Tab = (props: PropType) => {
  const { activeTab, setActiveTab } = props;

  return (
    <nav className="flex w-full justify-center">
      <div className="flex items-center text-dark-gray">
        <button
          className={
            activeTab == 0
              ? "border-b-4 border-red px-5 py-1 text-dark-gray"
              : "border-b-4 border-light-gray px-5 py-1 text-light-gray transition duration-500 ease-in-out hover:text-red"
          }
          onClick={() => setActiveTab(0)}
        >
          Tournament Schedule
        </button>
        <button
          className={
            activeTab == 1
              ? "border-b-4 border-red px-5 py-1 text-dark-gray"
              : "border-b-4 border-light-gray px-5 py-1 text-light-gray transition duration-500 ease-in-out hover:text-red"
          }
          onClick={() => setActiveTab(1)}
        >
          Practice Schedule
        </button>
        <button
          className={
            activeTab == 2
              ? "border-b-4 border-red px-5 py-1 text-dark-gray"
              : "border-b-4 border-light-gray px-5 py-1 text-light-gray transition duration-500 ease-in-out hover:text-red"
          }
          onClick={() => setActiveTab(2)}
        >
          Team Roster
        </button>
      </div>
    </nav>
  );
};

export default Tab;
