import { Box, Button, Grid, Card, Badge, CardMedia, CardContent } from "@mui/material";
import React from "react";

import { Bannerimages } from "../../../Icons/Reuseheading";
import { Section2 } from "../../../client-api/APInewdesign";
import { Link } from "react-router-dom";
import { secionimage } from "../Home";

const HomeBanner3 = () => {
  // Sample data for mapping (replace with actual data)
  const cardData = [
    { id: 1, title: "Card 1" },
    { id: 2, title: "Card 2" },
  ];
  const { section2 } = Section2();
  console.log(section2,"data")
  return (
    <div>
      <Box sx={{ flexGrow: 1 ,backgroundColor:'#F5F5F5',paddingTop:'3%',paddingBottom:'3%'}}>
        <Grid container spacing={3} alignItems="center" sx={{ padding: "2%" }}>
          <Grid item lg={7} md={7} sm={12} xs={12}>
            {/* <p
              className="new_banner2"
              style={{
                paddingTop: "20px",
              }}
            >
              100% plant-based
            </p> */}
            <h2 className="Home_new_content_1">{section2?.[1]?.name}</h2>
            <p className="new_banner_text"
                                  dangerouslySetInnerHTML={{ __html:section2?.[1]?.description }}
            />
                             
        
       
            <Button variant="contained" className="popViewbtn_1" id="addtocart">
           <Link to={section2?.[1]?.url } style={{color:'white',textDecoration:'none'}}>Shop All</Link>   
            </Button>
            <Grid container spacing={3} alignItems="center" sx={{ padding: "2%" }}>
            
            
                  <Grid item lg={6} xs={12} md={6} sm={12} key={""}>
                <Link to={section2?.[1]?.
prod_url}>
                <Card sx={{ boxShadow: 3 }}>
                  
                    
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
       
      },
    }}
  />
                    <CardMedia component="img" image={section2?.[1]?.prod_image 
                                    ? `${secionimage}/${section2?.[1]?.prod_image}`
                                    : 'https://your-default-image-url.com/default.jpg'} alt='' />
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
                            {section2?.[1]?.prod_name}
                            </p>
  
                            <div className="Homefeaturetxt" id="price">
                        {/* <p className="flbrandtxt1" id="price">
                          <del className="deleteprice"> AED 100
                          </del> <span style={{ color: "red" }}>
                            AED 80
                          </span>
                            </p> */}
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
                           
                            </div>
                          </CardContent>
                  </Card>
                  </Link>
                </Grid>
                 <Grid item lg={6} xs={12} md={6} sm={12} key={""}>
                <Link to={section2?.[1]?.prod_url1
                  
               }>
                <Card sx={{ boxShadow: 3 }}>
                 
                   
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
      
     },
   }}
 />
                      <CardMedia component="img"
                        

                        image={section2?.[1]?.prod_image1 
                          ? `${secionimage}/${section2?.[1]?.prod_image1}`
                          : 'https://your-default-image-url.com/default.jpg'} 
                        alt={""} />
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
                          {section2?.[1]?.prod_name1}
                           </p>
 
                           <div className="Homefeaturetxt" id="price">
                       {/* <p className="flbrandtxt1" id="price">
                         <del className="deleteprice"> AED 100
                         </del> <span style={{ color: "red" }}>
                           AED 80
                         </span>
                           
                            
                             </p> */}
                           </div>
                         </CardContent>
                  </Card>
                  </Link>
               </Grid>
           
            </Grid>
                  </Grid>
                  <Grid item lg={5} md={5} sm={12} xs={12}>
            <img
      
              src={`${secionimage}/${section2?.[0]?.
                image
                }`}
              alt="" width={'100%'} style={{ borderRadius: '10px' }} />
                    <br/>
                      <h2 className="Home_new_content_1" style={{textAlign:'left',paddingTop:'20px',paddingBottom:'20px'}}>{section2?.[0]?.name}</h2>
            <p className="new_banner_text"  dangerouslySetInnerHTML={{ __html:section2?.[0]?.description }}/>
    
       
            <Button variant="contained" className="popViewbtn_1" id="addtocart">

              <Link to={section2?.[0]?.url} style={{ color: 'white', textDecoration: 'none' }}>Shop All</Link>           </Button>
                  </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default HomeBanner3;
