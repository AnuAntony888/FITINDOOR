import { Box, Button, Grid, Card, Badge, CardMedia, CardContent } from "@mui/material";
import React from "react";

import { Bannerimages } from "../../../Icons/Reuseheading";
import { Section2 } from "../../../client-api/APInewdesign";
import { Link } from "react-router-dom";
import { secionimage } from "../Home";

const HomeBanner3 = () => {

  const { section2 } = Section2();
  console.log(section2,"data")
  return (
    <div>
      <Box sx={{ flexGrow: 1 ,backgroundColor:'#F5F5F5',paddingTop:'3%',paddingBottom:'3%'}}>
        <Grid container spacing={3} alignItems="center" sx={{padding:'5%'}}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
           <h2 className="Home_new_content_1">{section2?.[1]?.name}</h2>
            <p className="new_banner_text"
                                  dangerouslySetInnerHTML={{ __html:section2?.[1]?.description }}
            />
   
       
            <Button variant="contained" className="popViewbtn_1" id="addtocart">
           <Link to={section2?.[1]?.url } style={{color:'white',textDecoration:'none'}}>Shop All</Link>   
            </Button>
            <Box>
              <Grid container spacing={2} sx={{paddingTop:'15px'}}>
                <Grid item lg={6} md={6} xs={12} sm={12}>
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
           
  
                            <br />
  
                            <p className="Homeon_selling_txt">
                            {section2?.[1]?.prod_name}
                            </p>
  
                     
                          </CardContent>
                  </Card>
                  </Link>
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={12}>
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
                                        
                   
                                             <br />
                   
                                             <p className="Homeon_selling_txt">
                                            {section2?.[1]?.prod_name1}
                                             </p>
                   
                                             <div className="Homefeaturetxt" id="price">
                                 
                                             </div>
                                           </CardContent>
                                    </Card>
                                    </Link>  
                  </Grid>
              </Grid>
</Box>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12}>


            <img
      
                    src={`${secionimage}/${section2?.[0]?.image
                      }`}
                    alt="" width={'100%'} style={{ borderRadius: '10px' }} />
           
                            <h2 className="Home_new_content_1" style={{paddingTop:'10px'}}>{section2?.[0]?.name}</h2>
                  {/* <p  style={{width:'10%'}} dangerouslySetInnerHTML={{ __html:section2?.[0]?.description }}/> */}
          
    
            <p className="new_banner_text"
                                  dangerouslySetInnerHTML={{ __html:section2?.[0]?.description }}
            />
   
                  <Button variant="contained" className="popViewbtn_1" id="addtocart">
      
                    <Link to={section2?.[0]?.url} style={{ color: 'white', textDecoration: 'none' }}>Shop All</Link>           </Button>
          </Grid>
 </Grid>
      </Box>
    </div>
  );
};

export default HomeBanner3;


