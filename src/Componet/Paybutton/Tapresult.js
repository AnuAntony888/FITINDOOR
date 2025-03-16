import React, { useEffect } from "react";
import {
  useCOD,
  useCODGuest,
  useRetrieveACharge,
} from "../../client-api/Apicod";
import { useAuthContext } from "../../Context/AuthContext";
import { useProfile } from "../../client-api/Apiuserdetails";
import { Toastsucess } from "../ReusableComponet/toast/Toast";
import { Box, CircularProgress } from "@mui/material";
import ReactGA4 from "react-ga4";
const Tapresult = () => {
  const charge_id = localStorage.getItem("chargerid");
  const { data, retrieveCharge } = useRetrieveACharge(charge_id);

  const { getuserdata } = useAuthContext();
  const { orderwithcod } = useCOD(getuserdata);
  const { orderwithcodguest } = useCODGuest();
  const cart_items = JSON.parse(localStorage.getItem("cart_items"));
  const userdetails = JSON.parse(localStorage.getItem("guestuserData"));
  const savedCouponAmt = localStorage.getItem("couponAmt");
  const inputValue = localStorage.getItem("inputValue");
  const inputcoupcode = localStorage.getItem("inputcoupcode");
  const total_price = localStorage.getItem("cartTotal");
  const {
    data: profiledata,
    error,
    isLoading: profileLoading,
  } = useProfile(getuserdata);

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
    if (getuserdata?.token) {
      formData.append(
        "billing_adrress[firstname]",
        profiledata?.profile?.first_name
      );
      formData.append(
        "billing_adrress[lastname]",
        profiledata?.profile?.last_name
      );
      formData.append("billing_adrress[email]", profiledata?.profile?.email);

      formData.append(
        "billing_adrress[address]",
        profiledata?.address?.[0]?.address
          ? profiledata?.address?.[0]?.address
          : profiledata?.address?.[0]?.address2
      );

      formData.append("billing_adrress[mob]", profiledata?.profile?.phone);
      formData.append("shipping_adrress[email]", profiledata?.profile?.email);
      formData.append("shipping_adrress[mob]", profiledata?.profile?.phone);
      formData.append(
        "shipping_adrress[address]",
        profiledata?.address?.[0]?.address2
      );

      formData.append(
        "shipping_adrress[city]",
        profiledata?.address?.[0]?.city2
      );
      formData.append(
        "billing_adrress[city]",
        profiledata?.address?.[0]?.city
          ? profiledata?.address?.[0]?.city
          : profiledata?.address?.[0]?.city2
      );
      formData.append(
        "billing_adrress[pincode]",
        profiledata?.address?.[0]?.pincode
          ? profiledata?.address?.[0]?.pincode
          : profiledata?.address?.[0]?.pincode2
      );
      formData.append(
        "shipping_adrress[pincode]",
        profiledata?.address?.[0]?.pincode2
      );
      formData.append("user_id", getuserdata?.user_id);
    } else {
      formData.append("billing_adrress[firstname]", userdetails?.first_name);
      formData.append("billing_adrress[lastname]", userdetails?.last_name);
      formData.append("billing_adrress[email]", userdetails?.email);

      formData.append(
        "billing_adrress[address]",
        userdetails?.address ? userdetails?.address : userdetails?.address2
      );

      formData.append("billing_adrress[mob]", userdetails?.phone);
      formData.append("shipping_adrress[email]", userdetails?.email);
      formData.append("shipping_adrress[mob]", userdetails?.phone);
      formData.append("shipping_adrress[address]", userdetails?.address2);

      formData.append("shipping_adrress[city]", userdetails?.city2);
      formData.append(
        "billing_adrress[city]",
        userdetails?.city ? userdetails?.city : userdetails?.city2
      );
      formData.append(
        "billing_adrress[pincode]",
        userdetails?.pincode ? userdetails?.pincode : userdetails?.pincode2
      );
      formData.append("shipping_adrress[pincode]", userdetails?.pincode2);
    }
    formData.append("status", 1);
    formData.append("pay_method", "online");
    formData.append("note", inputValue ? inputValue : "null");

    //Optionally, log all the form data
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
  useEffect(() => {
    retrieveCharge(); // Call the retrieveCharge function on mount
  }, [charge_id, retrieveCharge]);

  const userShippingInfo = getuserdata?.token
    ? {
        user_id: getuserdata.user_id,
        user_email: profiledata?.profile?.email,
        user_phone: profiledata?.profile?.phone,
        user_firstname: profiledata?.profile?.first_name,
        user_lastname: profiledata?.profile?.last_name,
        shipping_address: profiledata?.address?.[0]?.address2,
        billing_address: profiledata?.address?.[0]?.address
          ? profiledata?.address?.[0]?.address
          : profiledata?.address?.[0]?.address2,
        shipping_city: profiledata?.address?.[0]?.city2,
        billing_city: profiledata?.address?.[0]?.city
          ? profiledata?.address?.[0]?.city
          : profiledata?.address?.[0]?.city2,
        shipping_pincode: profiledata?.address?.[0]?.pincode2,
        billing_pincode: profiledata?.address?.[0]?.pincode
          ? profiledata?.address?.[0]?.pincode
          : profiledata?.address?.[0]?.pincode2,
      }
    : {
        user_email: userdetails?.email,
        user_phone: userdetails?.phone,
        user_firstname: userdetails?.first_name,
        user_lastname: userdetails?.last_name,
        shipping_address: userdetails?.address2,
        billing_address: userdetails?.address
          ? userdetails?.address
          : userdetails?.address2,
        shipping_city: userdetails?.city2,
        billing_city: userdetails?.city
          ? userdetails?.city
          : userdetails?.city2,
        shipping_pincode: userdetails?.pincode2,
        billing_pincode: userdetails?.pincode
          ? userdetails?.pincode
          : userdetails?.pincode2,
      };
  const cartItemsdetails = (cart_items || []).map((product) => ({
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
  useEffect(() => {
    if (data?.status === "CAPTURED") {
      (async () => {
        const result = await getData();
        // Track the "add_payment_info" event

        ReactGA4.event("add_payment_info", {
          category: "Ecommerce",
          action: "Add Payment Info",
          label: "User has submitted payment information",
          items: cartItemsdetails,
          ...userShippingInfo,
          pay_method: "online",
        });

        // Track the "purchase" event
        ReactGA4.event("purchase", {
          items: cartItemsdetails,
          value: total_price,
          pay_method: "online",
          coupon_amt: savedCouponAmt,
          ...userShippingInfo,
          currency: "AED", // Add the currency property with the appropriate currency code
        });

        // console.log(result, "result");
        localStorage.setItem("delivarymethod", "stripe");
        localStorage.removeItem("cart_items");
        localStorage.removeItem("guestuserData");
        localStorage.removeItem("cartTotal");
        localStorage.removeItem("couponAmt");
        localStorage.removeItem("inputValue");
        localStorage.removeItem("inputcoupcode");
        localStorage.removeItem("paymentToken");
        localStorage.removeItem("chargerid");
        // console.log(result, "result");
        Toastsucess("Thanks for Your Order!", "success", "light");
        window.location.href = "/order";
      })();
    } else if (data?.status) {
      Toastsucess("Order status: " + data?.status + " please try again");
      window.location.href = "/checkout";
    }
  }, [data]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress sx={{ color: "black" }} />
        &nbsp;&nbsp;
        <p
          id="shop_name"
          style={{
            fontSize: "1.2rem",
            paddingTop: "5px",
          }}
        >
          {" "}
          On Processing
        </p>
      </Box>
    </>
  );
};

export default Tapresult;
