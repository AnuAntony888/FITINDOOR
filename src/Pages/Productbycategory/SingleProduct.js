import React from "react";
import { useState, useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import PageNavigation from "../../Componet/PageNavLink/PageNavigation";
import AddToCart from "../../Componet/ADDtoCart/AddToCart";
import "./Singleproduct.css";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import MyImage from "../../Componet/MYImages/MyImage";
import FAQ from "../../Componet/Accordian/FAQ";
import Button from "@mui/material/Button";
import RelatedProduct from "./RelatedProduct";
import { useDispatch } from "react-redux";

import { resetProduct } from "../../redux/cartUiSlice";
import {
  GetSingleProduct,
  GetoutOfstock,
  PriceDropAlert,
} from "../../client-api/ApiProducts";
import LastViewed from "./LastViewed";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { MetaComponent } from "../../Icons/Icons";
import { Toastsucess } from "../../Componet/ReusableComponet/toast/Toast";
import ProductEnquire from "./ProductEnquire";
import { usePoPupContext } from "../../Context/PopupContext";
import { useAuthContext } from "../../Context/AuthContext";
import {
  UserWhishList,
  UsergetwishList,
} from "../../client-api/Apiuserdetails";
import ReactGA4 from "react-ga4";
const SingleProduct = () => {
  const whats1 =
    "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/logoicons/installation.png?updatedAt=1715237824190";
  const whats2 =
    "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/logoicons/secure%20payment.png?updatedAt=1715237824019";
  const whats3 =
    "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/logoicons/free%20delivery.png?updatedAt=1715237823945";
  const whats4 =
    "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/logoicons/customer-support.png?updatedAt=1715237824201";
  const whats5 =
    "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/logoicons/cash-on-delivery.png?updatedAt=1715237823530";
  const whats6 =
    "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/logoicons/genuine.png?updatedAt=1715237824026";
  const whats7 =
    "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/logoicons/warranty.png?updatedAt=1715237824196";

  const imageList = [
    {
      img: whats1,
      txt: "Free Installation*",
    },
    {
      img: whats2,
      txt: "Secure payment",
    },
    {
      img: whats3,
      txt: "Free Delivery*",
    },
    {
      img: whats4,
      txt: "Customer Support",
    },
    {
      img: whats5,
      txt: "Cash on Delivery*",
    },
    {
      img: whats6,
      txt: "Genuine",
    },
    {
      img: whats7,
      txt: "Warranty*",
    },
  ];
  const { setopenpopup } = usePoPupContext();

  const location = useLocation();
  const { product_slug, store_id } = location.state || {};
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const newURL = location.pathname;
  //console.log(newURL);
  const splitURL = newURL.toString().split("/");
  //console.log(splitURL[1], " const");

  // const slug=location.pathname
  //console.log(location.pathname, "location.state");
  const [state, setstate] = useState("");
  const { data, error, isLoading } = GetSingleProduct(splitURL[1], 222);
  const typeEmail = (event) => {
    setstate(event.target.value);
  };
  const { outOfstock, erroroutOfstock, outOfstockLoading } = GetoutOfstock();
  const handleButtonClick = async () => {
    try {
      const formData = new FormData();
      formData.append("id", data?.[0]?.product?.product_id);
      formData.append("email", state);
      await outOfstock(formData);

      Toastsucess(
        "Thanks for your feedback!. We will get back soon",
        "sucess",
        "dark"
      );
      setstate("");
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  // const {product_id}=data?.[0]?.product?.product_id;
  //console.log(data?.[0]?.store_id, " store_id");
  const dispatches = useDispatch();
  useEffect(() => {
    dispatches(resetProduct());
  }, []);

  useEffect(() => {
    let productToView = [];
    if (data?.[0]) {
      if (localStorage.getItem("lastviewedsingleproducts")) {
        productToView = JSON.parse(
          localStorage.getItem("lastviewedsingleproducts")
        );
        if (productToView.length > 0) {
          const productFound = productToView.find(
            (prd) => prd?.product?.product_id === data?.[0]?.product?.product_id
          )?.product?.product_id;
          if (!productFound) {
            productToView.push(data?.[0]);
          }
        }
      } else {
        productToView.push(data?.[0]);
      }
      localStorage.setItem(
        "lastviewedsingleproducts",
        JSON.stringify(productToView.splice(0, 5))
      );
    }

    // localStorage.setItem("singleproduct", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  const lastviewed = JSON.parse(
    localStorage.getItem("lastviewedsingleproducts")
  );
  const [productname, setProductname] = useState(null);
  // Fetching user data and wish list data from the context and API
  const { getuserdata } = useAuthContext();
  const { wishofuser } = UserWhishList(getuserdata);
  const { data: wishlistdata } = UsergetwishList(getuserdata);
  const { dropAlert } = PriceDropAlert(getuserdata);

  const isInWishList = wishlistdata?.products?.some(
    (el) => el?.product?.product_id === data?.[0]?.product?.product_id
  );

  const handleApi = async () => {
    try {
      if (!getuserdata?.token) {
        setopenpopup("login");
        return;
      }
      if (data?.[0]?.product?.product_id && !isInWishList) {
        await wishofuser(data?.[0]?.product?.product_id);
        Toastsucess("Added to wishlist!", "sucess", "light");
        // Track the "view item" event
        ReactGA4.event("add_to_wishlist", {
          items: [
            {
              id: data?.[0]?.product?.product_id,
              name: data?.[0]?.product?.name,
              slug: data?.[0]?.product?.slug,

              price: data?.[0]?.product?.unit_price,
              discount: data?.[0]?.product?.discount_price,
              item_brand: data?.[0]?.product?.brand_name,
              item_category: data?.[0]?.product?.category,
              item_category2: data?.[0]?.product?.childCat,
              sku_id: data?.[0]?.product?.sku,
              short_description: data?.[0]?.product?.short_description,
              quantity_label: data?.[0]?.product?.quantity_label,
            },
          ],
        });
      }
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const handleProductpriceMatch = async () => {
    try {
      if (!getuserdata?.token) {
        // If the user is not logged in, set "ispricealertIn" in localStorage
        localStorage.setItem("ispricealertIn", "true");

        // Set the openpopup object with product name and name
        setopenpopup({
          productname: data?.[0]?.product?.sku,
          name: "loginuser",
        });
      } else {
        // If the user is logged in, remove "ispricealertIn" from localStorage if it exists
        if (localStorage.getItem("ispricealertIn")) {
          localStorage.removeItem("ispricealertIn");
        }

        // Log user_id and product sku
        // console.log(getuserdata?.user_id, data?.[0]?.product?.sku, "userdata");

        // Call the dropAlert function with user_id and sku
        await dropAlert({
          user_id: getuserdata?.user_id,
          sku: data?.[0]?.product?.sku,
        });

        // Show a success toast message
        Toastsucess(
          "Thanks for your support! We will get back to you soon.",
          "success",
          "light"
        );

        // Track the "view item" event (assuming this is implemented elsewhere)
      }
    } catch (error) {
      // Handle any errors and show an error toast message
      Toastsucess(error.message);
    }
  };

  return (
    <>
      <MetaComponent
        dynamicTitle={data?.[0]?.product?.meta_title}
        dynamicKeywords={data?.[0]?.product?.meta_tag}
        dynamicDescription={data?.[0]?.product?.meta_description}
      />
      <div className="sinle">
        <Box sx={{ flexGrow: 1 }} id="sinleproductlist">
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12} className="pagelink">
              <PageNavigation singleProductdata={data} />
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12} className="pagelink">
              <MyImage
                imgs={data?.[0]?.product?.images}
                isLoading={isLoading}
              />
            </Grid>
            <Grid item lg={0.5} md={0.5}></Grid>
            <Grid item lg={5.5} md={5.5} xs={12} className="descriptionsingle">
              <Grid container spacing={1}>
                <Grid item lg={12} md={12}>
                  <h1 className="product_name_onpage">
                    {data?.[0]?.product?.name}
                  </h1>

                  <br />

                  <p className="text-boady2" id="onselling_txt">
                    {data?.[0]?.product?.display_price === 2 ? (
                      ""
                    ) : data?.[0]?.product?.discount_price ? (
                      <>
                        <del className="deleteprice_modal_single">
                          AED {data?.[0]?.product?.unit_price}
                        </del>{" "}
                        AED {""}
                        {data?.[0]?.product?.discount_price}
                      </>
                    ) : (
                      <span className="modal_price_Aed">
                        AED {data?.[0]?.product?.unit_price}
                      </span>
                    )}
                  </p>
                </Grid>

                <Grid item xs={12} md={12}>
                  {data?.[0]?.product?.quantity_label <= 0 ? (
                    <>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Button
                            variant="contained"
                            className="changepasswordbtn"
                            size="large"
                          >
                            Out Of Stock
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <p className="listli">
                            Notify me when this product is available:
                          </p>
                        </Grid>
                        <Grid item xs={12} lg={6} md={6} sm={12}>
                          <TextField
                            className="textfieldloginuser"
                            id="outlined-basic"
                            label="Email address*"
                            variant="outlined"
                            size="small"
                            value={state}
                            onChange={typeEmail}
                          />
                        </Grid>
                        <Grid item xs={12} lg={6} md={6} sm={12}>
                          <Button
                            variant="contained"
                            className="changepasswordbtn"
                            size="large"
                            onClick={handleButtonClick}
                          >
                            Email me When Avilabile
                          </Button>
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid container spacing={2}>
                        <Grid item lg={7} md={12} sm={6} xs={12}>
                          {data?.[0]?.product?.pre_order === 1 ? (
                            <Button
                              sx={{
                                bgcolor: "black",
                                color: "white",
                                textTransform: "capitalize",
                                border: "solid 1px",
                                fontFamily: "CamptonBook",
                                fontWeight: "bolder",
                                width: "100%",
                                "&:hover": {
                                  bgcolor: "black", // Replace 'sameColor' with the color you want for hover
                                  color: "white",
                                  // Add any additional styles for hover state
                                },
                              }}
                              onClick={() => {
                                setopenpopup({
                                  productname: data?.[0]?.product?.name,
                                  name: "ProductPreorder",
                                });
                              }}
                            >
                              Pre-Order Request
                            </Button>
                          ) : (
                            <AddToCart
                              singleProductdata={data}
                              lg={6}
                              md={6}
                              sm={6}
                              xs={6}
                            ></AddToCart>
                          )}
                        </Grid>
                        <Grid item lg={1} md={1.5} sm={1} xs={2}>
                          <Button
                            sx={{ border: "1px solid black", minWidth: "30px" }}
                          >
                            <FavoriteOutlinedIcon
                              onClick={handleApi}
                              {...(!isInWishList && {
                                color: "disabled",
                              })}
                              sx={{
                                //  mt:'10px',
                                cursor: "pointer",
                                float: "left",
                                ...(isInWishList && { color: "red" }),
                              }}
                            />
                          </Button>
                        </Grid>

                        <Grid item lg={3} sm={4} md={4} xs={6}>
                          <Button
                            sx={{
                              color: "black",
                              textTransform: "capitalize",
                              border: "solid 1px",
                              fontFamily: "CamptonBook",
                              fontWeight: "bolder",
                              fontSize: isSmallScreen ? ".7rem" : ".8rem",
                            }}
                            onClick={() => {
                              setopenpopup({
                                productname: data?.[0]?.product?.name,
                                name: "ProductEnquire",
                              });
                            }}
                          >
                            Ask a question
                          </Button>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Grid>

                <Grid item xs={12} md={12} lg={12} sm={12}>
                  <hr />

                  <Grid
                    container
                    spacing={2}
                    sx={{
                      textAlign: "center",
                      paddingTop: "1.5%",
                      paddingBottom: "1%",
                    }}
                  >
                    {imageList.map((item, index) => (
                      <Grid item xs={3} lg={3} md={3} sm={3} key={index}>
                        <CardMedia
                          component="img"
                          alt={data?.[0]?.product?.name}
                          image={item.img} // Use item.img instead of img
                          sx={{
                            objectFit: "unset",
                            height: 50,
                            borderRadius: "10px",
                            maxWidth: 50,
                            margin: "auto",
                          }}
                        />

                        <p
                          className="icon_txt"
                          style={{
                            textAlign: "center",
                            marginBottom: "0",
                            marginTop: "5px",
                          }}
                        >
                          {item.txt}
                        </p>
                      </Grid>
                    ))}
                  </Grid>
                  <hr />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {data?.[0]?.product?.quantity_label > 0 ? (
                    <>
                      <Grid
                        container
                        spacing={2}
                        sx={{ paddingBottom: "10px" }}
                      >
                        <Grid item lg={3.5} sm={3.5} md={4.5} xs={6}>
                          <Button
                            sx={{
                              color: "#EF6F38",
                              textTransform: "capitalize",
                              border: "solid 1px",
                              fontFamily: "CamptonBook",
                              fontWeight: "bolder",
                              fontSize: isSmallScreen ? ".7rem" : ".8rem",
                            }}
                            onClick={() => {
                              setopenpopup({
                                productname: data?.[0]?.product?.name,
                                name: "ProductpriceMatch",
                              });
                            }}
                          >
                            Request Price Match
                          </Button>
                        </Grid>
                        <Grid item lg={3.5} sm={3.5} md={4.5} xs={6}>
                          <Button
                            sx={{
                              color: "#1634B6",
                              textTransform: "capitalize",
                              border: "solid 1px",
                              fontFamily: "CamptonBook",
                              fontWeight: "bolder",
                              fontSize: isSmallScreen ? ".7rem" : ".8rem",
                            }}
                            onClick={handleProductpriceMatch}
                          >
                            Set Price Drop Alert
                          </Button>
                        </Grid>
                      </Grid>
                      <hr />
                    </>
                  ) : (
                    ""
                  )}
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <ul className="liststylesingle">
                    <li className="listli ">
                      SKU:&nbsp; &nbsp;
                      <span className="listli2">{data?.[0]?.product?.sku}</span>
                    </li>

                    <li className="listli" style={{ paddingTop: "1%" }}>
                      Category:&nbsp; &nbsp;
                      <span className="listli2">
                        {data?.[0]?.product?.category} ,{" "}
                        {data?.[0]?.product?.subCat_slug}
                      </span>
                    </li>
                  </ul>
                  <hr />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: data?.[0]?.product?.short_description,
                    }}
                  />
                  <hr />
                  <FAQ
                    active={{
                      description: data?.[0]?.product?.description,
                      specification: data?.[0]?.product?.specification,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>

        <RelatedProduct
          product_id={data?.[0]?.product?.product_id}
          store_id={data?.[0]?.store_id}
          short_description={data?.[0]?.product?.short_description}
        />
        <LastViewed data={lastviewed} />
      </div>
    </>
  );
};

export default SingleProduct;
