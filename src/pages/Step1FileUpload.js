import { AiOutlineQuestionCircle } from "react-icons/ai";

import Header from "../components/Header";
import FileUpload from "./FileUpload";
import ListboxCurrency from "../components/ListboxCurrency";
import ListboxTransactionSpeed from "../components/ListboxTransactionSpeed";
import Tooltip from "../components/Tooltip";
import ButtonNext from "../components/ButtonNext";
import ButtonBack from "../components/ButtonBack";
import ButtonConfirm from "../components/ButtonConfirm";
import ContainerGrid from "../components/ContainerGrid";
import ContainerLeft from "../components/ContainerLeft";
import ContainerRight from "../components/ContainerRight";
import Hash from "../components/Hash";
import Input from "../components/Input";
import Toggle from "../components/Toggle";

import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import FileBrowse from "../components/FileBrowse";

export default function Step1() {
  return (
    <div className="App pb-10 sm:pb-0">
      <div className="flex items-center justify-center sm:min-h-screen bg-gray-900 lg:overflow-hidden">
        <ContainerGrid>
          {/* Left side start */}
          <ContainerLeft>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-100 sm:text-6xl xl:text-6xl">
              Step 1
            </h1>
            <h2 className="mt-2 text-2xl tracking-tight font-semibold text-gray-200 sm:text-3xl xl:text-3xl">
              Hash Creation <Tooltip />
            </h2>
            <p className="mt-3 text-base text-gray-400 sm:mt-5">
              This is where you create the unique 'hallmark' for you file called
              the hash. Rather than uploading your file, it is this hash, the
              fingerprint of your file, that is permanently bound to the
              blockchain.
            </p>
          </ContainerLeft>

          {/* Left side end */}

          {/* Right side start */}
          <ContainerRight>
            <div>
              <FileBrowse />
            </div>

            <div className="flex flex-col xl:flex-row justify-center space-x-0 space-y-0 xl:space-x-4 mt-6">
              <div className="">
                <ButtonConfirm> Generate Hash </ButtonConfirm>
              </div>
            </div>
          </ContainerRight>
        </ContainerGrid>

        {/* Right side end */}
      </div>
    </div>
  );
}
