const emailValidate = (fileContext, allError, setAllError) => {
  let input = fileContext.configuration;
  let errors = {};
  let isValid = true;

  if (!input["email"]) {
    isValid = false;
    errors["email"] = "Please enter your email Address.";
  }
  if (!input["confirm_email"]) {
    isValid = false;
    errors["confirm_email"] = "Please enter your email Address.";
  }

  if (typeof input["email"] !== "undefined") {
      
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(input["email"])) {
      isValid = false;
      errors["email"] = "Please enter valid email address.";
    }
  }

  if (typeof input["confirm_email"] !== "undefined") {
      
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(input["confirm_email"])) {
      isValid = false;
      errors["confirm_email"] = "Please enter valid email address.";
    }
  }

  if (input["email"] !== input["confirm_email"]) {
    isValid = false;
    errors["confirm_email"] = "Email and Confirm Email are not same.";
  }

  setAllError({...allError, errors})
  return { isValid,errors };
}

const paymentValidate = (fileContext, allError, setAllError) => {
  let input = fileContext.configuration;
  let errors = {};
  let isValid = true;

  if (!input["currency"]) {
    isValid = false;
    errors["currency"] = "Select currency.";
  }
  if (!input["speed"]) {
    isValid = false;
    errors["speed"] = "Select speed.";
  }

  setAllError({...allError, errors})
  return { isValid,errors };
}

const cardValidate = (fileContext, allError, setAllError) => {
  let input = fileContext.configuration;
  let errors = {};
  let isValid = true;

  var ccNum = input["card_number"];
  var visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  var mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
  var amexpRegEx = /^(?:3[47][0-9]{13})$/;
  var discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
  var isCardNumberValid = false;

  if (!input["card_number"]) {
    isValid = false;
    errors["card_number"] = "Enter card number.";
  }
  if (!input["billing_address"]) {
    isValid = false;
    errors["billing_address"] = "Enter billing address.";
  }

  if (visaRegEx.test(ccNum)) {
    isCardNumberValid = true;
  } else if(mastercardRegEx.test(ccNum)) {
    isCardNumberValid = true;
  } else if(amexpRegEx.test(ccNum)) {
    isCardNumberValid = true;
  } else if(discovRegEx.test(ccNum)) {
    isCardNumberValid = true;
  }

  if(isCardNumberValid) {
    isValid = true;
  } else {
    isValid = false;
    errors["card_number"] = "Enter valid card number.";
  }

  setAllError({...allError, errors})
  return { isValid,errors };
}
export {emailValidate, paymentValidate, cardValidate}
