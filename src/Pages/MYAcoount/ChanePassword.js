import React from "react";

import { useState } from "react";
import Button from "@mui/material/Button";
import "./Changepassword.css";
import TextField from "@mui/material/TextField";
import { useAuthContext } from "../../Context/AuthContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useNewPassword } from "../../client-api/LoginRegister";
import { Toastsucess } from "../../Componet/ReusableComponet/toast/Toast";
import { Grid } from "@mui/material";
const ChanePassword = () => {
  const [current_password, setcurrent_password] = useState("");
  const [password, setnewPassword] = useState("");
  const [password_confirmation, setconfirmpassword] = useState("");
  const [errors, seterrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [newshowPassword, setNewShowPassword] = useState(false);
  const [confirmShowPassword, setconfirmShowPassword] = useState(false);
  // const [openpopup, setopenpopup] = useState(false);
  const [disable, setDisable] = React.useState(false);
  const handleClickShowPassword = (e) => {
    setShowPassword(!showPassword);
  };

  const handleClickShowPassword1 = () => {
    setNewShowPassword(!newshowPassword);
  };
  const handleClickShowPassword2 = () => {
    setconfirmShowPassword(!confirmShowPassword);
  };
  const handlePassword = (e) => {
    // const errors = {};
    if (!e.target.value) {
      seterrors((prev) => ({
        ...prev,
        current_password: "Password is required ",
      }));
    } else {
      seterrors((prev) => ({ ...prev, current_password: " " }));
    }

    setcurrent_password(e.target.value);
  };
  const handlePasswordnew = (e) => {
    // const errors = {};
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
    // const errors = {};
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

  const { getuserdata } = useAuthContext();

  const { changepassword } = useNewPassword();

  const handleApi = async () => {
    try {
      if (!current_password && !password && !password_confirmation) {
        return;
      }
      await changepassword({
        current_password: current_password,
        password: password,
        password_confirmation: password_confirmation,
        token: getuserdata.token,
      });
      Toastsucess("SucessFully updated Password!", "sucess", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
    setDisable(true);
    setconfirmpassword("");
    setnewPassword("");
    setcurrent_password("");
  };

  const Data = [
    {
      placeholder: "Old Password*",
      value: current_password,
      onChange: handlePassword,
      type: showPassword,
      onClick: handleClickShowPassword,
      errordisply: current_password,
    },

    {
      placeholder: "New Password*",
      value: password,
      onChange: handlePasswordnew,
      type: newshowPassword,
      onClick: handleClickShowPassword1,
      errordisply: password,
    },
    {
      placeholder: "Confirm Password*",
      value: password_confirmation,
      onChange: handlePasswordconfirm,
      type: confirmShowPassword,
      onClick: handleClickShowPassword2,
      errordisply: password_confirmation,
    },
  ];

  return (
    <div className="dashbord">
      <h3 className="flashsaletxt1">Change Password</h3>
      <Grid container spacing={0}>
        {Data.map((data) => (
          <Grid item xs={12} lg={8} md={8}>
            <TextField
              className="textfieldloginuser cha_p"
              variant="outlined"
              margin="normal"
              placeholder={data.placeholder}
              // size="small"
              required
              value={data.value}
              onChange={data.onChange}
              type={data.type ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={data.onClick}
                      edge="end"
                    >
                      {data.type ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <p className="required">{errors.errordisply}</p>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button
            variant="contained"
            className="changepasswordbtn"
            size="large"
            disabled={disable}
            onClick={handleApi}
          >
            Change Password
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChanePassword;

