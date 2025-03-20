import React, { useEffect } from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import logo from "../../Assets/logo.svg";
import Toolbar from "@mui/material/Toolbar";

import "./Header.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { useSelector } from "react-redux";

import Navigate from "../../Pages/Navigate/Navigate";

import Grid from "@mui/material/Grid";
import BottomNavigations from "./BottomNavigations";

import { useAuthContext } from "../../Context/AuthContext";
import MainHeader from "./MainHeader";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import avatarImage from "../../Assets/whatslogo.png";
import { useLocation } from "react-router-dom";

import { Home_bg_Header } from "../../client-api/ApiHomeBanner";
import { imagemain } from "../../client-api/ApiHome";
function Header() {
  const theme = useTheme();
  // console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("lg"));
  const issmall = useMediaQuery(theme.breakpoints.down("sm"));
  // console.log(isMatch);
  {
    /******************************* */
  }
  const [select, setSelect] = useState("US");
  const onSelect = (code) => setSelect(code);
  // console.log("SELECT", select);

  function refreshPage() {
    window.location.href = "/";
    // navigate("/");
  }
  const { cart_items } = useSelector((state) => state.cartUi);
  // console.log("🚀 ~ file: Cart.js ~ header 106 ~ Cart ~ cart", cart_items);
  const { user } = useAuthContext();

  const location = useLocation();
  const newURL = location.pathname;
  // console.log("newurl", newURL);
  const splitURL = newURL.toString().split("/");
  // console.log(splitURL[1], " const");

  const defaultMessage = `I am looking for the ${
    splitURL[2] ? splitURL[2] : splitURL[1]
  } product.`;

  useEffect(() => {
    const newURL = location.pathname;
    // console.log("newurl", newURL);
    const splitURL = newURL.toString().split("/");
    // console.log(splitURL[1], " const");
    const convertToSlug = (productName) => {
      return productName
        ?.split(/[\W_]+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };
    const productName = splitURL[2] ? splitURL[2] : splitURL[1];
    const slug = convertToSlug(productName);
    const message =
      newURL === "/" ||
      newURL === "/offers" ||
      newURL === "/blogs/news" ||
      newURL === "/myAccount"
        ? `I am interested to purchase from My Family Fitness url:https://myfamilyfitness.com/`
        : splitURL[2]
        ? `Hi,I'm looking for more info about  ${slug} Products url:https://myfamilyfitness.com/${newURL}`
        : `Hi,I'm looking for more info about ${slug} product url:https://myfamilyfitness.com${newURL}`;

    // Use document.querySelector if there's only one element with the specified class
    const inputElement = document.querySelector(".styles-module_input__WFb9L");

    if (inputElement) {
      // Add the new class to the existing ones
      inputElement.classList.add("additional-class");
      // Set any other attributes if needed
      inputElement.placeholder = "Type a message..";
      inputElement.dir = "auto";
      // Set the value to your constructed message
      inputElement.value = message;
    }
  }, [splitURL]);

  const { data, isLoading } = Home_bg_Header();
  // console.log(`${imagemain}/${data?.[0]?.image}`,"data")
  return (
    <div>
      <AppBar
        sx={{
           backgroundColor: "white",
          // backgroundImage: `url(${imagemain}/${data?.[0]?.image})`,
          backgroundRepeat: "no-repeat",
          color: "black",
          position: "sticky",

          // width: "100%",
          boxShadow: "none",
          maxHeight: "109px",
          // backgroundColor: isLoading ? "white" : "transparent",
        }}
      >
        <Toolbar>
          {isMatch ? (
            <>
              <Grid
                container
                spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  textAlign: "left",
                  paddingBottom: "10px",
                  flexWrap: "nowrap",
                }}
              >
                {issmall ? (
                  <img
                    src={logo}
                    alt="logo"
                    onClick={refreshPage}
                    className="familylogo2"
                  />
                ) : (
                  <img
                    src={logo}
                    alt="logo"
                    onClick={refreshPage}
                    className="familylogo"
                  />
                )}
              </Grid>

              <BottomNavigations />
            </>
          ) : (
            <MainHeader />
          )}
        </Toolbar>
      </AppBar>
      <Navigate />
      <FloatingWhatsApp
        phoneNumber="+971 564127900"
        accountName="myfamilyfitness.com!"
        allowEsc
        allowClickAway
        notification
        notificationSound
        avatar={avatarImage}
        statusMessage="Available for queries"
        defaultMessage={defaultMessage}
      />
    </div>
  );
}

export default Header;
