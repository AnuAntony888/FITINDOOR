import React from "react";
import Grid from "@mui/material/Grid";
import Slider from "react-slick";
import "./HomeShopbycategory.css";
import { ShowHomeShopBycategories } from "../../client-api/APIcategory";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { FeaturedProductCard, Reuseheading, categoryimages } from "../../Icons/Reuseheading";

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <div
      className="slickbuttonprev"
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <KeyboardArrowLeftIcon />
    </div>
  );
}

function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className="slickbuttonnext" onClick={onClick}>
      <KeyboardArrowRightIcon className="keybordarrow" />
    </div>
  );
}
const settings = {
  className: "center",
  infinite: true,
  centerPadding: "10px",
  slidesToShow: 7,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,

  responsive: [
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
        autoplay: true,
      },
    },
    {
      breakpoint: 962,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 2,
        infinite: true,
        autoplay: true,
      },
    },
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 2,
        autoplay: true,
      },
    },
    {
      breakpoint: 668,
      settings: { slidesToShow: 4, slidesToScroll: 4, autoplay: true },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 2, slidesToScroll: 2, autoplay: true },
    },
  ],
};

const Homeshopbycategory = ({ homepagetheme }) => {
  const { data } = ShowHomeShopBycategories();

  return (
    <div className="shop_by_categorydiv">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Reuseheading
            heading={
              homepagetheme?.template === "Normal"
                ? "SHOP BY CATEGORY"
                : "Shop By Category"
            }
            className={
              homepagetheme?.template === "Normal"
                ? "shoppingcart"
                : "flashsaletxt1"
            }
            fontSize={
              homepagetheme?.template === "Normal" ? "1.25rem" : undefined
            }
          />
        </Grid>
        <Grid item xs={12}>
          {homepagetheme?.template === "Normal" ? (
            <Grid container spacing={3}>
              {data &&
                data?.data?.slice(0, 8).map((post) => (
                  <FeaturedProductCard
                    key={post.id}
                    image={`${categoryimages}/${post.image}`}
                    txt={post.name}
                    alt={post.name}
                    lg={3}
                    md={4}
                    xs={6}
                    sm={6}
                    decription={post.decription}
                    link={`/category/${post.slug}`}
                    state={{
                      sub_category_id: post.id,
                      banner_image: post.banner_image,
                      name: post.name,
                    }}
                  />
                ))}
            </Grid>
          ) : (
            <div>
              <Slider {...settings} className="slickheight">
                {data &&
                  data?.data?.map((post) => (
                    <FeaturedProductCard
                      key={post.id}
                      image={`${categoryimages}/${post.image}`}
                      txt={post.name}
                      alt={post.name}
                      decription={post.decription}
                      link={`/category/${post.slug}`}
                      state={{
                        sub_category_id: post.id,
                        banner_image: post.banner_image,
                        name: post.name,
                      }}
                      icon
                    />
                  ))}
              </Slider>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Homeshopbycategory;
