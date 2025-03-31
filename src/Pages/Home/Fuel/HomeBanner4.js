import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import { Section4 } from '../../../client-api/APInewdesign';
import { Link } from 'react-router-dom';
import { secionimage } from '../Home';

const HomeBanner4 = () => {
  const { section4 } = Section4();
  console.log(section4,"section4")
  return (
      <div>
              <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3} alignItems="center" sx={{ padding: '2%' }}>
                  
                
         
    
    <Grid item  lg={6} md={12} sm={12} xs={12}>

                      <h1 className="Home_new_content_1" style={{textAlign:'left'}}>  {section4?.[0]?.name
}</h1>
            <p className='new_banner_text'

dangerouslySetInnerHTML={{ __html:section4?.[0]?.description }}
                      />
                      <Button
            variant="contained"
            className="popViewbtn_1"
            // size="large"
            id="addtocart"
            // onClick={() => handleAddToCart(addToCartData)}
          >
           <Link to={section4?.[0]?.url} style={{ color: 'white', textDecoration: 'none' }}>Shop All</Link>          
          </Button>
                  </Grid>
                  <Grid item lg={3} md={6} sm={6} xs={12}>
            <img
                     src={`${secionimage}/${section4?.[0]?.
                                   image
                                   }`} 
              // src="https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/12/b.png"
                      alt='' width={'100%'}/>
                  </Grid>
                  <Grid item lg={3} md={6} sm={6} xs={12}>
            <img
              src={`${secionimage}/${section4?.[0]?.
                image2
                }`}
                      alt='' width={'100%'}/>
                      </Grid>
  </Grid>
          </Box>
    </div>
  )
}

export default HomeBanner4