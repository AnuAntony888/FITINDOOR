import React from "react";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Getfetchsettings } from "../../client-api/Apicod";

const TOtalsubtotal = (props) => {
  const { orderuser, checkOutTotal } = props;

  const totalProductPrice = orderuser?.[0]?.order_items.reduce(
    (total, product) => {
      const parsedPrice = parseFloat(product.product_price);
      const parsedQuantity = parseInt(product.quantity);
      return total + parsedPrice * parsedQuantity;
    },
    0
  );

  const { data,  } = Getfetchsettings();

  const isPaymentOnline = orderuser?.[0]?.payment_method === "online";

  return (
    <TableHead>
      <TableRow className={props.className}>
        <TableCell>Subtotal:</TableCell>
        <TableCell></TableCell>
        <TableCell align="left">
          {totalProductPrice?.toFixed(2)}
                  </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>Service Charge :</TableCell>
        <TableCell></TableCell>
        <TableCell align="left">{orderuser?.[0]?.service_charge}</TableCell>
      </TableRow>
      <TableRow className={props.className}>
        <TableCell>Payment Method:</TableCell>
        <TableCell></TableCell>
        <TableCell align="left">{orderuser?.[0]?.payment_method}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell>VAT Amount</TableCell>
        <TableCell></TableCell>
        <TableCell align="left">{orderuser?.[0]?.vat_amount}</TableCell>
      </TableRow>
      {isPaymentOnline ? (
        ""
      ) : (
        <TableRow>
          <TableCell>COD Amount</TableCell>
          <TableCell></TableCell>
          <TableCell align="left">{parseInt(data?.cod)}</TableCell>
        </TableRow>
      )}
      <TableRow className={props.className}>
        <TableCell>Total:</TableCell>
        <TableCell></TableCell>
        <TableCell align="left" className="amountcheckoutbold">
          {orderuser?.[0]?.total_amount}
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default TOtalsubtotal;
