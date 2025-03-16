import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";
import Popup from "../../Componet/ReusableComponet/Popups";
import { useDispatch } from "react-redux";

import { resetProduct } from "../../redux/cartUiSlice";
import View from "../View/View";
import { GetRelatedProduct } from "../../client-api/ApiProducts";
import { usePoPupContext } from "../../Context/PopupContext";

const RelatedProduct = (props) => {
  //  const location = useLocation();
  // const { product_id, store_id } = location.state || {};
  const { product_id, store_id, short_description } = props;
  // console.log(product_id, store_id, "product_id");
  const { data, isLoading } = GetRelatedProduct(product_id, store_id);

  // console.log(data, "data relater");

  const dispatches = useDispatch();

  const { setopenpopup } = usePoPupContext();

  const changecontent = (curElem) => {
    setopenpopup(curElem);
    dispatches(resetProduct());
  };
  // console.log(data, "meta data styling");
  return (
    <div>

      {data && data?.products?.length > 0 ? (
        <div className="new_arrival_width_div">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 0.5, md: 2, lg: 3, sm: 1 }}>
              <Grid item xs={12} lg={12} md={12} sm={12}>
                <h3 className="flashsaletxt1">Related Product</h3>
              </Grid>
              {data &&
                data?.products?.map((curElem) => {
                  return (
                    <Grid
                      item
                      xs={6}
                      lg={2.4}
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
                })}
            </Grid>
          </Box>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default RelatedProduct;
