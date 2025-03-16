import React from "react";
import "./Bannerimage.css";
import Grid from "@mui/material/Grid";
import { HomeBannerimage } from "../../client-api/ApiHomeBanner";
import Bannerimagemap from "../Homeoffer1/Bannerimagemap";

const Bannerimage = () => {
  const { data, isLoading } = HomeBannerimage();

  return (
    <Grid className="banner_image2" >
      <Bannerimagemap
        isLoadingBannerImage={isLoading}
        data={data}
        height={{
          xl: "29.66vw",
          lg: "28vw",
          md: "29vw",
          sm: "29vw",
          xs: "29vw",
        }}
        className="banner_3imge"
        style={{ borderRadius: "7px" }}
      />
    </Grid>
  );
};

export default Bannerimage;
