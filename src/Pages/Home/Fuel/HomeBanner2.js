import { Box, Button, CardHeader, Grid, Typography } from '@mui/material'
import React from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import './Newcss.css'
const HomeBanner2 = () => {
  return (
      <div>
          <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3} alignItems="center" sx={{ padding: '2%' }}>
                  <Grid item lg={12} md={12} xs={12}>
                      <img src="https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/Minimalist-Natural-Organic-Kreis-Logo.jpg" alt=''/>
               <br/>
                      <p className='new_banner2' style={{
                          paddingTop:'20px'
                      }}>100% plant-based</p>
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                      <Box sx={{ paddingBottom: '50px' }} >
                          <h2 className="Home_new_content_1" >Elevating Your Wellness with Plant-Powered Goodness!</h2>
                       
                      <h2 className="Home_new_content_1">  Powered Goodness!</h2></Box>
                  
                      </Grid>
                  <Grid item lg={4} md={6} sm={12} xs={12}>
                      <Box sx={{marginTop:'100px'}}>
                      <img
        src="https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/12/hero-1-2048x1366.webp"
        alt=""
                          width="100%"
                                    height="650px"
                          style={{
                              borderTopRightRadius: '50%',
                      
                              borderBottomLeftRadius: '50%',
                              borderTopLeftRadius: '50%',
                       
        }} 
                          />
<h3 className="Home_new_content" style={{textAlign:'left',fontWeight:'bold',transform:'translate(90px,-40px)'}}>  Treadmill</h3>
                    
<p className="Homeon_selling_txt" style={{textAlign:'left',fontWeight:'bold',transform:'translate(90px, -60px)'}}>
                     View    < ArrowRightAltIcon />
                          </p>
                      </Box>
    
    </Grid>
                  <Grid item lg={4} md={6} sm={12} xs={12}>
                      <Box>
                      <img
        src="https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/12/hero-a-2048x1366.webp"
        alt=""
                          width="100%"
                          height="650px"
                          style={{
                              borderTopRightRadius: '50%',
                              borderBottomRightRadius: '50%',
                              borderBottomLeftRadius: '50%',
                              objectFit:'cover'
                   
                      
        }} 
      /><h3 className="Home_new_content" style={{ textAlign: 'left', fontWeight: 'bold', transform: 'translate(90px,-40px)' }}>  Treadmill</h3>
                    
                    <p className="Homeon_selling_txt" style={{textAlign:'left',fontWeight:'bold',transform:'translate(90px,-60px)'}}>
                                         View    < ArrowRightAltIcon />
                                              </p></Box>
     
    </Grid>
    
    <Grid item  lg={4} md={12} sm={12} xs={12}>
    <p className='new_banner2' style={{
                          paddingTop:'20px'
                      }}>100% plant-based</p>
                      <h2 className="Home_new_content_1">  Collections Spotlight</h2>
                      <p className='new_banner_text'>At Fuel+, we’re on a mission to redefine the way you think about nourishing your body. We believe that exceptional taste should coexist with unwavering commitment to your well-being and the planet. That’s why we’ve dedicated ourselves to crafting a range of plant-based foods, organic powders, bars, and chocolates that are as delicious as they are nourishing.</p>
                      <Button
            variant="contained"
            className="popViewbtn_1"
            // size="large"
            id="addtocart"
            // onClick={() => handleAddToCart(addToCartData)}
          >
           Shop All
          </Button>
                  </Grid>
  </Grid>
          </Box>
          {/**********************static banner************************* */}
          <Grid container spacing={3} sx={{ padding:"1%",backgroundColor:'#F5F5F5'}}>
              {Data.map((data,index)=>(<>
              <Grid  item lg={3} md={6} sm={6} xs={12}>
         
            
  <CardHeader
    avatar={
      <img src={data.img} alt='' style={{objectFit:'cover'}}/>
    }
                          title={<h6 style={{ textAlign: 'left', fontWeight: 'bold', }}>{data.text1}</h6>}
                          subheader={<p style={{ textAlign: 'left', }}>{data.text2}</p>}
 
  />
</Grid>
</>))}
</Grid>

       
             
   

    </div>
  )
}

export default HomeBanner2
const Data = [{
    img: "https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/icon-6.png",
    text1: "High-Protein",
    text2: "Empowering Your Performance",
},
{
    img: "https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/icon-5-1.png",
    text1: "Organic & Vegan",
    text2: "Nature’s Purest Nourishment",
    }
    ,
    {
        img: "https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/icon-8.png",
        text1: "Healthy & Handmade",
        text2: "Beautifully Crafted, Lovingly Made",
    },
    {
        img: "https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/icon-7.png",
        text1: "Complete Nutrition",
        text2: "Fueling Your Best Self",
    }]