import { useState, useContext } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { AiOutlineCheck } from "react-icons/ai";
import { HiCheckCircle } from "react-icons/hi";
import { HiOutlineSelector } from "react-icons/hi";
import { FileContext } from "../context/FileContext";

const speed = [
  "Select transaction speed",
  "Up to 1 hour ",
  "Up to 6 hours ",
  "Up to 24 hours ",
];

export default function Index() {

  const fileContext = useContext(FileContext);

  const setselectedSpeed = (e) => {
    fileContext.setConfiguration({...fileContext.configuration, speed:e, price:fileContext.getPrice(e)})
  }

  const getSpeed = (i) => {
    let symbol = fileContext?.configuration?.currency == "GBP" ? '£' 
                :fileContext?.configuration?.currency == "INR" ? '₹' 
                :fileContext?.configuration?.currency == "EUR" ? "€"
                :fileContext?.configuration?.currency == "AUD" ? '$' 
                :fileContext?.configuration?.currency == "CAD" ? '$' 
                :fileContext?.configuration?.currency == "CHF" ? "Fr"
                :fileContext?.configuration?.currency == "JPY" ? '¥' 
                :fileContext?.configuration?.currency == "NZD" ? '$' 
                :fileContext?.configuration?.currency == "ZAR" ? "R" : '$'

    let price_list = fileContext?.configuration?.price_list ? fileContext?.configuration?.price_list:0

    let currency_price = fileContext?.configuration?.currency_price ? fileContext?.configuration?.currency_price:0

    let price = price_list ? (i == 1 ? price_list['60']['total']['p2wpkh']['usd']
                : i == 2 ? price_list['360']['total']['p2wpkh']['usd']
                : i == 3 && price_list['1440']['total']['p2wpkh']['usd']
                ) :""

    let total_price = `[${symbol} ${fileContext.calculation(currency_price, price).toFixed(2)}]`

    let val = i == 0 ? speed[i] : (speed[i] + total_price)
    
    return val
  }


  return (
    <Listbox
      as="div"
      className=""
      onChange={(e)=>setselectedSpeed(e)}
      value={fileContext?.configuration?.speed}
      disabled={fileContext?.configuration.currency ? false:true}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="mb-1 block text-sm font-medium text-gray-500 text-left">
            Speed
          </Listbox.Label>
          <div className="relative">
            <span className="inline-block w-full">
              <Listbox.Button className="pl-3 py-2 w-full text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 relative border shadow-sm border-gray-300 rounded text-gray-900 bg-gray-200 text-sm">
                <span className="block truncate">
                  {fileContext?.configuration?.speed ? getSpeed(fileContext.configuration.speed) : "Select transaction speed"}
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
                className="w-full border border-gray-300 rounded mt-1 bg-gray-200 absolute text-sm"
              >
                {speed.map((Speed, i) => {
                    let val = getSpeed(i)
                    return(
                      <Listbox.Option key={Speed} value={i}>
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
                          {val}
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
                    );
                })}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
