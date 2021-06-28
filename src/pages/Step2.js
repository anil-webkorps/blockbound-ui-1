import Input from "../components/Input";
import Toggle from "../components/Toggle";
import ButtonNext from "../components/ButtonNext";
import ButtonBack from "../components/ButtonBack";
import ContainerGrid from "../components/ContainerGrid";
import ContainerLeft from "../components/ContainerLeft";
import ContainerRight from "../components/ContainerRight";
import Hash from "../components/Hash";
import React, { useState, useContext, useEffect } from "react";
import { FileContext } from "../context/FileContext";
import { useHistory } from 'react-router-dom';
import {emailValidate} from "./Validate";

export default function Step2() {

  const history = useHistory();
  const fileContext = useContext(FileContext);
  const [allError, setAllError] = useState({});


  const handleSubmit = () => {
    let { isValid,errors } = emailValidate(fileContext, allError, setAllError)
    if(isValid)
    {
      fileContext.setConfiguration({...fileContext.configuration, isEmail:true})
      changePage("step3")
    }
  }

  const changePage = (path) => {
    let render_path = path?path:''
    history.push("/"+render_path);
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
              Step 2
            </h1>
            <h2 className="mt-2 text-2xl tracking-tight font-semibold text-gray-200 sm:text-3xl xl:text-3xl">
              Enter email{" "}
            </h2>
            <p className="mt-3 text-base text-gray-400 sm:mt-5">
              We will email you your certificate and receipt. The certificate
              includes everything you need to find your hash on the blockchain
              in the future. You can opt in to receive email updates from us on
              future Blockbound features and if you do, we promise never to pass
              your email on to third-parties.
            </p>
            <Hash />
          </ContainerLeft>

          {/* Right side */}
          <ContainerRight>
            <div>
              <label
                forhtml="email"
                className="mb-1 block text-sm font-medium text-gray-500 text-left"
              >
                Email
              </label>
              <Input placeholder="Enter your email...." name="email" type="email" />
              <div className="text-red-400">{allError?.errors?.email}</div>
            </div>
            <div className="mt-4">
              <label
                forhtml="confirm_email"
                className="mb-1 block text-sm font-medium text-gray-500 text-left"
              >
                Confirm email
              </label>
              <Input placeholder="Confirm your email...." name="confirm_email" type="email" />
              <div className="text-red-400">{allError?.errors?.confirm_email}</div>
            </div>
            <div className="mt-4 flex items-center">
              <Toggle />
              <p className="text-sm ml-2 text-gray-500">
                Add me to the Blockbound mailing list.
              </p>
            </div>

            <div className="flex flex-col xl:flex-row justify-center space-x-0 space-y-0 xl:space-x-4 mt-10">
              <div className="order-2 xl:order-1 mt-2 xl:mt-0">
                <ButtonBack action={changePage}> Back </ButtonBack>
              </div>
              <div className="order-1 xl:order-2">
                <ButtonNext action={handleSubmit}> Next: Payment </ButtonNext>
              </div>
            </div>
          </ContainerRight>
        </ContainerGrid>
      </div>
    </div>
  );
}
