import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import { useState } from "react";
import "./Login.css";
import Divider from "@mui/material/Divider";

import GoogleIcon from "@mui/icons-material/Google";
import { useAuthContext } from "../../Context/AuthContext";
import FacebookLogin from "react-facebook-login";
import InputAdornment from "@mui/material/InputAdornment";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";

import { useNavigate } from "react-router-dom";
import logo from "../../Assets/logo.svg";
import {
  useFacebookLogin,
  useGoogleLogins,
  useLogin,
} from "../../client-api/LoginRegister";
import { Toastsucess } from "../../Componet/ReusableComponet/toast/Toast";

import ReactGA4 from "react-ga4";
import { useGoogleLogin } from "@react-oauth/google";

import axios from "axios";
import { PriceDropAlert } from "../../client-api/ApiProducts";
// import { usePoPupContext } from "../../Context/PopupContext";
import { TextField } from "@mui/material";
function Login(props) {
  const { login } = useLogin();
  const { googlelogin } = useGoogleLogins();
  const { fblogin } = useFacebookLogin();
  const { setopenpopup, productname } = props;
  const [checked, setChecked] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, seterrors] = useState({});

  const { getuserdata ,dispatch,isError} = useAuthContext();

  const handleEmail = (e) => {
    // const errors = {};

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

  const handlePassword = (e) => {
    // const errors = {};
    if (!e.target.value) {
      seterrors((prev) => ({ ...prev, password: "Password is required " }));
    } else {
      seterrors((prev) => ({ ...prev, password: " " }));
    }

    setPassword(e.target.value);
  };

  const { saveUser } = useAuthContext();
  const Navigate = useNavigate();
  const { dropAlert } = PriceDropAlert(getuserdata);
  const handleApi = async () => {
    try {
      //  throw new Error("error find");
      if (!email && !password) {
        Toastsucess("Please Enter Email and Password !");

        return;
      }

      const userData = await login({
        email: email,
        password: password,
      });
//1 PASS DATA
      saveUser(userData?.data);

      if (productname) {
        await dropAlert({
          user_id: userData?.data?.user_id,
          sku: productname,
          token: userData?.data?.token,
        })
          .then(() => {

            // This code block will be executed when dropAlert is successful.
            Toastsucess(
              "Thanks for your support! We will get back to you soon.",
              "success",
              "light"
            );
          })
          .catch((error) => {

            // This code block will be executed if there's an error in dropAlert.
            Toastsucess(error.message);
            dispatch({ type: "LOGIN_FAILURE", });
            
          });
      }

      setopenpopup(false);

      if (localStorage.getItem("ispricealertIn")) {
        localStorage.removeItem("ispricealertIn");
      } else if (localStorage.getItem("isLoggedIn")) {
        localStorage.removeItem("isLoggedIn");
        Navigate("/checkout");
      } else {
        Navigate("/myAccount");
      }

      Toastsucess("Sucessfully login ", "sucess", "light");

      ReactGA4.event("login", {
        category: "User",
        action: "Login",
        items: [
          {
            email: email,
          },
        ],
      });
    } catch (error) {
      console.log(error, "normal error");
      Toastsucess("Email & Password does not match with our record !");
    }
  };

  // const { openpopup } = usePoPupContext();

  const googleApi = async (response) => {
    try {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: `Bearer ${response.access_token}` } }
      );

      const userData = await googlelogin({
        email: userInfo?.data?.email,
        name: userInfo?.data?.name,
        nbf: +userInfo?.data?.sub,
      });

      if (productname) {
        await dropAlert({
          user_id: userData?.data?.user_id,
          sku: productname,
          token: userData?.data?.token,
        })
          .then(() => {
            // This code block will be executed when dropAlert is successful.
            Toastsucess(
              "Thanks for your support! We will get back to you soon.",
              "success",
              "light"
            );
          })
          .catch((error) => {
            // This code block will be executed if there's an error in dropAlert.
            Toastsucess(error.message);
          });
      }

      setopenpopup(false);

      if (localStorage.getItem("ispricealertIn")) {
        localStorage.removeItem("ispricealertIn");
      } else if (localStorage.getItem("isLoggedIn")) {
        localStorage.removeItem("isLoggedIn");
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
          },
        ],
      });
      Toastsucess("Successfully login", "success", "light");
    } catch (error) {
      // console.log(error, "error google");
      Toastsucess("Email & Password does not match with our records!");
    }
  };
  const glogin = useGoogleLogin({
    onSuccess: googleApi,
    //  flow: "authCode",
    cookiePolicy: "single_host_origin",
  });

  // const handleGoogleFailure = (error) => {
  //   //console.error("Google authentication failed:", error);
  //   //console.log("Login Failed");
  // };

  const fbApi = async (response) => {
    try {
      console.log(
        response,
        response.id,
        response.email,
        response.name,
        "fbresponse"
      );
      console.log(`${response.id}@dummy.com`);
      const userData = await fblogin({
        id: response.id,
        email: response.email ? response.email : `${response.id}@dummy.com`,
        name: response.name,
      });

      if (productname) {
        await dropAlert({
          // user_id: userData?.user_id,
          user_id: userData?.userID,
          sku: productname,
          token: userData?.token,
        })
          .then(() => {
            // This code block will be executed when dropAlert is successful.
            Toastsucess(
              "Thanks for your support! We will get back to you soon.",

              "success",
              "light"
            );
          })
          .catch((error) => {
            // This code block will be executed if there's an error in dropAlert.
            Toastsucess(error.message);
          });
      }
      setopenpopup(false);
      if (localStorage.getItem("ispricealertIn")) {
        localStorage.removeItem("ispricealertIn");
      } else if (localStorage.getItem("isLoggedIn")) {
        localStorage.removeItem("isLoggedIn");
        Navigate("/checkout");
      } else {
        Navigate("/myAccount");
      }
      window.location.reload();
      ReactGA4.event("login ", {
        category: "User",
        action: "Login",
        items: [
          {
            email: response.data.email,
            name: response.data.name,
          },
        ],
      });
      Toastsucess("Successfully login", "success", "light");
    } catch (error) {
      console.log(error, "facebooklogin");
      Toastsucess("Email & Password does not match with our records!");
    }
  };



  useEffect(() => {

    console.log(isError, "error");
  }, [isError]);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const Field = [
    {
      label: "E-Mail",
      placeholder: "Email",
      name: "Email",
      value: email,
      onChange: handleEmail,
      errorsdisply: errors.email,
    },
    {
      label: " Password",
      placeholder: " Password",
      value: password,
      onChange: handlePassword,
      type: showPassword ? "text" : "password",

      onClick: handleClickShowPassword,

      show: showPassword,
      errorsdisply: errors.password,
    },
  ];

  return (
    <div className="login">
      <Box sx={{ flexGrow: 1 }} className="loginbox">
        <Grid container rowSpacing={0} className="gridwidth">
          <Grid item xs={12}>
            <img src={logo} className="familylogo1" alt="logo" />
          </Grid>

          <Grid item xs={12}>
            <p className="logintxt">Login with your email & password</p>
          </Grid>
          {Field.map((data, index) => (
            <Grid item xs={12} key={index}>
              <p className="username" id="use">
                {data.label}
              </p>
              <TextField
                className="textfieldloginuser cha_p"
                variant="outlined"
                margin="normal"
                placeholder={data.placeholder}
                required
                value={data.value}
                onChange={data.onChange}
                type={data.type}
                InputProps={
                  index === 1
                    ? {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={data.onClick}
                              edge="end"
                            >
                              {data.show ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }
                    : undefined
                }
              />

              <p className="required">{data.errorsdisply}</p>
            </Grid>
          ))}

          <Grid xs={6}>
            <Switch
              sx={{ color: "black", textAlign: "left" }}
              checked={checked}
              onChange={(event) => setChecked(event.target.checked)}
            />
            Remember Me
          </Grid>
          <Grid xs={6}>
            <Button
              variant="text"
              className="forgetpassword"
              onClick={() => setopenpopup("reset")}
            >
              Forgot Password?
            </Button>
          </Grid>
          <Grid xs={12}>
            <Button
              variant="contained"
              className="Loginbtn"
              size="large"
              onClick={handleApi}
            >
              Login
            </Button>
          </Grid>
          <Grid xs={12}>
            <Divider>or</Divider>
          </Grid>
          <Grid xs={12}>
            <FacebookLogin
              appId="3661145890783185"
              autoLoad={false}
              callback={fbApi}
              fields="name,email,picture"
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
              sx={{ justifyContent: "centre", fontSize: "17px" }}
            >
              <GoogleIcon sx={{ mr: "2px" }} />
              <span>Login With Google</span>
            </Button>
          </Grid>
          <Grid xs={12}>
            <p className="account">
              Dont have account?
              <Button
                variant="text"
                className="register"
                onClick={() => setopenpopup("signin")}
              >
                Register
              </Button>
            </p>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Login;
