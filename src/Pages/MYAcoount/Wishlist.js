import React from "react";

import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid";
import { useLocation } from "react-router-dom";

import Popup from "../../Componet/ReusableComponet/Popups";
import { useDispatch } from "react-redux";
import Modal from "../Productbycategory/Modal";
import { resetProduct } from "../../redux/cartUiSlice";

import { useAuthContext } from "../../Context/AuthContext";
import { UsergetwishList } from "../../client-api/Apiuserdetails";
import View from "../View/View";
import { usePoPupContext } from "../../Context/PopupContext";

const Wishlist = () => {
  const { user, getuserdata } = useAuthContext();
  const { data, error, isLoading } = UsergetwishList(getuserdata);
  //console.log(data, "data.length");
  const dispatches = useDispatch();

  const { setopenpopup } = usePoPupContext();

  const changecontent = (curElem) => {
    setopenpopup(curElem);
    dispatches(resetProduct());
  };
  return (
    <div>
      {data ? (
        <div className="new_arrival_width_div">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 0.5, md: 2, lg: 3, sm: 1 }}>
              <Grid item xs={12} lg={12} md={12} sm={12}>
                <h3 className="flashsaletxt1">Wishlist Product</h3>
              </Grid>
              {data &&
                data?.products?.map((curElem) => {
                  return (
                    <>
                      <Grid item xs={6} lg={4} md={3} sm={4} key={curElem?.id}>
                        <View
                          curElem={curElem}
                          onClick={() => changecontent(curElem)}
                        />
                      </Grid>
                    </>
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

export default Wishlist;
