const Loading = () => {
  return (
    <main className="absolute z-10 flex h-screen w-screen items-center justify-center bg-white">
      <progress className="progress w-56"></progress>
    </main>
  );
};

export default Loading;
