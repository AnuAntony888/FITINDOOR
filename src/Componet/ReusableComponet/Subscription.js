import React from "react";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
const Subscription = (props) => {
  const { errors, email, handleApi, handleEmail } = props;
  return (
    <Box
      sx={{
        display: props.display,
        flexDirection: props.flexDirection,
        position: props.position,
        width: props.width,
      }}
    >
      <CardContent
        sx={{ flex: props.flex, width: props.width, padding: props.padding }}
      >
        <p className="subscripe"> subscribe now</p>

        <p className="Dosubscribe">
          Join and get your regular dose of motivation! Subscribe now to unlock
          access to expert tips, workout plans, and exclusive discounts on
          fitness gear.
        </p>

        <TextField
          autoComplete="off"
          name="Email"
          placeholder="Write Your Email here"
          margin="normal"
          required
          className="textfieldloginuser"
          type="text"
          value={email}
          onChange={handleEmail}
        />
        {errors ? <p className="required">{errors.email}</p> : ""}
        <Button variant="contained" className="Loginbtn" onClick={handleApi}>
          Subscribe{" "}
        </Button>
      </CardContent>
    </Box>
  );
};

export default Subscription;
