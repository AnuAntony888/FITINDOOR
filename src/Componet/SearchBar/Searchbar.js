import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import CloseIcon from "@mui/icons-material/Close";

import defaltimg from "../../Assets/default-pro.jpg";
import ReactGA4 from "react-ga4";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import "./searchbar.css";
import { GetSearchproducthome } from "../../client-api/ApiHome";
import Textfieldreuse from "../ReusableComponet/Textfieldreuse";
const Searchbar = (props) => {
  const { setsearch } = props;

  const [state, setstate] = useState("");
  const { data, error, isLoading } = GetSearchproducthome(state);
  const seracHandler = (event) => {
    setTimeout(() => {
      setstate(event.target.value);
    }, 500);
  };

  const navigate = useNavigate();
  function handleKeyPress(e) {
    // console.log(e.key, "handlekeypress");
    if (e.key === "Enter") {
      navigate(`/product/search?Keyword=${e.target.value}`);
      setsearch(false);
      // Track the "view item" event
      // Track the "search" event
      ReactGA4.event("search", {
        category: "Search",
        action: "Performed",
        label: e.target.value,
      });
    }
  }

  console.log(state, "data comming");
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Textfieldreuse
            placeholder="search"
            type="text"
            className="textfieldloginuser"
            onChange={seracHandler}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {" "}
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <CloseIcon
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => setsearch(false)}
                  ></CloseIcon>
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: "700px" }}
            // onkeypress={myFunction()}
            onKeyPress={(e) => handleKeyPress(e)}
          />
        </Grid>
      </Grid>

      <div>
        {state ? (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {data &&
                data.map((curElem) => {
                  // console.log(curElem?.product?.slug,"slug in serch")
                  return (
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Link
                        onClick={() => setsearch(false)}
                        to={`/${curElem?.product?.slug}`}
                        state={{
                          product_slug: curElem?.product?.slug,
                          // product_id: curElem?.product?.product_id,
                          store_id: curElem?.store_id,
                        }}
                        className="linkstyle"
                      >
                        <Card sx={{ display: "flex" }}>
                          <CardMedia
                            component="img"
                            className="search_image"
                            //image={`https://admin.myfamilyfitness.com/uploads/product/images/${curElem.product.images?.[0]?.url}`}

                            image={
                              curElem?.product?.images?.[0]?.url
                                ? `https://admin.myfamilyfitness.com/uploads/product/images/${curElem.product.images[0].url}`
                                : defaltimg
                            }
                            alt="Live from space album cover"
                          />
                          <Box
                            sx={{ display: "flex", flexDirection: "column" }}
                          >
                            <CardContent sx={{ flex: "1 0 auto" }}>
                              {curElem?.product?.display_price === 2 ? (
                                <p></p>
                              ) : (
                                ""
                              )}
                              <p className="Homefeaturetxt">
                                {" "}
                                {curElem?.product?.name}
                              </p>

                              <p className="Homefeaturetxt">
                                {curElem?.product?.display_price === 2 ? (
                                  ""
                                ) : curElem?.product?.discount_price ? (
                                  <>
                                    AED<del>{curElem?.product?.unit_price}</del>{" "}
                                    AED {curElem?.product?.discount_price}
                                  </>
                                ) : (
                                  <>AED{curElem?.product?.unit_price}</>
                                )}
                              </p>
                            </CardContent>
                          </Box>
                        </Card>
                      </Link>
                    </Grid>
                  );
                })}
            </Grid>
          </Grid>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Searchbar;
