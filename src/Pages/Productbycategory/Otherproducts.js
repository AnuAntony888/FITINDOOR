import React from "react";

import { useState, useEffect } from "react";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./Featureproduct.css";
import Modal from "./Modal";
import View from "../View/View";

import { resetProduct } from "../../redux/cartUiSlice";
import { useDispatch } from "react-redux";
import Popup from "../../Componet/ReusableComponet/Popups";

import {
  CustomCategory,
  customCategory,
  OtherProductList,
  otherProductList,
} from "../../client-api/ApiHome";

import CommonSkeleton from "../../Componet/ReusableComponet/CommonSkeleton";
import { usePoPupContext } from "../../Context/PopupContext";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box
          sx={{
            pt: 3,
            pl: isSmallScreen ? "4px" : 3,
            pr: isSmallScreen ? "4px" : 3,
            pb: 0,
          }}
        >
          {children}
        </Box>
      )}
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
function Otherproducts({ product = "trending" ,homepagetheme}) {
  const [value, setValue] = React.useState(0);
  const { dataCustomCategory, errorCustomCategory, isLoadingCustomCategory } =
    CustomCategory(product);
  const { data, error, isLoading } = OtherProductList(value, product);

  useEffect(() => {
    if (dataCustomCategory?.data?.length > 0) {
      if (value === 0) {
        setValue(dataCustomCategory?.data?.[0].id);
      }
    }
  }, [dataCustomCategory]);

  const dispatch = useDispatch();

  const [search, setsearch] = useState(false);

  const { setopenpopup } = usePoPupContext();

  const changecontent = (curElem) => {
    setopenpopup(curElem);
  };

  const handleChange = (event, newValue) => {
    // console.log(newValue, "newValue");
    setValue(newValue);
  };
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const Tabcontent = (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          TabIndicatorProps={{
            sx: {
              backgroundColor: "black",
              height: 3,
            },
          }}
        >
          {dataCustomCategory?.data?.map((curElm, i) => (
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
      {dataCustomCategory?.data?.map((curElm, i) => (
        <TabPanel key={curElm.id} value={value} index={curElm?.id}>
          <Grid container spacing={isSmallScreen ? 1 : 4}>
            {isLoading ? (
              <CommonSkeleton
                length={3}
                height={250}
                xs={6}
                lg={2}
                md={3}
                sm={4}
                width={222}
              />
            ) : (
              data?.map((curElem) => {
                return (
                  <Grid
                    item
                    xs={6}
                    lg={2.4}
                    md={3}
                    sm={4}
                    key={curElem?.store_id}
                  >
                    <View
                      curElem={curElem}
                      onClick={() => changecontent(curElem)}
                    />
                  </Grid>
                );
              })
            )}
          </Grid>
        </TabPanel>
      ))}
    </Box>
  );


  return (
    <div>
      <div className="flashsale">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 0.5, md: 2, lg: 3, sm: 1 }}>
            <h2 className="flashsaletxt1">
              {product === "trending" ? "Trending" : "Featured Product"}
            </h2>
            {Tabcontent}
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Otherproducts;
