import React from "react";
import Grid from "@mui/material/Grid";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CommonSkeleton from "../../Componet/ReusableComponet/CommonSkeleton";
import { Bannerimages } from "../../Icons/Reuseheading";

const Bannerimagemap = ({
  data,
  isLoadingBannerImage,
  style,
  className,
  height,
}) => {
  const renderSkeletons = () =>
    Array.from({ length: 6 }).map((_, index) => (
      <CommonSkeleton
        length={1}
        key={index}
        lg={index === 0 || index === 5 ? 6 : 3}
        md={index === 0 || index === 5 ? 7 : 2.5}
        sm={index === 0 || index === 5 ? 7 : 2.5}
        xs={index === 0 || index === 5 ? 12 : 6}
        height="400px"
        width="970px"
      />
    ));

  const renderImages = () =>
    data.map((curElem, index) => {
      const imageElement = (
        <LazyLoadImage
          key={index}
          alt="familyFitnessBannerImage"
          className={className}
          height="200px"
          src={`${Bannerimages}/${curElem.image}`}
          width="200px"
          style={{ ...style }}
        />
      );
// console.log(curElem,"curelement")
      return (
        <Grid
          item
          key={curElem?.banner_id}
          lg={index === 0 || index === 5 ? 6 : 3}
          md={index === 0 || index === 5 ? 7 : 2.5}
          sm={index === 0 || index === 5 ? 7 : 2.5}
          xs={index === 0 || index === 5 ? 12 : 6}
          height={height}
        >
          {curElem.url ? (
            <a href={curElem.url} target="_blank" rel="noopener noreferrer">
              {imageElement}
            </a>
          ) : (
            imageElement
          )}
        </Grid>
      );
    });

  return isLoadingBannerImage ? renderSkeletons() : data && renderImages();
};

export default Bannerimagemap;
