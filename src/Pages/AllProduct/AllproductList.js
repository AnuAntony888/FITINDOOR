import React from "react";
import { useEffect, useState } from "react";
import Drawers from "../../Componet/ReusableComponet/Drawer/Drawers";
import Grid from "@mui/material/Grid";
import Sort from "../../Componet/Sort/Sort";
import Banner from "../../Assets/Banner.webp";
import "./AllProductList.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useFilterContext } from "../../Context/Filter_context_section";
import {
  GetfetchfilterCat,
  GetProductByCategories,
  GetUrlCat,
} from "../../client-api/ApiProducts";
import { useLocation, useParams } from "react-router-dom";
import Filsection from "../../Componet/FilterSection/Filsection";
import Cate from "../../Componet/ProductList/Cate";
import { AllproductBanner } from "./AllproductBanner";

import { MetaComponent } from "../../Icons/Icons";

const AllproductList = () => {
  const { subCat } = useParams();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const limit = 25;
  const location = useLocation();
  const offer = 0;
  const newURL = location.pathname;
  const splitURL = newURL.toString().split("/");

  // Fetching data related to the URL category
  const { urlCat, errorurl, urlCatLoading } = GetUrlCat(splitURL[2]);

  // Fetching filter category data
  const { checkboxFilters, filter_products, sorting, sorting_value } =
    useFilterContext();
  const { fetchfilterCat, errorMessage, fetchfilterCatLoading } =
    GetfetchfilterCat(urlCat?.data?.type, urlCat?.data?.category?.id);

  // State for storing the price filter value
  const [price, setPrice] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(
      () => setPrice(checkboxFilters.unit_price),
      1500
    );
    return () => {
      clearTimeout(timeout);
    };
  }, [checkboxFilters.unit_price]);

  // Fetching product data by categories
  const { data, hasNextPage, fetchNextPage, isLoading, isFetching } =
    GetProductByCategories(
      limit,
      urlCat?.data?.type,
      urlCat?.data?.category?.id,
      checkboxFilters,
      price,
      sorting_value,
      offer
    );

  const pgainatedData =
    (data?.pages && data.pages?.[data?.pages?.length - 1]) || [];

  const image = fetchfilterCat?.data?.category?.data?.find((image) => {
    return image?.parent_cat_id === urlCat?.data?.category?.id;
  });
  // console.log(urlCat?.data, "rl");
  return (
    <>
      <MetaComponent
        dynamicTitle={urlCat?.data?.category?.meta_title}
        dynamicKeywords={urlCat?.data?.category?.meta_tag}
        dynamicDescription={urlCat?.data?.category?.meta_description}
      />

      {!mobile ? (
        <>
          <AllproductBanner
            image={
              urlCat?.data?.category?.banner_image
                ? `https://admin.myfamilyfitness.com/uploads/category/images/${urlCat?.data?.category?.banner_image}`
                : Banner
            }
            title={urlCat?.data?.category?.name}
          />
          <Grid container spacing={1} sx={{ position: "relative" }}>
            <Grid item lg={2} md={3} sm={12}>
              <Filsection
                filterData={fetchfilterCat}
                fetchfilterCatLoading={fetchfilterCatLoading}
              />
            </Grid>

            <Grid
              item
              lg={10}
              md={9}
              sm={12}
              xs={12}
              sx={{
                justifyContent: "flex-end",
                display: "flex",
                alignItems: "end",
              }}
            >
              <Grid
                container
                spacing={2}
                sx={{ marginBottom: "auto", position: "sticky" }}
              >
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Sort
                    pgainatedData={pgainatedData}
                    sorting_value={sorting_value}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Cate
                    pgainatedData={pgainatedData}
                    hasNextPage={hasNextPage}
                    fetchNextPage={fetchNextPage}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    data={data}
                    urlCat={urlCat}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ textAlign: "left" }}>
            <Grid item lg={2.5} md={3} sm={12}></Grid>
            <Grid item md={9} lg={9.5} sm={12} sx={{ paddingRight: "5%" }}>
              <h1 className="meata_head_category">
                {urlCat?.data?.category?.head_title}
              </h1>
              <br />
              <p
                style={{ fontSize: ".8rem" }}
                dangerouslySetInnerHTML={{
                  __html: urlCat?.data?.category?.head_description,
                }}
              />
            </Grid>
          </Grid>
        </>
      ) : (
        <div className="List_filter_section">
          <AllproductBanner
            image={
              urlCat?.data?.category?.banner_image
                ? `https://admin.myfamilyfitness.com/uploads/category/images/${urlCat?.data?.category?.banner_image}`
                : Banner
            }
            title={urlCat?.data?.category?.name}
          />

          <Grid container spacing={2} display={"flex"} px={2}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  flexWrap: "nowrap",
                }}
              >
                <Drawers
                  pgainatedData={pgainatedData}
                  filterData={fetchfilterCat}
                  fetchfilterCatLoading={fetchfilterCatLoading}
                />
                <Sort
                  pgainatedData={pgainatedData}
                  sorting_value={sorting_value}
                />
              </Grid>
            </Grid>

            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Cate
                pgainatedData={pgainatedData}
                hasNextPage={hasNextPage}
                fetchNextPage={fetchNextPage}
                isLoading={isLoading}
                isFetching={isFetching}
                data={data}
                urlCat={urlCat}
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{
              textAlign: "left",
              paddingLeft: "7%",
              paddingRight: "7%",
              paddingTop: "5%",
              paddingBottom: "5%",
            }}
          >
            <Grid item md={12} lg={12} sm={12}>
              <h1 className="meata_head_category">
                {urlCat?.data?.category?.head_title}
              </h1>
              <br />
              <p
                style={{ fontSize: ".8rem" }}
                dangerouslySetInnerHTML={{
                  __html: urlCat?.data?.category?.head_description,
                }}
              />
            </Grid>
          </Grid>
        </div>
      )}
    </>
  );
};

export default AllproductList;
