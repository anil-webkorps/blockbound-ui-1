import React, { useContext } from "react";
import { FileContext } from "../context/FileContext";
export default (props) => {
  const { children, margin } = props;
  const fileContext = useContext(FileContext)
  return (
    <div className="break-words">
      <p className="mt-4 sm:mt-8 text-xs text-gray-600">
        Hash {fileContext.configuration['hash']}
      </p>
    </div>
  );
};
