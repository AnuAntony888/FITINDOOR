import React from "react";

import { useState, useEffect } from "react";

import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";

import Popup from "../../Componet/ReusableComponet/Popups";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { resetProduct } from "../../redux/cartUiSlice";
import View from "../View/View";
import { usePoPupContext } from "../../Context/PopupContext";

const LastViewed = ({ data }) => {
  // console.log(data, "laste viewd");
  const dispatches = useDispatch();

  const { setopenpopup } = usePoPupContext();

  const changecontent = (curElem) => {
    setopenpopup(curElem);
    dispatches(resetProduct());
  };

  // console.log(data?.product?.short_description,"last viewd");
  return (
    <div>
   
      {data ? (
        <div className="new_arrival_width_div">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 0.5, md: 2, lg: 3, sm: 1 }}>
              <Grid item xs={12} lg={12} md={12} sm={12}>
                <h3 className="flashsaletxt1">Recently viewed products</h3>
              </Grid>
              {data &&
                data?.map((curElem) => {
                  // console.log(curElem, "lastviews");
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

export default LastViewed;
