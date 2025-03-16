import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  useGuestOrderDetails,
  useOrderDetailseachuser,
  useProfile,
} from "../../client-api/Apiuserdetails";
import { useAuthContext } from "../../Context/AuthContext";

import "./Thankyou.css";
import TableThankyou from "./TableThankyou";
import Thankyouorderpage from "../MYAcoount/Thankyouorderpage";
const Thankyou = () => {
  const checkOutTotal = localStorage.getItem("cartTotal");
  const { user, getuserdata } = useAuthContext();
  const { data, error, isLoading } = useProfile(getuserdata);

  const { orderuser, orderusererror, orderuserisLoading } =
    useOrderDetailseachuser(getuserdata);
  const order_id = localStorage.getItem("orderId");
  const { guestorderlist, guestordererror, guestorderisLoading } =
    useGuestOrderDetails(order_id);
  // console.log(guestorderlist, "guestorderlist");
  useEffect(() => {
    return () => {
      // Remove orderId from localStorage when component unmounts
      localStorage.removeItem("orderId");
    };
  }, []);
  return (
    <>
      <div
        class="  uk-background-primary uk-background-cover uk-height-medium uk-flex uk-flex-center uk-flex-middle myAccountimg"
        uk-img="loading: eager"
        id="about_id"
      ></div>

      <p className="myAccount">order</p>

      <div className="Thankgivenpage">
        <Grid container rowSpacing={3} columnSpacing={2} className="ordergrid">
          <Grid xs={12}>
            <Link to="/">
              <p className="backto_home">Back To Home</p>
            </Link>
          </Grid>
          <Grid xs={12} item>
            <Item className="thankyou" id="thankyou">
              <CheckCircleIcon color="success" />{" "}
              <span className="brands_hd">
                Thank you. Your order has been received.
              </span>
            </Item>
          </Grid>
        </Grid>
        <br />
        {getuserdata ? (
          <Thankyouorderpage oldorderlist={orderuser} data={data} />
        ) : (
          <Thankyouorderpage oldorderlist={guestorderlist} data={data} />
        )}
        {/* <Thankyouorderpage oldorderlist={orderuser} data={data} /> */}

        <Grid container rowSpacing={3} columnSpacing={0} className="ordergrid">
          <Grid item xs={12}>
            <p> Pay with cash upon delivery.</p>
            <h5>Order details:</h5>
          </Grid>
          <Grid item xs={12}>
            <TableThankyou guestorderlist={guestorderlist} />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Thankyou;
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
