import FileUpload from "./FileUpload";

import Tooltip from "../components/Tooltip";
import ContainerGrid from "../components/ContainerGrid";
import ContainerLeft from "../components/ContainerLeft";
import ContainerRight from "../components/ContainerRight";
import { FileContext } from "../context/FileContext";
import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { BiCheckCircle } from "react-icons/bi";
import { MdContentCopy } from "react-icons/md";
import moment from 'moment'
import ButtonNext from "../components/ButtonNext";
import copy from 'copy-to-clipboard'


export default function Certificate() {
  const fileContext = useContext(FileContext);
  const history = useHistory();
  const params = useParams();
  const [status, setStatus] = useState(null)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(async () => {
    let status = await fileContext.getStatus(params.hash)
    if(status?.pending)
    { 
      changeStep('/')
    }
    else{
      setStatus(status)
      fileContext.setConfiguration({...fileContext.configuration, ['isFile']:true ,['isHash']:true, ['hash']:params.hash})
    }    
  }, [])
  
  const changeStep = (path=null) =>
  {
    history.push("/"+path&&path);
  }
  const copyText = () => {
    // copy('certificate/'+params.hash)
    copy(window.location.href)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 1000)
  }
  
  return (
    <div className="App pb-10 sm:pb-0">
      <div className="flex items-center justify-center sm:min-h-screen bg-gray-900 lg:overflow-hidden">
        <ContainerGrid path="certificate">
          {/* Left side */}
          <ContainerLeft border="l">
            <h1 className="text-4xl tracking-tight font-bold sm:text-6xl sm:text-left xl:text-6xl">
              Blockbound Certificate
            </h1>
            <p className="mt-3 text-base sm:mt-10 sm:text-left">
              Irrefutable proof of existence stored forever in the blockchain.
            </p>
            <BiCheckCircle className="self-center h-6 w-6" />
            
          </ContainerLeft>

          {/* Right side */}
          <ContainerRight border='r'>
            
            <div className="grid lg:grid-cols-1">
              <p className="font-bold text-base sm:mt-5 sm:text-left">
                Blockbound transaction ID
              </p>
              <p className="text-xs break-all text-gray-400 sm:text-left">
                ID : {status?.tx ? status?.tx :'N/A'}
              </p>
            </div>
            <div className="grid lg:grid-cols-1">
              <p className="mt-3 font-bold text-base sm:mt-5 sm:text-left">
                Transaction date
              </p>
              <p className="text-xs break-all text-gray-400 sm:text-left">
                Date : {status?.tx ? moment(status.txstamp).format("MMM DD YYYY") : 'N/A'}
              </p>
            </div>
            <div className="grid lg:grid-cols-1">
              <p className="mt-3 font-bold text-base sm:mt-5 sm:text-left">
                Hash added to Bitcoin blockchain
              </p>
              <p className="text-xs break-all text-gray-400 sm:text-left">
                ~ {params.hash}
              </p>
            </div>
            <div className="grid lg:grid-cols-1">
              <p className="mt-3 font-bold text-base sm:mt-5 sm:text-left">
                Time added to Bitcoin blockchain
              </p>
              <p className="text-xs break-all text-gray-400 sm:text-left">
                time : {status?.tx ? moment(status.txstamp).format("h:mm A") : 'N/A'}
              </p>
            </div>
            <div className="grid lg:grid-cols-1">
              <p className="mt-3 font-bold text-base sm:mt-5 sm:text-left">
                View this transaction on the blockchain
              </p>
              <p className="text-xs break-all text-gray-400 sm:text-left block">
                URL :  
                {/* <a className="border-b-2" href={`/certificate/${params.hash}`}>{params.hash}</a> */}
                <span><a copyText className="border-b-2 inline-block" href="javascript:void(0)" onClick={() => copyText()}>
                  {params.hash} <MdContentCopy className="inline-block" /> 
                </a>
                </span>
                
              </p>
            </div>
            {/* {status?.pending == true &&
            <div className="grid lg:grid-cols-1 h-20">
              <p className="mt-3 text-xs break-all text-gray-400 sm:mt-5 sm:text-left">
                Payment is still pending, Please pay to complete your registration
              </p>
              <ButtonNext action={changeStep} path="step2"> Pay </ButtonNext>
            </div>
            } */}
          </ContainerRight>
        </ContainerGrid>
      </div>
    </div>
  );
}
