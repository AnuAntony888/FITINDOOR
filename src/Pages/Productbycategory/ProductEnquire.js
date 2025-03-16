import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import Textfieldreuse from "../../Componet/ReusableComponet/Textfieldreuse";
import { useState } from "react";
import { Toastsucess } from "../../Componet/ReusableComponet/toast/Toast";
import { ProductEnquiry } from "../../client-api/ApiProducts";

const ProductEnquire = (props) => {
  const { setopenpopup, productname } = props;
  // console.log(setopenpopup, productname, "data?.[0]?.product?.name");
  const { enquiryform } = ProductEnquiry();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const handlesetName = (e) => {
    setName(e.target.value);
  };
  const handlesetEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlesetPhone = (e) => {
    setPhone(e.target.value);
  };
  const handlesetMessage = (e) => {
    setMessage(e.target.value);
  };
  const Data = [
    {
      label: "Name*",
      type: "text",
      value: name,
      onChange: handlesetName,
    },
    {
      label: "Email*",

      type: "email", // Set the type to "email"
      value: email,
      onChange: handlesetEmail,
    },
    {
      label: "Phone*",
      type: "text",
      value: phone,
      onChange: handlesetPhone,
    },
    {
      label: "Message*",
      type: "text",
      rows: 3,
      value: message,
      onChange: handlesetMessage,
    },
  ];
  const handleApi = async () => {
    try {
      if (!name || !email || !phone || !message) {
        Toastsucess("Please fill your Address");

        return;
      }

      await enquiryform({
        name,
        email,
        phone,
        message,
        productname,
      });
      setopenpopup(false);
      Toastsucess(
        "Thanks for your question!. We will get back soon!",
        "sucess",
        "light"
      );
    } catch (error) {
      Toastsucess(error.message);
    }
    setopenpopup(false);
  };
  return (
    <div>
      <Grid container spacing={2} className="addressform" sx={{ pt: "10px" }}>
        <Grid xs={12} className="addnewaddheading">
          <h4>Product Enquiry</h4>
        </Grid>

        {Data.map((data, index) => (
          <Grid xs={12} sx={{ pb: "10px" }}>
            <p className="addressformtitle cha_p">{data.label}</p>
            <Textfieldreuse
              className="Addressinputtxt"
              type={data.type}
              value={data.value}
              onChange={data.onChange}
              size="small"
              rows={data.rows}
            />
          </Grid>
        ))}

        <Grid xs={12}>
          <Button
            variant="contained"
            className="saveadress"
            size="large"
            type="submit"
            onClick={handleApi}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductEnquire;
