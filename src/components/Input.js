import React, { useContext } from "react";
import { FileContext } from "../context/FileContext";

function InputField(props) {
  const {
    name,
    id,
    label,
    placeholder,
    size,
    type,
    info,
    disabled,
    min,
    max,
    minLenght,
    maxLenght,
  } = props;

  const fileContext = useContext(FileContext)

  
  return (
    <div className="tw-input-field">
      <input
        className="bg-gray-200 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none leading-normal text-sm"
        type={type}
        placeholder={placeholder}
        required={true}
        name={name}
        defaultValue={fileContext.configuration?.[name]}
        onChange={(e)=>fileContext.setConfiguration({...fileContext.configuration, [name]:e.target.value})}
      />
    </div>
  );
}

export default InputField;
