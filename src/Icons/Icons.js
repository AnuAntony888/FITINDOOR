import Card from "@mui/material/Card";
import Button from "@mui/material/Button";

import CardContent from "@mui/material/CardContent";
import ReactGA4 from "react-ga4";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import "./Icons.css";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { DialogActions, Grid } from "@mui/material";
import Textfieldreuse from "../Componet/ReusableComponet/Textfieldreuse";
import { Toastsucess } from "../Componet/ReusableComponet/toast/Toast";
import { ProductEnquiry, RequestPriceMatch } from "../client-api/ApiProducts";
import { useLogout } from "../client-api/LoginRegister";
import { useAuthContext } from "../Context/AuthContext";
import { googleLogout } from "@react-oauth/google";
import { MetaSocial_home } from "../client-api/ApiHomeBanner";
import { ShopBycategories } from "../client-api/APIcategory";
import { Link } from "react-router-dom";
import { useFilterContext } from "../Context/Filter_context_section";


export function TypographyText(props) {
  return (
    <Typography
      sx={{
        zIndex: props.zIndex,
        borderRight: props.borderRight,
        fontSize: props.fontSize,
        width: props.width,
        textAlign: props.textAlign,
        color: props.color,
        padding: props.padding,
        paddingBottom: props.paddingBottom,
        textTransform: props.textTransform,
        fontWeight: props.fontWeight,
        paddingRight: props.paddingRight,
        fontWeight: props.fontWeight,
        transform: props.transform,
        margin: props.margin,
        marginTop: props.marginTop,
        fontStyle: props.fontStyle,
        "&:hover": {
          color: props.hovercolor,
        },
      }}
      variant={props.variant}
      component={props.component}
      className={props.className}
      fontFamily={props.fontFamily}
      dangerouslySetInnerHTML={props.dangerouslySetInnerHTML}
    >
      {props.Typography}
    </Typography>
  );
}

export const DashbordIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 512 512"
    className="w-[18px] md:w-5 h-[18px] md:h-5"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
      d="M80 212v236a16 16 0 0016 16h96V328a24 24 0 0124-24h80a24 24 0 0124 24v136h96a16 16 0 0016-16V212"
    ></path>
    <path
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
      d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L32 256m368-77V64h-48v69"
    ></path>
  </svg>
);

export const OrderIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 512 512"
    className="w-[18px] md:w-5 h-[18px] md:h-5"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="176"
      cy="416"
      r="16"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
    ></circle>
    <circle
      cx="400"
      cy="416"
      r="16"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
    ></circle>
    <path
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
      d="M48 80h64l48 272h256"
    ></path>
    <path
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
      d="M160 288h249.44a8 8 0 007.85-6.43l28.8-144a8 8 0 00-7.85-9.57H128"
    ></path>
  </svg>
);

export const WishListIcon = (
  <FavoriteBorderIcon
    style={{
      color: "#404040", // This will use the parent's color (from the SVG)
      width: "18px", // Customize the width as needed
      height: "18px", // Customize the height as needed
    }}
  />
);

export const AddressIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 512 512"
    className="w-[18px] md:w-5 h-[18px] md:h-5"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
      d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
    ></path>
    <path
      fill="none"
      stroke-miterlimit="10"
      stroke-width="32"
      d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
    ></path>
  </svg>
);
export const ContactNumberIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 512 512"
    className="w-[18px] md:w-5 h-[18px] md:h-5"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="none"
      stroke-miterlimit="10"
      stroke-width="32"
      d="M451 374c-15.88-16-54.34-39.35-73-48.76-24.3-12.24-26.3-13.24-45.4.95-12.74 9.47-21.21 17.93-36.12 14.75s-47.31-21.11-75.68-49.39-47.34-61.62-50.53-76.48 5.41-23.23 14.79-36c13.22-18 12.22-21 .92-45.3-8.81-18.9-32.84-57-48.9-72.8C119.9 44 119.9 47 108.83 51.6A160.15 160.15 0 0083 65.37C67 76 58.12 84.83 51.91 98.1s-9 44.38 23.07 102.64 54.57 88.05 101.14 134.49S258.5 406.64 310.85 436c64.76 36.27 89.6 29.2 102.91 23s22.18-15 32.83-31a159.09 159.09 0 0013.8-25.8C465 391.17 468 391.17 451 374z"
    ></path>
  </svg>
);

