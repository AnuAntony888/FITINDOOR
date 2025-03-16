import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useEffect } from "react";
import Banner from "../../Assets/Banner.webp";
import CommonSkeleton from "../../Componet/ReusableComponet/CommonSkeleton";
import "./Blog.css";
import { Link } from "react-router-dom";
import moment from "moment";
import { GetBlog } from "../../client-api/ApiHome";
import { AllproductBanner } from "../../Pages/AllProduct/AllproductBanner";
import Card from "@mui/material/Card";
import {Helmet} from "react-helmet";
import CardContent from "@mui/material/CardContent";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { MetaComponent } from "../../Icons/Icons";
const convertToSlug = (Text) => {
  return Text.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

function Blog() {
  const { data, hasNextPage, fetchNextPage, isLoading, isFetching } = GetBlog();
  useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, []);
  //this is the default way useinfinitequery produces data
  const pgainatedData =
    (data?.pages && data.pages?.[data?.pages?.length - 1]) || [];

  return (
    <div>

    <MetaComponent
        dynamicTitle={'Fitness, Sports, Games & Outdoor Equipment Blogs | My Family Fitness UAE'}
        dynamicKeywords={'fitness blogs, sports articles, outdoor equipment news, retail distribution, games trends, UAE ecommerce, workout tips, sports gear update'}
        dynamicDescription={'Explore our insightful blogs on fitness, sports, games, and outdoor equipment. Your go-to source for retail distribution in the UAE. Stay updated with the latest trends and tips.'}
      />
      <AllproductBanner
        image={
          data?.blogs?.banner_image
            ? `https://ik.imagekit.io/thmmwwbpc/blog/images/${data?.blogs?.banner_image}`
            : Banner
        }
        title={"Blogs"}
      />

      <div className="new_arrival_width_div">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {isLoading ? (
              <CommonSkeleton
                length={20}
                xs={6}
                lg={2.4}
                md={3}
                sm={4}
                height={250}
                width={222}
              />
            ) : (
              pgainatedData &&
              pgainatedData?.blogs?.map((curElem) => {
                const Text = curElem.title;
                console.log(
                  curElem,
                  "curElem.created_at"
                );
                return (
                  <Grid item xs={12} lg={3} md={4} sm={6} key={curElem.id}>
                    <Link
                      to={`/blog/${convertToSlug(Text)}`}
                      state={{
                        id: curElem.id,
                      }}
                      className="link"
                    >
                      <Card className="list_body_all_offerzoone">
                        <LazyLoadImage
                          // src={`https://admin.myfamilyfitness.com/uploads/blog/images/${curElem.image}`}
                          src={`https://ik.imagekit.io/thmmwwbpc/blog/images/${curElem.image}`}
                          alt="blogimag1"
                          className="blog_image_list"
                        />
                        <CardContent
                          sx={{
                            maxHeight: "90px",
                            minHeight: "90px",
                            padding: "0",
                          }}
                        >
                          <p className="flbrandtxt1">
                            By admin on{" "}
                            {moment(curElem?.updated_at).format(
                              "MMM Do YY"
                            )}
                          </p>{" "}
                          <p
                            className="flbrand_blog"
                            dangerouslySetInnerHTML={{
                              __html: curElem.title,
                            }}
                          />
                        </CardContent>
                      </Card>

                      
                    </Link>
                  </Grid>
                );
              })
            )}
          </Grid>
          <Grid item xs={12} lg={12} md={12}>
            {!hasNextPage || isFetching ? (
              ""
            ) : (
              <button className="brandList_address_btn" onClick={fetchNextPage}>
                Read More
              </button>
            )}
          </Grid>
          <Grid container spacing={2}>
            {isFetching && pgainatedData?.blogs?.length > 0 && (
              <CommonSkeleton
                length={20}
                xs={6}
                lg={2}
                md={3}
                sm={4}
                height={250}
                width={222}
              />
            )}
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Blog;
