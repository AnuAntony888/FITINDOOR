import React, { useEffect, useState } from "react";
import { useFilterContext } from "../../Context/Filter_context_section";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "./Filtersection.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {  ListGroup } from "reactstrap";

import { Link, useLocation, useParams } from "react-router-dom";
import Box from "@mui/material/Box";

import FilterComponent from "./FilterComponent";
import { Button } from "@mui/material";
const Responsivefilter = (props) => {
  const theme = useTheme();
  console.log(theme);
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const {
    openDrawer,
    setopenDrawer,
    filterData,
    fetchfilterCatLoading,
    pgainatedData,
  } = props;
  const { updateFilterValue, clearFilters, filtered_value, checkboxFilters } =
    useFilterContext();
  const location = useLocation();

  // console.log(pgainatedData, "location.state");

  const { child_category_id, category_id, sub_category_id } =
    location.state || {};
    const [showAllBrands, setShowAllBrands] = useState(false);
    const [showAllCategories, setShowAllCategories] = useState(false);

    const handleToggleBrands = () => {
      setShowAllBrands((prevState) => !prevState);
    };
    const handleToggleCategories = () => {
      setShowAllCategories((prevState) => !prevState);
    };
  return (
    <div className="filtersection">
      <ListGroup>
        <div>
          <p className="filters">
            <ArrowBackIcon onClick={() => setopenDrawer(false)}></ArrowBackIcon>

            <span>Filters</span>
          </p>
        </div>

        <hr></hr>

        <br />
        <div>
          <p className="filters">
            Filters
            <span>
              <Button onClick={clearFilters} className="clearall">
                Clear All
              </Button>
            </span>
          </p>
        </div>
        <hr />

        {!child_category_id ? (
          <div className="categoryfilter">
            <p className="filcatetx1">Category</p>
            <ul className="list">
              {
              // filterData?.data?.category?.data.map((curElem, index) => {
                (showAllCategories
                  ? filterData?.data?.category?.data || []
                  : filterData?.data?.category?.data?.slice(0, 5) || []
                ).map((curElem, index) => {
                return (
                  <FilterComponent
                    key={curElem.id}
                    curElem={curElem}
                    updateFilterValue={updateFilterValue}
                    checked={
                      checkboxFilters.category.includes(curElem.id)
                        ? true
                        : false
                    }
                    name="category"
                    className="checkboxstyle"
                  />
                );
              })}
            </ul>
            {filterData?.data?.category?.data?.length > 5 && (
          <Button
            onClick={handleToggleCategories}
           
            sx={{textTransform:'capitalize',
              color:'black'
                  }}
          >
            {showAllCategories ? "See Less" : "See More"}
          </Button>
        )}
          </div>
        ) : (
          <div className="categoryfilter">
            <p className="filcatetx1">Category</p>
            <ul className="list">
              {
              // filterData?.data?.category?.data.map((curElem, index) => {
                (showAllCategories
                  ? filterData?.data?.category?.data || []
                  : filterData?.data?.category?.data?.slice(0, 5) || []
                ).map((curElem, index) => {
                return (
                  <FilterComponent
                    key={curElem.id}
                    curElem={curElem}
                    name="category"
                  />
                );
              })}
            </ul>
            {filterData?.data?.category?.data?.length > 5 && (
          <Button
            onClick={handleToggleCategories}
            
            
            sx={{textTransform:'capitalize',
              color:'black'
                  }}
          >
            {showAllCategories ? "See Less" : "See More"}
          </Button>
        )}
          </div>
        )}
        <hr />

        <div className="companyfilter">
          <p className="filcatetx1">Brands</p>
          <ul className="list">
            {
            // filterData?.data?.brands.map((curElem, index) => {
                  (showAllBrands
                    ? filterData?.data?.brands || []
                    : filterData?.data?.brands?.slice(0, 5) || []
                  ).map((curElem, index) => {
              return (
                <FilterComponent
                  key={curElem.id}
                  curElem={curElem}
                  updateFilterValue={updateFilterValue}
                  checked={
                    checkboxFilters.brand_id.includes(curElem.id) ? true : false
                  }
                  name="brand_id"
                  className="checkboxstyle"
                />
              );
            })}
          </ul>
          {filterData?.data?.brands.length > 5 && (
                    <Button onClick={handleToggleBrands}  sx={{textTransform:'capitalize',
                color:'black'
                    }}>
                      {showAllBrands ? "See Less" : "See More"}
                    </Button>
                  )}
        </div>
        <hr />

        <div className="filter_price" id="responsiveprice">
          <p className="filcatetx1">Price</p>
          <p className="categoryfil">AED {checkboxFilters?.unit_price}</p>
          <input
            type="range"
            name="unit_price"
            min={filtered_value?.minPrice}
            max={filtered_value?.maxPrice}
            value={checkboxFilters?.unit_price}
            onChange={updateFilterValue}
          />
        </div>

        {largeScreen ? (
          <Box className="filter_bottom " sx={{ width: "300px" }}>
            {pgainatedData?.meta?.total ? (
              <>{`${pgainatedData?.meta?.total} items`}</>
            ) : (
              <>{`no items`}</>
            )}
          </Box>
        ) : (
          <Box className="filter_bottom " sx={{ width: "250px" }}>
            {pgainatedData?.meta?.total ? (
              <>{`${pgainatedData?.meta?.total} items`}</>
            ) : (
              <>{`no items`}</>
            )}
          </Box>
        )}
      </ListGroup>
    </div>
  );
};

export default Responsivefilter;
