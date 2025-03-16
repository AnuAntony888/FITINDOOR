import React from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { useAuthContext } from "../../Context/AuthContext";
import moment from "moment";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import {
  useOldEachOrderDetails,
  useProfile,
} from "../../client-api/Apiuserdetails";
import Thankyouorderpage from "./Thankyouorderpage";
import Button from "@mui/material/Button";
import ProductOrderdetails from "./ProductOrderdetails";
import TOtalsubtotal from "./TOtalsubtotal";
const OrderDetail = () => {
  const checkOutTotal = localStorage.getItem("cartTotal");
  const location = useLocation();
  const { order_id } = location.state || {};
  const { user, getuserdata } = useAuthContext();
  const { data, error, isLoading } = useProfile(getuserdata);
  const { oldorderlist, oldordererror, oldorderisLoading } = useOldEachOrderDetails(getuserdata, order_id);

  return (
    <div className="Thankgivenpage" id="old_order">
      <Grid container rowSpacing={3} columnSpacing={3} className="ordergrid">
        <Grid xs={12} md={6} sm={6} lg={6}>
          <p>
            Status {" :  "}
            <Button className="status">
              {oldorderlist?.[0]?.order_status}
            </Button>
          </p>
        </Grid>
        <Grid xs={12} md={6} sm={6} lg={6}>
          <Link to="/">
            <p className="backto_home">Back To Home</p>
          </Link>
        </Grid>
      </Grid>

      <Thankyouorderpage oldorderlist={oldorderlist} data={data} />

      <br />
      <Grid xs={12}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead className="tablecells">
              <TableRow>
                <TableCell className="shadow-checkoutCardheading">Product</TableCell>
                <TableCell className="shadow-checkoutCardheading">Quantity</TableCell>
                <TableCell align="left" className="shadow-checkoutCardheading">Total</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {oldorderlist?.[0]?.order_items?.map((curElem) => {
                return (
                  <ProductOrderdetails
                    curElem={curElem}
                    key={curElem.order_item_id}
                  />
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <br />

      <Grid container spacing={2}>
        <Grid item lg={7} md={12} sm={12} xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow className="tablecells">
                  <TableCell>
                    <span className="shadow-checkoutCardheading">
                      Order Details
                    </span>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Total Item:</TableCell>

                  <TableCell align="left">
                    {oldorderlist?.[0]?.order_items?.[0]?.quantity}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Billing Address:
                    </TableCell>
                  <TableCell align="left">             
                        <div key={data?.address?.[0].id}>
                          <p>
                            {" "}
                            {data?.address?.[0].address} {","}
                            {data?.address?.[0].city}{" "}
                          </p>
                          <p>
                            {data?.address?.[0].company}
                            {" ,"}
                            {data?.address?.[0].pincode}
                            {" ,"}
                          </p>
                        </div>
                      {/* );
                    })} */}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Shipping Address:</TableCell>

                  <TableCell align="left">
                    {/* {data?.address.map((curElm) => { */}
                      {/* return ( */}
                        <div key={data?.address?.[0].id}>
                          <p>
                            {" "}
                            {data?.address?.[0].address2} {" ,"} {data?.address?.[0].city2}
                          </p>
                          <p>
                            {" "}
                            {data?.address?.[0].company2}
                            {" ,"} {data?.address?.[0].pincode2}
                          </p>
                        </div>
                      {/* );
                    })} */}
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item lg={5} md={12} sm={12} xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow className="tablecells">
                  <TableCell>
                    <span className="shadow-checkoutCardheading">
                      Total Amount
                    </span>
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TOtalsubtotal
                orderuser={oldorderlist}
                checkOutTotal={checkOutTotal}
              />
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderDetail;
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
