import React from "react";
import errorimag from '../src/Assets/errorimage.jpg'
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import CircularProgress from "@mui/material/CircularProgress";
function refreshPage() {
  window.location.href = "/";
}
export const ErrorPage = () => {
  // console.log();
  return (
    <Grid container spacing={2} sx={{ padding: "5%" }}>
      <Grid item xs={10} md={10} sm={10} lg={10}>
        <img src={errorimag} alt="Buy Home Gym & Commercial Fitness Equipment online Store | My Family Fitness" />
      </Grid>

      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Button
          variant="contained"
          className="changepasswordbtn"
          size="large"
          onClick={refreshPage}
        >
          <HomeIcon sx={{ paddingRight: "2px" }} /> GO Home
        </Button>
      </Grid>
    </Grid>
  );
};

export const Circularrotate = () => {
  return (
    <Grid container spacing={2} sx={{ padding: "20%" }}>
      <Grid item xs={12} md={12} sm={12} lg={12}>
        <CircularProgress color="inherit" />
      </Grid>
    </Grid>
  );
};
