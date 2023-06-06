const Loading = () => {
  return (
    <main className="absolute z-50 flex h-screen w-screen items-center justify-center bg-transparent">
      <progress className="progress w-56"></progress>
    </main>
  );
};

export default Loading;
