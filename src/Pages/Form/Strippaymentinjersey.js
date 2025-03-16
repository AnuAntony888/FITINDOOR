import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../../Componet/Paybutton/Paybutton.css";
import TextField from "@mui/material/TextField";

import {
  Getjerseyseccrete,
  useBadmintonJerseyOrderForm,
} from "../../client-api/ApiHome";
import { Toastsucess } from "../../Componet/ReusableComponet/toast/Toast";

export default function Strippaymentinjersey({
  firstname,
  lastname,
  jersey,
  tshirt,
  email,
  phone,
  setFirstName,
  setLastName,
  setJersey,
  setEmail,
  setPhone,
  setTshirt,
  setLocalStorageUpdated,
  selectedLocation,
  setSelectedLocation,
}) {
  const { JerseyOrderForm, isJerseyOrderFormLodaing, isJerseyOrderFormerror } =
    useBadmintonJerseyOrderForm();

  // Retrieving jerseycart data
  const jerseycartData = JSON.parse(localStorage.getItem("jerseycart")) || [];
  console.log(firstname, lastname, jersey, tshirt, email, phone, "ddddd");
  // Retrieving jerseycartTotal data
  const jersycartTotal = localStorage.getItem("jersycartTotal") || 0;

  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("");
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setErrors] = useState(null);

  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { getjerseyseccrete } = Getjerseyseccrete(
    jersycartTotal * 100,
    firstname,
    lastname,

    email,
    phone,
    selectedLocation
  );

  // console.log("clientsecrit", clientSecret);
  const getData = async () => {
    const formData = new FormData();
    if (
      !firstname ||
      !email ||
      !phone ||
      !selectedLocation ||
      jerseycartData.length == 0
    ) {
      Toastsucess("Please fill your Address");

      return;
    }
    for (let i = 0; i < jerseycartData.length; i++) {
      formData.append(
        "jerseycart[" + i + "][product][qty]",
        jerseycartData?.[i]?.quantity
      );
      formData.append(
        "jerseycart[" + i + "][product][name]",
        jerseycartData?.[i]?.name
      );
      formData.append(
        "jerseycart[" + i + "][product][price]",
        jerseycartData?.[i]?.price
      );
      formData.append(
        "jerseycart[" + i + "][product][total]",
        jerseycartData?.[i]?.total
      );
      formData.append(
        "jerseycart[" + i + "][product][size]",
        jerseycartData?.[i]?.size
      );

      formData.append(
        "jerseycart[" + i + "][product][type]",
        jerseycartData?.[i]?.type
      );
      formData.append(
        "jerseycart[" + i + "][product][category]",
        jerseycartData?.[i]?.category
      );
    }
    formData.append("billing_adrress[firstname]", firstname);

    formData.append("billing_adrress[lastname]", lastname);
    formData.append("billing_adrress[email]", email);
    formData.append("billing_adrress[phone]", phone);
    formData.append("nameon[tShirt]", tshirt);
    formData.append("nameon[jersey]", jersey);
    formData.append("total_amount", jersycartTotal);
    formData.append("payment_status", 1);
    formData.append("location", selectedLocation);
    Toastsucess("Thanks for Your Order!", "sucess", "light");
    // Remove data from local storage
    localStorage.removeItem("jerseycart");
    localStorage.removeItem("jersycartTotal");
    setLocalStorageUpdated((prev) => !prev);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setJersey("");
    setTshirt("");
    setSelectedLocation("");
    return await JerseyOrderForm(formData);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    if (!firstname || !email || !phone || jerseycartData.length == 0) {
      setProcessing(false);
      Toastsucess("Please fill your Address");

      return;
    }
    // Check if the name field is empty
    if (!ev.target.name.value.trim()) {
      Toastsucess("Please fill in the name field.");
      setProcessing(false);
      return; // Return to stop further processing
    }

    console.log("payload");

    const seccretecode = await getjerseyseccrete();
    const payload = await stripe.confirmCardPayment(
      seccretecode?.clientSecret,

      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: ev.target.name.value,
          },
        },
      }
    );

    if (payload.error) {
      Toastsucess(`Your Payment is failed: ${payload.error.message}`);

      setProcessing(false);
      console.log("[error]", payload.error);

      const cardElement = elements.getElement(CardElement);
      cardElement.clear();

      ev.target.name.value = "";
    } else {
      setErrors(null);
      renderSuccess();
      setProcessing(false);
      const result = await getData();
      window.location.href = "/Thankyou";
      console.log("[PaymentIntent]", payload.paymentIntent);
    }
  };

  const renderSuccess = () => {
    Toastsucess("Your  payment succeeded!", "sucess", "light");

    // Reset card element to clear card details
    const cardElement = elements.getElement(CardElement);
    cardElement.clear();

    const nameInput = document.getElementById("name");
    if (nameInput) {
      nameInput.value = "";
    }
  };

  const renderForm = () => {
    const options = {
      hidePostalCode: true,

      style: {
        base: {
          color: "#32325d",

          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
        invalid: {
          color: "#fa755",
          iconColor: "#fa755a",
        },
      },
    };

    return (
      <>
        <form onSubmit={handleSubmit}>
          <div className="sr-combo-inputs">
            <div className="sr-combo-inputs-row">
              <TextField
                autoComplete="cardholder"
                name="name"
                id="name"
                placeholder="Name"
                margin="normal"
                variant="outlined"
                className="textfieldloginuser"
                type="text"
                size="small"
                inputProps={{ style: { padding: "2px 14px" } }}
              />
            </div>
            <br />
            <div className="sr-combo-inputs-row">
              <CardElement
                className="sr-input sr-card-element"
                options={options}
              />
            </div>
          </div>

          {error && <div className="message sr-field-error">{error}</div>}
          <br />
          <button variant="contained" className="stripejerseypaymentbutton">
            {processing ? "Processing…" : "Pay"}
          </button>
        </form>
      </>
    );
  };

  return (
    <div className="checkout-form">
      <div className="sr-payment-form">
        <div className="sr-form-row" />
        {succeeded ? renderSuccess() : renderForm()}
      </div>
    </div>
  );
}