export const ChangePasswordIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 512 512"
    className="w-[18px] md:w-5 h-[18px] md:h-5"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
      d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z"
    ></path>
  </svg>
);

export const LogoutIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 512 512"
    className="w-5 h-5"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="32"
      d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40m64 160l80-80-80-80m-192 80h256"
    ></path>
  </svg>
);

export const FilterIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18px"
    height="14px"
    viewBox="0 0 18 14"
  >
    <g
      id="Group_36196"
      data-name="Group 36196"
      transform="translate(-925 -1122.489)"
    >
      <path
        id="Path_22590"
        data-name="Path 22590"
        d="M942.581,1295.564H925.419c-.231,0-.419-.336-.419-.75s.187-.75.419-.75h17.163c.231,0,.419.336.419.75S942.813,1295.564,942.581,1295.564Z"
        transform="translate(0 -169.575)"
        fill="currentColor"
      ></path>
      <path
        id="Path_22591"
        data-name="Path 22591"
        d="M942.581,1951.5H925.419c-.231,0-.419-.336-.419-.75s.187-.75.419-.75h17.163c.231,0,.419.336.419.75S942.813,1951.5,942.581,1951.5Z"
        transform="translate(0 -816.512)"
        fill="currentColor"
      ></path>
      <path
        id="Path_22593"
        data-name="Path 22593"
        d="M1163.713,1122.489a2.5,2.5,0,1,0,1.768.732A2.483,2.483,0,0,0,1163.713,1122.489Z"
        transform="translate(-233.213)"
        fill="currentColor"
      ></path>
      <path
        id="Path_22594"
        data-name="Path 22594"
        d="M2344.886,1779.157a2.5,2.5,0,1,0,.731,1.768A2.488,2.488,0,0,0,2344.886,1779.157Z"
        transform="translate(-1405.617 -646.936)"
        fill="currentColor"
      ></path>
    </g>
  </svg>
);

export const UserIcon = (props) => {
  return (
    <svg
      onClick={props.onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="18px"
      height="20px"
      viewBox="0 0 16.577 18.6"
    >
      <path
        d="M-7722.37,2933a.63.63,0,0,1-.63-.63c0-4.424,2.837-6.862,7.989-6.862s7.989,2.438,7.989,6.862a.629.629,0,0,1-.63.63Zm.647-1.251h13.428c-.246-3.31-2.5-4.986-6.713-4.986s-6.471,1.673-6.714,4.986Zm2.564-12.518a4.1,4.1,0,0,1,1.172-3,4.1,4.1,0,0,1,2.979-1.229,4.1,4.1,0,0,1,2.979,1.229,4.1,4.1,0,0,1,1.171,3,4.341,4.341,0,0,1-4.149,4.5,4.344,4.344,0,0,1-4.16-4.5Zm1.251,0a3.1,3.1,0,0,0,2.9,3.254,3.094,3.094,0,0,0,2.9-3.253,2.878,2.878,0,0,0-.813-2.109,2.88,2.88,0,0,0-2.085-.872,2.843,2.843,0,0,0-2.1.856,2.841,2.841,0,0,0-.806,2.122Z"
        transform="translate(7723.3 -2914.703)"
        fill="currentColor"
        stroke="currentColor"
        stroke-width="0.6"
        style={{ color: "black", cursor: "pointer" }}
      ></path>
    </svg>
  );
};

export const SocialIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth={0}
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M480 257.35c0-123.7-100.3-224-224-224s-224 100.3-224 224c0 111.8 81.9 204.47 189 221.29V322.12h-56.89v-64.77H221V208c0-56.13 33.45-87.16 84.61-87.16 24.51 0 50.15 4.38 50.15 4.38v55.13H327.5c-27.81 0-36.51 17.26-36.51 35v42h62.12l-9.92 64.77H291v156.54c107.1-16.81 189-109.48 189-221.31z"
    ></path>
  </svg>
);

