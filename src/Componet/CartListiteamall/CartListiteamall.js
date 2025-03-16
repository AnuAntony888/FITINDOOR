import React from "react";
import { removeProductFromCart } from "../../redux/cartUiSlice";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import CartAmountToggle from "../ADDtoCart/CartAmountToggle/CartAmountToggle";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import { LazyLoadImage } from "react-lazy-load-image-component";
const CartListiteamall = () => {
  const dispatch = useDispatch();
  const { cart_items, cartCount, calculateTotals } = useSelector(
    (state) => state.cartUi
  );


  const RemovefromCart = (curElem) => {
    dispatch(removeProductFromCart(curElem));
 
  };
  return (
    <div>
      <div className="container">
        <div className="cart-item">

          {cart_items.length === 0 ? (
            <h6 className="text-center mt-5">No item added to the cart</h6>
          ) : (
            <>
              {cart_items.map((curElem) => {
                //console.log(curElem, "curElement");
                return (
                  // <CARTITEAMS  key={curElem.id}  {...curElem} />

                  <Box className="cartinsidepadding">
                    <Grid
                      container
                      rowSpacing={0}
                      columnSpacing={{ xs: 1, sm: 1, md: 1 }}
                    >
                      <Grid item xs={2} lg={3} md={3} sm={2}>
                        <Card
                          sx={{
                            position: "relative",
                            margin: "auto",
                            display: "flex",
                            boxShadow: "none",

                            "& .image_sub_card": { display: "none" },
                            ":hover": {
                              "& .image_sub_card": {
                                display: "flex",
                                backgroundColor: "rgba(0, 0, 0,.3)",
                              },
                            },
                          }}
                        >
                          <LazyLoadImage
                            component="img"
                            src={`https://admin.myfamilyfitness.com/uploads/product/images/${
                              curElem?.product?.images?.filter((images1) => {
                                return images1.in_home === 1;
                              })[0]?.url
                            }`}
                            style={{
                              margin: "auto",
                              width: "100%",
                              objectFit: "contain",
                            }}
                            alt={curElem?.product?.name?curElem?.product?.name:"car_item"}
                          />
                          <Box
                            className="image_sub_card"
                            sx={{
                              top: "0",
                              position: "absolute",

                              width: "100%",
                              height: "100%",

                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <CloseIcon
                              onClick={() => RemovefromCart(curElem)}
                              sx={{
                                color: "whitesmoke",
                              }}
                            />
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item lg={6} md={6} sm={7} xs={7}>
                        <p className="cart__product-title">
                          {curElem?.product?.name}
                        </p>
                        <p className="cart__product-title2">
                          UnitPrice : AED &nbsp;
                          {curElem?.product?.discount_price
                            ? curElem?.product?.discount_price
                            : curElem?.product?.unit_price}
                        </p>
                        <CartAmountToggle curElem={curElem} />
                      </Grid>
                      <Grid item xs={2} lg={3} md={3} sm={2}>
                        <span className="cart__product-title2">
                          AED &nbsp;
                          {curElem?.product?.discount_price
                            ? curElem?.product?.discount_price *
                              curElem.cartCount
                            : curElem?.product?.unit_price * curElem.cartCount}
                        </span>
                      </Grid>
                    </Grid>
                  </Box>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartListiteamall;
