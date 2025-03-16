import React from "react";
import { Link } from "react-router-dom";
import "./PagNavigation.css";
import { useState, useEffect } from "react";

import { GetSubcategories } from "../../client-api/APIcategory";
const PageNavigation = ({ singleProductdata }) => {
  //console.log(singleProductdata, "single product");
  const [cat, setcat] = useState([]);
  const [child, setchild] = useState([]);

  //console.log(cat, "category,dddd");

  const { subcategories, subcategoriesisloading } = GetSubcategories();
  //console.log("categorylist", subcategories);

  //console.log(singleProductdata?.[0], "single product data list");

  const convertToSlug = (Text) => {
    return Text?.toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-");
  };

  return (
    <div>
      <Link to="/" className="link_style_Footer">
      <span className="footerlisttext">
        Home
        </span>
      </Link>
      {" "} /{" "}
      <Link
        to={`/category/${
          singleProductdata?.[0]?.product?.category_slug
        }`}
        state={{ category_id: singleProductdata?.[0]?.product?.category_id }}
        className="link_style_Footer"
      >
        <span className="footerlisttext">
          {singleProductdata?.[0]?.product?.category}
        </span>
      </Link>
      {" "}
      /{" "}
      <Link
        // to={`/category/${singleProductdata?.[0]?.product?.subCat}`}
        to={`/category/${
          singleProductdata?.[0]?.product?.subCat_slug
        }`}
        state={{
          sub_category_id: singleProductdata?.[0]?.product?.sub_category_id,
        }}
        className="link_style_Footer"
      >
        <span className="footerlisttext" style={{textTransform:'capitalize'}}>
          {singleProductdata?.[0]?.product?.subCat_slug}
        </span>
      </Link>
    </div>
  );
};

export default PageNavigation;
