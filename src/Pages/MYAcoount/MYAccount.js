import React, { useRef, useEffect, useState } from "react";
import Order from "./Order";
import Grid from "@mui/material/Grid";
import "./MyAccount.css";

// import Nav from "react-bootstrap/Nav";
import {
  AddressIcon,
  ChangePasswordIcon,
  ContactNumberIcon,
  DashbordIcon,
  LogoutIcon,
  MetaComponent,
  OrderIcon,
  WishListIcon,
} from "../../Icons/Icons";

import Detailwrapper from "../CheckOut/Detailwrapper";
import Dashbord from "./Dashbord";
import PersonalDetails from "./PersonalDetails";

import ChanePassword from "./ChanePassword";

import { useAuthContext } from "../../Context/AuthContext";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Wishlist from "./Wishlist";
import Banner from "../../Assets/Banner.webp";
import { googleLogout } from "@react-oauth/google";
import { AllproductBanner } from "../AllProduct/AllproductBanner";
import { usePoPupContext } from "../../Context/PopupContext";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
const MYAccount = () => {
  const { setopenpopup } = usePoPupContext();
  const { user, removeuser, getuserdata } = useAuthContext();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  React.useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, []);
  const [activeTab, setActiveTab] = useState("first");

  const handleTabChange = (key) => {
    setActiveTab(key); // Update the active tab when a tab is clicked
  };

  // console.log(activeTab, "key");

  const tabs = [
    {
      eventKey: "first",
      icon: DashbordIcon,
      text: "Dashboard",
      component: <Dashbord logout={setopenpopup} activeTab={activeTab} />,
    },
    {
      eventKey: "second",
      icon: OrderIcon,
      text: "Orders",
      component: <Order />,
    },
    {
      eventKey: "eight",
      icon: WishListIcon,
      text: "Wishlist",
      component: <Wishlist />,
    },
    {
      eventKey: "third",
      icon: AddressIcon,
      text: "Address",
      component: (
        <>
          {" "}
          <h3 className="flashsaletxt1">Address</h3>
          <Detailwrapper head={"Personal Information"} profile />
          <br />
          <Detailwrapper head={"Billing Address"} billingAddress />
          <br />
          <Detailwrapper head={"Shipping Address"} shippingAddress />
        </>
      ),
    },
    {
      eventKey: "fourth",
      icon: ContactNumberIcon,
      text: "Contact Number",
      component: <Detailwrapper phone head={"Contact Number"} />,
    },
    {
      eventKey: "fifty",
      icon: ChangePasswordIcon,
      text: "Change Password",
      component: <ChanePassword />,
    },
  ];
  return (
    <div>
      <MetaComponent dynamicTitle="My Profile | My Family Fitness" />
      <AllproductBanner image={Banner} title={"My Account"} />

      <div className="myaccountmargin">
        <Grid container spacing={2}>
          <Grid item lg={3} md={4} sm={12} xs={12}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={activeTab}
              aria-label="Vertical tabs example"
              className="vertical-tabs"
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
              indicatorColor="transparent"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.eventKey}
                  label={tab.text}
                  value={tab.eventKey}
                  onClick={() => handleTabChange(tab.eventKey)}
                  icon={tab.icon}
                  iconPosition="start"
                  sx={{
                    justifyContent: "flex-start",
                    minHeight: "49px",
                    minWidth: "280px",
                    color:
                      tab.eventKey === activeTab
                        ? "black !important"
                        : "inherit",
                    textTransform: "capitalize",
                    borderRadius: "10px",
                    fontSize: "1rem",

                    fontFamily:
                      tab.eventKey === activeTab
                        ? " CamptonBook"
                        : "CamptonLight",
                    backgroundColor:
                      tab.eventKey === activeTab ? "lightgrey" : "transparent", // Set background color based on active tab
                    "&:hover": {
                      backgroundColor:
                        tab.eventKey !== activeTab
                          ? "transparent"
                          : "lightgrey", // Set hover background color
                    },
                  }}
                />
              ))}
              <Tab
                label="Logout"
                onClick={() => setopenpopup("logout")}
                // className="mynavlink"
                icon={LogoutIcon}
                iconPosition="start"
                sx={{
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  minHeight: "49px",
                  fontFamily:
                    activeTab === "logout" ? " CamptonBook" : "CamptonLight",
                  minWidth: "280px",
                  color: "black",
                  textTransform: "capitalize",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  fontWeight: activeTab === "logout" ? "bolder" : "normal", // Set font weight based on active tab
                  backgroundColor:
                    activeTab === "logout" ? "grey" : "transparent", // Set background color based on active tab
                }}
              />
            </Tabs>
          </Grid>
          <Grid item lg={9} md={8} sm={12} xs={12}>
            {tabs.map((tab) => (
              <div
                key={tab.eventKey}
                role="tabpanel"
                hidden={activeTab !== tab.eventKey}
                id={`vertical-tabpanel-${tab.eventKey}`}
                aria-labelledby={`vertical-tab-${tab.eventKey}`}
              >
                {activeTab === tab.eventKey && <div>{tab.component}</div>}
              </div>
            ))}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default MYAccount;
