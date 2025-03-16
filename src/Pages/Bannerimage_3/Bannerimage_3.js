import React from "react";
import Grid from "@mui/material/Grid";
import { HomeBannerimage_3 } from "../../client-api/ApiHomeBanner";
import Bannerimagemap from "../Homeoffer1/Bannerimagemap";
const Bannerimage_3 = () => {
  const { data, isLoading } = HomeBannerimage_3();

  return (
    <>
      <Grid className="banner_image2">
        <Bannerimagemap
          isLoadingBannerImage={isLoading}
          data={data}
          height={{     xl: "25.5vw", lg: "25.5vw", md: "25vw", sm: "25vw", xs: "25vw" }}
          className="banner_3imge"
        />
      </Grid>
    </>
  );
};

export default Bannerimage_3;
