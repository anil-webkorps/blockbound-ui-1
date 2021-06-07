import ListboxCurrency from "../components/ListboxCurrency";
import ListboxTransactionSpeed from "../components/ListboxTransactionSpeed";
import Tooltip from "../components/Tooltip";
import ButtonNext from "../components/ButtonNext";
import ButtonBack from "../components/ButtonBack";
import ContainerGrid from "../components/ContainerGrid";
import ContainerLeft from "../components/ContainerLeft";
import ContainerRight from "../components/ContainerRight";
import Hash from "../components/Hash";
import { useHistory } from "react-router-dom";
import React, { useState, useContext, useEffect } from "react";
import { FileContext } from "../context/FileContext";
import { paymentValidate } from "./Validate";
import StripeCheckout from "react-stripe-checkout";
import classnames from "classnames";
import { AiOutlineArrowRight } from "react-icons/ai";
import CircularProgress from "@material-ui/core/CircularProgress";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

export default function Step3() {
  const history = useHistory();
  const fileContext = useContext(FileContext);
  const [allError, setAllError] = useState({});

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

  useEffect(() => {
    fileContext.setLoading(false);
    fileContext.getPriceList();
  }, []);

  useEffect(() => {
    if (!fileContext?.configuration?.isFile) {
      history.push("/");
    }
  }, []);

  const changePage = (path) => {
    let render_path = path ? path : "";
    history.push("/" + render_path);
  };

  const fromEuroToCent = (amount) => amount*100;

  const successPayment = () => {
    history.push("/Success");
  };

  const onToken = async (token) => {
    fileContext.setLoading(true);
    let val = await fileContext?.storeTokenDetail(
      token,
      fileContext?.configuration?.currency,
      fileContext?.configuration?.price,
      "Payment",
      fileContext?.configuration?.hash,
      fileContext?.configuration?.email,
      fileContext?.configuration?.add_in_mail
    );

    fileContext.setLoading(false);
    if (val?.success) {
      successPayment();
    } else {
      let errors = {};
      errors["transaction"] = val?.error
        ? val?.error
        : "Network Error, Please try again";
      setAllError({ ...allError, errors });
    }
  };

  const handleSubmit = (e) => {
    let { isValid } = paymentValidate(fileContext, allError, setAllError);
    if (isValid) {
    } else {
      return e.stopPropagation();
    }
  };

  return (
    <div className="App pb-10 sm:pb-0">
      <div className="flex items-center justify-center sm:min-h-screen bg-gray-900 lg:overflow-hidden">
        <ContainerGrid>
          {/* Left side start */}
          <ContainerLeft>
            <h1 className="text-4xl tracking-tight font-extrabold text-gray-100 sm:text-6xl xl:text-6xl">
              Step 3
            </h1>
            <h2 className="mt-2 text-2xl tracking-tight font-semibold text-gray-200 sm:text-3xl xl:text-3xl">
              Transaction speed <Tooltip />
            </h2>
            <p className="mt-3 text-base text-gray-400 sm:mt-5">
              Here is where you select how fast you would like your hash added
              to the bitcoin blockchain. Unless you're in a real hurry, there's
              no good reason not to save some money by choosing the lowest price
              and speed on offer!
            </p>
            <Hash mt="8"> </Hash>
          </ContainerLeft>

          {/* Left side end */}

          {/* Right side start */}
          <ContainerRight>
            <div>
              <div>
                <ListboxCurrency />
                <div className="text-red-400">{allError?.errors?.currency}</div>
              </div>
              <div className="mt-4">
                <ListboxTransactionSpeed />
                <div className="text-red-400">{allError?.errors?.speed}</div>
              </div>
              {fileContext?.configuration?.speed && (
                <a className="whitespace-nowrap mt-4 inline-flex items-center justify-center px-4 py-2 rounded-md text-base font-medium text-gray-300 border-2 border-gray-400">
                  Total:{" "}
                  {fileContext?.configuration?.price
                    ? fileContext.configuration.price
                    : "00"}{" "}
                  {fileContext?.configuration.currency}
                </a>
              )}
              <div className="text-red-400">
                {allError?.errors?.transaction}
              </div>
            </div>
            <div className="flex flex-col xl:flex-row justify-center space-x-0 space-y-0 xl:space-x-4 mt-10">
              <div className="order-2 xl:order-1 mt-2 xl:mt-0">
                <ButtonBack action={changePage} path="step2">
                  {" "}
                  Back{" "}
                </ButtonBack>
              </div>
              <div className="order-1 xl:order-2">
                {/* <ButtonNext action={handleSubmit}> Next: Payment </ButtonNext> */}
                {fileContext.loading ? (
                  <MuiThemeProvider theme={theme}>
                    <CircularProgress
                      size={30}
                      color="primary"
                      style={{ marginLeft: "40%" }}
                    />
                  </MuiThemeProvider>
                ) : (
                  <StripeCheckout
                    token={onToken}
                    stripeKey="pk_live_hh743xIIEN9oZK8kYIDfCkDH"
                    shippingAddress
                    billingAddress={true}
                    amount={fromEuroToCent(fileContext?.configuration?.price)}
                    currency={fileContext?.configuration?.currency}
                    email={fileContext?.configuration?.email}
                  >
                    <button
                      className={classnames(
                        "flex justify-center w-full rounded-md border border-transparent py-2 bg-gray-800 text-base font-medium text-white shadow hover:bg-gray-700 focus:outline-none px-4"
                      )}
                      onClick={(e) => handleSubmit(e)}
                    >
                      Next: Payment{" "}
                      <AiOutlineArrowRight className="self-center ml-2 h-4 w-4" />
                    </button>
                  </StripeCheckout>
                )}
              </div>
            </div>
          </ContainerRight>
        </ContainerGrid>

        {/* Right side end */}
      </div>
    </div>
  );
}
