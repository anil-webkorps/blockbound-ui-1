export default (props) => {
  const { children, border } = props;
  return (
    <div className={`px-4 py-8 h-full sm:py-14 sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-left ${border&& 'sm:rounded-t-lg lg:rounded-none lg:rounded-l-lg bg-gray-200'}`}>
      <div className="w-full md:w-8/12 justify-center mx-auto">
        <div className="items-center justify-center">{children}</div>
      </div>
    </div>
  );
};
