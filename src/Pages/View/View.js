import React from "react";

import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Avatar from "@mui/material/Avatar";
import CardContent from "@mui/material/CardContent";

import {
  DeleteWhishList,
  UsergetwishList,
  UserWhishList,
} from "../../client-api/Apiuserdetails";
import CardHeader from "@mui/material/CardHeader";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Toastsucess } from "../../Componet/ReusableComponet/toast/Toast";
import { usePoPupContext } from "../../Context/PopupContext";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import ReactGA4 from "react-ga4";
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Viewproductcarticon from "../../Componet/ADDtoCart/Viewproductcarticon";
const View = ({ curElem, onClick, isLoading, urlCat, description }) => {
  // Helper function to calculate the discount progress
  const getProgress = (start, end) => {
    return Math.round((100 * (start - end)) / start) + "%";
  };

  // Extracting relevant data from curElem
  const start = curElem?.product?.unit_price;
  const end = curElem?.product?.discount_price;
  const product_id = curElem?.product?.product_id;

  // Fetching user data and wish list data from the context and API
  const { getuserdata } = useAuthContext();
  const { wishofuser } = UserWhishList(getuserdata);
  const { data } = UsergetwishList(getuserdata);
  const isInWishList = data?.products?.some(
    (el) => el?.product?.product_id === product_id
  );

  const location = useLocation();
  const { setopenpopup } = usePoPupContext();

  // Fetching deleteWishList function from API
  const { deletewish } = DeleteWhishList(getuserdata, product_id);

  const handleApi = async () => {
    try {
      if (!getuserdata?.token) {
        setopenpopup("login");
        return;
      }
      if (product_id && !isInWishList) {
        await wishofuser(product_id);
        Toastsucess("Added to wishlist!", "sucess", "light");
        // Track the "view item" event
        ReactGA4.event("add_to_wishlist", {
          items: [
            {
              id: curElem?.product?.product_id,
              name: curElem?.product?.name,
              slug: curElem?.product?.slug,

              price: curElem?.product?.unit_price,
              discount: curElem?.product?.discount_price,
              item_brand: curElem?.product?.brand_name,
              item_category: curElem?.product?.category,
              item_category2: curElem?.product?.childCat,
              sku_id: curElem?.product?.sku,
              short_description: curElem?.product?.short_description,
              quantity_label: curElem?.product?.quantity_label,
            },
          ],
        });
      }
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  const removewishlistApi = async () => {
    try {
      await deletewish();
      Toastsucess("Deleted from wishlist!", "sucess", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
  };

  // Assuming curElem and defimg are defined and accessible within this component
  const imageUrl = curElem?.product?.images?.filter(
    (images1) => images1.in_home === 1
  )[0]?.url;
  //console.log(urlCat,"urlcat")
  return (
    <>
      {/* <Card
        sx={{
          backgroundColor: "white",
          borderRadius: description === true ? "5px" : "20px",
          boxShadow: "none",
          height: "100%",
          "& .imag_card": {
            zIndex: "-2000",
            transition: "transform .3s, filter 1.5s ease-in-out",
          },
          ":hover": {
     
        
        
            "& .overlay": {
              opacity: 1,
              visibility: "visible",
            },}
        }}
      > */}

<Card
  sx={{
    backgroundColor: "white",
    borderRadius: description ? "5px" : "20px",
    boxShadow: "none",
    height: "100%",
    position: "relative",
    overflow: "hidden",
    transition: "transform 0.3s, filter 1.5s ease-in-out",
    ":hover .overlay": {
      opacity: 1,
      visibility: "visible",
    },
  }}
>
  {/* Overlay */}
  <Box
    className="overlay"
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      opacity: 0,
      visibility: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      transition: "opacity 0.3s, visibility 0.3s",
      zIndex: 1000,
    }}
  >
    {curElem?.product?.quantity_label <= 0 ? (
      <>
        <Avatar
          alt="Sold Out"
          src="https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/Assets/Soldout.png?updatedAt=1715237890899"
          sx={{
            width: 65,
            height: 65,
          }}
        />
        <Link
          to={`/${curElem?.product?.slug}`}
          state={{
            product_slug: curElem?.product?.slug,
            store_id: curElem.store_id,
          }}
          className="linkstyle"
        >
          <VisibilityIcon sx={{ color: "whitesmoke", marginLeft: "20px" }} />
        </Link>
      </>
    ) : curElem?.product?.pre_order === 1 ? (
      <Link
        to={`/${curElem?.product?.slug}`}
        state={{
          product_slug: curElem?.product?.slug,
          store_id: curElem.store_id,
        }}
        className="linkstyle"
      >
        <VisibilityIcon sx={{ color: "whitesmoke" }} />
      </Link>
    ) : (
      <>
        <Viewproductcarticon modalofaddtocart={curElem} />
        <Link
          to={`/${curElem?.product?.slug}`}
          state={{
            product_slug: curElem?.product?.slug,
            store_id: curElem.store_id,
          }}
          className="linkstyle"
        >
          <VisibilityIcon sx={{ color: "whitesmoke", marginLeft: "20px" }} />
        </Link>
      </>
    )}
  </Box>
        <CardHeader
          avatar={
            <>
              {location.pathname === "/myAccount" ? (
                <DeleteOutlineIcon
                  onClick={removewishlistApi}
                  sx={{
                    zIndex: 1000,
                    position: "relative",
                    cursor: "pointer",
                    float: "left",
                  }}
                />
              ) : (
                <FavoriteOutlinedIcon
                  // color="disabled"
                  onClick={handleApi}
                  {...(!isInWishList && {
                    color: "disabled",

                  })}
                  sx={{
                    zIndex: 1000,
                    position: "relative",
                    cursor: "pointer",
                    float: "left",
                    ...(isInWishList && { color: "red" }),                   

                    
                  }}
                />
              )}

              {curElem?.product?.quantity_label <= 0 ? (
                ""
              ) : (
                <Avatar
                  sx={{
                    backgroundColor: "darkgreen",
                    width: 70,
                    height: 25,
                    float: "right",
                    position: "relative",
                    fontSize: ".85rem",
                    zIndex: 1000,
                    visibility: curElem?.product?.discount_price
                      ? "visible"
                      : "hidden",
                  }}
                  variant="rounded"
                >
                  {getProgress(start, end)} Off
                </Avatar>
              )}
            </>
          }
        />
   
           
             
        <Box 
      
        >
          


          
          <Box sx={{ position: "relative", margin: "auto", cursor: "pointer" }}>
            {imageUrl ? (
              <CardMedia
                component="img"
                image={`https://ik.imagekit.io/thmmwwbpc/product/images/${imageUrl}`}
                sx={{
                  margin: "auto",
                  height: "230px",
                  objectFit: "contain",
                }}
                alt={
                  urlCat?.data?.category?.name
                    ? urlCat?.data?.category?.name
                    : curElem?.product?.name
                }
                className="imag_card"
              />
            ) : (
              <Skeleton
                variant="rectangular"
                width="100%"
                height={230}
                sx={{
                  backgroundColor: "#f0f0f0",
                  borderRadius: "4px",
                }}
              />
            )}



{/* <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            opacity: 0,
            visibility: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transition: "opacity 0.3s, visibility 0.3s",
            zIndex: 1000,
          }}
        >

            {curElem?.product?.quantity_label <= 0 ? (<>
              <Avatar
                alt="Remy Sharp"
                src={
                  "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/Assets/Soldout.png?updatedAt=1715237890899"
                }
                sx={{
                  width: 65,
                  height: 65,
                  visibility:
                    curElem.product.quantity_label <= 0 ? "visible" : "hidden",
                                  top: "0px",
                 
                }}
              />
              <Link
              to={`/${curElem?.product?.slug}`}
              state={{
                product_slug: curElem?.product?.slug,
                store_id: curElem.store_id,
              }}
              className="linkstyle"
         
            >    <VisibilityIcon sx={{color:'whitesmoke' ,marginLeft:'20px'}}/>
            </Link>
           </> )
            :
            curElem?.product?.pre_order === 1 ? (
              <Link
              to={`/${curElem?.product?.slug}`}
              state={{
                product_slug: curElem?.product?.slug,
                store_id: curElem.store_id,
              }}
              className="linkstyle"
         
            >    <VisibilityIcon sx={{color:'whitesmoke' ,}}/>
            </Link>
            )
           
            : (<>
              <Viewproductcarticon  modalofaddtocart={curElem}               
                
              >
                
              </Viewproductcarticon>
  <Link
  to={`/${curElem?.product?.slug}`}
  state={{
    product_slug: curElem?.product?.slug,
    store_id: curElem.store_id,
  }}
  className="linkstyle"

>    <VisibilityIcon sx={{color:'whitesmoke' ,marginLeft:'20px'}}/>
</Link>
</> )} 
          

          


        </Box> */}


      
          </Box>
          <Link
                to={`/${curElem?.product?.slug}`}
                state={{
                  product_slug: curElem?.product?.slug,
                  store_id: curElem.store_id,
                }}
                className="linkstyle"
           
              >
          <CardContent
            sx={{
              position: "relative",
              zIndex: 1000,

              paddingTop: "2%",
              cursor: "pointer",
            }}
          >
            {/* <p className="flbrandtxt1">{curElem?.product?.name}</p> */}
            {description === true ? (
              <p class="slick_header_txt" id="shop_name">
                {curElem?.product?.name}
              </p>
            ) : (
              <p className="flbrandtxt1">{curElem?.product?.name}</p>
            )}

            <p
              className={
                description === true ? "slick_header_txt" : "flbrandtxt1"
              }
              id={description === true ? "shop_name" : "price"}
            >
              {curElem?.product?.display_price === 2? (
                ""
              ) : curElem?.product?.discount_price ? (
                <>
                  <del className="deleteprice">
                    AED {curElem?.product?.unit_price}
                  </del>{" "}
                  <span style={{ color: "red" }}>
                    AED {curElem?.product?.discount_price}
                  </span>
                </>
              ) : (
                <>AED {curElem?.product?.unit_price}</>
              )}
            </p>
          </CardContent>
          </Link>
        </Box>
        
     
      </Card>
 
    </>
  );
};

export default View;
