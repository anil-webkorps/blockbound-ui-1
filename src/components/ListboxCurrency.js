import { useState, useContext } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { AiOutlineCheck } from "react-icons/ai";
import { HiCheckCircle } from "react-icons/hi";
import { HiOutlineSelector } from "react-icons/hi";
import { FileContext } from "../context/FileContext";

const currencies = ["Select currency", "GBP", "USD", "EUR", "AUD", "CAD", "CHF", "INR", "JPY", "NZD", "ZAR"];


export default function Index() {
  const [selectedCurrency, setselectedCurrency] = useState("Select currency");
  const fileContext = useContext(FileContext);

  const changeCurrency = (e) => {    
    fileContext.getCurrencies(e)    
  }

  return (
    <Listbox as="div" onChange={(e)=>changeCurrency(e)}>
      {({ open }) => (
        <>
          <Listbox.Label className="mb-1 block text-sm font-medium text-gray-500 text-left">
            Currency
          </Listbox.Label>
          <div className="relative">
            <span className="inline-block w-full">
              <Listbox.Button className="pl-3 py-2 w-full text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 relative border shadow-sm border-gray-300 rounded text-gray-900 bg-gray-200 text-sm">
                <span className="block truncate">
                {fileContext?.configuration?.currency ? fileContext.configuration.currency: "Select currency"}
                  <HiOutlineSelector className="absolute inset-y-3 right-0 items-center mr-2 text-gray-400" />
                </span>
              </Listbox.Button>
            </span>
            <Transition
              show={open}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                static
                className="w-full border border-gray-300 rounded mt-1 bg-gray-200 absolute z-50 text-sm"
              >
                {currencies.map((currency) => (
                  <Listbox.Option key={currency} value={currency}>
                    {({ selected, active }) => (
                      <div
                        className={`${
                          active ? "text-gray-800 bg-gray-500" : "text-gray-900"
                        } cursor-default select-none relative py-2 pl-4 pr-4`}
                      >
                        <span
                          className={`${
                            selected ? "font-semibold" : "font-normal"
                          }`}
                        >
                          {currency}
                        </span>

                        {selected && (
                          <span
                            className={`${
                              active ? "text-white" : "text-green-600"
                            } absolute inset-y-0 right-0 flex items-center pr-2`}
                          >
                            <HiCheckCircle />
                          </span>
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
