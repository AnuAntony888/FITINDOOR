
import React from "react";
import Grid from "@mui/material/Unstable_Grid2";
import Slider from "react-slick";
import "./HomeShopbycategory.css";
import LinkIcon from "@mui/icons-material/Link";
import { ShowHomeShopBycategories } from "../../client-api/APIcategory";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import CardContent from "@mui/material/CardContent";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Reuseheading } from "../../Icons/Reuseheading";

function SamplePrevArrow(props) {
  const { style, onClick } = props;
  return (
    <>
      <div
        className="slickbuttonprev"
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <KeyboardArrowLeftIcon />
      </div>
    </>
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
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
      },
    },
  ],
};

const CategoryHome = ({ homepagetheme }) => {
  const { data } = ShowHomeShopBycategories();
  console.log(homepagetheme, homepagetheme?.template === "Normal", "theme");
  return (
      <div >
        
       <Grid container spacing={3}>
        <Grid xs={12}>
          {homepagetheme?.template === "Normal" ? (
            <Reuseheading
              heading={"SHOP BY CATEGORY"}
              className="shoppingcart"
              fontSize="1.25rem"
            />
          ) : (
            <Reuseheading
              heading={"Shop By Category"}
              className="flashsaletxt1"
            />
          )}
        </Grid>
        <Grid xs={12}>
          <div>
            <Slider {...settings} className="slickheight">
              {data &&
                data?.data?.map((post) => (
                  <React.Fragment key={post.id}>
                    <Link
                      to={`/category/${post.slug}`}
                      state={{
                        sub_category_id: post.id,
                        banner_image: post.banner_image,
                        name: post.name,
                      }}
                      className="brands_hd"
                    >
                      <Card
                        sx={{
                          position: "relative",
                          margin: "auto",
                          display: "flex",
                          boxShadow: "none",
                          borderRadius: "30px",

                          "& .image_sub_card": { display: "none" },
                          ":hover": {
                            "& .image_sub_card": {
                              display: "flex",
                              backgroundColor: "rgba(0, 0, 0,.3)",
                            },
                          },
                        }}
                      >
                        <LazyLoadImage
                          component="img"
                          src={`https://ik.imagekit.io/thmmwwbpc/category/images/${post.image}`}
                          style={{
                            margin: "auto",
                            width: "100%",
                            objectFit: "contain",
                            borderRadius: "20px",
                          }}
                          alt={post.name}
                        />
                        <Box
                          className="image_sub_card"
                          sx={{
                            top: "0",
                            position: "absolute",
                            borderRadius: "20px",
                            width: "100%",
                            height: "100%",

                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <LinkIcon
                            sx={{
                              fontSize: 40,
                              color: "whitesmoke",
                            }}
                          />
                        </Box>
                      </Card>
                      <CardContent>
                        <p className="flbrandtxt1" id="shop_name">
                          {post.name}
                        </p>
                      </CardContent>
                    </Link>
                  </React.Fragment>
                ))}
            </Slider>
          </div>
        </Grid>
      </Grid> 
    </div>
  );
};

export default CategoryHome;

