import classnames from "classnames";
import { AiOutlineCheck } from "react-icons/ai";

function ButtonNext({ action, path,  size, bgColor, textColor, children }) {
  return (
    <button
      className={classnames(
        "flex justify-center w-full rounded-md border border-transparent py-2 bg-gray-600 text-base font-medium text-white shadow hover:bg-gray-700 focus:outline-none px-4"
      )}
      onClick={(e)=>action&&action(path&&path)}
    >
      {children}
      <AiOutlineCheck className="self-center ml-2 h-4 w-4" />
    </button>
  );
}

export default ButtonNext;
