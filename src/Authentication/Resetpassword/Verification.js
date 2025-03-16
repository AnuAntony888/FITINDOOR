import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import OtpInput from "react-otp-input";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Textfieldreuse from "../../Componet/ReusableComponet/Textfieldreuse";
import { Toastsucess } from "../../Componet/ReusableComponet/toast/Toast";
import { useForgetChangepassword } from "../../client-api/LoginRegister";
import "./verfy.css";

const Verification = (props) => {
  const { setopenpopup } = props;
  const [otp, setOtp] = useState("");

  const handleOtpChange = (value) => {
    setOtp(value);
    console.log(value, "otp");
  };

  const { resetpassword, isLoading, error } = useForgetChangepassword();
  const [password, setnewPassword] = useState("");
  const [password_confirmation, setconfirmpassword] = useState("");
  const [newshowPassword, setNewShowPassword] = useState(false);
  const [confirmShowPassword, setconfirmShowPassword] = useState(false);
  const [errors, seterrors] = useState({});
  const handleClickShowPassword1 = () => {
    setNewShowPassword(!newshowPassword);
  };
  const handleClickShowPassword2 = () => {
    setconfirmShowPassword(!confirmShowPassword);
  };
  const handlePasswordnew = (e) => {
    const errors = {};
    if (!e.target.value) {
      seterrors((prev) => ({ ...prev, password: "Password is required " }));
    } else if (e.target.value.length < 6) {
      seterrors((prev) => ({
        ...prev,
        password: "Password should be at least 6 characters",
      }));
    } else {
      seterrors((prev) => ({ ...prev, password: " " }));
    }

    setnewPassword(e.target.value);
  };
  const handlePasswordconfirm = (e) => {
    const errors = {};
    if (!e.target.value) {
      seterrors((prev) => ({
        ...prev,
        password_confirmation: "Password is required ",
      }));
    } else {
      seterrors((prev) => ({ ...prev, password_confirmation: " " }));
    }

    setconfirmpassword(e.target.value);
  };

  const handleVerify = async () => {
    if (!password || !password_confirmation) {
      return;
    }

    if (password !== password_confirmation) {
      seterrors((prev) => ({
        ...prev,
        password_confirmation: "Passwords do not match",
      }));
      return;
    }

    try {
      await resetpassword({
        otp: otp,
        password: password,
      });
      Toastsucess("Successfully updated password!", "success", "light");
      setopenpopup("login");
    } catch (error) {
      Toastsucess(error.message);
    }

    setconfirmpassword("");
    setnewPassword("");
    setOtp("");
  };
  return (
    // <div>
    //   <div className="login">

    <Box
      sx={{
        flexGrow: 1,
        flexGrow: 1,
        display: "flex", // Add this line to set the display to flex
        justifyContent: "center", // Add this line to horizontally center the content
      }}
      className="loginbox"
    >
      <Grid
        container
        rowSpacing={2}
        className="gridwidth"
        sx={{
          justifyContent: "center",
          alignItems: "center", // Add this line to vertically center the content
        }}
      >
        <Grid xs={12}>
          <p className="logintxt">Verification Code *</p>
        </Grid>
        <Grid xs={12} className="otp" sx={{ justifyContent: "center" }}>
          <OtpInput
            value={otp}
            onChange={handleOtpChange}
            numInputs={4}
            separator={<span></span>}
            inputStyle="inputStyle"
            containerStyle='otp' 
            renderInput={(props) => <input {...props} />}
          />
        </Grid>
        <Grid xs={12}>
          <p className="addressformtitle cha_p">New Password*</p>
          <Textfieldreuse
            className="textfieldloginuser cha_p"
            variant="outlined"
            margin="normal"
            required
            value={password}
            onChange={handlePasswordnew}
            type={newshowPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword1}
                    edge="end"
                  >
                    {newshowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <p className="required">{errors.password}</p>
        </Grid>
        <Grid xs={12}>
          <p className="addressformtitle cha_p">Confirm Password*</p>

          <Textfieldreuse
            className="textfieldloginuser cha_p"
            variant="outlined"
            margin="normal"
            required
            value={password_confirmation}
            onChange={handlePasswordconfirm}
            type={confirmShowPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword2}
                    edge="end"
                  >
                    {confirmShowPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <p className="required">{errors.password_confirmation}</p>
        </Grid>
        <Grid xs={12}>
          <Button
            variant="contained"
            className="Loginbtn"
            size="large"
            onClick={handleVerify}
          >
            Verify
          </Button>
        </Grid>
      </Grid>
    </Box>
    //   </div>
    // </div>
  );
};

export default Verification;
