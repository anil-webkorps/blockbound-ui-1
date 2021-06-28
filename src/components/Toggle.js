import { useState, useContext } from "react";
import { Switch } from "@headlessui/react";
import Container from "../components/Container";
import { FileContext } from "../context/FileContext";

export default function Index() {
  const fileContext = useContext(FileContext)
  
  return (
    <Switch.Group as="div" className="flex">
      <Switch.Label className="hidden">Enable emails</Switch.Label>
      <Switch
        as="button"
        checked={fileContext.configuration?.add_in_mail}
        onChange={(e)=>fileContext.setConfiguration({...fileContext.configuration, add_in_mail:e})}
        className={`${
          fileContext.configuration?.add_in_mail ? "bg-green-400" : "bg-gray-500"
        } relative inline-flex flex-shrink-0 h-5 w-10 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer focus:outline-none focus:shadow-outline`}
      >
        {({ checked }) => (
          <span
            className={`${
              checked ? "translate-x-5" : "translate-x-0"
            } inline-block w-4 h-4 transition duration-200 ease-in-out transform bg-white rounded-full`}
          />
        )}
      </Switch>
    </Switch.Group>
  );
}
