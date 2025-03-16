import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { styled } from "@mui/material/styles";
import { useAuthContext } from "../../Context/AuthContext";
const Thankyouorderpage = (props) => {
  const { user, getuserdata } = useAuthContext();
  const { oldorderlist, data } = props;
  return (
    <div>
      <Grid container rowSpacing={3} columnSpacing={2}>
        <Grid item lg={2.4} md={4} sm={12} xs={12}>
          <Item className="thankyou">
            <p className="ORDERNUMBER">ORDERNUMBER:</p>
            <p className="orderlist"> {oldorderlist?.[0]?.order_tracking_id}</p>
          </Item>
        </Grid>
        <Grid item lg={2.4} md={4} sm={12} xs={12}>
          <Item className="thankyou">
            <p className="ORDERNUMBER">DATE:</p>
            <p className="orderlist">
              {moment(oldorderlist?.[0]?.created_at).format("MMM Do YY")}
            </p>{" "}
          </Item>
        </Grid>
        {getuserdata ?
          <Grid item lg={2.4} md={4} sm={12} xs={12}>
            <Item className="thankyou">
              <p className="ORDERNUMBER">EMAIL:</p>
              <p className="orderlist">{data?.profile?.email}</p>
            </Item>
          </Grid> : ''}
        <Grid item lg={2.4} md={4} sm={12} xs={12}>
          <Item className="thankyou">
            <p className="ORDERNUMBER">TOTAL:</p>
            <p className="orderlist"> {oldorderlist?.[0]?.total_amount}</p>
          </Item>
        </Grid>
        <Grid item lg={2.4} md={4} sm={12} xs={12}>
          <Item className="thankyou">
            <p className="ORDERNUMBER">PAYMENT METHOD:</p>
            <p className="orderlist"> {oldorderlist?.[0]?.payment_method}</p>
          </Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default Thankyouorderpage;
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
