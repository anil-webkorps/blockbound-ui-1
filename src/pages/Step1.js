import FileUpload from "./FileUpload";

import Tooltip from "../components/Tooltip";
import ContainerGrid from "../components/ContainerGrid";
import ContainerLeft from "../components/ContainerLeft";
import ContainerRight from "../components/ContainerRight";

export default function Step1() {
  return (
    <div className="App pb-10 sm:pb-0">
      <div className="flex items-center justify-center sm:min-h-screen bg-gray-900 lg:overflow-hidden">
        <ContainerGrid>
          {/* Left side */}
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

          {/* Right side */}
          <ContainerRight>
            <div className="mx-auto w-full px-4 sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center justify-center">
              <FileUpload />
            </div>
          </ContainerRight>
        </ContainerGrid>
      </div>
    </div>
  );
}
