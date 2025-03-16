import React, { useEffect, useState } from "react";

import { ListGroup } from "reactstrap";
import { useAuthContext } from "../../Context/AuthContext";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../redux/cartSlice";
import Grid from "@mui/material/Grid";
import "./CartToggile.css";
import Divider from "@mui/material/Divider";
import CartListiteamall from "../CartListiteamall/CartListiteamall";
import { calculateCartTotal } from "../../redux/cartUiSlice";
import ReactGA4 from "react-ga4";
import Button from "@mui/material/Button";
import { usePoPupContext } from "../../Context/PopupContext";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

const CartToggile = (props) => {
  // const { setopenpopup, setFromCart } = props;
  const {
    openpopup,
    setopenpopup,
    loginState,
    setloginState,
    fromCart,
    setFromCart,
  } = usePoPupContext();
  const [disable, setDisable] = React.useState(false);
  const dispatch = useDispatch();
  const { cart_items, cartTotalAmount } = useSelector((state) => state.cartUi);
  const navigate = useNavigate();

  const toggleCart = (redirect = false) => {
    if (user && getuserdata) {
      ReactGA4.event("begin_checkout", {
        items: cart_items?.map((product) => ({
          id: product?.product?.product_id,
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
        })),
      });

      redirect && navigate("/checkout");
    }

    dispatch(cartActions.toggle());
  };

  useEffect(() => {
    dispatch(calculateCartTotal());
  }, [cart_items]);
  const { user, getuserdata } = useAuthContext();
  const Close = () => {
    dispatch(cartActions.toggle());
  };
  return (
    <div className="cart__container">
      <ListGroup className="cart">
        <Grid container spacing={2} className="cartpadding">
          <Grid item xs={8}>
            <h3 className="shoppingcart">Shopping Cart</h3>
          </Grid>
          <Grid item xs={4}>
            <CloseIcon onClick={Close} />
          </Grid>
        </Grid>
        <Divider />
        <div className="cart__item-list">
          <CartListiteamall />
        </div>
        {cart_items.length === 0 ? (
          <Box>
            <Button
              className="check_out_button_disable"
              id="diabled_color"
              disabled={() => setDisable(true)}
            >
              <p className="proceed">
                Proceed To Checkout | <span>AED {cartTotalAmount}</span>
              </p>
            </Button>
          </Box>
        ) : (
          <Box onClick={() => toggleCart(true)}>
            <Button
              onClick={() => toggleCart(true)} // The second argument indicates it's coming from the checkout button
              className="check_out_button"
            >
              <a href={"/checkout"} className="checkout_hrf">
                <p className="proceed">
                  Proceed To Checkout | <span>AED {cartTotalAmount}</span>
                </p>
              </a>
            </Button>
          </Box>
        )}
      </ListGroup>
    </div>
  );
};

export default CartToggile;
