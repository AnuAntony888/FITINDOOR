import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import { GetBanner } from "../../client-api/ApiHomeBanner";
import "swiper/css";
import Grid from "@mui/material/Grid";
import "../Bannerimage2/Bannerimage.css";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { Bannerimages } from "../../Icons/Reuseheading";

const breakpoints = {
  spaceBetween: 20,
  slidesPerView: 1.35,
  centeredSlides: true,
  autoHeight: true,
  className: "swiper-slide",
  responsive: [
    {
      breakpoint: 1025,
      breakpoints: {
        slidesPerView: 1.25,
        spaceBetween: 10,
      },
    },

    {
      breakpoint: 667,
      breakpoints: {
        slidesPerView: 1.25,
        spaceBetween: 10,
      },
    },
    {
      breakpoint: 480,
      breakpoints: {
        slidesPerView: 1.25,
        spaceBetween: 8,
      },
    },
    {
      breakpoint: 300,
      breakpoints: {
        slidesPerView: 1.25,
        spaceBetween: 10,
      },
    },
  ],
};

function SlideShow() {
  const { data, isLoading } = GetBanner();

  return (
    <div className="swiper_centre_div">
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
        {data &&
          data.map((curElem, index) => {
            return (
              <SwiperSlide key={curElem?.banner_id}>
                <Grid
                  item
                  lg={index === 0 || index === 5 ? 6 : 3}
                  md={index === 0 || index === 5 ? 7 : 2.5}
                  sm={index === 0 || index === 5 ? 7 : 2.5}
                  xs={index === 0 || index === 5 ? 12 : 6}
                  height={{
                    xl: "27.2vw",
                    lg: "26vw",
                    md: "26.5vw",
                    sm: "31vw",
                    xs: "31vw",
                  }}
                >
                  <a
                    href={curElem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LazyLoadImage
                      alt="familyFitnessBannerImage"
                      className="banner_image_swipper"
                      height="200px"
                      src={`${Bannerimages}/${curElem.image}`}
                      width="200px"
                    />
                  </a>
                </Grid>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

export default SlideShow;
