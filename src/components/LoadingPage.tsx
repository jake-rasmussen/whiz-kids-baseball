const Loading = () => {
  return (
    <main className="absolute z-50 flex h-[100vh] w-[100vw] items-center justify-center bg-white">
      <progress className="progress w-56"></progress>
    </main>
  );
};

export default Loading;
