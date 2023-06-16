const Loading = () => {
  return (
    <main className="absolute z-50 flex h-[calc(100vh-7rem)] w-screen items-center justify-center bg-white">
      <progress className="progress w-56"></progress>
    </main>
  );
};

export default Loading;
