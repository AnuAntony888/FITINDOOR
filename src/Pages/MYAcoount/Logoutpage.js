import React, { useState } from "react";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { Card, CardMedia } from "@mui/material";
import CommonSkeleton from "../../Componet/ReusableComponet/CommonSkeleton";
import { Logout_popup } from "../../client-api/ApiHomeBanner";
import { Logoutsection } from "../../Icons/Icons";
import { useLogout } from "../../client-api/LoginRegister";

const Logoutpage = (props) => {
  const { setopenpopup } = props;
  const { logout, isLoading, error } = useLogout();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));
  const [imageLoaded, setImageLoaded] = useState(false);
  const {
    logout_popup,

    logout_popup_bannerisloding,
  } = Logout_popup();
  // console.log(logout_popup, "logoutpopup");
  // console.log(imageLoaded, "imageloaded");
  return (
    <>
      {logout_popup === null || logout_popup_bannerisloding ? (
        matches ? (
          <Card
            sx={{ display: "flex", boxShadow: "none" }}
            // key={curElem.banner_id}
          >
            <CommonSkeleton
              length={1}
              xs={12}
              lg={12}
              md={12}
              sm={12}
              height="100%"
              width={350}
            />
            <Logoutsection
              logoutHandler={() =>
                logout({
                  token: JSON.parse(localStorage.getItem("user"))?.token,
                })
              }
              setopenpopup={setopenpopup}
            />
          </Card>
        ) : (
          <div className="modal_top_bottom">
            <Card
              className="modal_top_content"
              sx={{ boxShadow: "none", padding: "0" }}
            >
              <CommonSkeleton
                length={1}
                xs={12}
                lg={12}
                md={12}
                sm={12}
                height={"222px"}
                width="100%"
              />
              <Logoutsection
                logoutHandler={() =>
                  logout({
                    token: JSON.parse(localStorage.getItem("user"))?.token,
                  })
                }
                setopenpopup={setopenpopup}
              />
            </Card>
          </div>
        )
      ) : (
        logout_popup &&
        logout_popup.map((curElem) => {
          return matches ? (
            <Card
              sx={{ display: "flex", boxShadow: "none" }}
              key={curElem.banner_id}
            >
               {!imageLoaded && (
                <CommonSkeleton
                  length={1}
                  xs={12}
                  lg={12}
                  md={12}
                  sm={12}
                  height="100%"
                  width={350}
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
              <Logoutsection
                logoutHandler={() =>
                  logout({
                    token: JSON.parse(localStorage.getItem("user"))?.token,
                  })
                }
                setopenpopup={setopenpopup}
              />
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
                {" "}
                <Logoutsection
                  logoutHandler={() =>
                    logout({
                      token: JSON.parse(localStorage.getItem("user"))?.token,
                    })
                  }
                  setopenpopup={setopenpopup}
                />
              </Card>
            </div>
          );
        })
      )}
    </>
  );
};

export default Logoutpage;
