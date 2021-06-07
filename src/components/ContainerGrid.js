export default (props) => {
  const { children, path } = props;
  return (
    <div className="container max-w-8xl lg:px-8 mt-16 lg:mt-0 mb-2">
      <div className={`divide-gray-800 lg:grid lg:grid-cols-2 items-center ${path?'':'lg:gap-8'} `}>
        {children}
      </div>
    </div>
  );
};
