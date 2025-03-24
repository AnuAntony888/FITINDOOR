import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Badge,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  BestSellingProduct,
  ProductBanner1,
} from "../../../client-api/APInewdesign";
import { usePoPupContext } from "../../../Context/PopupContext";
import { resetProduct } from "../../../redux/cartUiSlice";
import { useAuthContext } from "../../../Context/AuthContext";
import { UsergetwishList } from "../../../client-api/Apiuserdetails";
import { Link } from "react-router-dom";
import { Newhomemainbanner } from "../../../client-api/ApiHomeBanner";

const HomeBanner1 = () => {
  const { data } = ProductBanner1();
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
  const { data: banner } = Newhomemainbanner();
console.log(banner?.[0]?.banner_id,banner?.[0],banner?.[0].image,"banner")
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Banner (3/4 width) */}
        <Grid item xs={12}>
          <Card>
    
              <CardMedia
                component="img"
                image={`https://admin.myfamilyfitness.com/uploads/banner/images/${banner?.[0].image}`}
                alt="Banner"
                sx={{ height: "100vh", width: '100%', }}
              />
    
            
          </Card>
        </Grid>

        
        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            sx={{
              paddingLeft: "16%",
              paddingRight: "16%",
              marginTop: "-150px",
            }}
          >
            {data?.products?.map((curElem) => {
              const start = curElem?.product?.unit_price;
              const end = curElem?.product?.discount_price;
              const isInWishList = datas?.products?.some(
                (el) => el?.product?.product_id === curElem?.product?.product_id
              );

              return (
                <Grid item lg={4} xs={12} md={4} sm={6} key={curElem.id}>
                  <Link
                    to={`/${curElem?.product?.slug}`}
                    state={{
                      product_slug: curElem?.product?.slug,
                      store_id: curElem.store_id,
                    }}
                    className="linkstyle"
                  >
                    <Card sx={{ boxShadow: 3 ,paddingBottom:'0px'}}>
                      <Box sx={{ position: "relative" ,paddingBottom:'0px'}}>
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
                          // src="https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/10/product-5-768x768.jpg"
                           src={`https://ik.imagekit.io/thmmwwbpc/product/images/${curElem?.product?.images?.[0]?.url}`}
                          alt={curElem?.product?.name}
                        />
                        
                        {/* <img 
                          height={"300px"}
                            src={`https://ik.imagekit.io/thmmwwbpc/product/images/${curElem?.product?.images?.[0]?.url}`}
                          alt={curElem?.product?.name}
                          style={{objectFit:'contain'}}
                          /> */}


                      </Box>

                      <CardContent sx={{ flex: "1 0 auto" ,paddingTop:'0'}}>
                        <br />

                        <p
                          className="Homeon_selling_txt"
                          style={{ height: "60px" ,paddingTop:'0px'}}
                        >
                          {curElem?.product?.name}
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
                    </Card>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeBanner1;
