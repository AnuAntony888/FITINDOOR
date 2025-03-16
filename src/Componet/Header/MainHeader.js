import React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";

import SearchIcon from "@mui/icons-material/Search";

import { Link, useNavigate } from "react-router-dom";

import Searchpopup from "../ReusableComponet/Searchpopup";
import Searchbar from "../SearchBar/Searchbar";
import logo from "../../Assets/logo.svg";

import { useSelector, useDispatch } from "react-redux";
import { useAuthContext } from "../../Context/AuthContext";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Badge from "@mui/material/Badge";
import { cartActions } from "../../redux/cartSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useTheme } from "@mui/material/styles";
import ReactGA4 from "react-ga4";

import Practise from "./Practise";
import { UserIcon } from "../../Icons/Icons";
import { useLogin } from "../../client-api/LoginRegister";
import "./Header.css";
import HeaderMenu from "./HeaderMenu";
import { Navigate } from "react-router-dom";
import { UsergetwishList } from "../../client-api/Apiuserdetails";
import { usePoPupContext } from "../../Context/PopupContext";
import customersupport from "../../Assets/viber.png";
const MainHeader = () => {
  function refreshPage() {
    window.location.href = "/";
  }

  const theme = useTheme();

  const { login, isLoading, error } = useLogin();
  const { user, getuserdata } = useAuthContext();

  const { setopenpopup } = usePoPupContext();

  const [search, setsearch] = useState(false);
  const [cat, setCat] = useState([]);
  const navgate = useNavigate();
  const dispatch = useDispatch();
  const { cart_items, cartCount } = useSelector((state) => state.cartUi);
  // console.log(cart_items, cartCount, "cartCount:cartCount,");
  const toggleCart = () => {
    dispatch(cartActions.toggle());
    // Track the "add_payment_info" event
    ReactGA4.event("view_cart", {
      items: cart_items.map((product) => ({
        id: product?.product?.product_id,
        name: product?.product?.name,
        slug: product?.product?.slug,
        price: product?.product?.unit_price,
        discount: product?.product?.discount_price,
        item_brand: product?.product?.brand_name,
        item_category: product?.product?.category,
        item_category2: product?.product?.childCat,
        sku_id: product?.product?.sku,
        short_description: product?.product?.short_description,
        quantity_label: product?.product?.quantity_label,
        cartCount: product?.cartCount,
      })),
    });
  };

  const [select, setSelect] = useState("US");
  const onSelect = (code) => setSelect(code);
  const userDetails = JSON.parse(localStorage.getItem("user"));
  // console.log(userDetails, "userDEtails");
  // console.log(cat, "console cat ");
  const { data } = UsergetwishList(getuserdata);
  // console.log(data?.products?.length, "data.length");

  const handleApi = async () => {
    if (!user && !getuserdata) {
      setopenpopup("login");
    } else {
      navgate("/myAccount");
    }
  };

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        sx={{ paddingTop: "2px", paddingBottom: "10px" }}
      >
        <Grid item xs={1.6} lg={1.6} md={1.6} sm={1.6}>
          <img
            src={logo}
            alt="logo"
            onClick={refreshPage}
            className="familylogo"
            style={{ marginTop: "23px" }}
          />
        </Grid>
        {/* <Grid item xs={6} lg={5.8} md={6.2} sm={6}> */}
        <Grid item xs={6} lg={6.1} md={6.5} sm={6}>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "32px",
               textAlign: "centre",
              flexWrap: "nowrap",
            }}
          >
            {/* <a
              href="https://b2b.myfamilyfitness.com"
              className="brands_hd"
              target="_blank"
            >
              <span>Corporate</span>
            </a>
            <a
              href="https://b2b.myfamilyfitness.com/Consulting-Services"
              className="brands_hd"
              target="_blank"
            >
              <span>Consulting Services</span>
            </a>
            <a
              href="https://b2b.myfamilyfitness.com/Brand-Portfolio"
              className="brands_hd"
              target="_blank"
            >
              <span>Brand Portfolio</span>
            </a>

            <Link
              to="/offers"
              className="brands_hd"
              onClick={() => {
                ReactGA4.event("view_promotion", {
                  category: "Promotion",
                  action: "Click",
                  label: "Offer Zone", // You can customize the label as needed
                });
              }}
            >
              <span>Offer Zone</span>
            </Link>
            <Link to="/blogs/news" className="brands_hd">
              <span>Blogs</span>
            </Link> */}
          </Grid>
        </Grid>
        
        <Grid
          item
          xs={2.4}
          lg={2.1}
          md={1.6}
          sx={{ marginTop: "32px", fontWeight: "bolder" }}
        >
          <img src={customersupport} width="25" alt="" />{" "}
          <span className="brands_hd">+971 564127900</span>
        </Grid>

        <Grid item xs={2}>
          <Grid
            container
            spacing={1}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "32px",
              textAlign: "centre",
            }}
          >
            <SearchIcon
              aria-label="SearchPage"
              onClick={() => setsearch(true)}
              sx={{ fontSize: 30, color: "black", cursor: "pointer" }}
            />

            {!getuserdata?.token ? (
              <UserIcon
                onClick={() => setopenpopup("login")}
                sx={{ cursor: "pointer" }}
              />
            ) : (
              <p style={{ textTransform: "capitalize" }} className="brand_hd">
                <Link to="/myAccount" className="brands_hd">
                  My Account
                </Link>
              </p>
            )}

            <Badge
              badgeContent={cart_items.length}
              color="secondary"
              showZero
              sx={{
                "& .MuiBadge-badge": {
                  color: "white",
                  backgroundColor: "black",
                },
              }}
            >
              <ShoppingBagOutlinedIcon
                onClick={toggleCart}
                sx={{ color: "black", cursor: "pointer" }}
              />
            </Badge>

            <Badge
              badgeContent={data?.products?.length}
              color="secondary"
              showZero
              sx={{
                "& .MuiBadge-badge": {
                  color: "white",
                  backgroundColor: "black",
                },
              }}
              className="singin"
            >
              <FavoriteBorderIcon
                onClick={handleApi}
                sx={{ cursor: "pointer" }}
              />
            </Badge>
          </Grid>
        </Grid>
        <Grid item xs={1} sx={{ marginTop: "-2px" }}>
          <Practise />
        </Grid>

        <Grid item lg={10.8}>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "2px",
              textAlign: "centre",
              flexWrap: "nowrap",
            }}
          >
            <HeaderMenu />
          </Grid>
        </Grid>
      </Grid>

      <Searchpopup search={search} setsearch={setsearch}>
        <Searchbar search={search} setsearch={setsearch} />
      </Searchpopup>
    </>
  );
};

export default MainHeader;
