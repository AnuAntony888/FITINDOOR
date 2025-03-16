import React from "react";
import "./Bannerimage_split.css";
import Grid from "@mui/material/Grid";

import {
  Bannerimage_split_last,
  MetaSocial_home,
} from "../../client-api/ApiHomeBanner";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Bannerimage_split = () => {
  const { data } = Bannerimage_split_last();
  const { meta_social_home } = MetaSocial_home();
  // console.log(data, "metasocial_home");
  return (
    <>
      <div className="banner_split">
        <Grid container columnSpacing={{ xs: 1, sm: 1, md: 2, lg: 2 }}>
          {data?.map((curElem, index) => {
            return (
              <Grid
                item
                key={curElem?.banner_id}
                xs={6}
                lg={6}
                md={6}
                sm={6}
                height={{ lg: "40vw", md: "46vw", sm: "46vw", xs: "47vw" }}
              >
                {curElem.url ? (
                  <a
                    href={curElem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LazyLoadImage
                      alt="familyFitnessBannerImage"
                      height="200px"
                      src={`https://ik.imagekit.io/thmmwwbpc/banner/images/${curElem.image}`}
                    
                      width="200px"
                      className="banner_3imge"
                    />
                  </a>
                ) : (
                  <LazyLoadImage
                    alt="familyFitnessBannerImage"
                    height="200px"
                    src={`https://ik.imagekit.io/thmmwwbpc/banner/images/${curElem.image}`}
                   
                    width="200px"
                    className="banner_3imge"
                  />
                )}
              </Grid>
            );
          })}
        </Grid>
      </div>
      <div className="banner_split">
        <Grid container>
          <Grid item lg={12} sm={12} xs={12} md={12}>
            <h1 className="shoppingcart" style={{ fontSize: "20px" }}>
              {meta_social_home?.head_title}
            </h1>
            <p
              dangerouslySetInnerHTML={{
                __html: meta_social_home?.head_description,
              }}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Bannerimage_split;
