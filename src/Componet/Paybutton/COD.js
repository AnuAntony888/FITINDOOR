import React, { useState } from "react";
import { Button } from "@mui/material";
import { useCOD, useCODGuest } from "../../client-api/Apicod";
import ReactGA4 from "react-ga4";
import { useProfile } from "../../client-api/Apiuserdetails";
import { useAuthContext } from "../../Context/AuthContext";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Toastsucess } from "../ReusableComponet/toast/Toast";
import { useEffect } from "react";
import { useUserContext } from "../../Context/Usercontext";
const COD = ({ inputcoupcode, inputValue, total_price, handleonclick }) => {
  const { user } = useUserContext();
  const {
    first_name,
    last_name,
    email,
    phone,
    address,

    city,
    pincode,
    address2,
    city2,
    pincode2,
    // type,
    // addresstype,
    // flagperson,
    // flagphone,
  } = user;
  // console.log(user, first_name, last_name, "user");
  const { getuserdata } = useAuthContext();
  const { orderwithcod, isorderLodaing,  } = useCOD(getuserdata);
  const savedCouponAmt = localStorage.getItem("couponAmt");
  const { cart_items } = useSelector((state) => state.cartUi);
  const { orderwithcodguest } = useCODGuest();
  useEffect(() => {
    if (isorderLodaing) {
      Toastsucess("Processing!", "success", "light");
    }
  }, [isorderLodaing]);
  const mappedCartItems =(cart_items || []).map((product) => ({
    item_id: product?.product?.product_id,
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
  const userInfo = {   user_id: getuserdata?.user_id ? getuserdata?.user_id : null,

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

  }
  const handleApi = async () => {
    try {
      const addresschanges = await handleonclick();
      if (!addresschanges) {
        return;
      }
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
      formData.append("billing_adrress[firstname]", first_name);
      formData.append("coupon", inputcoupcode ? inputcoupcode : "null");
      formData.append("coupon_amt", savedCouponAmt);
      formData.append("billing_adrress[lastname]", last_name);
      formData.append("billing_adrress[email]", email);
      formData.append("billing_adrress[address]", address ? address : address2);
      formData.append("billing_adrress[mob]", phone);
      formData.append("shipping_adrress[email]", email);
      formData.append("shipping_adrress[mob]", phone);
      formData.append("shipping_adrress[address]", address2);

      if (getuserdata?.token) {
        formData.append("user_id", getuserdata?.user_id);
      }

      formData.append("pay_method", "cod");
      formData.append("note", inputValue ? inputValue : "null");
      formData.append("shipping_adrress[city]", city2);
      formData.append("billing_adrress[city]", city ? city : city2);
      formData.append("billing_adrress[pincode]", pincode ? pincode : pincode2);
      formData.append("shipping_adrress[pincode]", pincode2);
      //console full code
      // for (let [key, value] of formData.entries()) {
      //   console.log(`${key}: ${value}`);
      // }
      //  return;

      if (getuserdata?.token) {
        await orderwithcod(formData);
      } else {
        const response = await orderwithcodguest(formData);
        const orderId = response?.order?.id;
        localStorage.setItem("orderId", orderId);
      }
      localStorage.removeItem("couponAmt");
      Toastsucess("Thanks for Your Order!", "sucess", "light");
      // Track the "shipping_info" event
      ReactGA4.event("add_shipping_info", {
        category: "Ecommerce",
        action: "Add Shipping Info",
        label: "User has submitted shipping information",
        ...userInfo
      });
      // Track the "add_payment_info" event

      ReactGA4.event("add_payment_info", {
        category: "Ecommerce",
        action: "Add Payment Info",
        label: "User has submitted payment information",
        items: mappedCartItems,
        ...userInfo,
        pay_method: "cod",
      });

      // Track the "purchase" event
      ReactGA4.event("purchase", {
        items: mappedCartItems,
        value: total_price,
        user_id: getuserdata?.user_id ? getuserdata?.user_id : "",
        pay_method: "cod",
        coupon_amt: savedCouponAmt,
        billing_adrress_email: email,
        billing_adrress_address: address2 ? address2 : address,
        billing_adrress_mob: phone,
        currency: "AED", // Add the currency property with the appropriate currency code
      });

      localStorage.setItem("delivarymethod", "cod");
      window.location.href = "/order";
      localStorage.removeItem("cart_items");
      localStorage.removeItem("cartTotal");
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  return (
    <div>
      Please Pay After You Receive Your Goods!
      <br />
      <br />
      <Link className="brands_hd">
        <Button
          variant="contained"
          className="changepasswordbtn"
          size="large"
          onClick={handleApi}
          id="checkout_mainbtn"
          disabled={isorderLodaing}
        >
          Place Order
        </Button>
      </Link>
    </div>
  );
};

export default COD;
