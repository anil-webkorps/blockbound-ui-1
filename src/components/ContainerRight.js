export default (props) => {
  const { children, border } = props;
  return (
    <div className={`px-4 py-8 sm:py-8 sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-left lg:mt-0 ${border&& 'sm:rounded-b-lg lg:rounded-none lg:rounded-r-lg bg-white'}`}>
      <div className="w-full md:w-10/12 justify-center mx-auto">
        <div className="items-center justify-center">{children}</div>
      </div>
    </div>
  );
};
