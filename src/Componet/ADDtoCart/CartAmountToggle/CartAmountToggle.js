import React from "react";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { increaseCart, decreaseCart } from "../../../redux/cartUiSlice";
import ReactGA4 from "react-ga4";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, IconButton, Typography } from "@mui/material";
const CartAmountToggle = ({ curElem }) => {
  const dispatch = useDispatch();
  const { cart_items } = useSelector((state) => state.cartUi);
  //console.log("🚀 ~ file: Cart.js ~ line 6 ~ Cart ~ cart", cart_items);
  const handleIncrease = (cart_items) => {
    //console.log("🚀 ~ file: Cart.js ~ line 12 ~ Cart ~ cart", cart_items);
    dispatch(increaseCart(cart_items));
    if (cart_items?.product?.quantity_label === cart_items?.cartCount) {
      toast.error("Item quantity exceeds available stock!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  // console.log(cart_items,curElem,"cart_items")
  const handledecrese = (cart_items) => {
    dispatch(decreaseCart(cart_items));
    // Track the "view item" event
    ReactGA4.event("remove_from_cart", {
      items: [
        {
          id: curElem?.product?.product_id,
          name: curElem?.product?.name,
          slug: curElem?.product?.slug,

          price: curElem?.product?.unit_price,
          discount: curElem?.product?.discount_price,
          item_brand: curElem?.product?.brand_name,
          item_category: curElem?.product?.category,
          item_category2: curElem?.product?.childCat,
          sku_id: curElem?.product?.sku,
          short_description: curElem?.product?.short_description,
          quantity_label: curElem?.product?.quantity_label,
        },
      ],
    });
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "solid .2px black",
          borderRadius: "5px",
          bgcolor: "black",
          width: "70%",
        }}
      >
        <IconButton onClick={() => handledecrese(curElem)}>
          <RemoveIcon sx={{ color: "white", fontSize: "1rem" }} />
        </IconButton>

        <Typography variant="body1" style={{ margin: "5 8px", color: "white" }}>
          {curElem.cartCount}
        </Typography>

        <IconButton onClick={() => handleIncrease(curElem)}>
          <AddIcon sx={{ color: "white", fontSize: "1rem" }} />
        </IconButton>
      </Box>
    </div>
  );
};

export default CartAmountToggle;
