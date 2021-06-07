export default function Header() {
  return (
    <div className="fixed bg-gray-900 w-full z-50">
      <div className="container mx-auto lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl">
        <div className="flex mx-auto justify-between items-center px-4 py-3 sm:px-6 md:justify-start md:space-x-10 lg:max-w-8xl xl:max-w-screen-xl">
          <div className="justify-start lg:w-0 lg:flex-1">
            <img
              to="/"
              className="h-8 w-auto ml-0 lg:ml-4 xl:ml-4 2xl:ml-0"
              src="../logo-h315.png"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
