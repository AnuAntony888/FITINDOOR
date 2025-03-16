import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import "./Contact-us.css";
import Button from "@mui/material/Button";

import { TextField } from "@mui/material";

import { UserdropDetails } from "../../client-api/Apiuserdetails";
import { Toastsucess } from "../../Componet/ReusableComponet/toast/Toast";
import { MetaComponent } from "../../Icons/Icons";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, seterrors] = useState({});

  const { Justdropdetails } = UserdropDetails();

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

  const handleMessage = (e) => {
    const errors = {};
    if (!e.target.value) {
      seterrors((prev) => ({ ...prev, message: "Name is required " }));
    } else {
      seterrors((prev) => ({ ...prev, message: " " }));
    }

    setMessage(e.target.value);
  };

  const handlePhone = (e) => {
    const errors = {};
    if (!e.target.value) {
      seterrors((prev) => ({ ...prev, phone: "Phone is required " }));
    } else {
      seterrors((prev) => ({ ...prev, phone: " " }));
    }

    setPhone(e.target.value);
  };

  const handleName = (e) => {
    const errors = {};
    if (!e.target.value) {
      seterrors((prev) => ({ ...prev, name: "Name is required " }));
    } else {
      seterrors((prev) => ({ ...prev, name: " " }));
    }

    setName(e.target.value);
  };

  const handleApi = async () => {
    try {
      if (!name || !email || !message || !phone) {
        Toastsucess("Please fill your Details");

        return;
      }

      await Justdropdetails({
        name,
        email,
        message,
        phone,
      });

      Toastsucess("Thanks for contacting us!!", "sucess", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
    setEmail(" ");
    setMessage(" ");
    setName(" ");
    setPhone(" ");
  };

  React.useEffect(() => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  }, []);
  return (
    <div>
      <MetaComponent dynamicTitle="Contact Us | My Family Fitness" />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} sm={12} xs={12}>
            <p className="contact_formtitle"> Name *</p>
            <TextField
              className="Addressinputtxt"
              type="text"
              placeholder="Entre Your Name"
              value={name}
              onChange={handleName}
            />
            {errors ? <p className="required">{errors.name}</p> : ""}
          </Grid>

          <Grid item lg={6} md={6} sm={12} xs={12}>
            <p className="contact_formtitle"> Email *</p>
            <TextField
              className="Addressinputtxt"
              type="text"
              placeholder="Entre Your Email"
              value={email}
              onChange={handleEmail}
            />
            {errors ? <p className="required">{errors.email}</p> : ""}
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <p className="contact_formtitle">Phone</p>
            <TextField
              className="Addressinputtxt"
              type="text"
              placeholder="Entre Your Phone"
              value={phone}
              onChange={handlePhone}
            />
            {errors ? <p className="required">{errors.phone}</p> : ""}
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <p className="contact_formtitle">Message</p>
            <textarea
              className="Addressinputtxt"
              type="text"
              placeholder="Entre Your Message"
              value={message}
              onChange={handleMessage}
            ></textarea>
            {errors ? <p className="required">{errors.message}</p> : ""}
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Button
              variant="contained"
              className="contact_address_btn"
              size="large"
              type="submit"
              onClick={handleApi}
            >
              Send Message
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Contact;
