import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import CardMedia from "@mui/material/CardMedia";
import CommonSkeleton from "../../Componet/ReusableComponet/CommonSkeleton";
import "./NewArrival.css";
import Banner from "../../Assets/search.jpg";
import defimg from "../../Assets/no-product-found.png";
import View from "../View/View";
import { Helmet } from "react-helmet";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useSearchParams } from "react-router-dom";
import { GetSearchproducthomelist } from "../../client-api/ApiHome";
import { usePoPupContext } from "../../Context/PopupContext";
import { AllproductBanner } from "../AllProduct/AllproductBanner";
import { MetaComponent } from "../../Icons/Icons";
function NewArrival(props) {
  // const { setsearch } = props;

  // const [state, setstate] = useState("");
  const seracHandler = (event) => {};

  const [searchParams, setSearchParams] = useSearchParams();

  console.log(searchParams.get("Keyword"), "search parmet");

  const { data, hasNextPage, fetchNextPage, isLoading, isFetching } =
    GetSearchproducthomelist(searchParams.get("Keyword"));

  const pgainatedData =
    (data?.pages && data.pages?.[data?.pages?.length - 1]) || [];
  console.log(
    pgainatedData,
    "pgainatedDatapgainatedDatapgainatedDatapgainatedData"
  );

  const { setopenpopup } = usePoPupContext();

  const changecontent = (curElem) => {
    setopenpopup(curElem);
  };
  const theme = useTheme();
  const desktopview = useMediaQuery(theme.breakpoints.up("sm"));
  // console.log(data, "all search data");
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchParams.get("Keyword")]);
  // console.log(pgainatedData.length, "pgainatedData.length ");
  return (
    <div>
      <MetaComponent
        dynamicTitle={" Search Results | My Family Fitness"}
        dynamicKeywords={
          "Gym equipment, fitness gear, workout accessories, exercise machines, home gym, weights, fitness apparel, yoga mats, resistance bands, cardio equipment, strength training, My Family Fitness, fitness essentials"
        }
        dynamicDescription={
          "Shop the latest in gym and fitness products at My Family Fitness. Explore our collection of exercise equipment, accessories, and more. Elevate your workout routine with the best gear in the industry."
        }
      />
      <AllproductBanner
        image={
          data?.products?.[0].product.banner_image
            ? `https://admin.myfamilyfitness.com/uploads/blog/images/${data?.products?.[0].product.banner_image}`
            : Banner
        }
        title={"Search Results"}
      />
      <div className="new_arrival_width_div">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {isLoading ? (
              <CommonSkeleton
                length={10}
                xs={6}
                lg={2}
                md={3}
                sm={4}
                height={250}
                width={222}
              />
            ) : pgainatedData && pgainatedData.length === 0 ? (
              <>
                <CardMedia
                  component="img"
                  sx={{ maxWidth: "600px", margin: "auto" }}
                  image={defimg}
                  alt="Paella dish"
                />
              </>
            ) : (
              pgainatedData &&
              pgainatedData?.map((curElem) => {
                // data &&data.map((curElem) => {
                return (
                  <>
                    <Grid item xs={6} lg={2} md={4} sm={4} key={curElem?.id}>
                      <View
                        curElem={curElem}
                        onClick={() => changecontent(curElem)}
                      />
                    </Grid>
                  </>
                );
              })
            )}
            <Grid item xs={12} lg={12} md={12}>
              {!hasNextPage || isFetching ? (
                ""
              ) : (
                <button
                  className="brandList_address_btn"
                  onClick={fetchNextPage}
                >
                  Load More
                </button>
              )}
            </Grid>
            <Grid container spacing={2}>
              {isFetching && pgainatedData?.length > 0 && (
                <CommonSkeleton
                  length={20}
                  xs={6}
                  lg={2}
                  md={3}
                  sm={4}
                  height={250}
                  width={222}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default NewArrival;
