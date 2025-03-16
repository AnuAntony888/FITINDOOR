import React from "react";

import Grid from "@mui/material/Grid";
import "./Homeonsellingproduct.css";

import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";

import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import { resetProduct } from "../../redux/cartUiSlice";
import { useDispatch } from "react-redux";
import { SellingProduct } from "../../client-api/ApiHome";
import {
  UsergetwishList,
  UserWhishList,
} from "../../client-api/Apiuserdetails";

import { useAuthContext } from "../../Context/AuthContext";

import { usePoPupContext } from "../../Context/PopupContext";
import { Toastsucess } from "../../Componet/ReusableComponet/toast/Toast";
import { Link } from "react-router-dom";
import Viewproductcarticon from "../../Componet/ADDtoCart/Viewproductcarticon";

const Homeonsellingproduct = () => {
  const { data, isLoding } = SellingProduct();

  const dispatch = useDispatch();
  const getProgress = (start, end) => {
    return Math.round((100 * (start - end)) / start) + "%";
  };

  const { setopenpopup } = usePoPupContext();

  const changecontent = (curElem) => {
    setopenpopup(curElem);

    dispatch(resetProduct());
  };

  const { user, getuserdata } = useAuthContext();

  const { wishofuser, wishofusererror, wishofuserisLoading } =
    UserWhishList(getuserdata);

  const { data: datas } = UsergetwishList(getuserdata);

  const handleApi = async (e, isInWishList = false, productId = null) => {
    e.stopPropagation();

    try {
      if (!getuserdata?.token) {
        setopenpopup("login");
        return;
        //if user not logged in stop here
      }
      if (productId && !isInWishList) {
        await wishofuser(productId);
        Toastsucess(" Added to wishlist!", "sucess", "light");
      }
    } catch (error) {
      Toastsucess(error.message);
    }
  };


  const matches = useMediaQuery("(min-width: 380px)");
  const matche1 = useMediaQuery("(min-width: 1200px) and (max-width: 1300px)");

  let width, height;

  if (matches && !matche1) {
    width = "200px";
    height = "200px";
  } else if (matche1) {
    width = "130px";
    height = "130px";
  } else {
    width = "170px";
    height = "170px";
  }
  // console.log(data, "data set");
  return (
    <div>
      {/**********************************************************/}
      <div className="Home_on_sellingproduct">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <h3 className="flashsaletxt1">Top Selling Products</h3>
            </Grid>

            {data &&
              data?.products.map((curElem, index) => {
                const start = curElem?.product?.unit_price; // START: Jan 1, 2018
                const end = curElem?.product?.discount_price; // END: Dec 31, 2025
                const isInWishList = datas?.products?.some(
                  (el) =>
                    el?.product?.product_id === curElem?.product?.product_id
                );
                return (
                  <Grid item lg={4} md={6} sm={12} xs={12} key={index}>
                    <Card
                      sx={{
                        display: "flex",
                        height: {
                          xl: "13vw",
                          lg: "16.3vw",
                          md: "20vw",
                          sm: "33vw",
                        },
                        
                      }}
                      className="home_selling_product"
                    >
                      <Box
  sx={{
    position: "relative", // Set relative positioning for the parent Box
    "&:hover .overlay": {
      opacity: 1,
      visibility: "visible",
    },
    "& .imag_card": {
      zIndex: -1,
      transition: "transform .3s, filter 1.5s ease-in-out",
    },
  }}
>
  <CardMedia
    component="img"
    sx={{
      cursor: "pointer",
      width: width,
      height: height,
      margin: "auto",
      objectFit: "contain",
      position: "relative",
    }}
    src={`https://ik.imagekit.io/thmmwwbpc/product/images/${curElem?.product?.images?.[0]?.url}`}
    alt={curElem?.product?.name}
  />
  <Box
    className="overlay"
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      opacity: 0,
      visibility: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "opacity 0.3s, visibility 0.3s",
      zIndex: 1000,
    }}
  >
    {curElem?.product?.quantity_label <= 0 ? (
      <>
        <Avatar
          alt="Sold Out"
          src="https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/Assets/Soldout.png?updatedAt=1715237890899"
          sx={{ width: 65, height: 65 }}
        />
        <Link
          to={`/${curElem?.product?.slug}`}
          state={{
            product_slug: curElem?.product?.slug,
            store_id: curElem.store_id,
          }}
          className="linkstyle"
        >
          <VisibilityIcon sx={{ color: "whitesmoke", marginLeft: "20px" }} />
        </Link>
      </>
    ) : curElem?.product?.pre_order === 1 ? (
      <Link
        to={`/${curElem?.product?.slug}`}
        state={{
          product_slug: curElem?.product?.slug,
          store_id: curElem.store_id,
        }}
        className="linkstyle"
      >
        <VisibilityIcon sx={{ color: "whitesmoke" }} />
      </Link>
    ) : (
      <>
        <Viewproductcarticon modalofaddtocart={curElem} />
        <Link
          to={`/${curElem?.product?.slug}`}
          state={{
            product_slug: curElem?.product?.slug,
            store_id: curElem.store_id,
          }}
          className="linkstyle"
        >
          <VisibilityIcon sx={{ color: "whitesmoke", marginLeft: "20px" }} />
        </Link>
      </>
    )}
  </Box>
</Box>

                     
                      {/* <CardMedia
                        component="img"
                        sx={{
                          cursor: "pointer",
                          width: width,
                          height: height,
                          margin: "auto",               
                       
                                   
                          position: "relative", // Ensure positioning aligns with overlay,
                        }}
                      
                        src={`https://ik.imagekit.io/thmmwwbpc/product/images/${curElem?.product?.images?.[0]?.url}`}
                        alt={curElem?.product?.name}
                      />  */}

 



                      <FavoriteOutlinedIcon                     
                        onClick={(e) =>
                          handleApi(
                            e,
                            isInWishList,
                            curElem?.product?.product_id
                          )
                        }
                        {...(!isInWishList && {
                          color: "disabled",
                        })}
                        sx={{
                          zIndex: 1000,
                          position: "relative",
                          cursor: "pointer",
                          marginTop: "10px",
                          float: "left",
                          ...(isInWishList && { color: "red" }),
                        }}
                      />
      <Link
          to={`/${curElem?.product?.slug}`}
          state={{
            product_slug: curElem?.product?.slug,
            store_id: curElem.store_id,
          }}
          className="linkstyle"
        >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          position: "relative",
                          width: "100%",
                          cursor: "pointer",
                        }}
                        // onClick={() => changecontent(curElem)}
                      >
                        <CardContent sx={{ flex: "1 0 auto" }}>
                          {curElem?.product?.quantity_label <= 0 ? (
                            <Avatar
                              sx={{
                                backgroundColor: "red",
                                width: 70,
                                height: 20,
                                fontSize: ".83rem",
                                float: "right",
                                position: "relative",
                                fontFamily: "imported",
                                visibility:
                                  curElem?.product?.quantity_label <= 0
                                    ? "visible"
                                    : "hidden",
                                zIndex: 1000,
                              }}
                              variant="rounded"
                            >
                              Sold Out
                            </Avatar>
                          ) : (
                            <Avatar
                              sx={{
                                backgroundColor: "darkgreen",
                                width: 70,
                                height: 25,
                                float: "right",
                                position: "relative",
                                fontSize: ".85rem",
                                zIndex: 1000,

                                visibility: curElem?.product?.discount_price
                                  ? "visible"
                                  : "hidden",
                              }}
                              variant="rounded"
                            >
                              {getProgress(start, end)} Off
                            </Avatar>
                          )}

                          <br />

                          <p className="Homeon_selling_txt">
                            {" "}
                            {curElem?.product?.name.slice(0, 200)}
                          </p>

                          <div className="Homefeaturetxt" id="price">
                            <p className="flbrandtxt1" id="price">
                              {curElem?.product?.discount_price ? (
                                <>
                                  <del className="deleteprice">
                                    AED {curElem?.product?.unit_price}
                                  </del>{" "}
                                  <span style={{ color: "red" }}>
                                    AED {curElem?.product?.discount_price}
                                  </span>
                                </>
                              ) : (
                                <>AED {curElem?.product?.unit_price}</>
                              )}
                            </p>
                          </div>
                        </CardContent>
                      </Box>
                      </Link>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Homeonsellingproduct;
