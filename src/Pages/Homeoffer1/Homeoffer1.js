import React from "react";
import Grid from "@mui/material/Grid";
import "./Homeoffer1.css";
import { GetHomeofferimage } from "../../client-api/ApiHomeBanner";
import Bannerimagemap from "./Bannerimagemap";
const Homeoffer1 = () => {
  const { data, isLoading } = GetHomeofferimage();

  return (
    <div className="homeoffer1" >
      <Grid container columnSpacing={{ xs: 1, sm: 1, md: 1 }} rowSpacing={1}>
        <Bannerimagemap
          isLoadingBannerImage={isLoading}
          data={data}
          className="homeoffer1img"
          height={{
            lg: "21vw",
            md: "20vw",
            sm: "20vw",
            xs: "46vw",
          }}
        />
      </Grid>
    </div>
  );
};

export default Homeoffer1;
