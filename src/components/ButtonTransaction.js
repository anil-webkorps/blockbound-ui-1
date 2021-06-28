import classnames from "classnames";
import { BiPlusCircle } from "react-icons/bi";

function ButtonTransaction({ action, path, size, bgColor, textColor, children }) {
  return (
    <button
      className={classnames(
        "flex justify-center w-full rounded-md border border-transparent py-2 bg-gray-800 text-base font-medium text-white shadow hover:bg-gray-700 focus:outline-none px-4"
      )}
      onClick={()=>action&&action(path&&path)}
    >
      {children}
      <BiPlusCircle className="self-center ml-2 h-4 w-4" />
    </button>
  );
}

export default ButtonTransaction;