export const TwitterIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth={0}
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M496 109.5a201.8 201.8 0 01-56.55 15.3 97.51 97.51 0 0043.33-53.6 197.74 197.74 0 01-62.56 23.5A99.14 99.14 0 00348.31 64c-54.42 0-98.46 43.4-98.46 96.9a93.21 93.21 0 002.54 22.1 280.7 280.7 0 01-203-101.3A95.69 95.69 0 0036 130.4c0 33.6 17.53 63.3 44 80.7A97.5 97.5 0 0135.22 199v1.2c0 47 34 86.1 79 95a100.76 100.76 0 01-25.94 3.4 94.38 94.38 0 01-18.51-1.8c12.51 38.5 48.92 66.5 92.05 67.3A199.59 199.59 0 0139.5 405.6a203 203 0 01-23.5-1.4A278.68 278.68 0 00166.74 448c181.36 0 280.44-147.7 280.44-275.8 0-4.2-.11-8.4-.31-12.5A198.48 198.48 0 00496 109.5z"></path>
  </svg>
);
export const InstagramIcon = (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth={0}
    // stroke-width="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M349.33 69.33a93.62 93.62 0 0193.34 93.34v186.66a93.62 93.62 0 01-93.34 93.34H162.67a93.62 93.62 0 01-93.34-93.34V162.67a93.62 93.62 0 0193.34-93.34h186.66m0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32z"></path>
    <path d="M377.33 162.67a28 28 0 1128-28 27.94 27.94 0 01-28 28zM256 181.33A74.67 74.67 0 11181.33 256 74.75 74.75 0 01256 181.33m0-37.33a112 112 0 10112 112 112 112 0 00-112-112z"></path>
  </svg>
);

export const MetaComponent = ({
  dynamicTitle,
  dynamicKeywords,
  dynamicDescription,
  dynamicindex,
}) => {
  const {
    meta_social_home,
    meta_social_homeerror,
    meta_social_homeerrorisloding,
  } = MetaSocial_home();
  // const { snipet, snipet_homeerror, snipet_homeerrorisloding } = Seo_snipet(1);

  // const codeSnippets = snipet && snipet.map((snippet) => snippet.code_snippet);

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>
          {dynamicTitle ? dynamicTitle : meta_social_home?.meta_title}
        </title>
        <meta
          name="title"
          content={dynamicTitle ? dynamicTitle : meta_social_home?.meta_title}
        />
        <meta
          name="keywords"
          content={
            dynamicKeywords ? dynamicKeywords : meta_social_home?.meta_tag
          }
        />
        <meta
          name="description"
          content={
            dynamicDescription
              ? dynamicDescription
              : meta_social_home?.meta_description
          }
        />
        <meta
          property="og:title"
          content={dynamicTitle ? dynamicTitle : meta_social_home?.meta_title}
        />
        <meta
          property="og:description"
          content={
            dynamicDescription
              ? dynamicDescription
              : meta_social_home?.meta_description
          }
        />
        <meta name="sitelock-site-verification" content="7543" />
        <meta
          name="google-site-verification"
          content="Zz6BCjh2Wd5omx_4moQrko6EHIe3WNvSDjIMjHcMoD0"
        />{" "}
        <meta
          name="facebook-domain-verification"
          content="8k40l6r8i3dwwu8xdwqgvo7h898rox"
        />{" "}
        <meta
          name="robots"
          content={dynamicindex ? dynamicindex : "index,follow"}
        />{" "}
        <meta
          name="googlebot"
          content={dynamicindex ? dynamicindex : "index,follow"}
        />{" "}
        <meta name="author" content="My Family Fitness" />{" "}
        <meta property="og:type" content="website" />{" "}
        <meta
          property="og:image"
          content="https://myfamilyfitness.com/static/media/logo.377a5e3a963ae6068f2872ed05d4da06.svg"
        />{" "}
        <meta property="og:site_name" content="My Family Fitness" />
      </Helmet>
    </>
  );
};

