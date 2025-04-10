import { Box, Button, CardHeader, Grid, Typography } from '@mui/material'
import React from 'react'
import logo from '../../../Assets/320007864_878226486959511_8656414308010351970_n.jpg'

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import './Newcss.css'
import { Section1 } from '../../../client-api/APInewdesign';
import { secionimage } from '../Home';
import { Link } from 'react-router-dom';
import { Newhome1middilebannerlogo } from '../../../client-api/ApiHomeBanner';
const HomeBanner2 = () => {
    const { section1} = Section1();
    const { data } = Newhome1middilebannerlogo();
    console.log(section1,`https://admin.myfamilyfitness.com/public/uploads/section/images/${section1?.prod_image}`,"section1")
  return (
      <div>
          <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3} alignItems="center" sx={{ padding: '2%' }}>
                  <Grid item lg={12} md={12} xs={12}>
                      <img
                          src={ `https://admin.myfamilyfitness.com/uploads/banner/images/${data?.[0].image}`} alt=''
                          width={'100px'}
                     />
               <br/>
                      <p className='new_banner2' style={{
                          paddingTop:'20px'
                      }}>100% plant-based</p>
                  </Grid>
                  <Grid item lg={12} md={12} xs={12}>
                      <Box sx={{ paddingBottom: '50px' }} >
                          {/* <h2 className="Home_new_content_1" >{data?.[0].description}</h2> */}
                          <h2 className="Home_new_content_1" 
        dangerouslySetInnerHTML={{ __html: data?.[0].description }}
      /> 
                      {/* <h2 className="Home_new_content_1">  Powered Goodness!</h2>
                      */}
                      </Box> 
                  
                      </Grid>
                  <Grid item lg={4} md={6} sm={12} xs={12}>
                      <Box sx={{marginTop:'100px'}}>
                      <img
     src={section1?.[0]?.prod_image 
        ? `${secionimage}/${section1?.[0]?.prod_image}`
        : 'https://your-default-image-url.com/default.jpg'}
      
          
        alt=""
                          width="100%"
                                    height="650px"
                          style={{
                              borderTopRightRadius: '50%',
                      
                              borderBottomLeftRadius: '50%',
                              borderTopLeftRadius: '50%',
                       
        }} 
                          />
                          <h3 className="Home_new_content" style={{ textAlign: 'left', fontWeight: 'bold', transform: 'translate(90px,-40px)' }}>  {section1?.[0]?.prod_name}</h3>
                    
<p className="Homeon_selling_txt" style={{textAlign:'left',fontWeight:'bold',transform:'translate(90px, -60px)'}}>
<Link      to={section1?.[0]?.prod_url} style={{color:'black',textDecoration:'none'}}>View  </Link>    < ArrowRightAltIcon />
                          </p>
                      </Box>
    
    </Grid>
                  <Grid item lg={4} md={6} sm={12} xs={12}>
                      <Box>
                      <img
            src={section1?.[0]?.prod_image 
                ? `${secionimage}/${section1?.[0]?.prod_image1}`
                : 'https://your-default-image-url.com/default.jpg'}
        alt=""
                          width="100%"
                          height="650px"
                          style={{
                              borderTopRightRadius: '50%',
                              borderBottomRightRadius: '50%',
                              borderBottomLeftRadius: '50%',
                              objectFit:'cover'
                   
                      
        }} 
      /><h3 className="Home_new_content" style={{ textAlign: 'left', fontWeight: 'bold', transform: 'translate(90px,-40px)' }}>  {section1?.[0]?.prod_name1}</h3>
                    
                    <p className="Homeon_selling_txt" style={{textAlign:'left',fontWeight:'bold',transform:'translate(90px,-60px)'}}>
                                       <Link  style={{color:'black',textDecoration:'none'}}   to={section1?.[0]?.prod_url1}>View  </Link>  < ArrowRightAltIcon />
                                              </p></Box>
     
    </Grid>
    
    <Grid item  lg={4} md={12} sm={12} xs={12}>
    {/* <p className='new_banner2' style={{hhhhhhhhhh
                          paddingTop:'20px'
                      }}>100% plant-based</p> */}
                      <h2 className="Home_new_content_1">  {section1?.[0]?.name}</h2>
                      <p className='new_banner_text'
                      dangerouslySetInnerHTML={{ __html:section1?.[0]?.description }}
                      ></p>
                      <Button
            variant="contained"
            className="popViewbtn_1"
            // size="large"
            id="addtocart"
            // onClick={() => handleAddToCart(addToCartData)}
          >
        <Link to={section1?.[0]?.url} style={{color:'white',textDecoration:'none'}}>Shop All</Link>   
          </Button>
                  </Grid>
  </Grid>
          </Box>
          {/**********************static banner************************* */}
          <Grid container spacing={3} sx={{ padding:"2%",backgroundColor:'#F5F5F5',marginLeft:'0px'}}>
              {Data.map((data,index)=>(<>
              <Grid  item lg={3} md={6} sm={6} xs={12}
                           
            //   sx={{
            //     display: 'flex',
            //     justifyContent: 'center',
            //     alignItems: 'center',
            //   }}
                  >
         
            
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
    text1: "Core Strength",
    text2: "Build resilience, power, and confidence.",
},
{
    img: "https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/icon-5-1.png",
    text1: "Strong Bond",
    text2: "Trusted fitness, lasting wellness support.",
    }
    ,
    {
        img: "https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/icon-8.png",
        text1: "Peak Wellness",
        text2: "BAchieve fitness, health, and vitality.",
    },
    {
        img: "https://demo.anarieldesign.com/fuel/wp-content/uploads/sites/42/2023/11/icon-7.png",
        text1: "Fit Nexus",
        text2: "Your hub for total wellness.",
    }]