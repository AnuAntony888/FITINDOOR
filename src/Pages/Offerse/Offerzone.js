import React from "react";

import { useState, useEffect } from "react";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Cate from "../../Componet/ProductList/Cate";
import Grid from "@mui/material/Grid";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import {
  GetfetchfilterCat,
  GetofferCat,
  GetOfferProduct,
  GetProductByCategories,
} from "../../client-api/ApiProducts";
import { resetProduct } from "../../redux/cartUiSlice";
import { useDispatch } from "react-redux";

import { GetSubcategories } from "../../client-api/APIcategory";
import { useFilterContext } from "../../Context/Filter_context_section";
import Filsection from "../../Componet/FilterSection/Filsection";
import Drawers from "../../Componet/ReusableComponet/Drawer/Drawers";
import { AllproductBanner } from "../AllProduct/AllproductBanner";
import Offer from "../../Assets/offerzoneimg.jpg";
import { MetaComponent } from "../../Icons/Icons";
import { FeaturedProductCard } from "../../Icons/Reuseheading";
import { Link } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function Offerzone({ homepagetheme }) {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [value, setValue] = React.useState(0);
  const { datasubcategory } = GetSubcategories();
  console.log(datasubcategory?.[0].id, "datasubcategory");
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  useEffect(() => {
    if (datasubcategory?.length > 0) {
      if (value === 0) {
        setValue(datasubcategory?.[0].id);
      }
    }
    console.log(datasubcategory, "datasubcategory");
  }, [datasubcategory]);

  const dispatch = useDispatch();
  const [openpopup, setopenpopup] = useState(false);
  const [popupcontent, setpopupcontent] = useState([]);
  const changecontent = (curElem) => {
    setpopupcontent([curElem]);
    setopenpopup(true);
    dispatch(resetProduct());
  };

  const handleClose = () => {
    setopenpopup(false);
  };
  const limit = 25;
  const offer = 1;
  const {
    checkboxFilters,
    filter_products,
    sorting,
    sorting_value,
    clearFilters,
  } = useFilterContext();
  const handleChange = (event, newValue) => {
    console.log(newValue, "newValue");
    setValue(newValue);
    clearFilters();
  };
  const child_category_id = null;
  const sub_category_id = null;
  const category_id = value;
  // console.log(checkboxFilters, "checkboxfilters");

  const { fetchfilterCat, errorMessage, fetchfilterCatLoading } =
    GetfetchfilterCat(1, value);
  // console.log(fetchfilterCat, "fetchfiltercat");
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
  const { data, hasNextPage, fetchNextPage, isLoading, isFetching } =
    GetProductByCategories(
      limit,
      1,
      value,
      checkboxFilters,
      price,
      sorting_value,
      offer
    );
  const pgainatedData =
    (data?.pages && data.pages?.[data?.pages?.length - 1]) || [];

  const Bannerimage = (
    <AllproductBanner
      image={
        pgainatedData?.blogs?.banner_image
          ? `https://admin.myfamilyfitness.com/uploads/blog/images/${pgainatedData?.blogs?.banner_image}`
          : Offer
      }
      title={"Offer Zone"}
    />
  );

  const Taboffer = (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          TabIndicatorProps={{
            sx: {
              backgroundColor: "black",
              height: 3,
            },
          }}
          variant={mobile ? "scrollable" : "standard"}
          scrollButtons={mobile}
          allowScrollButtonsMobile={mobile}
        >
          {datasubcategory &&
            datasubcategory.map((curElm, i) => (
              <Tab
                key={curElm.id}
                label={curElm.name}
                value={curElm.id}
                {...a11yProps(curElm.id)}
                className="MenuItem"
              />
            ))}
        </Tabs>
      </Box>
      {datasubcategory &&
        datasubcategory.map((curElm, i) => (
          <TabPanel key={curElm.id} value={value} index={curElm?.id}>
            <Cate
              pgainatedData={pgainatedData}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              isLoading={isLoading}
              isFetching={isFetching}
            />
          </TabPanel>
        ))}
    </Box>
  );
  console.log(datasubcategory, "datasubcategory");
  return (
    <>

          <MetaComponent
            dynamicTitle={
              "Fitness, Sports, Games & Outdoor Equipment - Exclusive Deals | My Family Fitness UAE"
            }
            dynamicKeywords={
              "fitness equipment, sports gear, outdoor games, outdoor equipment, wellness equipments, ecommerce, UAE, exclusive deals"
            }
            dynamicDescription={
              "Explore unbeatable offers on fitness, sports, games, and outdoor equipment at My Family Fitness. Best prices and fast delivery in the UAE. Shop now!"
            }
          />

          <div>
            {Bannerimage}
            <Grid container spacing={1} sx={{ position: "relative" }}>
              <Grid
                item
                lg={!mobile ? 2 : 12}
                md={!mobile ? 3 : 12}
                sm={12}
                xs={12}
              >
                {!mobile ? (
                  <Filsection
                    filterData={fetchfilterCat}
                    fetchfilterCatLoading={fetchfilterCatLoading}
                  />
                ) : (
                  <Drawers
                    pgainatedData={pgainatedData}
                    filterData={fetchfilterCat}
                    fetchfilterCatLoading={fetchfilterCatLoading}
                  />
                )}
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
                    {Taboffer}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
    
    </>
  );
}

export default Offerzone;
