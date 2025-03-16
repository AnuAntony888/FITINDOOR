import React from "react";
import Grid from "@mui/material/Grid";
import "./MyImage.css";
import Box from "@mui/material/Box";
import dafualtimg from "../../Assets/default-pro.jpg";
// import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import CommonSkeleton from "../ReusableComponet/CommonSkeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import ReactImageMagnify from "react-image-magnify";

const breakpoints = {
  spaceBetween: 20,
  slidesPerView: 1,
  centeredSlides: true,

  responsive: [
    {
      breakpoint: 1025,
      breakpoints: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
    },

    {
      breakpoint: 667,
      breakpoints: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
    {
      breakpoint: 480,
      breakpoints: {
        slidesPerView: 1,
        spaceBetween: 8,
      },
    },
  ],
};
const MyImage = ({ imgs = [{ url: "" }], isLoading }) => {
  //console.log(imgs, "image list one arry");

  // Check if imgs is null or empty, and if so, render a default image
  if (!imgs || imgs.length === 0) {
    return (
      <div>
        <div className="image_grid_large">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={6} lg={6} md={6} sm={6}>
                <img
                  src={dafualtimg} // Replace 'path_to_default_image' with the URL of your default image
                  alt="Default Image"
                  className="box-image--style"
                  width="100%"
                />
              </Grid>
            </Grid>
          </Box>
        </div>
        <div className="image_grid_large_lg">
          <img
            src={dafualtimg} // Replace 'path_to_default_image' with the URL of your default image
            alt="Default Image"
            className="box-image--style"
            width="100%"
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="image_grid_large">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {isLoading ? (
              <Grid item xs={12}>
                <CommonSkeleton length={10} height={250} width={"100%"} />
              </Grid>
            ) : (
              imgs &&
              imgs.map((curElm, index) => {
                //console.log(curElm.url, "images one array");
                return (
                  
                  <Grid item xs={6} key={index}>
                    {/* <img
                            src={`https://ik.imagekit.io/thmmwwbpc/product/images/${curElm.url}`}
                    
                      alt={curElm.filename}
                      className="box-image--style"
                      width="100%"
                    /> */}

<ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: curElm.filename,
                        isFluidWidth: true,
                        src: `https://ik.imagekit.io/thmmwwbpc/product/images/${curElm.url}`,
                      },
                      largeImage: {
                        src: `https://ik.imagekit.io/thmmwwbpc/product/images/${curElm.url}`,
                        width: 1000,
                        height: 1000,
                      },
                      enlargedImagePosition: "over",  // Options: 'beside' or 'over'
                    }}
                  />
                  </Grid>
                );
              })
            )}

          </Grid>
        </Box>
      </div>
      <div className="image_grid_large_lg">
        <Swiper
          {...breakpoints}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination]}
        >
          {isLoading ? (
            <CommonSkeleton length={10} height={250} width={"100%"} />
          ) : (
            imgs.map((curElm, index) => {
              return (
                <SwiperSlide key={index}>
                              <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: curElm.filename,
                        isFluidWidth: true,
                        src: `https://ik.imagekit.io/thmmwwbpc/product/images/${curElm.url}`,
                      },
                      largeImage: {
                        src: `https://ik.imagekit.io/thmmwwbpc/product/images/${curElm.url}`,
                        width: 1200,
                        height: 1200,
                      },
                      enlargedImagePosition: "over", // Options: 'beside' or 'over'
                    }}
                  />
                  
                  {/* <LazyLoadImage
                       src={`https://ik.imagekit.io/thmmwwbpc/product/images/${curElm.url}`}
                 
                    alt={curElm.filename}
                    className="box-image--style--lg"
                    width="100%"
                  /> */}
                </SwiperSlide>
              );
            })
          )}
        </Swiper>
      </div>
    </div>
  );
};

export default MyImage;
