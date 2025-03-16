import React from "react";
import Homeshopbycategory from "../HomeShopbycategory/Homeshopbycategory";
import Homeonsellingproduct from "../Homeonsellingproduct/Homeonsellingproduct";
import Homeoffer1 from "../Homeoffer1/Homeoffer1";
import Bannerimage from "../Bannerimage2/Bannerimage";
import Bannerimage_3 from "../Bannerimage_3/Bannerimage_3";
import Bannerimage_split from "../Bannerimage_split/Bannerimage_split";
import Get_experttip from "../Get_experttip/Get_experttip";
import SlideShow from "../Banner/SlideShow";
import Otherproducts from "../Productbycategory/Otherproducts";
import Listbrands from "../Brands/Listbrands";
import { Box } from "@mui/material";
import { PopularSerach } from "../../Icons/Icons";
import { Home_bg_Body } from "../../client-api/ApiHomeBanner";
import { imagemain } from "../../client-api/ApiHome";
import { Getfetchsettings } from "../../client-api/Apicod";
import Newhome from "../Newdesign/Newhome";
import { Circularrotate } from "../../Error";
import HomeBanner1 from "./Fuel/HomeBanner1";
import HomeBanner2 from "./Fuel/HomeBanner2";
import SopbyCategory from "./Fuel/SopbyCategory";
import HomeBanner3 from "./Fuel/HomeBanner3";
import BestSeller from "./Fuel/BestSeller";
import HomeBanner4 from "./Fuel/HomeBanner4";
import Hotdeal from "./Fuel/Hotdeal";
import Clients from "./Fuel/Clients";

const Home = () => {
  React.useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, []);
  //  const { data: homepagetheme, isLoading } = Getfetchsettings();
  const { data } = Home_bg_Body();
  return (
    <>
      <HomeBanner1 />
      <HomeBanner2 />
      <Homeshopbycategory />
      <SopbyCategory />
      <HomeBanner3 />
      <BestSeller />
      <HomeBanner4 />
      <Hotdeal />
      <Clients />
      <Box
        sx={{
          backgroundImage: `url(${imagemain}/${data?.[0]?.image})`,
          backgroundRepeat: "repeat",
        }}
      >
        {/* { isLoading?<Circularrotate />:
        homepagetheme?.template === "Normal" ? (
          <Newhome />
        ) : (
          <> */}

        {/* <Homeoffer1 />
        <Homeshopbycategory />
        <Otherproducts />
        <SlideShow />
        <Otherproducts product="featured" />
        <Bannerimage />
        <Listbrands />
        <Bannerimage_3 />
        <Homeonsellingproduct />
        <Bannerimage_split />
        <Get_experttip />
        <PopularSerach /> */}
        {/* </>
        )} */}
      </Box>
    </>
  );
};

export default Home;
