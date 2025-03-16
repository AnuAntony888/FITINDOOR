import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import React from "react";
import { BestSellingProduct } from "../../../client-api/APInewdesign";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { usePoPupContext } from "../../../Context/PopupContext";
import { useAuthContext } from "../../../Context/AuthContext";
import { resetProduct } from "../../../redux/cartUiSlice";
import { UsergetwishList, UserWhishList } from "../../../client-api/Apiuserdetails";
import { SellingProduct } from "../../../client-api/ApiHome";

const BestSeller = () => {
  const { data, isLoding } = SellingProduct();
  console.log(data, "data");
  const dispatch = useDispatch();

  const getProgress = (start, end) => {
    if (!start || !end) return "0%";
    return Math.round((100 * (start - end)) / start) + "%";
  };

  const { setopenpopup } = usePoPupContext();

  const changecontent = (curElem) => {
    setopenpopup(curElem);
    dispatch(resetProduct());
  };

  const { getuserdata } = useAuthContext();

  const { data: datas } = UsergetwishList(getuserdata);

  return (
    <Box sx={{ flexGrow: 1, padding: "5%" }}>
      <Grid container spacing={4}    sx={{            
              justifyContent: "center",
              alignItems: "center",
            }}>
        <Grid item lg={12} md={12} xs={12} sx={{ textAlign: "left" }}>
          <h2 className="Home_new_content_1">Best Sellers</h2>
        </Grid>

        {data?.products?.map((curElem) => {
          const start = curElem?.product?.unit_price;
          const end = curElem?.product?.discount_price;
          const isInWishList = datas?.products?.some(
            (el) => el?.product?.product_id === curElem?.product?.product_id
          );

          return (
            <Grid item lg={3} xs={12} md={4} sm={6} key={curElem.id}
         
            >
              <Link
                to={`/${curElem?.product?.slug}`}
                state={{
                  product_slug: curElem?.product?.slug,
                  store_id: curElem.store_id,
                }}
                className="linkstyle"
              >
                <Card sx={{ boxShadow: 3 }}>
                  <Box sx={{ position: "relative" }}>
                  
                  <Badge
  badgeContent={
    curElem?.product?.quantity_label <= 0
      ? "Sold Out"
      : curElem?.product?.discount_price
      ? `${getProgress(start, end)} Off`
      : "SALE"
  }
  sx={{
    position: "absolute",
    top: 30,
    right: 50,
    zIndex: 10,
    padding: "20px",
    fontSize: "1rem",
    width: 100,
    "& .MuiBadge-badge": {
      backgroundColor: "#995E65",
      color: "white",
      padding: "15px",
    },
  }}
/>


                    <CardMedia
                      component="img"
                      sx={{
                        cursor: "pointer",
                        width: "100%",
                        height: "250px",
                        margin: "auto",
                         objectFit: "contain",
                      }}
                      src={`https://ik.imagekit.io/thmmwwbpc/product/images/${curElem?.product?.images?.[0]?.url}`}
                      alt={curElem?.product?.name}
                    />
                  </Box>

                  <CardContent sx={{ flex: "1 0 auto", paddingTop:'0px'}}>
                   

                    <br />

                    <p className="Homeon_selling_txt" style={{height:'60px'}}>{curElem?.product?.name}</p>

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
                </Card>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default BestSeller;
