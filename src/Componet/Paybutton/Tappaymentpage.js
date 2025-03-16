import React, { useEffect, useState } from "react";
import { useTabPayment } from "../../client-api/Apicod";
import { Toastsucess } from "../ReusableComponet/toast/Toast";
import { useAuthContext } from "../../Context/AuthContext";

import { Button } from "@mui/material";
import { useUserContext } from "../../Context/Usercontext";
import ReactGA4 from "react-ga4";
const Tappaymentpage = ({ total_price, handleonclick }) => {
  const { getuserdata } = useAuthContext();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [value, setValue] = React.useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const { user, setUser } = useUserContext();
  const {
    first_name,
    last_name,
    email,
    phone,
    address,
    country,
    city,
    pincode,
    address2,
    city2,
    pincode2,
  } = user;
  const { Tapcharge } = useTabPayment();

  const handleChargeApi = async (token) => {
    try {
      // console.log("Calling Tapcharge function");
      const formData = new FormData();
      formData.append(
        "tap_body",
        JSON.stringify({
          amount: total_price,
          currency: "AED",
          customer_initiated: true,
          threeDSecure: true,
          save_card: false,
          description: "Test Description",
          metadata: { udf1: "Metadata 1" },
          reference: { transaction: "txn_01", order: "ord_03" },
          receipt: { email: true, sms: true },
          customer: {
            first_name: first_name,
            middle_name: first_name,
            last_name: last_name,
            email: email,
            phone: { country_code: 971, number: phone },
          },
          merchant: {
            id: "32241839",
          },
          source: { id: token },
          post: { url: "https://myfamilyfitness.com/redirect" },
          redirect: { url: "https://myfamilyfitness.com/redirect" },
        })
      );
      const result = await Tapcharge(formData);

      // Track the "shipping_info" event
      ReactGA4.event("add_shipping_info", {
        category: "Ecommerce",
        action: "Add Shipping Info",
        label: "User has submitted shipping information",
        user_id: getuserdata?.user_id ? getuserdata?.user_id : "null",
        user_email: email,
        user_phone: phone,
        user_firstname: first_name,
        user_lastname: last_name,
        shipping_address: address,
        billing_address: address2 ? address2 : address,
        shipping_city: city,
        billing_city: city2 ? city2 : city,
        shipping_pincode: pincode,
        billing_pincode: pincode2 ? pincode2 : pincode,
      });

      localStorage.setItem("chargerid", result.id);
      window.location.href = result.transaction.url;
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  useEffect(() => {
    // Initialize Tap Payments
    const tap = window.Tapjsli("pk_live_LqXUD1387jcn6MErtYNFoaV5");
    const elements = tap.elements({});
    const style = {
      base: {
        color: "#535353",
        lineHeight: "18px",
        fontFamily: "sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "rgba(0, 0, 0, 0.26)",
          fontSize: "15px",
        },
      },
      invalid: {
        color: "red",
      },
    };
    const labels = {
      cardNumber: "Card Number",
      expirationDate: "MM/YY",
      cvv: "CVV",
      cardHolder: "Card Holder Name",
    };
    const paymentOptions = {
      currencyCode: ["AED"],
      labels: labels,
      TextDirection: "ltr",
      paymentAllowed: ["VISA", "MASTERCARD", "AMERICAN_EXPRESS", "MADA"],
    };
    const card = elements.create("card", { style: style }, paymentOptions);
    card.mount("#element-container");

    card.addEventListener("change", function (event) {
      if (event.error) {
        setError(event.error.message);
      } else {
        setError("");
      }
    });
    // Save tap and card to the window object for use in handleSubmit
    window.tap = tap;
    window.card = card;
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //ceck address field all

    const addresschanges = await handleonclick();
    if (!addresschanges) {
      return;
    }

    // console.log(addresschanges, "addresscange");
    setIsProcessing(true);
    try {
      // Logic to handle user authentication or guest user scenario
      if (!getuserdata?.token) {
        // Handle storing data in local storage for guest users
        const userDataToStore = {
          first_name,
          last_name,
          email,
          phone,
          address,
          country,
          city,
          pincode,
          address2,
          city2,
          pincode2,
        };
        localStorage.setItem("guestuserData", JSON.stringify(userDataToStore));
      }
      const result = await window.tap.createToken(window.card);
      console.log(result, "result");
      if (result.error) {
        console.log("Error creating token:", result.error);
        setError(result.error.message);
        Toastsucess(error);
      } else {
        console.log("Token created successfully:", result.id);
        setToken(result.id);
        setError("");
        await handleChargeApi(result.id);
      }
    } catch (error) {
      // console.error("Token creation error:", error);
      setError("An error occurred while creating the token.");
      Toastsucess(error);
    } finally {
      setIsProcessing(false); // Set processing to false after processing is complete
    }
  };

  return (
    <>
      <form id="form-container" method="post" onSubmit={handleSubmit}>
        <div id="element-container"></div>
        <div id="error-handler" role="alert" style={{ color: "red" }}>
          {error}
        </div>

        <Button
          type="submit"
          id="tap-btn"
          variant="contained"
          className="stripepaymentbutton"
          disabled={isProcessing}
          sx={{
            backgroundColor: isProcessing ? "gray" : "black",
            "&:hover": {
              backgroundColor: "black",
            },
          }}
        >
          {isProcessing ? "Processing..." : "Submit"}
        </Button>
      </form>
    </>
  );
};

export default Tappaymentpage;
