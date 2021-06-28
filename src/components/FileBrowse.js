export default (props) => {
  const { children } = props;
  return (
    <div className="relative rounded-md">
      <input
        type="text"
        name="price"
        // defaultValue={file && file.name}
        id="price"
        disabled="disabled"
        className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-l-md rounded-r-xl"
        placeholder="0.00"
      />
      <div className="absolute inset-y-0 right-0 items-center">
        <button
          type="button"
          // onClick={(e) => hiddenClick(e)}
          className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-r-md text-white bg-gray-700 hover:bg-gray-600 h-full"
        >
          Browse
        </button>
      </div>
    </div>
  );
};