export const ProductpriceMatch = (props) => {
  const { setopenpopup, productname } = props;
  console.log(setopenpopup, productname, "data?.[0]?.product?.name");
  const { productPriceMatch } = RequestPriceMatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [product_url, setProduct_url] = useState("");
  const handlesetName = (e) => {
    setName(e.target.value);
  };
  const handlesetEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlesetPhone = (e) => {
    setPhone(e.target.value);
  };
  const handlesetMessage = (e) => {
    setMessage(e.target.value);
  };
  const handlesetproduct_url = (e) => {
    setProduct_url(e.target.value);
  };
  const Data = [
    {
      label: "Name*",
      type: "text",
      value: name,
      onChange: handlesetName,
    },
    {
      label: "Email*",

      type: "email", // Set the type to "email"
      value: email,
      onChange: handlesetEmail,
    },
    {
      label: "Phone*",
      type: "text",
      value: phone,
      onChange: handlesetPhone,
    },
    {
      label: "Message*",
      type: "text",
      rows: 2,
      value: message,
      onChange: handlesetMessage,
    },
    {
      label: "Reference Page Link*",
      type: "text",

      value: product_url,
      onChange: handlesetproduct_url,
    },
  ];
  const handleApi = async () => {
    try {
      if (!name || !email || !phone || !message || !product_url) {
        Toastsucess("Please fill your Details");

        return;
      }

      await productPriceMatch({
        name,
        email,
        phone,
        message,
        productname,
        type: 2,
        product_url,
      });
      setopenpopup(false);
      Toastsucess(
        "Thanks for your question!. We will get back soon!",
        "sucess",
        "light"
      );
    } catch (error) {
      Toastsucess(error.message);
    }
    setopenpopup(false);
  };
  return (
    <div>
      <Grid container spacing={2} className="addressform" sx={{ pt: "0px" }}>
        <Grid xs={12} className="addnewaddheading">
          <h5>Seen it Lower Price? Our Match Guarantee</h5>
          <Typography
            sx={{ padding: 0, textAlign: "justify", fontSize: ".8rem" }}
          >
            Contact our Customer Care team by filling in the form below, with
            your details and a link of the item you would like us to price
            match.
          </Typography>
        </Grid>
        <p className="addressformtitle cha_p">Product Name</p>
        <Textfieldreuse
          className="Addressinputtxt"
          type={"text"}
          value={productname}
          size="small"
        />
        {Data.map((data, index) => (
          <Grid xs={12} sx={{ pb: "10px" }}>
            <p className="addressformtitle cha_p">{data.label}</p>
            <Textfieldreuse
              className="Addressinputtxt"
              type={data.type}
              value={data.value}
              onChange={data.onChange}
              size="small"
              rows={data.rows}
            />
          </Grid>
        ))}

        <Grid xs={12}>
          <Button
            variant="contained"
            className="saveadress"
            size="large"
            type="submit"
            onClick={handleApi}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export const PreorderRequest = (props) => {
  const { setopenpopup, productname } = props;
  console.log(setopenpopup, productname, "data?.[0]?.product?.name");
  const { enquiryform } = ProductEnquiry();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handlesetName = (e) => {
    setName(e.target.value);
  };
  const handlesetEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlesetPhone = (e) => {
    setPhone(e.target.value);
  };
  const handlesetMessage = (e) => {
    setMessage(e.target.value);
  };
  const Data = [
    {
      label: "Name*",
      type: "text",
      value: name,
      onChange: handlesetName,
    },
    {
      label: "Email*",

      type: "email", // Set the type to "email"
      value: email,
      onChange: handlesetEmail,
    },
    {
      label: "Phone*",
      type: "text",
      value: phone,
      onChange: handlesetPhone,
    },
    {
      label: "Message*",
      type: "text",
      rows: 3,
      value: message,
      onChange: handlesetMessage,
    },
  ];
  const handleApi = async () => {
    try {
      if (!name || !email || !phone || !message) {
        Toastsucess("Please fill your Address");

        return;
      }

      await enquiryform({
        name,
        email,
        phone,
        message,
        productname,
        type: 3,
      });
      setopenpopup(false);
      Toastsucess(
        "Thanks for your question!. We will get back soon!",
        "sucess",
        "light"
      );
    } catch (error) {
      Toastsucess(error.message);
    }
    setopenpopup(false);
  };
  return (
    <div>
      <Grid container spacing={2} className="addressform" sx={{ pt: "10px" }}>
        <Grid xs={12} className="addnewaddheading">
          <h4>Pre-Order Form</h4>
        </Grid>

        {Data.map((data, index) => (
          <Grid xs={12} sx={{ pb: "10px" }}>
            <p className="addressformtitle cha_p">{data.label}</p>
            <Textfieldreuse
              className="Addressinputtxt"
              type={data.type}
              value={data.value}
              onChange={data.onChange}
              size="small"
              rows={data.rows}
            />
          </Grid>
        ))}

        <Grid xs={12}>
          <Button
            variant="contained"
            className="saveadress"
            size="large"
            type="submit"
            onClick={handleApi}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export const Logoutsection = (props) => {
  const { setopenpopup } = props;
  const { user, removeuser, getuserdata } = useAuthContext();
  const { logout, isLoading, error } = useLogout();
  const logoutHandler = () => {
    logout({ token: JSON.parse(localStorage.getItem("user"))?.token });
    googleLogout();
    setopenpopup(false);
  };
  return (
    <>
      <CardContent sx={{ margin: "auto" }}>
        <p className="subscripe"> Confirm Logout</p>
        <p className="flbrandtxt1"> Are you sure you want to Logout?</p>

        <DialogActions>
          <Button
            onClick={logoutHandler}
            className="changepasswordbtn"
            sx={{ width: "100%" }}
          >
            Log out
          </Button>
          <Button
            onClick={() => setopenpopup(false)}
            className="changepasswordbtn"
            sx={{ width: "100%" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </CardContent>
    </>
  );
};

export const PopularSerach = () => {
  const { data, isLoading } = ShopBycategories();
  const { clearFilters } = useFilterContext();

  return (
    <div className="banner_split">
      <Grid container>
        <Grid item xs={12}>
          <h3 className="shoppingcart" style={{ fontSize: "1.25rem" }}>
            Popular Searches
          </h3>
        </Grid>

        {data &&
          data.map((post) => {
            const childCategories = post.child_categories?.filter(
              (curElem) =>
                curElem?.show_inhome === 1 && curElem.name !== "Tents"
            );

            return (
              childCategories &&
              childCategories.map((curElem) => (
                <React.Fragment key={curElem.id}>
                  <Box sx={{ p: "6px", margin: "auto" }}>
                    <Link
                      to={`/category/${curElem.slug}`}
                      state={{
                        child_category_id: curElem.id,
                        banner_image: curElem.banner_image,
                      }}
                      className="brands_hd"
                      onClick={clearFilters}
                      key={curElem.id} // Add a unique key for each element in the array
                    >
                      <p className="footerlisttext" style={{ margin: "auto" }}>
                        {curElem.name}
                      </p>
                    </Link>
                  </Box>
                  <div className="verticalline"></div>
                </React.Fragment>
              ))
            );
          })}
      </Grid>
    </div>
  );
};

export const ThankyouBJOForm = () => {
  const theme = useTheme();
  const issmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Grid container spacing={2} sx={{ p: "6%", marginTop: "20px" }}>
        <Grid xs={12} item className="ordergrid">
          <Link to="/BadmintonJerseyOrderForm">
            <p className="backto_home">Back To Home</p>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                minWidth: issmall ? "100%" : "600px",
                minHeight: "250px",
                textAlign: "center",
                justifyContent: "center",
                backgroundImage:
                  "url(https://images.template.net/93669/orange-white-background-egug8.jpg)",
                backgroundRepeat: "no-repeat",
                objectFit: "cover",
              }}
            >
              <CardContent>
                <CheckCircleIcon color="success" sx={{ fontSize: "4rem" }} />{" "}
                <br /> <br />
                <Typography variant="h6" color="text.secondary">
                  Thank you. Your order has been received.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export const Sizechart = () => {
  const theme = useTheme();
  const issmall = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Grid container spacing={2} sx={{ p: "8%" }}>
        <Grid xs={12} item className="ordergrid">
          <Link to="/BadmintonJerseyOrderForm">
            <p className="backto_home">Back To Home</p>
          </Link>
        </Grid>
        {sizeimages.map((data, index) => (
          <>
            <Grid xs={12} lg={4} md={4} sm={6} item>
              <h5 className="shoppingcart">{data.txt}</h5>

              <img src={data.img} alt="" width="100%" />
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
};

const sizeimages = [
  {
    txt: " Size Chart - Trousers",
    img: 'https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/Assets/WhatsApp%20Image%202024-01-03%20at%2013.36.52_fb2d9523.jpg?updatedAt=1715237891255',
  },
  {
    txt: "Size Chart - Shorts",
    img: 'https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/Assets/WhatsApp%20Image%202024-01-03%20at%2013.36.52_9d30d7a9.jpg?updatedAt=1715237890570',
  },
  {
    txt: " Size Chart T-Shirt",
    img: "https://ik.imagekit.io/thmmwwbpc/MFF%20E%20Commerce/Assets/WhatsApp%20Image%202024-01-03%20at%2013.36.52_8f0fa3b9.jpg?updatedAt=1715237890614",
  },
];
