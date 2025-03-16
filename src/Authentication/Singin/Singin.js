import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";

import { useState, useEffect } from "react";
import "../Login/Login.css";
import Divider from "@mui/material/Divider";

import GoogleIcon from "@mui/icons-material/Google";

import InputAdornment from "@mui/material/InputAdornment";
import ReactGA4 from "react-ga4";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Login from "../Login/Login";
import { ToastContainer, toast } from "react-toastify";
import {
  useFacebookLogin,
  useGoogleLogins,
  useRegister,
} from "../../client-api/LoginRegister";
import { Toastsucess } from "../../Componet/ReusableComponet/toast/Toast";
import Textfieldreuse from "../../Componet/ReusableComponet/Textfieldreuse";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import FacebookLogin from "react-facebook-login";
import { TextField } from "@mui/material";
function Singin(props) {
  const { setopenpopup } = props;

  const { register,  } = useRegister();

  const [checked, setChecked] = React.useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, seterrors] = useState({});
  console.log({ email, password });
  const { googlelogin } = useGoogleLogins();
  const { fblogin } = useFacebookLogin();
  const handleName = (e) => {
    if (!e.target.value) {
      seterrors((prev) => ({ ...prev, name: "name is required!" }));
    } else {
      seterrors((prev) => ({ ...prev, name: "" }));
    }
    setName(e.target.value);
  };
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
      seterrors((prev) => ({ ...prev, email: " " }));
    }

    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
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
    setPassword(e.target.value);
  };

  const handleApi = async () => {
    try {
      if (!email || !password || !name) {
        Toastsucess("Please Enter Name, Email and Password !");

        return;
      }
      await register({
        name: name,
        email: email,
        password: password,
      });
      Toastsucess("Sucessfully Registered ! ", "sucess", "light");
      ReactGA4.event("sign_up", {
        category: "User",
        action: "sign_up",
        items: [
          {
          
            name: name,
            email: email,
          },
        ],
      });
      setopenpopup("login");
    } catch (error) {
      Toastsucess("The email has already been taken!");
    }
  };

  const { saveUser } = useAuthContext();
  const Navigate = useNavigate();
  const googleApi = async (response) => {
    try {
      // const decodedToken = jwt_decode(response?.credential);

      // console.log(decodedToken, "googlemail");

      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${response.access_token}` } }
      );
      console.log(userInfo, "userinfo");
      const userData = await googlelogin({
        email: userInfo?.data?.email,
        name: userInfo?.data?.name,
        nbf: +userInfo?.data?.sub,
      });

      // Assuming this is the function that handles saving the user data

      setopenpopup(false);

      if (props.fromCart) {
        Navigate("/checkout");
      } else {
        Navigate("/myAccount");
      }
      //Refresh the page
      window.location.reload();
      ReactGA4.event("login", {
        category: "User",
        action: "Login",
        items: [
          {
            email: userInfo?.data?.email,
            name: userInfo?.data?.name,
          },
        ],
      });
      Toastsucess("Successfully Registed", "success", "light");
    } catch (error) {
      Toastsucess("The email has already been taken!!");
    }
  };
  const glogin = useGoogleLogin({
    onSuccess: googleApi,
    //  flow: "authCode",
    cookiePolicy: "single_host_origin",
  });

  const handleGoogleFailure = (error) => {
    console.error("Google authentication failed:", error);
    console.log("Login Failed");
  };

  const fbApi = async (response) => {
    try {
      console.log(response);
      const userData = await fblogin({
        id: response.data.id,
        email: response.data.email,
        name: response.data.name,
      });

      setopenpopup(false);

      if (props.fromCart) {
        Navigate("/checkout"); // Make sure Navigate is defined and properly set up
      } else {
        Navigate("/myAccount"); // Make sure Navigate is defined and properly set up
      }
      window.location.reload();
      ReactGA4.event("login", {
        category: "User",
        action: "Login",
        items: [
          {
            email: response.data.email,
            name: response.data.name,
          },
        ],
      });
      Toastsucess("Successfully Register", "success", "light");
    } catch (error) {
      Toastsucess("The email has already been taken!!");
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="login">
      <Box sx={{ flexGrow: 1 }} className="loginbox">
        <Grid container rowSpacing={0} className="gridwidth">
          <Grid item xs={12}>
            <img
              src="https://admin.myfamilyfitness.com/assets/images/mff_logo_bt.svg"
              className="familylogo1"
              alt='logo'
            />
          </Grid>
          <Grid item xs={12}>
            <p className="logintxt">
              By signing up, you agree to our terms & policy
            </p>
          </Grid>

          <Grid item xs={12}>
            <p className="username" id="use">
              Name
            </p>

            <Textfieldreuse
              autoComplete="off"
              name="name"
              placeholder=""
              margin="normal"
              required
              className="textfieldloginuser cha_p"
              value={name}
              onChange={handleName}
              variant="outlined"
            />
            {errors ? <p className="required">{errors.name}</p> : ""}
          </Grid>

          <Grid item xs={12}>
            <p className="username" id="use">
              Email
            </p>

            <Textfieldreuse
              autoComplete="off"
              name="name"
              placeholder=""
              margin="normal"
              required
              className="textfieldloginuser cha_p"
              value={email}
              onChange={handleEmail}
              variant="outlined"
            />
            {errors ? <p className="required">{errors.email}</p> : ""}
          </Grid>

          <Grid item xs={12}>
            <p className="username" id="use">
              Password
            </p>

            <TextField
              className="textfieldloginuser cha_p"
              variant="outlined"
              margin="normal"
              required
              value={password}
              onChange={handlePassword}
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {errors ? <p className="required">{errors.password}</p> : ""}
          </Grid>

          <Grid xs={12}>
            <Button
              variant="contained"
              className="Loginbtn"
              size="large"
              onClick={handleApi}
            >
              Register
            </Button>
          </Grid>
          <Grid xs={12}>
            <Divider>or</Divider>
          </Grid>
          <Grid xs={12}>
         
       
            <FacebookLogin
              appId="241973938618642"
              autoLoad={false}
              callback={fbApi}
              icon="fa-facebook"
              buttonStyle={{
                width: "100%",
                fontFamily: "CamptonLight",
                textTransform: "capitalize",
                borderRadius: "4px",
                padding: "12px 16px",
              }}
            />
          </Grid>

          <Grid xs={12}>
            <br />
            <Button
              variant="contained"
              className="Loginwithgooglebtn"
              size="large"
              onClick={() => glogin()}
            >
              <GoogleIcon></GoogleIcon>
              Regiter With Google
            </Button>
          </Grid>
          <Grid xs={12}>
            <p className="account">
              Dont have account?
              <Button
                variant="text"
                className="register"
                onClick={() => setopenpopup("login")}
              >
                Login
              </Button>
            </p>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Singin;
