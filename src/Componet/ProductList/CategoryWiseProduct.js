import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useProductContext } from "../../Context/productcontex";
import { useFilterContext } from "../../Context/Filter_context_section";
import Modal from "../../Pages/Productbycategory/Modal";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Popup from "../ReusableComponet/Popups";
import View from "../../Pages/View/View";
import Avatar from "@mui/material/Avatar";
import { resetProduct } from "../../redux/cartUiSlice";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch } from "react-redux";
import CommonSkeleton from "../../Componet/ReusableComponet/CommonSkeleton";
export default function CategorywiseProduct({
  isProductLoading,
  products,
  productTotal,
  loadMore,
}) {
  const dispatches = useDispatch();
  const location = useLocation();

  // const [open, setOpen] = React.useState(false);
  const [openpopup, setopenpopup] = useState(false);
  const [popupcontent, setpopupcontent] = useState([]);
  const changecontent = (curElem) => {
    setpopupcontent([curElem]);
    setopenpopup(true);
    dispatches(resetProduct());
  };
  console.log(popupcontent);
  const handleClose = () => {
    setopenpopup(false);
  };


  useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  },[location])

  const theme = useTheme();

  console.log(products, "console quatityquatityquatityquatity ");

  return (
    <div>
      <Box sx={{ flexGrow: 1 }} id="category_id_list">
        <Grid container spacing={{ xs: 1, md: 3, lg: 3, sm: 2 }}>
          {products &&
            products?.map((curElem) => {
              return (
                <Grid item xs={6} lg={2.4} md={3} sm={4} key={curElem?.id}>
                  <View
                    curElem={curElem}
                    onClick={() => changecontent(curElem)}
                  />
                </Grid>
              );
            })}
          {/* {products?.length === 0 ? (
            <h5 style={{ textAlign:'center',margin:'auto' }}>
              No Products Available
            </h5>
          ) : (
            ""
          )} */}
          {!isProductLoading &&
            productTotal?.total !== products?.length &&
            products?.length > 0 && (
              <Grid item xs={12} lg={12} md={12}>
                <button className="brandList_address_btn" onClick={loadMore}>
                  Load More
                </button>
              </Grid>
            )}
        </Grid>
        <Grid container spacing={2}>
          {isProductLoading && (
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
        {popupcontent.map((popupcontent) => {
          return (
            <Popup
              openpopup={openpopup}
              setopenpopup={setopenpopup}
              maxWidth="700px"
              padding='0'
            
            >
              <Modal
                key={popupcontent.id}
                product={popupcontent}
                setopenpopup={setopenpopup}
              />
            </Popup>
          );
        })}
      </Box>
    </div>
  );
}
