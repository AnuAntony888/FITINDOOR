import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { useSelector } from "react-redux";
import { useGuestOrderDetails, useOrderDetailseachuser } from "../../client-api/Apiuserdetails";
import { useAuthContext } from "../../Context/AuthContext";
import ProductOrderdetails from "../MYAcoount/ProductOrderdetails";
import TOtalsubtotal from "../MYAcoount/TOtalsubtotal";

export default function TableThankyou(props) {
  const { cart_items } = useSelector((state) => state.cartUi);
  const checkOutTotal = localStorage.getItem("cartTotal");
  const delivarymethod = localStorage.getItem("delivarymethod");
  const { user, getuserdata } = useAuthContext();
  const { orderuser, orderusererror, orderuserisLoading } =
    useOrderDetailseachuser(getuserdata);
  const { guestorderlist } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead className="tablecells">
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell align="left">Total</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {/* {orderuser?.[0]?.order_items?.map((curElem) => {
            return <ProductOrderdetails curElem={curElem} />;
          })} */} {getuserdata ? (
        
            orderuser?.[0]?.order_items?.map((curElem) => (
              <ProductOrderdetails curElem={curElem} />
            ))
          ) : (
            
            guestorderlist?.[0]?.order_items?.map((curElem) => (
              <ProductOrderdetails curElem={curElem} />
            ))
          )}
        </TableBody>
        {/* {delivarymethod === "cod" ? (
          <TOtalsubtotal
            orderuser={orderuser}
            checkOutTotal={checkOutTotal}
            className="tablecells"
          />
        ) : (
          ""
        )} */}
        {getuserdata ? (delivarymethod === "cod" ? (
          <TOtalsubtotal
            orderuser={orderuser}
            checkOutTotal={checkOutTotal}
            className="tablecells"
          />
        ) : (
          ""
        )) : (delivarymethod === "cod" ? (
          <TOtalsubtotal
            orderuser={guestorderlist}
            checkOutTotal={checkOutTotal}
            className="tablecells"
          />
        ) : (
          ""
        ))}
         
      </Table>
    </TableContainer>
  );
}
