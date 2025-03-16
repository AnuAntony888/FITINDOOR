import { Badge, Box, Card, CardContent, CardMedia, Grid } from "@mui/material";
import React from "react";
import { HotdealProduct } from "../../../client-api/APInewdesign";
import { useDispatch } from "react-redux";
import { usePoPupContext } from "../../../Context/PopupContext";
import { resetProduct } from "../../../redux/cartUiSlice";
import { useAuthContext } from "../../../Context/AuthContext";
import { UsergetwishList } from "../../../client-api/Apiuserdetails";
import { Link } from "react-router-dom";

const Hotdeal = () => {
  const { data } = HotdealProduct();
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
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={5} sx={{ padding: "5%" }}>
          <Grid item lg={12} md={12} xs={12} sx={{ textAlign: "left" }}>
            <h2 className="Home_new_content_1"> Hot Deals!</h2>
          </Grid>
          {data?.products?.map((curElem, index) => {
            const start = curElem?.product?.unit_price;
            const end = curElem?.product?.discount_price;
            const isInWishList = datas?.products?.some(
              (el) => el?.product?.product_id === curElem?.product?.product_id
            );
            // Define background colors based on index
            const bgColor =
              index === 0
                ? "#E9D6D6"
                : index === 1
                ? "#E5E5E5"
                : index === 2
                ? "#D4E4DE"
                : "white";

            return (
              <Grid item lg={4} xs={12} md={4} sm={4} key={curElem.id}>
                <Link
                  to={`/${curElem?.product?.slug}`}
                  state={{
                    product_slug: curElem?.product?.slug,
                    store_id: curElem.store_id,
                  }}
                  className="linkstyle"
                >
                  <Card sx={{ boxShadow: 3, backgroundColor: bgColor }}>
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

                    <CardContent sx={{ flex: "1 0 auto" ,paddingTop:'0'}}>
                      <br />

                      <p
                        className="Homeon_selling_txt"
                        style={{ height: "60px" }}
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
      </Box>
    </div>
  );
};

export default Hotdeal;
const products = [
  {
    bgcolor: "#E9D6D6",
    id: 1,
    name: "Chocolate Caramel",
    price: "$2.50",
    originalPrice: "$3.50",
    image:
      "https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/Untitled-1.png",
  },
  {
    bgcolor: "#E5E5E5",
    id: 2,
    name: "Protein Fusion Powder",
    price: "$49.00 - $59.00",
    originalPrice: "$3.50",
    image:
      "https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/hero-b.png",
  },
  {
    bgcolor: "#D4E4DE",
    id: 1,
    name: "Chocolate Caramel",
    price: "$2.50",
    originalPrice: "$3.50",
    image:
      "https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/hero-C.png",
  },
];
