import Input from "../components/Input";
import ButtonBack from "../components/ButtonBack";
import ButtonConfirm from "../components/ButtonConfirm";
import ContainerGrid from "../components/ContainerGrid";
import ContainerLeft from "../components/ContainerLeft";
import ContainerRight from "../components/ContainerRight";
import { useHistory } from 'react-router-dom';
import React, { useState, useContext, useEffect } from "react";
import { FileContext } from "../context/FileContext";
import {cardValidate} from "./Validate";
import StripeCheckout from 'react-stripe-checkout';
import classnames from "classnames";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Step4() {

  const history = useHistory();
  const fileContext = useContext(FileContext);
  const [allError, setAllError] = useState({})
  

  const changePage = (path) => {
    let render_path = path?path:''
    history.push("/"+render_path);
  }
  const handleSubmit = (e) => {
    let { isValid } = cardValidate(fileContext, allError, setAllError)
    if(isValid)
    {
    }else{
      return e.stopPropagation()
    }
  }
  const onToken = (token, addresses) => {
    history.push("/Success");
  }
  useEffect(() => {
    if(!fileContext?.configuration?.isFile)
    {
      history.push("/");
    }  
  }, [])
  return (
    <div className="App pb-10 sm:pb-0">
      <div className="flex items-center justify-center sm:min-h-screen bg-gray-900 lg:overflow-hidden">
        <ContainerGrid>
          {/* Left side */}
          <ContainerLeft>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-100 sm:text-6xl xl:text-6xl">
              Step 4
            </h1>
            <h2 className="mt-2 text-2xl tracking-tight font-semibold text-gray-200 sm:text-3xl xl:text-3xl">
              Payment{" "}
            </h2>
            <p className="mt-3 text-base text-gray-400 sm:mt-5">
              One of the key benefits of Blockbound is you can pay in your local
              currency as you would at any other online shop - no need to own
              Bitcoin (although we recommend getting some of this fabulous
              future money 😉)
            </p>
            <div className="break-words">
              <p className="mt-3 text-xs text-gray-600 sm:mt-5">
                Hash
                {fileContext?.configuration?.hash && fileContext.configuration.hash}
              </p>
            </div>
          </ContainerLeft>

          {/* Right side */}
          <ContainerRight>
            <div>
              <div>
                {/* card details */}
                <label
                  id="listbox-label"
                  className="mb-1 block text-sm font-medium text-gray-500 text-left"
                >
                  Card number
                </label>
                <Input placeholder="Card Number" name="card_number" type="text" />
                <div className="text-red-400">{allError?.errors?.card_number}</div>
              </div>

              <div>
                <label
                  id="listbox-label"
                  className="mb-1 mt-4 block text-sm font-medium text-gray-500 text-left"
                >
                  Billing address
                </label>
                <Input placeholder="Billing Address" name="billing_address" type="text" />
                <div className="text-red-400">{allError?.errors?.billing_address}</div>
              </div>

              <div className="grid xl:grid-cols-2 break-all mt-6 pb-3">
                <div>
                  <p className="text-base font-semibold text-gray-400 sm:text-xl lg:text-lg tracking-tight">
                    Hash
                  </p>
                  <p className="text-xs text-gray-500">
                    {fileContext?.configuration?.hash && fileContext.configuration.hash}
                  </p>
                </div>
                <div className="xl:justify-self-end tracking-tight mt-4 xl:mt-0">
                  <p className="text-base font-semibold text-gray-400 sm:text-xl lg:text-lg">
                    Transaction speed
                  </p>
                  <p className="text-sm text-gray-500 leading-tight -mt-1">
                    {fileContext?.configuration?.speed ? fileContext.configuration.speed: "Select transaction speed"}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <a className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 rounded-md text-base font-medium text-gray-300 border-2 border-gray-400">
                  Total: {fileContext?.configuration?.price ? fileContext.configuration.price: "00"} {fileContext?.configuration['currency']}
                </a>
              </div>
            </div>

            <div className="flex flex-col xl:flex-row justify-center space-x-0 space-y-0 xl:space-y-0 xl:space-x-4 mt-10">
              <div className="flex order-2 xl:order-1 pb-3">
                <ButtonBack action={changePage} path="step3"> Back </ButtonBack>
              </div>
              <div className="flex order-1 xl:order-2 pb-3">
                {/* <ButtonConfirm action={handleSubmit}> Confirm and pay </ButtonConfirm> */}
                <StripeCheckout
                  token={onToken}
                  stripeKey="pk_live_hh743xIIEN9oZK8kYIDfCkDH"
                  shippingAddress
                  billingAddress={true}
                  amount={fileContext?.configuration?.price*100}
                  currency={fileContext?.configuration?.currency}
                  billingAddress={fileContext?.configuration?.billing_address}
                  email={fileContext?.configuration?.email}
                >
                  <button 
                    className={classnames(
                      "flex justify-center w-full rounded-md border border-transparent py-2 bg-gray-800 text-base font-medium text-white shadow hover:bg-gray-700 focus:outline-none px-4"
                    )}
                    onClick={(e)=>handleSubmit(e)}
                  >
                    Submit <AiOutlineArrowRight className="self-center ml-2 h-4 w-4" />
                  </button>
                </StripeCheckout>
              </div>
            </div>
          </ContainerRight>
        </ContainerGrid>
      </div>
    </div>
  );
}
