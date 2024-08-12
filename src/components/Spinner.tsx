const Spinner = () => {
  return (
    <div className="bg-dark fixed inset-0 z-50 flex items-center justify-center bg-opacity-40">
      <div className="border-paleBlue border-t-teal h-20 w-20 animate-spin rounded-full border-8" />
    </div>
  );
};

export default Spinner;
