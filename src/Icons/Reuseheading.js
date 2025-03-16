import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Skeleton,
} from "@mui/material";
import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import CommonSkeleton from "../Componet/ReusableComponet/CommonSkeleton";
import { CustomCategory, OtherProductList } from "../client-api/ApiHome";
import View from "../Pages/View/View";
import { usePoPupContext } from "../Context/PopupContext";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LinkIcon from "@mui/icons-material/Link";
export const Bannerimages = "https://ik.imagekit.io/thmmwwbpc//banner/images";
export const categoryimages =
  "https://ik.imagekit.io/thmmwwbpc/category/images";
export function Reuseheading(props) {
  return (
    <Grid container sx={{ pt: "5px" }}>
      <Grid item xs={12}>
        <h3 className={props.className} style={{ fontSize: props.fontSize }}>
          {props.heading}
        </h3>
      </Grid>
    </Grid>
  );
}

export function FeaturedProductCard(props) {
  const [hover, setHover] = useState(false);
  return (
    <Grid item lg={props.lg} md={props.md} xs={props.xs} sm={props.sm}>
      <Link to={props.link} state={props.state} className="brands_hd">
        <Card
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          sx={{
            position: "relative",
            overflow: "hidden",
            boxShadow: "none",
            ...(props.icon ? { backgroundColor: "transparent" } : {}),
          }}
        >
          {props.image ? (
            <CardMedia
              component="img"
              image={props.image}
              sx={{
                margin: "auto",
                height: "100%",
                objectFit: "contain",

                ...(props.icon
                  ? {
                      borderRadius: "20px",
                      position: "relative",
                      backgroundColor: "transparent",
                    }
                  : {}),
                ...(props.icon ? { zIndex: 1 } : {}), // Ensure the icon is above the box
                ...(hover && props.icon ? { filter: "brightness(50%)" } : {}), // Example: Apply filter on hover
              }}
              alt={props.alt}
              className="imag_card"
            />
          ) : (
            ""
          )}

          {props.icon ? (
            <Box
              className="image_sub_card"
              sx={{
                top: "30%",
                position: "absolute",
                borderRadius: "20px",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: hover ? "block" : "none", // Display the box only on hover
                zIndex: 2, // Ensure the box is above the image
              }}
            >
              <LinkIcon
                sx={{
                  fontSize: 40,
                  color: "whitesmoke",
                }}
              />
            </Box>
          ) : (
            ""
          )}
          <CardContent
            sx={{
              backgroundColor: "#FFFFFF",
              padding: 0,
              pt: "2px",
              ...(props.icon ? { backgroundColor: "transparent" } : {}),
            }}
          >
            <p className="slick_header_txt" id="shop_name">
              {props.txt}
            </p>
            {props.decription ? (
              <p style={{ fontSize: ".9rem", paddingBottom: "0" }}>
                {props.decription}
              </p>
            ) : (
              ""
            )}

            {props.amount ? (
              <p className="slick_header_txt" id="shop_name">
                {props.amount}
              </p>
            ) : (
              ""
            )}
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
}

export function FeaturedTreanding({ product = "trending", description }) {
  const [value, setValue] = useState(0);
  const { dataCustomCategory, isLoadingCustomCategory: feturedloading } =
    CustomCategory(product);
  const { data, error, isLoading } = OtherProductList(value, product);

  useEffect(() => {
    if (dataCustomCategory?.data?.length > 0) {
      if (value === 0) {
        setValue(dataCustomCategory.data.map((item) => item.id));
      }
    }
  }, [dataCustomCategory]);

  const { setopenpopup } = usePoPupContext();
  const changecontent = (curElem) => {
    setopenpopup(curElem);
  };
  // console.log( dataCustomCategory,"treanding");
  return (
    <>
      <Grid
        container
        sx={{ pt: "2%", pl: "6%", pr: "6%", pb: "2%" }}
        spacing={3}
      >
        <Grid item xs={12}>
          <Reuseheading
            heading={
              product === "trending" ? "TRENDING" : "FEATURED CATEGORIES"
            }
            className="shoppingcart"
            fontSize="1.25rem"
          />
        </Grid>
        {feturedloading ? (
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
          dataCustomCategory?.data?.slice(0, 4)?.map((curElm) => (
            <FeaturedProductCard
              key={`featured_${curElm.id}`}
              image={`${categoryimages}/${curElm.image}`}
              txt={curElm.name}
              alt={curElm.name}
              lg={3}
              md={3}
              xs={6}
              sm={6}
              decription={curElm.decription}
              link={`/category/${curElm.slug}`}
              state={{
                sub_category_id: curElm.id,
                banner_image: curElm.banner_image,
                name: curElm.name,
              }}
            />
          ))
        )}
      </Grid>
      <Grid
        container
        sx={{ pt: "1%", pl: "6%", pr: "6%", pb: "2%" }}
        spacing={3}
      >
        {isLoading ? (
          <CommonSkeleton
            length={4}
            height={250}
            xs={6}
            lg={3}
            md={3}
            sm={4}
            width={222}
          />
        ) : (
          data?.slice(0, 8)?.map((curElem) => (
            <Grid
              item
              xs={6}
              lg={3}
              md={3}
              sm={4}
              key={`product_${curElem?.product?.product_id}`}
            >
              <View
                curElem={curElem}
                onClick={() => changecontent(curElem)}
                description={description}
              />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
}

export function Womencard({ arryof }) {
  // console.log(arryof,"array")
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const product = "best_seller";
  const {
    dataCustomCategory: bestseller,
    isLoadingCustomCategory: feturedloading,
  } = CustomCategory(product);

  const bestSellerChildCategories =
    bestseller?.[arryof]?.child_categories?.filter(
      (child) => child.best_seller === 1
    ) || [];

  return (
    <>
      <Grid
        container
        sx={{ pt: "1%", pl: "6%", pb: "2%", pr: isSmallScreen ? "6%" : "" }}
        spacing={2}
      >
        <Grid item lg={5} md={5} xs={12} sm={12} sx={{ margin: "auto" }}>
          <p className="slick_header_txt" id="shop_name">
            BEST SELLING
          </p>
          <h2 className="flashsaletxt1" style={{ textAlign: "center" }}>
            {bestseller?.[arryof]?.name}
          </h2>
          <p style={{ fontSize: ".9rem", paddingBottom: "0" }}>
            {bestseller?.[arryof]?.meta_description}
          </p>

          <Grid container spacing={3}>
            {bestSellerChildCategories.map((post) => (
              <Grid
                item
                key={post.id}
                lg={6}
                md={6}
                xs={12}
                sm={6}
                sx={{ margin: "auto" }}
              >
                <Link
                  key={post.id}
                  to={`/category/${post.slug}`}
                  state={{
                    sub_category_id: post.id,
                    banner_image: post.banner_image,
                    name: post.name,
                  }}
                  className="brands_hd"
                >
                  <Button
                    sx={{
                      width: "100%",
                      borderRadius: "10px",
                      fontFamily: "CamptonBook",
                      fontWeight: "bolder",
                      color: "black",
                      bgcolor: "white",
                      fontSize: "small",
                      "&:hover": { bgcolor: "white" },
                    }}
                  >
                    {post.name}
                  </Button>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item lg={7} md={7} xs={12} sm={6}>
          <img
            src={`${categoryimages}/${bestseller?.[arryof]?.seller_image}`}
            alt="banner_categoryimage"
            width={"100%"}
          />
        </Grid>
      </Grid>
    </>
  );
}

export function NewHomebanners(props) {
  return (
    // <img

    //   src={`${Bannerimages}/${props.src}`}
    //   alt="bannerimage"
    //   width={"100%"}
    // />

    <LazyLoadImage
      alt="familyFitnessBannerImage"
      className={props.className}
      height={props.height}
      src={`${Bannerimages}/${props.src}`}
      width={props.width}
      style={props.style}
    />
  );
}
