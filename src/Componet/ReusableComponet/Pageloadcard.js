import React from "react";
import { Toastsucess } from "../ReusableComponet/toast/Toast";
import { useState, useEffect } from "react";
import { useSubscription } from "../../client-api/LoginRegister";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./pageloadcard.css";
import { Subscription_popup } from "../../client-api/ApiHomeBanner";
import Subscription from "./Subscription";
import CommonSkeleton from "./CommonSkeleton";

const Pageloadcard = (props) => {
  const { setopenpopup } = props;

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const { sub_popup, sub_popup_bannererror, sub_popup_bannerisloding } =
    Subscription_popup();
  const [email, setEmail] = useState("");
  const [errors, seterrors] = useState({});
  const [imageLoaded, setImageLoaded] = useState(false);
  const handleEmail = (e) => {
    const errors = {};

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!e.target.value) {
      seterrors((prev) => ({ ...prev, email: "Email is required!" }));
    } else if (!regex.test(e.target.value)) {
      seterrors((prev) => ({
        ...prev,
        email: "This is not a valid email format!",
      }));
    } else if (regex.test(e.target.value)) {
      seterrors((prev) => ({ ...prev, email: "" }));
    }

    setEmail(e.target.value);
  };
  const { subscription, isLoading, error } = useSubscription();
  const handleApi = async () => {
    try {
      if (errors.email) {
        return;
      }
      await subscription({
        email: email,
      });
      Toastsucess("Thanks for Newsletter Subscription!", "sucess", "light");

      setopenpopup(false);
    } catch (error) {
      Toastsucess("Please Enter Your Email!");
    }
    setEmail("");
  };
  return (
    <div>
      {sub_popup &&
        sub_popup.map((curElem, index) => {
          return matches ? (
            <Card sx={{ display: "flex" }} key={curElem.banner_id}>
              {!imageLoaded && (
                <CommonSkeleton
                  length={1}
                  xs={12}
                  lg={12}
                  md={12}
                  sm={12}
                  height="100%"
                  width={422}
                />
              )}
              <CardMedia
                component="img"
                onLoad={() => setImageLoaded(true)}
                image={`https://admin.myfamilyfitness.com/uploads/banner/images/${curElem.image}`}
                alt="Live from space album cover"
                sx={{
                  width: "50%",
                  objectFit: "unset",
                  display: imageLoaded ? "block" : "none",
                }}
              />
              <CardContent>
                <Subscription
                  email={email}
                  handleApi={handleApi}
                  handleEmail={handleEmail}
                  errors={errors}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    width: "100%",
                  }}
                />
              </CardContent>
            </Card>
          ) : (
            <div className="modal_top_bottom" key={curElem.banner_id}>
              <Card
                className="modal_top_content"
                sx={{ boxShadow: "none", padding: "0" }}
              >
                {!imageLoaded && (
                  <CommonSkeleton
                    length={1}
                    xs={12}
                    lg={12}
                    md={12}
                    sm={12}
                    height={"222px"}
                    width="100%"
                  />
                )}
                <CardMedia
                  component="img"
                  onLoad={() => setImageLoaded(true)}
                  image={`https://admin.myfamilyfitness.com/uploads/banner/images/${curElem.image}`}
                  alt="Buy Home Gym & Commercial Fitness Equipment online Store | My Family Fitness"
                  sx={{
                    display: imageLoaded ? "block" : "none",
                    borderRadius: "15px",
                  }}
                />
                <br />
                <Subscription
                  email={email}
                  handleApi={handleApi}
                  handleEmail={handleEmail}
                  errors={errors}
                  sx={{ padding: 0 }}
                />
              </Card>
            </div>
          );
        })}
    </div>
  );
};

export default Pageloadcard;
