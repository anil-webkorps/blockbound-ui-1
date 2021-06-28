import classnames from "classnames";
import { AiOutlineArrowLeft } from "react-icons/ai";

function ButtonBack({ action, path, size, bgColor, textColor, children }) {
  return (
    <button
      className={classnames(
        "flex justify-center w-full rounded-md border border-transparent py-2 bg-gray-800 text-base font-medium text-white shadow hover:bg-gray-700 focus:outline-none px-4"
      )}
      onClick={()=>action&&action(path&&path)}
    >
      <AiOutlineArrowLeft className="self-center mr-2 h-4 w-4" />
      {children}
    </button>
  );
}

export default ButtonBack;
