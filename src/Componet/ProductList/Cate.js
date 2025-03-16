import React from "react";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

import {
  sortofdata,
  useFilterContext,
} from "../../Context/Filter_context_section";
import Modal from "../../Pages/Productbycategory/Modal";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Popup from "../ReusableComponet/Popups";
import View from "../../Pages/View/View";
import CommonSkeleton from "../../Componet/ReusableComponet/CommonSkeleton";
import { DataMerge } from "../../Pages/Brands/Brands";
import { usePoPupContext } from "../../Context/PopupContext";
export default function Cate({
  pgainatedData,
  hasNextPage,
  fetchNextPage,
  isLoading,
  isFetching,
  data,
  urlCat
}) {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const { checkboxFilters, sorting_value } = useFilterContext();

  const { setopenpopup } = usePoPupContext();

  const changecontent = (curElem) => {
    // setopenpopup(curElem);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  const limit = 24;

  return (
    <div>
      <div className="new_arrival_width_div" style={{ position: "relative" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {isLoading ? (
              <CommonSkeleton
                length={20}
                height={250}
                xs={6}
                lg={2.4}
                md={3}
                sm={4}
                width={222}
              />
            ) : pgainatedData?.data &&
              pgainatedData?.data[0]?.product !== null ? (
              DataMerge(pgainatedData?.data, "products")?.length > 0 &&
              sortofdata(
                sorting_value,
                DataMerge(pgainatedData?.data, "products")
              )?.map((curElem) => {
                return (
                  <Grid
                    item
                    xs={6}
                    lg={2.4}
                    md={3}
                    sm={4}
                    key={curElem?.product.product_id}
                  >
                    <View
                      curElem={curElem}
                      onClick={() => changecontent(curElem)}
                      urlCat={urlCat}
                    />
                  </Grid>
                );
              })
            ) : (
              <Grid
                item
                xs={12}
                lg={12}
                md={12}
                sm={12}
                alignItems="center"
                justifyContent="center"
                display="flex"
              >
                {/* No products to display */}
              </Grid>
            )}
          </Grid>
          {pgainatedData?.data && pgainatedData?.data[0]?.product !== null && (
            <Grid item xs={12} lg={12} md={12}>
              {!hasNextPage || isFetching ? (
                ""
              ) : (
                <Grid>
                  <br />

                  <button
                    className="brandList_address_btn"
                    onClick={fetchNextPage}
                  >
                    Load More
                  </button>
                </Grid>
              )}
            </Grid>
          )}
          <Grid container spacing={2}>
            {isFetching && pgainatedData?.data?.length > 0 && (
              <CommonSkeleton
                length={20}
                xs={6}
                lg={2.4}
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
