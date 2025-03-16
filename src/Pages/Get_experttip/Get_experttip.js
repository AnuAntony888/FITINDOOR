import React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import "./Get_experttip.css";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import { useSubscription } from "../../client-api/LoginRegister";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Subscription_Home } from "../../client-api/ApiHomeBanner";
import { Toastsucess } from "../../Componet/ReusableComponet/toast/Toast";

const Get_experttip = () => {
  const [email, setEmail] = useState("");
  const [errors, seterrors] = useState({});
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
  const { sub_home_banner, sub_home_bannererror, sub_home_bannerisloding } =
    Subscription_Home();
  // console.log(sub_home_banner, "sub_home_banner");

  const handleApi = async () => {
    try {
      if (errors.email) {
        return;
      }
      await subscription({
        email: email,
      });
      Toastsucess("Thanks for Newsletter Subscription!", "sucess", "light");
    } catch (error) {
      Toastsucess("Please Enter Your Email!");
    }
    setEmail("");
  };
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <div className="banner_split">
      {sub_home_banner &&
        sub_home_banner.map((curElem, index) => {
          return (
            <Grid
              container
              spacing={0}
              id="subscripe_image"
              style={{
                backgroundImage: `url(https://admin.myfamilyfitness.com/uploads/banner/images/${curElem.image})`,
              }}
              key={index}
            >
              {matches ? (
                <Grid
                  item
                  lg={6}
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{ textAlign: "left" }}
                >
                  <h3 className="shoppingcart">
                    Get Expert Tips In Your Inbox
                  </h3>

                  <p>
                    Sign up for our newsletter to be updated on the latest
                    products, exclusive offers!{" "}
                  </p>
                </Grid>
              ) : (
                <Grid
                  item
                  lg={6}
                  md={12}
                  sm={12}
                  xs={12}
                  sx={{ textAlign: "centre" }}
                >
                  <h3 className="shoppingcart">
                    Get Expert Tips In Your Inbox
                  </h3>
                  <p>
                    Sign up for our newsletter to be updated on the latest
                    products, exclusive offers!{" "}
                  </p>
                </Grid>
              )}

              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <TextField
                    autoComplete="off"
                    name="Email"
                    placeholder="Write your Email here"
                    margin="normal"
                    required
                    type="text"
                    value={email}
                    className="get_expert_txt"
                    onChange={handleEmail}
                    variant="outlined"
                  />
                  {errors ? <p className="required">{errors.email}</p> : ""}
                </Grid>
                <Grid item lg={2} md={3} sm={4} xs={12}>
                  {matches ? (
                    <Button
                      className="get_expert_btn"
                      onClick={handleApi}
                      variant="outlined"
                    >
                      Subscribe
                    </Button>
                  ) : (
                    <Button
                      className="Loginbtn"
                      onClick={handleApi}
                      variant="contained"
                    >
                      Subscribe
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          );
        })}
    </div>
  );
};

export default Get_experttip;
