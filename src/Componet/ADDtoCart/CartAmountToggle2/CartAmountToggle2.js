import React from "react";

import "./CartAmountToggle2.css";

import { useSelector, useDispatch } from "react-redux";
import { increaseProduct, decreaseProduct } from "../../../redux/cartUiSlice";
import { Toastsucess } from "../../ReusableComponet/toast/Toast";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, IconButton, Typography } from "@mui/material";
const CartAmountToggle2 = ({ curElem, product_id, productData }) => {
  const dispatch = useDispatch();
  const { cart_items, product_item } = useSelector((state) => state.cartUi);
  // console.log("🚀 ~ productData: Cart.js ~ line 6 ~ Cart ~ cart", productData);
  // const handleIncrease = () => {
  //   //console.log("🚀 ~ file: Cart.js ~ line 12 ~ Cart ~ cart", cart_items);
  //   if (productData?.product?.quantity_label === product_item) return;
  //   dispatch(increaseProduct());
  // };

  const handleIncrease = () => {
    const cartItemCount = cart_items.find(
      (ct) => ct.product.product_id === productData?.product?.product_id
    )?.cartCount;

    if (
      productData?.product?.quantity_label === product_item ||
      productData?.product?.quantity_label === cartItemCount
    ) {
      Toastsucess("Item quantity exceeds available stock!", false, "dark"); // Replace showToast with the function to display the toast message.
      return;
    }
    dispatch(increaseProduct());
  };

  const handledecrese = () => {
    dispatch(decreaseProduct());
  };

  const product = cart_items.filter(
    (item) => item?.product?.product_id === product_id
  )[0];
  // console.log(product, "ccccccccdisplat product");
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "solid .2px black",
          borderRadius: "5px",
        }}
      >
        <IconButton
          // className="decrease__btn1"
          sx={{
            "&:hover": {
              borderRadius: "0",
              backgroundColor: "black",
              "& .remove-icon": {
                color: "white",
              },
              borderRadius: "0", // Make the button square
              // Set the height to ensure square shape
            },
          }}
          onClick={() => handledecrese()}
        >
          <RemoveIcon
            className="remove-icon"
            sx={{ color: "black", fontSize: "1.5rem" }}
          />
        </IconButton>

        <Typography variant="body1" style={{ margin: "0 8px" }}>
          {product_item || 1}
        </Typography>

        <IconButton
          // className="decrease__btn1"
          sx={{
            "&:hover": {
              backgroundColor: "black",
              "& .add-icon": {
                color: "white",
              },
              borderRadius: "0", // Make the button square
              // Set the height to ensure square shape
            },
          }}
          onClick={() => handleIncrease()}
        >
          <AddIcon
            className="add-icon"
            sx={{ color: "black", fontSize: "1.5rem" }}
          />
        </IconButton>
      </Box>
    </div>
  );
};

export default CartAmountToggle2;
