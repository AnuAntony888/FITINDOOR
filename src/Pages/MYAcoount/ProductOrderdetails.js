import React from "react";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";

import TableRow from "@mui/material/TableRow";
const ProductOrderdetails = (props) => {
  const { curElem } = props;
  // console.log(curElem, "curelem");
  const imageUrl = curElem?.product_images.filter(
    (images1) => images1.in_home === 1
  )[0]?.url;
  //console.log(imageUrl, "  console.log(curElem");
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row">
        <img
          src={`https://admin.myfamilyfitness.com/uploads/product/images/${imageUrl}`}
          style={{ width: "75px", height: "75px" }}
          className="checkout_image"
          alt=""
        />{" "}
        {curElem?.product_name}
      </TableCell>
      <TableCell component="th" scope="row">
        {curElem?.quantity}
      </TableCell>
      <TableCell align="left">{curElem?.product_price}</TableCell>
    </TableRow>
  );
};

export default ProductOrderdetails;
