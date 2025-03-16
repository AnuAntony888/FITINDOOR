import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import "./Checkout.css";

import Paybutton from "../../Componet/Paybutton/Paybutton";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  Getfetchsettings,
  useCouponcode,
  useGuestCouponcode,
} from "../../client-api/Apicod";
import { useAuthContext } from "../../Context/AuthContext";
import { Toastsucess } from "../../Componet/ReusableComponet/toast/Toast";
import {
  UserAdress,
  Userpersonalinformation,
  useProfile,
} from "../../client-api/Apiuserdetails";
import AddressCheckoutleft from "../MYAcoount/AddressCheckoutleft";
import { usePhone } from "../../client-api/LoginRegister";
import { useUserContext } from "../../Context/Usercontext";

const CheckOut = (props) => {
  const [inputcoupcode, setinputCoupcode] = useState("");

  const checkOutTotal = localStorage.getItem("cartTotal");
  const { cart_items } = useSelector((state) => state.cartUi);

  const { getuserdata } = useAuthContext();
  const { user, setUser } = useUserContext();
  const { couponcode } = useCouponcode(getuserdata);

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
    type,
    addresstype,
    flagperson,
    flagphone,
  } = user;
  const setHandler = (e) => {
    setTimeout(() => {
      setinputCoupcode(e.target.value);
    }, 1000);
  };

  const [socket, setSocket] = useState(null);

  const { data, error, isLoading } = Getfetchsettings();

  const vat = (parseInt(data?.shipping) * parseInt(data?.vat)) / 100;


  const { couponguestcode } = useGuestCouponcode();

  const coupon = socket?.data?.coupon_amt
    ? checkOutTotal > parseInt(data?.min_order_amount)
      ? // 200
        checkOutTotal - socket?.data?.coupon_amt
      : parseInt(checkOutTotal) +
        parseInt(data?.shipping) +
        vat -
        socket?.data?.coupon_amt
    : checkOutTotal > parseInt(data?.min_order_amount)
    ? // 200
      checkOutTotal
    : parseInt(checkOutTotal) + parseInt(data?.shipping) + vat;

  localStorage.setItem(
    "couponAmt",
    socket?.data?.coupon_amt > 0 ? socket?.data?.coupon_amt : 0
  );

  useEffect(() => {
    const handleApi = async (e) => {
      if (inputcoupcode) {
        try {
          if (!getuserdata) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const isValidEmail = emailRegex.test(email);

            if (!isValidEmail) {
              Toastsucess("Please provide a valid email address");
              return false;
            }
            if (!phone) {
              Toastsucess("Please fill in your phone");
              return false;
            }
          }
          const formData = new FormData();

          for (let i = 0; i < cart_items.length; i++) {
            formData.append(
              "cart[" + i + "][product][price]",
              cart_items?.[i]?.product.discount_price
                ? cart_items?.[i]?.product.discount_price
                : cart_items?.[i]?.product.unit_price
            );
            formData.append(
              "cart[" + i + "][product][productid]",
              cart_items?.[i]?.product.product_id
            );
            formData.append(
              "cart[" + i + "][product][quantity]",
              cart_items?.[i]?.cartCount
            );
          }
          formData.append("coupon_code", inputcoupcode);
          if (!getuserdata) {
            formData.append("email", email);
            formData.append("phone", phone);
          }
          // setSocket(await couponcode(formData));
          if (getuserdata) {
            setSocket(await couponcode(formData));
          } else {
            setSocket(await couponguestcode(formData));
          }

          Toastsucess("Thanks you for using coupon code!!", "sucess", "light");
        } catch (error) {
          Toastsucess(error.message);
        }
      }
    };
    handleApi();
  }, [inputcoupcode]);

  // useEffect(() => {
  //   // Use optional chaining to safely access nested properties
  //   setfirst_name(userdat?.profile?.first_name || "");
  //   setlast_name(userdat?.profile?.last_name || "");
  //   setemail(userdat?.profile?.email || "");
  //   setphone(userdat?.profile?.phone || "");
  //   setAddress(userdat?.address?.[0]?.address || "");
  //   setCountry(userdat?.address?.[0]?.country || "");
  //   setCity(userdat?.address?.[0]?.city || "");
  //   setpin(userdat?.address?.[0]?.pincode || "");
  //   setAddress2(userdat?.address?.[0]?.address2 || "");
  //   setCity2(userdat?.address?.[0]?.city2 || "");
  //   setpin2(userdat?.address?.[0]?.pincode2 || "");
  // }, [userdat]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputcoupcode) {
        localStorage.setItem("inputcoupcode", inputcoupcode);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [inputcoupcode]);
  const { personalinfoofuser } = Userpersonalinformation(getuserdata);
  const { phonenumber } = usePhone(getuserdata);
  const { addressofuser } = UserAdress(getuserdata);

  const handleonclick = async () => {
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(email);

      if (!first_name || first_name === "undefined" || !last_name) {
        Toastsucess("Please fill your First Name and lastname");
        return false;
      }
      if (!phone) {
        Toastsucess("Please fill in your phone");
        return false;
      }
      if (!isValidEmail) {
        Toastsucess("Please provide a valid email address");
        return false;
      }

      if (!address2) {
        Toastsucess("Please fill in your address");
        return false;
      }

      if (!country) {
        Toastsucess("Please fill in your country");
        return false;
      }
      if (!city2) {
        Toastsucess("Please fill in your city");
        return false;
      }
      if (!pincode2) {
        Toastsucess("Please fill in your pincode");
        return false;
      }

      if (getuserdata) {
        if (flagperson === "1") {
          await personalinfoofuser({ first_name, last_name, email });
        }
        if (flagphone === "1") {
          await phonenumber({ phone });
        }

        if (type === "2") {
          await addressofuser({
            address: address2,
            city: city2,
            country: country,
            pincode: pincode2,
            type: 2,
          });
        }
        if (addresstype === "1") {
          await addressofuser({
            address: address,
            country: country,
            city: city,
            pincode: pincode,

            type: 1,
          });
        }
      }

      Toastsucess("Personal Details Updated successfully!", "sucess", "light");
      return true;
    } catch (error) {
      Toastsucess(error.message);
      return false;
    }
  };

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("inputValue", inputValue);
    }, 3000);

    // Cleanup timeout if inputValue changes within the 3 seconds
    return () => clearTimeout(timer);
  }, [inputValue]);

  const [codamount, setcodamount] = useState(false);

  return (
    <div>
      <div className="checkoutgrid">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            sx={{
              flexDirection: {
                xs: "column-reverse",
                md: "column-reverse",
                lg: "row",
                sm: "column-reverse",
              },
            }}
          >
            <Grid item lg={7} md={12} sm={12} xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ textAlign: "left" }}>
                  <AddressCheckoutleft />
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "left" }}>
                  <p className="shadow-checkoutCardheading">Note</p>
                  <TextField
                    multiline
                    rows={4}
                    autoComplete="off"
                    name="note"
                    type="text"
                    placeholder=""
                    margin="normal"
                    required
                    className="textfieldloginuser"
                    variant="outlined"
                    onChange={handleInputChange}
                    sx={{ marginTop: "0", marginBottom: "0" }}
                  />
                </Grid>

                <Grid item xs={12}>
                  {cart_items.length > 0 ? (
                    <>
                      <Paybutton
                        total_price={coupon}
                        inputcoupcode={inputcoupcode}
                        inputValue={inputValue}
                        handleonclick={handleonclick}
                        first_name={first_name}
                        last_name={last_name}
                        email={email}
                        phone={phone}
                        address={address}
                        country={country}
                        city={city}
                        pincode={pincode}
                        address2={address2}
                        city2={city2}
                        pincode2={pincode2}
                        setcodamount={setcodamount}
                      />
                    </>
                  ) : (
                    ""
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item lg={0.5} md={12} sm={12} xs={12}></Grid>

            <Grid
              item
              lg={4.5}
              md={12}
              sm={12}
              xs={12}
              sx={{ marginTop: "15px" }}
            >
              <Box
                sx={{
                  position: "sticky",
                  top: "150px",
                  zIndex: 1,
                  marginTop: "50px",
                }}
              >
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead className="tablecells">
                      <TableRow>
                        <TableCell>
                          <span className="shadow-checkoutCardheading">
                            Order
                          </span>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell align="right">
                          <span className="shadow-checkoutCardheading">
                            Subtotal
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cart_items.length === 0 ? (
                        <h6 className="text-center mt-5">
                          No item added to the cart
                        </h6>
                      ) : (
                        <>
                          {cart_items.map((curElem) => {
                            return (
                              <TableRow>
                                <TableCell>
                                  <img
                                    src={`https://admin.myfamilyfitness.com/uploads/product/images/${
                                      curElem?.product?.images?.filter(
                                        (images1) => {
                                          return images1.in_home === 1;
                                        }
                                      )[0]?.url
                                    }`}
                                    className="checkout_image"
                                    alt=""
                                  />
                                </TableCell>
                                <TableCell>
                                  {curElem?.product?.name} | {curElem.cartCount}{" "}
                                  x pc{" "}
                                </TableCell>
                                <TableCell>
                                  {curElem?.product?.discount_price
                                    ? curElem?.product?.discount_price *
                                      curElem.cartCount
                                    : curElem?.product?.unit_price *
                                      curElem.cartCount}
                                </TableCell>
                              </TableRow>
                            );
                          })}{" "}
                        </>
                      )}
                      <TableRow>
                        <TableCell>Subtotal</TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          {" "}
                          <span className="amountcheckoutbold">
                            {checkOutTotal}
                          </span>{" "}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell> Shipping</TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          {" "}
                          <span className="amountcheckoutbold">
                            {" "}
                            {checkOutTotal > parseInt(data?.min_order_amount)
                              ? 0
                              : parseInt(data?.shipping)}
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell> Coupon:</TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          {" "}
                          <TextField
                            autoComplete="off"
                            name="Email"
                            margin="normal"
                            required
                            className="textfieldloginuser"
                            variant="outlined"
                            onChange={setHandler}
                            size="small"
                            sx={{ marginTop: "0", marginBottom: "0" }}
                            inputProps={{ style: { padding: "2px 14px" } }}
                          />{" "}
                        </TableCell>
                      </TableRow>
                      {codamount === true ? (
                        <TableRow>
                          <TableCell>COD</TableCell>
                          <TableCell></TableCell>
                          <TableCell>
                            {" "}
                            <span className="amountcheckoutbold">10</span>{" "}
                          </TableCell>
                        </TableRow>
                      ) : (
                        ""
                      )}
                      <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          {" "}
                          <span className="amountcheckoutbold">
                            {codamount === true
                              ? parseInt(coupon) + 10
                              : coupon}{" "}
                          </span>{" "}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default CheckOut;
