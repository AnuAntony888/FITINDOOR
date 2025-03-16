import React, { useEffect, useState } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import "./Paybutton.css";
import TextField from "@mui/material/TextField";
import COD from "./COD";
import { GetsendSecrete, useCOD, useCODGuest } from "../../client-api/Apicod";

import { useAuthContext } from "../../Context/AuthContext";
import { Toastsucess } from "../ReusableComponet/toast/Toast";
import ReactGA4 from "react-ga4";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Label } from "reactstrap";
import Tappaymentpage from "./Tappaymentpage";
import { useUserContext } from "../../Context/Usercontext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ backgroundColor: "whitesmoke" }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Payequestion({
  total_price,
  inputcoupcode,
  inputValue,
  handleonclick,
  setcodamount,
}) {
  const { user } = useUserContext();
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
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const [amount, setAmount] = useState(0);
  // const [currency, setCurrency] = useState("");
  // const [clientSecret, setClientSecret] = useState(null);
  const [errors, setErrors] = useState(null);
  // const [metadata, setMetadata] = useState(null);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const [value, setValue] = React.useState(0);
  const savedCouponAmt = localStorage.getItem("couponAmt");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      setcodamount(true);
    } else {
      setcodamount(false);
    }
  };

  const { getuserdata } = useAuthContext();
  // const { data, error, isLoading } = useProfile(getuserdata);
  // const checkOutTotal = localStorage.getItem("cartTotal");
  const { getsendSecrete } = GetsendSecrete(total_price * 100);
  const { orderwithcod } = useCOD(getuserdata);
  const { orderwithcodguest } = useCODGuest();
  const cart_items = JSON.parse(localStorage.getItem("cart_items"));
  // console.log("clientsecrit", clientSecret);
  const getData = async () => {
    const formData = new FormData();
    for (let i = 0; i < cart_items.length; i++) {
      formData.append(
        "cart[" + i + "][product][qty]",
        cart_items?.[i]?.cartCount
      );
      formData.append(
        "cart[" + i + "][product][price]",
        cart_items?.[i]?.product.unit_price
      );

      formData.append(
        "cart[" + i + "][product][discount_price]",
        cart_items?.[i]?.product.discount_price
          ? cart_items?.[i]?.product.discount_price
          : 0
      );
      formData.append(
        "cart[" + i + "][product][productid]",
        cart_items?.[i]?.product.product_id
      );
    }
    formData.append("coupon", inputcoupcode ? inputcoupcode : "null");
    formData.append("coupon_amt", savedCouponAmt);
    formData.append("billing_adrress[firstname]", first_name);
    formData.append("billing_adrress[lastname]", last_name);
    formData.append("billing_adrress[email]", email);
    formData.append("billing_adrress[address]", address ? address : address2);
    formData.append("billing_adrress[mob]", phone);
    formData.append("shipping_adrress[email]", email);
    formData.append("shipping_adrress[mob]", phone);
    formData.append("shipping_adrress[address]", address2);
    formData.append("status", 1);
    if (getuserdata) {
      formData.append("user_id", getuserdata?.user_id);
    }

    formData.append("pay_method", "online");
    formData.append("note", inputValue ? inputValue : "null");
    formData.append("shipping_adrress[city]", city2);
    formData.append("billing_adrress[city]", city ? city : city2);
    formData.append("billing_adrress[pincode]", pincode ? pincode : pincode2);
    formData.append("shipping_adrress[pincode]", pincode2);
    //full console
    // Optionally, log all the form data
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    // return;
    if (getuserdata?.token) {
      const response = await orderwithcod(formData);
      return response;
    } else {
      const response = await orderwithcodguest(formData);
      const orderId = response?.order?.id;
      localStorage.setItem("orderId", orderId);
      return response;
    }
  };

  const userInfo = {
    user_id: getuserdata?.user_id ? getuserdata?.user_id : null,
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
  };
  const mappedCartItems = (cart_items || []).map((product) => ({
    id: product?.product?.product_id,
    name: product?.product?.name,
    slug: product?.product?.slug,
    price: product?.product?.unit_price,
    discount: product?.product?.discount_price,
    item_brand: product?.product?.brand_name,
    item_category: product?.product?.category,
    item_category2: product?.product?.childCat,
    sku_id: product?.product?.sku,
    short_description: product?.product?.short_description,
    quantity_label: product?.product?.quantity_label,
    quantity: product?.cartCount,
  }));
  const getSecretcodeAPI = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(email);

      if (!first_name || first_name === "undefined" || !last_name) {
        Toastsucess("Please fill your First Name and lastname");
        setProcessing(false);
        return false;
      }
      if (!phone) {
        Toastsucess("Please fill in your phone");
        setProcessing(false);
        return false;
      }
      if (!isValidEmail) {
        Toastsucess("Please provide a valid email address");
        setProcessing(false);
        return false;
      }

      if (!address2) {
        Toastsucess("Please fill in your address");
        setProcessing(false);
        return false;
      }

      if (!country) {
        Toastsucess("Please fill in your country");
        setProcessing(false);
        return false;
      }
      if (!city2) {
        Toastsucess("Please fill in your city");
        setProcessing(false);
        return false;
      }
      if (!pincode2) {
        Toastsucess("Please fill in your pincode");
        setProcessing(false);
        return false;
      }

      const formData = new FormData();
      formData.append("description", email);
      formData.append("shipping[name]", first_name);
      formData.append("shipping[address][line1]", address2);
      formData.append("shipping[address][postal_code]", pincode2);
      formData.append("shipping[address][city]", city2);
      formData.append("shipping[address][state]", city2 ? city2 : city);
      formData.append("shipping[address][country]", "US");
      const response = await getsendSecrete(formData);
      return response;
    } catch (error) {
      Toastsucess(error.message);

      setProcessing(false);
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    // Check if the name field is empty
    if (!ev.target.name.value.trim()) {
      Toastsucess("Please fill in the name field.");
      setProcessing(false);
      return; // Return to stop further processing
    }

    const seccretecode = await getSecretcodeAPI();
    // console.log(seccretecode, "secretcode");
    const payload = await stripe.confirmCardPayment(
      seccretecode?.clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: ev.target.name.value,
          },
        },
      }
    );

    if (payload.error) {
      // Toastsucess("Your Payment is failed");
      Toastsucess(`Your Payment is failed: ${payload.error.message}`);
      // console.log(payload.error, "payload error disply");
      setErrors(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
      // console.log("[error]", payload.error);
      // Reset card element to clear card details
      const cardNumberElement = elements.getElement(CardNumberElement);
      cardNumberElement.clear();
      const cardExpiryElement = elements.getElement(CardExpiryElement);
      cardExpiryElement.clear();
      const cardCvcElement = elements.getElement(CardCvcElement);
      cardCvcElement.clear();
      // Reset the name input field
      ev.target.name.value = "";
    } else {
      setErrors(null);
      const addresschanges = await handleonclick();
      if (!addresschanges) {
        return;
      }
      renderSuccess();
      // Track the "shipping_info" event
      ReactGA4.event("add_shipping_info", {
        category: "Ecommerce",
        action: "Add Shipping Info",
        label: "User has submitted shipping information",
        ...userInfo,
      });
      // Track the "add_payment_info" event

      ReactGA4.event("add_payment_info", {
        category: "Ecommerce",
        action: "Add Payment Info",
        label: "User has submitted payment information",
        items: mappedCartItems,
        ...userInfo,
        pay_method: "online",
      });

      // Track the "purchase" event
      ReactGA4.event("purchase", {
        items: mappedCartItems,
        value: total_price,
        user_id: getuserdata?.user_id ? getuserdata?.user_id : null,
        pay_method: "online",
        coupon_amt: savedCouponAmt,
        billing_adrress_email: email,
        billing_adrress_address: address2 ? address2 : address,
        billing_adrress_mob: phone,
        currency: "AED", // Add the currency property with the appropriate currency code
      });
      setProcessing(false);
      const result = await getData();
      console.log(result, "result");
      localStorage.setItem("delivarymethod", "stripe");
      localStorage.removeItem("cart_items");
      localStorage.removeItem("cartTotal");
      localStorage.removeItem("couponAmt");
      Toastsucess("Thanks for Your Order!", "sucess", "light");
      //Redirection
      window.location.href = "/order";
    }
  };

  const renderSuccess = () => {
    Toastsucess("Your  payment succeeded!", "sucess", "light");
    // Reset card element to clear card details
    const cardNumberElement = elements.getElement(CardNumberElement);
    cardNumberElement.clear();
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    cardExpiryElement.clear();
    const cardCvcElement = elements.getElement(CardCvcElement);
    cardCvcElement.clear();
    // Reset the name input field
    const nameInput = document.getElementById("name"); // Assuming your name input field has an id attribute of "name"
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
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Box
              className="shadow-checkoutCardheading"
              sx={{ width: "100%", backgroundColor: "lightgray", p: "12px" }}
            >
              Choose Payment Method
            </Box>

            <br />
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="disabled tabs example"
              TabIndicatorProps={{
                sx: { display: "none" },
              }}
              // centered
            >
              {/* <Tab
                label={
                  <img
                    src={
                      "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/Assets/Payment%20Logo/1.png?updatedAt=1722440499865"
                    }
                    className="stripimg"
                    alt=""
                  />
                }
                {...a11yProps(0)}
                className="strip"
              /> */}

              <Tab
                label={
                  <img
                    src={
                      "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/Assets/Payment%20Logo/2.png?updatedAt=1722440500155"
                    }
                    className="stripimg"
                    alt="Tap"
                  />
                }
                {...a11yProps(0)}
                className="strip"
              />
              <Tab
                label={
                  <img
                    src={
                      "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/Assets/Payment%20Logo/3.png?updatedAt=1722440499872"
                    }
                    className="stripimg"
                    alt=""
                  />
                }
                {...a11yProps(1)}
                className="strip"
              />
            </Tabs>
          </Box>
          {/* <TabPanel value={value} index={0}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{ pt: "2%", pb: "2%" }}
            >
              <Grid
                item
                xs={3}
                lg={6}
                md={4}
                sm={4}
                sx={{
                  textAlign: "left",
                  fontSize: !mobile ? "1rem" : ".9rem",
                  whiteSpace: "nowrap",
                }}
              >
                <Label className="amountcheckoutbold">Credit Card</Label>
              </Grid>
              <Grid
                item
                xs={9}
                md={8}
                sm={8}
                lg={6}
                container
                justifyContent="flex-end"
              >
                {PayIcon.map((data, index) => (
                  <img
                    src={data.src}
                    alt={data.alt}
                    height={data.height}
                    width={data.width}
                    key={index}
                  />
                ))}
              </Grid>
            </Grid>
            <form onSubmit={handleSubmit}>
              <div className="sr-combo-inputs">
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Label className="card_name">Name On Card</Label>
                    <TextField
                      autoComplete="cardholder"
                      name="name"
                      placeholder="Name"
                      margin="normal"
                      variant="outlined"
                      className="textfieldloginuser"
                      type="text"
                      size="small"
                      sx={{ bgcolor: "white", mt: 0, mb: 0 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Label className="card_name">Card Number</Label>
                    <CardNumberElement className="sr-input" options={options} />
                  </Grid>
                  <Grid item xs={6}>
                    <Label className="card_name">Expiration </Label>
                    <CardExpiryElement className="sr-input" options={options} />
                  </Grid>{" "}
                  <Grid item xs={6}>
                    <Label className="card_name">CVV</Label>
                    <CardCvcElement className="sr-input" options={options} />
                  </Grid>
                </Grid>
              </div>

             
              <br />
              <button
                variant="contained"
                className="stripepaymentbutton"
                style={{ backgroundColor: processing ? "gray" : "black" }}
              >
                {processing ? "Processing…" : "Pay"}
              </button>
            </form>
          </TabPanel> */}

          <TabPanel value={value} index={0}>
            <Tappaymentpage
              inputcoupcode={inputcoupcode}
              inputValue={inputValue}
              total_price={total_price}
              handleonclick={handleonclick}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <COD
              inputcoupcode={inputcoupcode}
              inputValue={inputValue}
              total_price={total_price}
              handleonclick={handleonclick}
            />
          </TabPanel>
        </Box>
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
const PayIcon = [
  {
    src: "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/checkoutpage/visa.svg?updatedAt=1714738240378",
    alt: "Visa",
  },
  {
    src: "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/checkoutpage/master.svg?updatedAt=1714738240514",
    alt: "Master Card",
  },
  {
    src: "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/checkoutpage/amex.svg?updatedAt=1714738240464",
    alt: "Paypal",
  },
  {
    src: "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/checkoutpage/unipay.svg?updatedAt=1714738240399",
    alt: "amex",
  },
  {
    src: "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/checkoutpage/jcb.svg?updatedAt=1714738240456",
    alt: "amex",
  },
];
