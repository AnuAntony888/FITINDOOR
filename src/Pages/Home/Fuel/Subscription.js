import { backdropClasses, Box, Button, CardHeader, Grid } from '@mui/material';
import React from 'react'
import Slider from 'react-slick';
import { Section5 } from '../../../client-api/APInewdesign';
import { secionimage } from '../Home';
import { Link } from 'react-router-dom';

const Subscription = () => {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        // cssEase: "linear"
      };
      // const items = Array.from({ length: 3 }, () => "Strength Training Equipment, Home Gym Essentials, Smart Home Gym Equipment");
      const items = [
        "Strength Training Equipment",
        "Home Gym Essentials",
        "Smart Home Gym Equipment"
      ];
      
  const { section5} = Section5();
    console.log(section5,"section4")
  return (<div>
    <div className="slider-container"
    style={{backgroundColor:"#995E65",color: 'white',padding:'30px',fontWeight:"bold", marginBottom:'10px'}}>
          <Slider {...settings} style={{
              padding: "30px", color: 'white',
              backgroundColor:"#995E65"
           }}>
        {items.map((item) => (
          <div key={item} style={{ width: "100%", backgroundColor: "#995E65", textAlign: "center" ,}}>
            <h3 style={{ fontSize:'1.5rem'}}>{item}</h3>
          </div>
        ))}
      </Slider>
      </div>
      {/**************************************/}
       <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3} alignItems="center" sx={{ padding: '2%' }}>
                        
                      
                    <Grid item lg={3} md={6} sm={6} xs={12}>
          <img
              src={`${secionimage}/${section5?.[0]?.
                                               image
                                               }`} 
            // src="https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/chocolate-powder.png"
                            alt='' width={'100%'}/>
                        </Grid>
                        <Grid item lg={3} md={6} sm={6} xs={12}>
                        <img 
              src={`${secionimage}/${section5?.[0]?.
                image2
                }`}             
            // src="https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/oatmeal-cookies.png"
                            alt='' width={'100%'}/>
                            </Grid>
          
          <Grid item  lg={6} md={12} sm={12} xs={12}>
      
          <h1 className="Home_new_content_1" style={{ textAlign: 'left' }}> {section5?.[0]?.name}</h1>
          <p className='new_banner_text'
          
          
          dangerouslySetInnerHTML={{ __html:section5?.[0]?.description }}/>
                            <Button
                  variant="contained"
                  className="popViewbtn_1"
                  // size="large"
                  id="addtocart"
                  // onClick={() => handleAddToCart(addToCartData)}
                >
                <Link to={section5?.[0]?.url} style={{ color: 'white', textDecoration: 'none' }}>Shop All</Link>          
                </Button>
                        </Grid>
                  
        </Grid>
                </Box>
      {/**************************************/}
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

export default Subscription
const Data = [{
    img: "https://demo.anarieldesign.com/fuel/wp-content/themes/fuel/assets/images/icon-1.webp",
    text1: "Free Shipping",
    text2: "Free Shipping for orders over $110",
},
{
    img: "https://demo.anarieldesign.com/fuel/wp-content/themes/fuel/assets/images/icon-2.webp",
    text1: "Money Guarantee",
    text2: "Within 30 days for an exchange.",
    }
    ,
    {
        img: "https://demo.anarieldesign.com/fuel/wp-content/themes/fuel/assets/images/icon-3.webp",
        text1: "Online Support",
        text2: "24 hours a day, 7 days a week",
    },
    {
        img: "https://demo.anarieldesign.com/fuel/wp-content/themes/fuel/assets/images/icon-4.webp",
        text1: "Flexible Payment",
        text2: "Pay with Multiple Credit Cards",
    }]