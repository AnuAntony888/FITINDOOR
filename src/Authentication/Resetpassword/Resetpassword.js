import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Textfieldreuse from "../../Componet/ReusableComponet/Textfieldreuse";
import Button from "@mui/material/Button";
import { Toastsucess } from "../../Componet/ReusableComponet/toast/Toast";
import { useNavigate } from "react-router-dom";
import { useForgetPassword } from "../../client-api/LoginRegister";
import logo from "../../Assets/logo.svg";
const Resetpassword = (props) => {
  const { setopenpopup } = props;
  const [email, setEmail] = useState("");
  const [errors, seterrors] = useState({});
  const { forgetpassword, isLoading, error } = useForgetPassword();
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
  const Navigate = useNavigate();
  const handleApi = async () => {
    try {
      if (!email) {
        Toastsucess("Please Enter Email  !");

        return;
      }
      await forgetpassword({
        email: email,
      });
      setopenpopup("verify");
      Toastsucess("Sucessfully send Otp ", "sucess", "light");
    } catch (error) {
      Toastsucess("Email  does not match with our record !");
    }
  };

  return (
    <div className="login">
      <Box
        sx={{
          flexGrow: 1,
        }}
        className="loginbox"
      >
        <Grid container rowSpacing={2} className="gridwidth">
          <Grid item xs={12}>
          <img src={logo} className="familylogo1" />          </Grid>
          <Grid item xs={12}>
            <p className="logintxt">
              We'll send you a link to reset your password
            </p>
          </Grid>
          <Grid item xs={12}>
            <p className="username" id="use">
              E-Mail
            </p>
            <Textfieldreuse
              name="Email"
              placeholder=""
              margin="normal"
              required
              className="textfieldloginuser"
              value={email}
              onChange={handleEmail}
              variant="outlined"
            />

            {errors ? <p className="required">{errors.email}</p> : ""}
          </Grid>
          <Grid xs={12}>
            <Button
              variant="contained"
              className="Loginbtn"
              size="large"
              onClick={handleApi}
            >
              Reset Password
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Resetpassword;
