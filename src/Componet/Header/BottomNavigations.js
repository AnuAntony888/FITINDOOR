import React from "react";
import { useState, useEffect } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";
import Login from "../../Authentication/Login/Login";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Popup from "../ReusableComponet/Popups";
import { cartActions } from "../../redux/cartSlice";
import Searchpopup from "../ReusableComponet/Searchpopup";
import SearchIcon from "@mui/icons-material/Search";
import Searchbar from "../SearchBar/Searchbar";

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useAuthContext } from "../../Context/AuthContext";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import Badge from "@mui/material/Badge";
import Practise from "./Practise";
import { usePoPupContext } from "../../Context/PopupContext";
import ReactGA4 from "react-ga4";
const BottomNavigations = () => {
  const { user, getuserdata } = useAuthContext();
  const { setopenpopup } = usePoPupContext();
  const [value, setValue] = React.useState(0);
  const [search, setsearch] = useState(false);
  const [openDrawer, setopenDrawer] = useState(false);
  
  const navigate = useNavigate();
  function refreshPage() {
    window.location.href = "/";
    // navigate("/");
  }
  const dispatch = useDispatch();
  const { cart_items, cartCount } = useSelector((state) => state.cartUi);
  const toggleCart = () => {
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
            cartCount:product?.cartCount,
          })),
          
        });
    dispatch(cartActions.toggle());
  };

  const theme = useTheme();
  // console.log(theme);
  const largeScreen = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <div>
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction icon={<Practise />} />

          <BottomNavigationAction
            icon={
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
                  sx={{ color: "black" }}
                />
              </Badge>
            }
          ></BottomNavigationAction>

          <BottomNavigationAction
            onClick={() => setsearch(true)}
            icon={<SearchIcon sx={{ color: "black" }} />}
            aria-label="Search"
          />

          <BottomNavigationAction
            onClick={refreshPage}
            icon={<HomeIcon sx={{ color: "black" }} />}
            aria-label="Home"
          />

          {!user && !getuserdata ? (
            <BottomNavigationAction
              icon={<PersonIcon sx={{ color: "black" }}      aria-label="person" />}
              onClick={() => setopenpopup("login")}
              aria-label="Account" 
            />
          ) : (
            <BottomNavigationAction
              icon={
             
                <Link to="/myAccount" className="footList" id="my_account">
                  MyAccount
                </Link>
            
              }
              aria-label="My Account" // Add an accessible name for the button
            />
          )}

          <Searchpopup search={search} setsearch={setsearch}>
            <Searchbar search={search} setsearch={setsearch} />
          </Searchpopup>
        </BottomNavigation>
      </Paper>
    </div>
  );
};

export default BottomNavigations;
