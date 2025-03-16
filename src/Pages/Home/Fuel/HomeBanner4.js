import { Box, Button, Grid } from '@mui/material'
import React from 'react'

const HomeBanner4 = () => {
  return (
      <div>
              <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3} alignItems="center" sx={{ padding: '2%' }}>
                  
                
         
    
    <Grid item  lg={6} md={12} sm={12} xs={12}>
    {/* <p className='new_banner2' style={{
                          paddingTop:'20px'
                      }}>100% plant-based</p> */}
                      <h1 className="Home_new_content_1" style={{textAlign:'left'}}>  Delicious Recipes</h1>
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
                  <Grid item lg={3} md={6} sm={6} xs={12}>
                      <img src="https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/12/b.png"
                      alt='' width={'100%'}/>
                  </Grid>
                  <Grid item lg={3} md={6} sm={6} xs={12}>
                  <img src="https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/12/c-1.png"
                      alt='' width={'100%'}/>
                      </Grid>
  </Grid>
          </Box>
    </div>
  )
}

export default HomeBanner4