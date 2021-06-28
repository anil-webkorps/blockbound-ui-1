import { AiFillFileAdd } from "react-icons/ai";
import { AiOutlineArrowRight } from "react-icons/ai";
import React, { useContext, useState, useEffect } from "react";
import { FileContext } from "../context/FileContext";
import { useHistory } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import ButtonNext from "../components/ButtonNext";
import ButtonBack from "../components/ButtonBack";
import CircularProgress from "@material-ui/core/CircularProgress";

import CryptoJS from "crypto-js";


import StripeCheckout from "react-stripe-checkout";

export default function FileUpload() {
  const history = useHistory();
  const fileContext = useContext(FileContext);
  const [hashError, setHashError] = useState(false);

  const addFile = (target, file) => {
    fileContext.setConfiguration({
      ...fileContext.configuration,
      ["isFile"]: true,
      ["file"]: file,
    });
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#22D3EE",
      },
      secondary: {
        main: "#E33E7F",
      },
    },
  });

  var gallery = document.getElementById("gallery");

  const hiddenClick = (e) => {
    document.getElementById("hidden-input").click();
  };

  const onChangeFile = (e) => {
    for (const file of e.target.files) {
      addFile(gallery, file);
    }
  };

  const hasFiles = ({ dataTransfer: { types = [] } }) =>
    types.indexOf("Files") > -1;

  const dropHandler = (ev) => {
    ev.preventDefault();
    for (const file of ev.dataTransfer.files) {
      addFile(gallery, file);
    }
  };

  const dragOverHandler = (e) => {
    if (hasFiles(e)) {
      e.preventDefault();
    }
  };

  const generateHash = () => {
    var reader = new window.FileReader();

    reader.onloadend = async (e) => {
      var wordArray = CryptoJS.lib.WordArray.create(e.target.result);

      let new_hash = CryptoJS.SHA256(wordArray).toString();
      fileContext.setLoading(true);
      let status = await fileContext.getStatus(new_hash);
      fileContext.setLoading(false);
      fileContext.setConfiguration({
        ...fileContext.configuration,
        ["isHash"]: true,
        ["hash"]: new_hash,
      });
      if (status?.pending == false) {
        history.push("/certificate/" + new_hash);
      } else {
        let val = await fileContext.registerHash(new_hash);
      }
    };
    reader.readAsArrayBuffer(fileContext.configuration["file"]);
  };

  const backToFileUpload = () => {
    fileContext.setConfiguration({
      ...fileContext.configuration,
      ["isHash"]: false,
      ["hash"]: null,
    });
  };

  const changeStep = (path) => {
    history.push("/" + path);
  };

  return (
    <>
      <input
        id="hidden-input"
        onChange={(e) => onChangeFile(e)}
        type="file"
        className="hidden"
      />

      {fileContext?.configuration?.isHash == true ? (
        <div>
          <div className="grid lg:grid-cols-1">
            <p className="mt-3 text-white font-bold text-center text-base sm:mt-5">
              Hash successfully generated.
            </p>
            <p className="mt-3 text-xs break-all text-gray-400 sm:mt-5">
              <b>Hash</b> {fileContext.configuration.hash}
            </p>
          </div>

          <div className="flex flex-col xl:flex-row justify-center space-x-0 space-y-0 xl:space-x-4 mt-10">
            <div className="order-2 xl:order-1 mt-2 xl:mt-0">
              <ButtonBack action={backToFileUpload}> Back </ButtonBack>
            </div>
            <div className="order-1 xl:order-2">
              <ButtonNext action={changeStep} path="step2">
                {" "}
                Next: Email{" "}
              </ButtonNext>
            </div>
          </div>
        </div>
      ) : fileContext?.configuration?.isFile ? (
        <>
          <div className="w-full justify-center mx-auto">
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                name="price"
                value={
                  fileContext.configuration.file &&
                  fileContext.configuration.file["name"]
                }
                id="price"
                disabled="disabled"
                className="block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-l-md rounded-r-xl"
                placeholder="0.00"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                  type="button"
                  onClick={(e) => hiddenClick(e)}
                  className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-r-md text-white bg-gray-700 hover:bg-gray-600 h-full"
                >
                  Browse
                </button>
              </div>
            </div>
            {hashError && (
              <div className="text-red-400">File already exist!</div>
            )}
            <div className="pt-4 w-full lg:w-8/12 mx-auto">
              {fileContext.loading ? (
                <MuiThemeProvider theme={theme}>
                  <CircularProgress
                    size={30}
                    color="primary"
                    style={{ marginLeft: "40%" }}
                  />
                </MuiThemeProvider>
              ) : (
                <button
                  type="button"
                  onClick={() => generateHash()}
                  className="flex justify-center w-full rounded-md border border-transparent py-2 bg-gray-600 text-base font-medium text-white shadow hover:bg-gray-700 focus:outline-none px-6"
                >
                  Generate Hash{" "}
                  <AiOutlineArrowRight className="self-center ml-2 h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div
          className="flex justify-center w-full sm:w-full mx-auto px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
          onDrop={(e) => dropHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onClick={(e) => hiddenClick(e)}
        >
          <div className="space-y-1 text-center">
            <div className="flex text-gray-300 items-center justify-center text-3xl">
              <AiFillFileAdd />
            </div>
            <div className="flex text-sm text-gray-300">
              <p className="pl-1">Drop file here or click to select</p>
            </div>
            <p className="text-xs text-gray-400">Any file type up to 10MB</p>
          </div>





        </div>
      )}

      <template id="file-template">
        <li className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
          <article
            tabIndex="0"
            className="group w-full h-full rounded-md focus:outline-none focus:shadow-outline elative bg-gray-100 cursor-pointer relative shadow-sm"
          >
            <img
              alt="upload preview"
              className="img-preview hidden w-full h-full sticky object-cover rounded-md bg-fixed"
            />

            <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
              <h1 className="flex-1 group-hover:text-blue-800"></h1>
              <div className="flex">
                <span className="p-1 text-blue-800">
                  <i>
                    <svg
                      className="fill-current w-4 h-4 ml-auto pt-1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M15 2v5h5v15h-16v-20h11zm1-2h-14v24h20v-18l-6-6z" />
                    </svg>
                  </i>
                </span>
                <p className="p-1 size text-xs text-gray-700"></p>
                <button className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md text-gray-800">
                  <svg
                    className="pointer-events-none fill-current w-4 h-4 ml-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="pointer-events-none"
                      d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                    />
                  </svg>
                </button>
              </div>
            </section>
          </article>
        </li>
      </template>

      <template id="image-template">
        <li className="block p-1 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/8 h-24">
          <article
            tabIndex="0"
            className="group hasImage w-full h-full rounded-md focus:outline-none focus:shadow-outline bg-gray-100 cursor-pointer relative text-transparent hover:text-white shadow-sm"
          >
            <img
              alt="upload preview"
              className="img-preview w-full h-full sticky object-cover rounded-md bg-fixed"
            />

            <section className="flex flex-col rounded-md text-xs break-words w-full h-full z-20 absolute top-0 py-2 px-3">
              <h1 className="flex-1"></h1>
              <div className="flex">
                <span className="p-1">
                  <i>
                    <svg
                      className="fill-current w-4 h-4 ml-auto pt-"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z" />
                    </svg>
                  </i>
                </span>

                <p className="p-1 size text-xs"></p>
                <button className="delete ml-auto focus:outline-none hover:bg-gray-300 p-1 rounded-md">
                  <svg
                    className="pointer-events-none fill-current w-4 h-4 ml-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="pointer-events-none"
                      d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
                    />
                  </svg>
                </button>
              </div>
            </section>
          </article>
        </li>
      </template>
    </>
  );
}
