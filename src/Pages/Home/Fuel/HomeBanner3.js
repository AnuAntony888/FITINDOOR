import { Box, Button, Grid, Card, Badge, CardMedia, CardContent } from "@mui/material";
import React from "react";
import { Section3 } from "../../../client-api/APInewdesign";
import { Bannerimages } from "../../../Icons/Reuseheading";

const HomeBanner3 = () => {
  // Sample data for mapping (replace with actual data)
  const cardData = [
    { id: 1, title: "Card 1" },
    { id: 2, title: "Card 2" },
  ];
  const { data } = Section3();
  console.log(data?.[0].url,"data")
  return (
    <div>
      <Box sx={{ flexGrow: 1 ,backgroundColor:'#F5F5F5',paddingTop:'3%',paddingBottom:'3%'}}>
        <Grid container spacing={3} alignItems="center" sx={{ padding: "2%" }}>
          <Grid item lg={7} md={7} sm={12} xs={12}>
            <p
              className="new_banner2"
              style={{
                paddingTop: "20px",
              }}
            >
              100% plant-based
            </p>
            <h2 className="Home_new_content_1">Fuel+ New Arrivals: Plant-Powered Goodness</h2>
            <p className="new_banner_text">
              At Fuel+, we’re on a mission to redefine the way you think about
              nourishing your body. We believe that exceptional taste should
              coexist with unwavering commitment to your well-being and the
              planet. That’s why we’ve dedicated ourselves to crafting a range
              of plant-based foods, organic powders, bars, and chocolates that
              are as delicious as they are nourishing.
            </p>
            <Button variant="contained" className="popViewbtn_1" id="addtocart">
              Shop All
            </Button>
            <Grid container spacing={3} alignItems="center" sx={{ padding: "2%" }}>
              {products.map((product) => (
            
                  <Grid item lg={6} xs={12} md={6} sm={12} key={product.id}>
                  <Card sx={{ boxShadow: 3 }}>
                  
                    {/* <CardMedia component="img"  image={product.image} alt={product.name} /> */}
               <Box sx={{ position: "relative" }}>
                    
                      <Badge
    badgeContent="SALE !" 
    sx={{
      position: "absolute",
      top: 30,
      right: 50,
      zIndex: 10,
      padding: "20px",
      fontSize: "1rem",
      width: 100,
      "& .MuiBadge-badge": {
        backgroundColor: "#995E65", // Wine Red color
        color: "white", // Ensures text is visible
        padding: "15px",
        // borderRadius: "5px",
      },
    }}
  />
                      <CardMedia component="img" image={product.image} alt={product.name} />
                    </Box>
  <CardContent sx={{ flex: "1 0 auto" }}>
                            {/* {curElem?.product?.quantity_label <= 0 ? (
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
                            )} */}
  
                            <br />
  
                            <p className="Homeon_selling_txt">
                            Bowflex BXT8Ji Treadmill
                            </p>
  
                            <div className="Homefeaturetxt" id="price">
                        <p className="flbrandtxt1" id="price">
                          <del className="deleteprice"> AED 100
                          </del> <span style={{ color: "red" }}>
                            AED 80
                          </span>
                            
                                {/* {curElem?.product?.discount_price ? (
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
                                )} */}
                              </p>
                            </div>
                          </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
                  </Grid>
                  <Grid item lg={5} md={5} sm={12} xs={12}>
            <img
      
              src={data?.[0].url} 
              alt="" width={'100%'} style={{ borderRadius: '10px' }} />
                    <br/>
                      <h2 className="Home_new_content_1" style={{textAlign:'left',paddingTop:'20px',paddingBottom:'20px'}}>The Perfect Choice for Athletic Excellence</h2>
            <p className="new_banner_text">
            For athletes and active individuals seeking the ideal blend of energy and nutrition, look no further. The Salted Caramel Bar and Coffee Grape Bar offer the perfect combination of taste and sustenance to fuel your performance.
            </p>
            <Button variant="contained" className="popViewbtn_1" id="addtocart">
              Shop All
            </Button>
                  </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default HomeBanner3;
const products = [
    {
      id: 1,
      name: "Chocolate Caramel",
      price: "$2.50",
      originalPrice: "$3.50",
      image: "https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/10/product-8-1024x1024.jpg",
    },
    {
      id: 2,
      name: "Protein Fusion Powder",
      price: "$49.00 - $59.00",
      originalPrice: "$3.50",
      image: "https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/10/product-7-1024x1024.jpg",
    },
    
  ];