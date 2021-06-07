import FileUpload from "./FileUpload";

import Tooltip from "../components/Tooltip";
import ContainerGrid from "../components/ContainerGrid";
import ContainerLeft from "../components/ContainerLeft";
import ContainerRight from "../components/ContainerRight";
import { FileContext } from "../context/FileContext";
import ButtonTransaction from "../components/ButtonTransaction";
import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from 'react-router-dom';

export default function Success() {
  const fileContext = useContext(FileContext);
  const history = useHistory();
  const location = useLocation();
  
  useEffect(() => {
    if(!fileContext?.configuration?.isFile)
    {
      history.push("/");
    } 
  }, [])

  const changePage = (path) => {
    // history.push("/");
    window.location.href = '/'
  }
  return (
    <div className="App pb-10 sm:pb-0">
      <div className="flex items-center justify-center sm:min-h-screen bg-gray-900 lg:overflow-hidden">
        <ContainerGrid>
          {/* Left side */}
          <ContainerLeft>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-100 sm:text-6xl xl:text-6xl">
              Success
            </h1>
            <p className="mt-3 text-base text-white sm:mt-5">
              Your Payment has been received and the hash of your file will be added to the Bitcoin blockchain. A receipt of this transaction has been emailed to&nbsp; 
              {fileContext?.configuration?.email}
            </p>
            <p className="mt-3 text-base text-white sm:mt-5">
              Thank you for using Blockbound
            </p>
          </ContainerLeft>

          {/* Right side */}
          <ContainerRight>
            
            <div className="grid lg:grid-cols-1">
              <p className="mt-3 text-white font-bold text-base sm:mt-5">
                Hash successfully generated.
              </p>
              <p className="text-xs break-all text-gray-400">
                {fileContext.configuration.hash}
              </p>
            </div>
            <div className="grid lg:grid-cols-1">
              <p className="mt-3 text-white font-bold text-base sm:mt-5">
                Link to Bitcoin transaction
              </p>
              <p className="text-xs break-all text-gray-400">
                Processing transaction, details will be available on certificate page
              </p>
            </div>
            <div className="grid lg:grid-cols-1">
              <p className="mt-3 text-white font-bold text-base sm:mt-5">
                Blockchain transaction speed
              </p>
              <p className="text-xs break-all text-gray-400">
                ~ {fileContext?.configuration?.speed}
              </p>
            </div>
            <div className="grid lg:grid-cols-1">
              <p className="mt-3 text-white font-bold text-base sm:mt-5">
                Free paid
              </p>
              <p className="text-xs break-all text-gray-400">
              {fileContext?.configuration['currency']} {fileContext?.configuration?.price ? fileContext.configuration.price: "00"} 
              </p>
            </div>
            <div className="grid lg:grid-cols-1">
              <p className="mt-3 text-white font-bold text-base sm:mt-5">
                Link to Blockbound certificate
              </p>
              <p className="text-xs break-all text-gray-400">
                URL: <a href={`/certificate/${fileContext?.configuration?.hash}`}>{fileContext?.configuration?.hash}</a>
                {/* url detai;l will be Certificate */}
              </p>
            </div>
            <div className="mt-3 grid lg:grid-cols-1 sm:mt-5">
              <ButtonTransaction action={changePage}>New Transaction</ButtonTransaction>
            </div>
          </ContainerRight>
        </ContainerGrid>
      </div>
    </div>
  );
}
