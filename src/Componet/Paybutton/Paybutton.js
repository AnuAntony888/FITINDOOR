import React, { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Payequestion from "./Payequestion";
const Paybutton = ({
  total_price,
  inputcoupcode,
  inputValue,
  handleonclick,
  setcodamount,
}) => {
  const onToken = (token) => {
    // console.log(token);
  };
  const stripePromise = loadStripe(
    "pk_live_51KBhDAJbgv6bsCXgNRCpHWXEWspqHYXnUqybjc1lBfv1SuE9A9kA1N4F92jozXO9ydbhVBF0uGqPTnGj7a4pLqWh00HtiHYuvl"
  );

  return (
    <div>
      <Elements
        stripe={
          stripePromise
          //"pk_test_51MA5JESDQGBMlBBlpOOIFucjsB4s6oOaZTHIuEVfgQDapT9oqVfppRGBYBmTgZEjs94cgOcNqlQI8xL3a94u4Ewk00yshJzGgR"
        }
      >
        <Payequestion
          total_price={total_price}
          inputcoupcode={inputcoupcode}
          inputValue={inputValue}
          handleonclick={handleonclick}
          setcodamount={setcodamount}
        />
      </Elements>
    </div>
  );
};

export default Paybutton;
