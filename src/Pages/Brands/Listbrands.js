import React from "react";
import { ListBrandsList } from "../../client-api/ApiHome";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import "./BrandList.css";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import { Link } from "react-router-dom";
import CommonSkeleton from "../../Componet/ReusableComponet/CommonSkeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { AllproductBanner } from "../AllProduct/AllproductBanner";
import Banner from "../../Assets/Banner.webp";

import { MetaComponent } from "../../Icons/Icons";
import { Reuseheading } from "../../Icons/Reuseheading";
export function DataMerge(pgainatedData, key = "data", subkey = null) {
  return Array.isArray(pgainatedData)
    ? pgainatedData?.reduce(function (flat, toFlatten) {
        return flat.concat(
          Array.isArray(subkey ? toFlatten[key][subkey] : toFlatten[key])
            ? DataMerge(subkey ? toFlatten[key][subkey] : toFlatten[key])
            : toFlatten
        );
      }, [])
    : pgainatedData;
}
const Listbrands = ({ product = "Homebrandpage", homepagetheme }) => {
  // console.log(homepagetheme, "homehteme");
  const { data, hasNextPage, fetchNextPage, isLoading, isFetching } =
    ListBrandsList(product);

  const pgainatedData = (data?.pages && data.pages) || [];
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {product === "Homebrandpage" ? (
        <div className="Listbrandsdiv">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0}>
              <Grid item lg={10} md={10} sm={10} xs={9}>
                {homepagetheme?.template === "Normal" ? (
                  ""
                ) : (
                  <Reuseheading
                    heading={"Top Brands"}
                    className={"flashsaletxt1"}
                  />
                )}
              </Grid>
              <Grid item lg={2} md={2} sm={2} xs={3}>
                <Link to="/brands" className="brands_hd">
                  <span>View All</span>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </div>
      ) : (
        <>
          <MetaComponent
            dynamicTitle={"Brands | My Family Fitness UAE"}
            dynamicKeywords={
              "gym equipment, fitness gear, workout accessories, exercise machines, home gym, sports nutrition, fitness apparel, wellness products, trinx, anyfit, pent fitness, pent luxury, wellsystem water spa, myostyle ems suits in uae, ems products in uae"
            }
            dynamicDescription={
              " Discover a wide range of high-quality gym and fitness products at our online store. Shop top-rated exercise equipment and accessories for a healthier, fitter lifestyle. Grab the best deals now!"
            }
          />
          <AllproductBanner
            image={
              pgainatedData?.blogs?.banner_image
                ? `https://admin.myfamilyfitness.com/uploads/blog/images/${pgainatedData?.blogs?.banner_image}`
                : Banner
            }
            title={"Top Brands"}
          />
        </>
      )}
      <div className="topbranddiv">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={homepagetheme?.template === "Normal" ?3:2}>
            {isLoading ? (
              <CommonSkeleton
                length={20}
                width={250}
                height={130}
                xs={6}
                lg={2}
                md={3}
                sm={4}
              />
            ) : (
              pgainatedData &&
              DataMerge(pgainatedData)?.map((post) => {
                return (
                  <Grid
                    item
                    lg={
                      homepagetheme?.template === "Normal"
                        ? 3
                        : product === "Homebrandpage"
                        ? 1.5
                        : 2
                    }
                    md={homepagetheme?.template === "Normal" ? 4 : 2}
                    sm={
                      homepagetheme?.template === "Normal"
                        ? 6
                        : product === "Homebrandpage"
                        ? 2.4
                        : 3
                    }
                    xs={
                      homepagetheme?.template === "Normal"
                        ? 6
                        : product === "Homebrandpage"
                        ? 3
                        : 6
                    }
                    className="top_brands_parent"
                    key={post.id}
                  >
                    <Link
                      to={`/products/brand/${post.id}`}
                      state={{
                        brand_id: post.id,
                        banner_image: post.banner_image,
                      }}
                      title={post.name}
                      className="brands_hd"
                    >
                      <Card
                        sx={{ boxShadow: "none", bgcolor: "transparent" }}
                        className="top_brand_home"
                      >
                        <LazyLoadImage
                          component="img"
                          src={`https://ik.imagekit.io/thmmwwbpc/brand/images/${post.image}`}
                          style={{
                            margin: "auto",
                            width: "100%",
                            objectFit: "contain",
                            borderRadius:
                              homepagetheme?.template === "Normal"
                                ? ""
                                : "20px",
                            zIndex: "-2000",
                          }}
                          alt={post.name}
                          className={
                            homepagetheme?.template === "Normal"
                              ? ""
                              : "imagebrand"
                          }
                        />
                        <CardContent
                          style={
                            product === "Homebrandpage" ? { padding: 0 } : null
                          }
                        >
                          {product === "Homebrandpage" ? null : (
                            <>
                              <p className="flbrandtxt1" id="shop_name">
                                {post.name}
                              </p>
                              <p className="brand_productcount_txt">
                                {post.productcount} Products
                              </p>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                );
              })
            )}
          </Grid>
          <Grid container>
            {product === "Homebrandpage" ? (
              ""
            ) : (
              <>
                <Grid item xs={12} lg={12} md={12}>
                  {!hasNextPage || isFetching ? (
                    ""
                  ) : (
                    <button
                      className="brandList_address_btn"
                      onClick={fetchNextPage}
                    >
                      Load More
                    </button>
                  )}
                </Grid>
                <Grid container spacing={2}>
                  <br />
                  {isFetching && pgainatedData?.length > 0 && (
                    <CommonSkeleton
                      length={20}
                      width={250}
                      height={130}
                      xs={6}
                      lg={2}
                      md={3}
                      sm={4}
                    />
                  )}
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Listbrands;
