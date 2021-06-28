import React from "react";
import Popper from "popper.js";

import { AiOutlineQuestionCircle } from "react-icons/ai";
import { GoTriangleDown } from "react-icons/go";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Popover = ({ color, children, text }) => {
  const [popoverShow, setPopoverShow] = React.useState(false);
  const btnRef = React.createRef();
  const popoverRef = React.createRef();
  const openPopover = () => {
    new Popper(btnRef.current, popoverRef.current, {
      placement: "top",
    });
    setPopoverShow(true);
  };
  const closePopover = () => {
    setPopoverShow(false);
  };
  return (
    <>
      <button
        className={
          "font-bold uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
        }
        type="button"
        onClick={() => {
          popoverShow ? closePopover() : openPopover();
        }}
        ref={btnRef}
      >
        <AiOutlineQuestionCircle className="w-5 h-5" />
      </button>
      <div
        className={
          (popoverShow ? "" : "hidden ") +
          "bg-cyan-700 opacity-95 mb-2 block z-50 font-normal absolute leading-normal text-sm max-w-sm mx-10 text-left no-underline break-words rounded-lg"
        }
        ref={popoverRef}
      >
        <div>
          <div className="text-gray-300 text-sm font-medium p-3 flex flex-row">
            You are paying a fee to broadcast your transaction that then gets
            included in the Bitcoin blockchain. Depending how busy the ecosystem
            is, the price will go up or down. The faster you want confirmation
            of your transaction, the more you pay.
            <div className="">
              <AiOutlineCloseCircle className="w-4 h-4"></AiOutlineCloseCircle>
            </div>
          </div>
          <div className="">
            <GoTriangleDown className="-mt-1 text-cyan-700 absolute h-3 w-full left-0 top-full"></GoTriangleDown>
          </div>
        </div>
      </div>
    </>
  );
};

export default function PopoverRender() {
  return <Popover />;
}
