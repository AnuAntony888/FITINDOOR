import React from "react";
import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { ShopBycategories } from "../../client-api/APIcategory";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Skeleton from "@mui/material/Skeleton";

import Card from "@mui/material/Card";

import Grid from "@mui/material/Grid";
import { useFilterContext } from "../../Context/Filter_context_section";

import CardContent from "@mui/material/CardContent";

const HeaderMenu = () => {
  const [state, setState] = useState(null);

  const { clearFilters } = useFilterContext();

  const { data, isLoading } = ShopBycategories();

  return (
    <>
      {isLoading ? ( // Check if data is still loading
        // If data is loading, display skeleton loading effect for each post.name
        <div className="dropdown">
          <Skeleton
            variant="text"
            animation="wave"
            width={150}
            height={30}
            sx={{ bgcolor: "transparent" }}
          />
          <div className="dropdown-content"></div>
        </div>
      ) : (
        data &&
        data.map((post) => {
          const childCategories = post.child_categories?.filter(
            (curElem) => curElem?.show_inhome === 1
          );

          return (
            <div
              className="dropdown"
              key={post.id}
              onMouseOver={() => setState(childCategories?.length)}
            >
              <button className="brands_hd">{post?.name}</button>
              <div className="dropdown-content">
                <Grid
                  container
                  spacing={3}
                  sx={{
                    pl: "10%",
                    pr: "10%",
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  {childCategories?.map((curElem) => (
                    <Grid item xs={2} key={curElem.id}>
                      <div className="homecat_padding">
                        <Link
                          to={`/category/${curElem.slug}`}
                          state={{
                            child_category_id: curElem.id,
                            banner_image: curElem.banner_image,
                          }}
                          className="brands_hd"
                          onClick={clearFilters}
                        >
                          <Card
                            sx={{
                              position: "relative",
                              margin: "auto",
                              display: "flex",
                              boxShadow: "none",
                            }}
                          >
                            <img
                              component="img"
                              // src={`https://admin.myfamilyfitness.com/uploads/category/images/${curElem.image}`}
                              src={`https://ik.imagekit.io/thmmwwbpc/category/images/${curElem.image}`}
                              
                              style={{
                                margin: "auto",
                                width: "100%",
                                objectFit: "contain",
                              }}
                              alt={curElem.name}
                            />
                          </Card>
                          <CardContent sx={{ p: 0 }}>
                            <p className="slick_header_txt" id="shop_name">
                              {curElem.name}
                            </p>
                          </CardContent>
                        </Link>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default HeaderMenu;
