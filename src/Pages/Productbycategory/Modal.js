import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";

import AddToCart from "../../Componet/ADDtoCart/AddToCart";
import Box from "@mui/material/Box";
import "./Modal.css";
import { Link } from "react-router-dom";
import defimg from "../../Assets/default-pro.jpg";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch } from "react-redux";
import { resetProduct } from "../../redux/cartUiSlice";
import ReactGA4 from "react-ga4";
const Modal = ({ product, setopenpopup }) => {
  console.log(product, "product console");

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const dispatches = useDispatch();
  useEffect(() => {
    dispatches(resetProduct());
  }, []);
  // console.log(product?.product?.slug, "eeeeeeeeee");

  const handleviewdetails = () => {
    // Track the "view item" event
    ReactGA4.event("view_item", {
      items: [
        {
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
        },
      ],
    });
    setopenpopup(false);
  };
  return (
    <div>
      {matches ? (
        <Card sx={{ display: "flex", boxShadow: "none" }}>
          <CardMedia
            component="img"
            sx={{
              width: "250px",
              backgroundColor: "#eeeeee",

              margin: "auto",
              "@media (max-width: 780px)": {
                width: "200px",
              },
            }}
            className="mediaigvanna"
            image={
              product?.product?.images?.filter(
                (images1) => images1.in_home === 1
              )[0]?.url
                ? `https://ik.imagekit.io/thmmwwbpc/product/images/${
                    //  `https://admin.myfamilyfitness.com/uploads/product/images/${
                    product.product.images.filter(
                      (images1) => images1.in_home === 1
                    )[0].url
                  }`
                : defimg
            }
            alt={product?.product?.name}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              width: "100%",
            }}
            className="modal_right_side_sizeadj"
          >
            <CardContent sx={{ flex: "1 0 auto", width: "100%", pb: "0" }}>
              <br />
              <h5 className="modal_name"> {product?.product?.name}</h5>
              <br />
              <p className="modal_price" id="onselling_txt">
                {product?.product?.display_price === 2? (
                  ""
                ) : product?.product?.discount_price ? (
                  <>
                    <del className="deleteprice_modal">
                      AED {product?.product?.unit_price}
                    </del>{" "}
                    AED {product?.product?.discount_price}
                  </>
                ) : (
                  <span className="modal_price_Aed">
                    AED {product?.product?.unit_price}
                  </span>
                )}
              </p>
              {product?.product?.quantity_label <= 0 ? (
                <Button
                  sx={{ marginBottom: "20px" }}
                  variant="contained"
                  className="changepasswordbtn"
                  size="large"
                >
                  Out Of Stock
                </Button>
              ) : // <AddToCart
              //   modalofaddtocart={product}
              //   setopenpopup={setopenpopup}
              //   lg={6}
              //   md={6}
              //   sm={6}
              //   xs={6}
              // />

              product?.product?.pre_order === 1 ? (
                <>
                  <Button
                    sx={{
                      bgcolor: "#212121",
                      color: "white",
                      textTransform: "capitalize",
                      border: "solid 1px",
                      fontFamily: "CamptonBook",
                      fontWeight: "bolder",
                      width: "100%",
                      "&:hover": {
                        bgcolor: "#212121", // Replace 'sameColor' with the color you want for hover
                        color: "white",
                        // Add any additional styles for hover state
                      },
                    }}
                    onClick={() => {
                      setopenpopup({
                        productname: product?.product?.name,
                        name: "ProductPreorder",
                      });
                    }}
                  >
                    Pre-Order Request
                  </Button>
                  <br />
                </>
              ) : (
                <AddToCart
                  modalofaddtocart={product}
                  setopenpopup={setopenpopup}
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                ></AddToCart>
              )}{" "}
              <br />
              <Link
                to={`/${product?.product?.slug}`}
                state={{
                  product_slug: product?.product?.slug,
                  store_id: product.store_id,
                }}
                className="linkstyle"
                onClick={
                  handleviewdetails
                  // () => setopenpopup(false)
                }
              >
                <Button variant="contained" className="popViewbtn" size="large">
                  <span>View Details</span>
                </Button>
              </Link>
            </CardContent>
          </Box>
        </Card>
      ) : (
        <div className="modal_top_bottom">
          <Card
            className="modal_top_content"
            sx={{ boxShadow: "none", p: "0" }}
          >
            <CardMedia
              component="img"
              sx={{
                width: "250px",
                backgroundColor: "#eeeeee",
                height: "250px",
                margin: "auto",
              }}
              // image={`https://admin.myfamilyfitness.com/uploads/product/images/${
              //   product?.product?.images?.filter((images1) => {
              //     return images1.in_home === 1;
              //   })[0]?.url
              // }`}

              image={
                product?.product?.images?.filter(
                  (images1) => images1.in_home === 1
                )[0]?.url
                  ? `https://ik.imagekit.io/thmmwwbpc/product/images/${
                      //  `https://admin.myfamilyfitness.com/uploads/product/images/${
                      product.product.images.filter(
                        (images1) => images1.in_home === 1
                      )[0].url
                    }`
                  : defimg
              }
              alt={product?.product?.name}
            />
            <CardContent sx={{ padding: 0 }}>
              <h5 className="modal_name">{product?.product?.name}</h5>

              <p className="modal_price" id="onselling_txt">
                {product?.product?.display_price === 2 ? (
                  ""
                ) : product?.product?.discount_price ? (
                  <>
                    <del className="deleteprice_modal">
                      AED {product?.product?.unit_price}
                    </del>{" "}
                    AED {product?.product?.discount_price}
                  </>
                ) : (
                  <span className="modal_price_Aed">
                    AED {product?.product?.unit_price}
                  </span>
                )}
              </p>

              {product?.product?.quantity_label <= 0 ? (
                <Button
                  variant="contained"
                  className="changepasswordbtn"
                  size="large"
                  sx={{ marginBottom: "20px" }}
                >
                  Out Of Stock
                </Button>
              ) : // <AddToCart
              //   modalofaddtocart={product}
              //   setopenpopup={setopenpopup}
              //   lg={6}
              //   md={6}
              //   sm={6}
              //   xs={6}
              // />
              product?.product?.pre_order === 1 ? (
                <>
                  <Button
                    sx={{
                      bgcolor: "#212121",
                      color: "white",
                      textTransform: "capitalize",
                      border: "solid 1px",
                      fontFamily: "CamptonBook",
                      fontWeight: "bolder",
                      width: "100%",
                      "&:hover": {
                        bgcolor: "#212121", // Replace 'sameColor' with the color you want for hover
                        color: "white",
                        // Add any additional styles for hover state
                      },
                    }}
                    onClick={() => {
                      setopenpopup({
                        productname: product?.product?.name,
                        name: "ProductPreorder",
                      });
                    }}
                  >
                    Pre-Order Request
                  </Button>
                  <br />
                </>
              ) : (
                <AddToCart
                  modalofaddtocart={product}
                  setopenpopup={setopenpopup}
                  lg={6}
                  md={6}
                  sm={6}
                  xs={6}
                ></AddToCart>
              )}
              <br />

              <Link
                to={`/${product?.product?.slug}`}
                state={{
                  product_slug: product?.product?.slug,
                  store_id: product.store_id,
                }}
                className="linkstyle"
              >
                <Button
                  variant="contained"
                  className="popViewbtn"
                  size="large"
                  onClick={
                    handleviewdetails
                    // () => setopenpopup(false)
                  }
                >
                  <span>View Details</span>
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Modal;
