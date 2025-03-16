import React, { useState } from "react";

import Grid from "@mui/material/Grid";
import "./AddressForm.css";
import Button from "@mui/material/Button";
import { useAuthContext } from "../../../Context/AuthContext";
import { useProfile, UserAdress } from "../../../client-api/Apiuserdetails";
import Checkbox from "@mui/material/Checkbox";
import { Toastsucess } from "../../../Componet/ReusableComponet/toast/Toast";
import Textfieldreuse from "../../../Componet/ReusableComponet/Textfieldreuse";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const Register = (props) => {
  const { type } = props;

  const { user, getuserdata } = useAuthContext();
  const { addressofuser } = UserAdress(getuserdata);
  const { data } = useProfile(getuserdata);
  // console.log(data, "data");

  const [address, setAddress] = useState(
    type === 1 ? data?.address?.[0]?.address : data?.address?.[0]?.address2
  );
  const [country, setCountry] = useState(data?.address?.[0]?.country);
  const [city, setCity] = useState(
    type === 1 ? data?.address?.[0]?.city : data?.address?.[0]?.city2
  );
  const [pincode, setpin] = useState(
    type === 1 ? data?.address?.[0]?.pincode : data?.address?.[0]?.pincode2
  );
  const [company, setcompany] = useState(
    type === 1 ? data?.address?.[0]?.pincode : data?.address?.[0]?.pincode2
  );

  const [phone, setphone] = useState(
    type === 1 ? data?.address?.[0]?.phone : data?.address?.[0]?.phone2
  );

  // console.log(type, "props.shippingAddress");
  const handlephone = (e) => {
    setphone(e.target.value)
  }
  const handlesetAddress = (e) => {
    setAddress(e.target.value);
  };
  const handlecountry = (e) => {
    setCountry(e.target.value);
  };
  const handlecity = (e) => {
    setCity(e.target.value);
  };

  const handlepin = (e) => {
    setpin(e.target.value);
  };
  const handlecompany = (e) => {
    setcompany(e.target.value);
  };
  const { setopenpopup } = props;

  const handleApi = async () => {
    try {
      if (!address) {
        Toastsucess("Please fill your Address");

        return;
      }
      if (!country) {
        Toastsucess("Please fill your country ");

        return;
      }
      if (!city) {
        Toastsucess("Please fill your city ");

        return;
      }
      if (!pincode) {
        Toastsucess("Please fill your pincode ");

        return;
      }
      if (!phone) {
        Toastsucess("Please fill your phone ");

        return;
      }
      if (!address || !country || !city || !pincode || !phone) {
        Toastsucess("Please fill your Address");

        return;
      }

      await addressofuser({
        address,
        country,
        city,
        pincode,
        phone,
        company,
        type: type,
      });
      setopenpopup(false);
      Toastsucess("Address saved!", "sucess", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
    setopenpopup(false);
  };

  const Data = [
    {
      label: "Address*",
      type: "text",
      value: address,
      onChange: handlesetAddress,
    },
    {
      label: "Country",
      type: "text",
      value: country,
      onChange: handlecountry,
    },
    {
      label: "City",
      type: "text",
      value: city,
      onChange: handlecity,
    },
    {
      label: "Pin/Zip Code*",
      type: "text",
      value: pincode,
      onChange: handlepin,
    },
    {
      label: "Phone*",
      type: "text",
      value: phone,
      onChange: handlephone,
    },
    {
      label: "Company",
      type: "text",
      value: company,
      onChange: handlecompany,
    },
  ];
  return (
    <div>
      {/********************* */}
      <Grid container spacing={2} className="addressform" sx={{ pt: "10px" }}>
        <Grid xs={12} className="addnewaddheading">
          <h4>Add New Address</h4>
        </Grid>

        {Data.map((data, index) => (
          <Grid xs={12} sx={{ pb: "10px" }} key={index}>
            <p className="addressformtitle cha_p">{data.label}</p>
            <Textfieldreuse
              className="Addressinputtxt"
              type={data.type}
              value={data.value}
              onChange={data.onChange}
              size="small"
            />
          </Grid>
        ))}

        {type == 2 ? (
          <Grid xs={12}>
            <p className="addressformtitle">
              {" "}
              My shipping Address is the same as My Billing Address
              <Checkbox {...label} defaultChecked color="default" />
            </p>
          </Grid>
        ) : (
          <Grid xs={12}>
            <br />
          </Grid>
        )}
        <Grid xs={12}>
          <Button
            variant="contained"
            className="saveadress"
            size="large"
            type="submit"
            onClick={handleApi}
          >
            Save Address
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
