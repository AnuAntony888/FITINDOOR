import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Modal from "../../Pages/Productbycategory/Modal";
import Skeleton from "@mui/material/Skeleton";
import Banner from "../../Assets/Banner.webp";
import View from "../View/View";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { resetProduct } from "../../redux/cartUiSlice";
import { GetBrandListProduct } from "../../client-api/ApiProducts";
import { DataMerge } from "./Brands";
import CommonSkeleton from "../../Componet/ReusableComponet/CommonSkeleton";
import { usePoPupContext } from "../../Context/PopupContext";
import { AllproductBanner } from "../AllProduct/AllproductBanner";
import { Helmet } from "react-helmet";
import { MetaSocial_home } from "../../client-api/ApiHomeBanner";

function BrandbyProductList() {
  const location = useLocation();

  const newURL = location.pathname;
  //console.log(newURL);
  const splitURL = newURL.toString().split("/");
  //console.log(splitURL[3], " const");

  // const slug=location.pathname
  // console.log(location.pathname, "location.state");
  const { data, hasNextPage, fetchNextPage, isLoading, isFetching } =
    GetBrandListProduct(splitURL[3]);

  const pgainatedData =
    (data?.pages && data.pages?.[data?.pages?.length - 1]) || [];
  const dispatches = useDispatch();
  const { setopenpopup } = usePoPupContext();

  const changecontent = (curElem) => {
    setopenpopup(curElem);
    dispatches(resetProduct());
  };

  const theme = useTheme();
  const desktopview = useMediaQuery(theme.breakpoints.up("sm"));

  //console.log(isLoading, "isLoading");
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // console.log(
  //   DataMerge(pgainatedData?.data, "products")?.products?.[0].product,
  //   "hhh"
  // );
  const {meta_social_home, meta_social_homeerror, meta_social_homeerrorisloding }=MetaSocial_home();
  return (
    <div>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          {
            DataMerge(pgainatedData?.data, "products")?.products?.[0].product
              .meta_title
          }
        </title>
        <meta
          name="title"
          content={
            DataMerge(pgainatedData?.data, "products")?.products?.[0].product
              .meta_title
          }
        />
        <meta
          name="description"
          content={
            DataMerge(pgainatedData?.data, "products")?.products?.[0].product
              .meta_description ||
              meta_social_home?.meta_description
            // "Buy Home Gym & Commercial Fitness Equipment online Store | My Family Fitness"
          }
        />
        <meta
          name="keywords"
          content={
            DataMerge(pgainatedData?.data, "products")?.products?.[0].product
              .meta_tag ||
              meta_social_home?.meta_tag
            // "Buy Home Gym & Commercial Fitness Equipment online Store | My Family Fitness"
          }
        />{" "}
        
      </Helmet>
      <AllproductBanner
        image={
          data?.products?.[0].product.banner_image
            ? `https://myfamilyfitness.com/uploads/blog/images/${data?.products?.[0].product.banner_image}`
            : Banner
        }
        title={
          DataMerge(pgainatedData?.data, "products")?.products?.[0].product
            .brand_name
        }
      />

      <div className="new_arrival_width_div">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {isLoading ? (
              <>
                <CommonSkeleton
                  length={24}
                  height={250}
                  xs={6}
                  lg={2}
                  md={3}
                  sm={4}
                  width={222}
                />
              </>
            ) : (
              pgainatedData &&
              DataMerge(pgainatedData?.data, "products")?.products?.map(
                (curElem) => {
                  return (
                    <Grid
                      item
                      xs={6}
                      lg={2}
                      md={3}
                      sm={4}
                      key={curElem?.product?.product_id}
                    >
                      <View
                        curElem={curElem}
                        onClick={() => changecontent(curElem)}
                      />
                    </Grid>
                  );
                }
              )
            )}
          </Grid>
          <Grid item xs={12} lg={12} md={12}>
            {!hasNextPage || isFetching ? (
              ""
            ) : (
              <button className="brandList_address_btn" onClick={fetchNextPage}>
                Load More
              </button>
            )}
          </Grid>
          <Grid container spacing={2}>
            {isFetching && pgainatedData?.data?.products?.length > 0 && (
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
        </Box>
      </div>
    </div>
  );
}

export default BrandbyProductList;
