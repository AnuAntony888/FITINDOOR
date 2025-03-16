import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import Slider from "react-slick";

import {
  Reuseheading,
  FeaturedProductCard,
  FeaturedTreanding,
  Womencard,
  NewHomebanners,
  Bannerimages,
  categoryimages,
} from "../../Icons/Reuseheading";

import { GetSubcategories } from "../../client-api/APIcategory";

import { SellingProduct } from "../../client-api/ApiHome";
import View from "../View/View";

import CommonSkeleton from "../../Componet/ReusableComponet/CommonSkeleton";
import { usePoPupContext } from "../../Context/PopupContext";
import Listbrands from "../Brands/Listbrands";
import { Getfetchsettings } from "../../client-api/Apicod";
import Homeshopbycategory from "../HomeShopbycategory/Homeshopbycategory";

import {
  Categorybanner2newhome,
  Categorybannernewhome1,
  Newhome1middilebanner,
  Newhomebannerlast,
  Newhomemainbanner,
} from "../../client-api/ApiHomeBanner";

const Newhome = () => {
  const { datasubcategory, isLoadingsubcategory } = GetSubcategories();
  const { data: homepagetheme } = Getfetchsettings();

  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 4000,
  };

  const { data: topsellingproduct, isLoding } = SellingProduct();
  const [description] = useState(true);
  const { setopenpopup } = usePoPupContext();
  const changecontent = (curElem) => {
    setopenpopup(curElem);
  };
  const { data: newhomebanner1, isLoading: newhomebannerisloading } =
    Newhomemainbanner();
  const { data: categorybannernew1, isLoading: categorybannernew1isloading } =
    Categorybannernewhome1();
  const { data: categorybanner2new, isLoading: categorybanner2newisloading } =
    Categorybanner2newhome();
  const { data: homelastbanner, isLoading: homelastbannerisloading } =
    Newhomebannerlast();
  const { data: newhomemiddlebanner, isLoading: newhomemiddlebannerisloading } =
    Newhome1middilebanner();
  return (
    <div>
      <Box
        sx={{
          // height:'100vh',
          "& .slick-slide > div": {
            margin: "unset",
          },
        }}
      >
        <Slider {...settings}>
          {newhomebanner1?.map((data, index) => (
            <img
              key={`slide_${index}_${data.img}`}
              src={`${Bannerimages} /${data.image}`}
              alt={`Slide ${index}`}
            />
          ))}
        </Slider>
      </Box>

      <FeaturedTreanding product="featured" description={description} />
      <Reuseheading
        heading={"DEALS FOR YOU"}
        className="shoppingcart"
        fontSize="1.25rem"
      />

      <Grid
        container
        sx={{ pt: "2%", pl: "6%", pr: "6%", pb: "2%" }}
        spacing={3}
      >
        {isLoadingsubcategory ? (
          <CommonSkeleton
            length={4}
            height={250}
            xs={6}
            lg={3}
            md={3}
            sm={4}
            width={222}
          />
        ) : (
          datasubcategory &&
          datasubcategory.map((curElm) => (
            <FeaturedProductCard
              key={`subcategory_${curElm.id}`}
              image={`${categoryimages}/${curElm.image}`}
              txt={curElm.name}
              alt={curElm.name}
              decription={curElm.decription}
              lg={3}
              md={3}
              xs={6}
              sm={6}
              link={`/offers`}
            />
          ))
        )}
      </Grid>

      <NewHomebanners src={categorybannernew1?.[0].image} />
      <Womencard arryof={[0]} />

      <FeaturedTreanding description={description} />

      <NewHomebanners src={categorybanner2new?.[0].image} />

      <Womencard arryof={1} />

      <Grid
        container
        sx={{ pt: "2%", pl: "4%", pr: "4%", pb: "2%" }}
        spacing={3}
      >
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Homeshopbycategory homepagetheme={homepagetheme} />
        </Grid>
      </Grid>

      <NewHomebanners src={newhomemiddlebanner?.[0].image} />
      <Grid
        container
        sx={{ pt: "2%", pl: "6%", pr: "6%", pb: "2%" }}
        spacing={3}
      >
        <Grid item xs={12}>
          <Reuseheading
            heading={"TOP SELLING PRODUCT"}
            className="shoppingcart"
            fontSize="1.25rem"
          />
        </Grid>

        {isLoding ? (
          <CommonSkeleton
            length={4}
            height={250}
            xs={6}
            lg={3}
            md={3}
            sm={4}
            width={222}
          />
        ) : (
          topsellingproduct?.products?.slice(0, 8)?.map((curElem) => (
            <Grid
              item
              xs={6}
              lg={3}
              md={3}
              sm={4}
              key={`product_${curElem?.product?.product_id}`}
            >
              <View
                curElem={curElem}
                onClick={() => changecontent(curElem)}
                description={description}
              />
            </Grid>
          ))
        )}
      </Grid>

      <Womencard arryof={2} />

      <NewHomebanners src={categorybanner2new?.[0].image} />
      <Grid container sx={{ pt: "2%", pl: "4%", pr: "4%", pb: "2%" }}>
        <Reuseheading
          heading={"POPULAR BRANDS"}
          className="shoppingcart"
          fontSize="1.25rem"
        />
        <Listbrands homepagetheme={homepagetheme} />
      </Grid>

      <NewHomebanners src={homelastbanner?.[0].image} />
    </div>
  );
};

export default Newhome;
