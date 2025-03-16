import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import { useFilterContext } from "../../Context/Filter_context_section";

import "./Filtersection.css";
import FilterComponent from "./FilterComponent";

const Filsection = (props) => {
  const { filterData, fetchfilterCatLoading } = props;
  const { updateFilterValue, clearFilters, filtered_value, checkboxFilters } =
    useFilterContext();
  const location = useLocation();

  //  console.log(filterData?.data?.brands,filterData?.data?.category?.data, "filterData");

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
      <div>
        <p className="filters">
          Filters
          <span>
            <Button onClick={clearFilters} className="clearall" variant="text">
              Clear All
            </Button>
          </span>
        </p>
      </div>
      <hr />

      {!child_category_id ? (
        <div className="categoryfilter">
          <p className="filcatetx1">Category</p>
          <ul className="categort_ui_list">
            {fetchfilterCatLoading ? (
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            ) : (
              (showAllCategories
                ? filterData?.data?.category?.data || []
                : filterData?.data?.category?.data?.slice(0, 5) || []
              ).map((curElem, index) => {
              // filterData?.data?.category?.data.map((curElem, index) => {
                return (
                  <FilterComponent
                    key={curElem.id}
                    curElem={curElem}
                    updateFilterValue={updateFilterValue}
                    checked={
                      checkboxFilters?.category.includes(curElem.id)
                        ? true
                        : false
                    }
                    name="category"
                    className="checkboxstyle"
                  />
                );
              })
            )}
          </ul>
          {filterData?.data?.category?.data?.length > 5 && (
          <Button
            onClick={handleToggleCategories}
            variant="text"
            className="seemore"
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
          <ul className="categort_ui_list">
            {fetchfilterCatLoading ? (
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            ) : (
              // filterData?.data?.category?.data?.map((curElem, index) => {
                (showAllCategories
                  ? filterData?.data?.category?.data || []
                  : filterData?.data?.category?.data.slice(0, 5) || []
                ).map((curElem, index) => {
                return (
                  <FilterComponent
                    key={curElem.id}
                    curElem={curElem}
                    name="category"
                  />
                );
              })
            )}
          </ul>
          {filterData?.data?.category?.data?.length > 5 && (
          <Button
            onClick={handleToggleCategories}
            variant="text"
            className="seemore"
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
        <ul className="categort_ui_list">
          {fetchfilterCatLoading ? (
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          ) : (

            (showAllBrands
              ? filterData?.data?.brands || []
              : filterData?.data?.brands?.slice(0, 5) || []
            ).map((curElem, index) => {
              // filterData?.data?.brands.map((curElem, index) => {
              return (
                <FilterComponent
                  key={curElem?.id}
                  curElem={curElem}
                  updateFilterValue={updateFilterValue}
                  checked={
                    checkboxFilters?.brand_id?.includes(curElem.id) ? true : false
                  }
                  name="brand_id"
                  className="checkboxstyle"
                />
              );
            })
          )}
        </ul>
        {filterData?.data?.brands.length > 5 && (
          <Button onClick={handleToggleBrands} variant="text" className="seemore" sx={{textTransform:'capitalize',
      color:'black'
          }}>
            {showAllBrands ? "See Less" : "See More"}
          </Button>
        )}
      </div>
      <hr />

      <div className="filter_price">
        <p className="filcatetx1">Price</p>
        <p className="categort_ui_list categoryfil">AED {checkboxFilters?.unit_price}</p>
        <input
          type="range"
          name="unit_price"
          min={filtered_value?.minPrice}
          max={filtered_value?.maxPrice}
          value={checkboxFilters?.unit_price}
          onChange={updateFilterValue}
          style={{width:'100%'}}
        />
      </div>

      <hr />
    </div>
  );
};

export default Filsection;
