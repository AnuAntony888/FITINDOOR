import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import { useAuthContext } from "../../Context/AuthContext";
import {
  UserAdress,
  Userpersonalinformation,
  useProfile,
} from "../../client-api/Apiuserdetails";
import "react-phone-input-2/lib/style.css";
import { TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useUserContext } from "../../Context/Usercontext";

const AddressCheckoutleft = (

) => {
  const { user, setUser } = useUserContext();
  const {
    first_name,
    last_name,
    email,
    phone,
    address,
    country,
    city,
    pincode,
    address2,
    city2,
    pincode2,
    type,
    addresstype,
    flagperson,
    flagphone,
  } = user;
  const { getuserdata } = useAuthContext();

  const { addressofuser } = UserAdress(getuserdata);

  const { personalinfoofuser } = Userpersonalinformation(getuserdata);
  const { data, error, isLoading } = useProfile(getuserdata);

  

  const handlesetfirst_name = (e) => {
    // setfirst_name(e.target.value);
    setUser((prev)=>({...prev,first_name:e.target.value,flagperson:"1"}));
    // setflagperson("1");
  };
  const handlesetlast_name = (e) => {
    // setlast_name(e.target.value);
    // setflagperson("1");
    setUser((prev)=>({...prev,last_name:e.target.value,flagperson:"1"}));
  };
  const handlesetphone = (e) => {
    // setphone(e.target.value);
    // setflagphone("1");
    setUser((prev)=>({...prev,phone:e.target.value,flagphone:"1"}));
  };
  const handlesetemail = (e) => {
    // setemail(e.target.value);
    // setflagperson("1");
    setUser((prev)=>({...prev,email:e.target.value,flagperson:"1"}));
  };
  const handlesetAddress = (e) => {
    // setAddress(e.target.value);
    // setaddresstype("1");
    setUser((prev)=>({...prev,address:e.target.value,addresstype:"1"}));
  };

  const handlecity = (e) => {
    // setCity(e.target.value);
    // setaddresstype("1");
    setUser((prev)=>({...prev,city:e.target.value,addresstype:"1"}));  

  };
  const handlepin = (e) => {
    // setpin(e.target.value);
    // setaddresstype("1");
    setUser((prev)=>({...prev,pincode:e.target.value,addresstype:"1"}));
  };

  const handlecountry = (e) => {
    // setCountry(e.target.value);
    // settype("2");
    setUser((prev)=>({...prev,country:e.target.value,type:"2"}));
  };
  const handlesetAddress2 = (e) => {
    // setAddress2(e.target.value);
    // settype("2");
    setUser((prev)=>({...prev,address2:e.target.value,type:"2"}));
  };

  const handlecity2 = (e) => {
    // setCity2(e.target.value);
    // settype("2");
    setUser((prev)=>({...prev,city2:e.target.value,type:"2"}));
  };
  const handlepin2 = (e) => {
    // setpin2(e.target.value);
    // settype("2");
    setUser((prev)=>({...prev,pincode2:e.target.value,type:"2"}));

  };


  const shippingaddress = [
    {
      label: "First Name",

      value:
        first_name && first_name !== "undefined" && first_name !== "null"
          ? first_name
          : ``,

      onChange: handlesetfirst_name,
    },
    {
      label: "Last Name",
      value:
        last_name && last_name !== "undefined" && last_name !== "null"
          ? last_name
          : ``,

      onChange: handlesetlast_name,
    },
    {
      label: "Phone",
      value: phone && phone !== "undefined" && phone !== "null" ? phone : ``,

      onChange: handlesetphone,
    },

    {
      label: "Email*",
      value: email?.split("@")[1] === "dummy.com" ? null : email,
      onChange: handlesetemail,
    },

    {
      label: "Building Name/No.,Floor,Apartment Or Villa No",
      value:
        address2 && address2 !== "undefined" && address2 !== "null"
          ? address2
          : ``,
      onChange: handlesetAddress2,
    },
    {
      label: `Country`,
      value:
        country && country !== "undefined" && country !== "null" ? country : ``,
      onChange: handlecountry,
    },
    {
      label: `City/Town/Area`,
      value: city2 && city2 !== "undefined" && city2 !== "null" ? city2 : ``,
      onChange: handlecity2,
    },
    {
      label: `Pin / Zip Code`,
      value:
        pincode2 && pincode2 !== "undefined" && pincode2 !== "null"
          ? pincode2
          : ``,
      onChange: handlepin2,
    },
  ];

  const billingaddress = [
    {
      label: `Building Name/No.,Floor,Apartment Or Villa No.`,
      value:
        address && address !== "undefined" && address !== "null" ? address : ``,

      onChange: handlesetAddress,
    },
    {
      label: `Country`,
      value:
        country && country !== "undefined" && country !== "null" ? country : ``,

      onChange: handlecountry,
    },
    {
      label: `City/Town/Area`,
      value: city && city !== "undefined" && city !== "null" ? city : ``,

      onChange: handlecity,
    },
    {
      label: `Pin / Zip Code`,
      value:
        pincode && pincode !== "undefined" && pincode !== "null" ? pincode : ``,

      onChange: handlepin,
    },
  ];
  // console.log(billingaddress, "billingaddresss");

  const [checked, setChecked] = useState(true); // Assuming it's initially checked

  const handleCheckbox = (event) => {
    setChecked(event.target.checked);
    if (event.target.checked) {
      // settype("");
      setUser((prev)=>({...prev,type:""})); 
    }
  };
  return (
    <div>
      <Grid container spacing={2} sx={{ pt: "10px", textAlign: "left" }}>
        <Grid xs={12} item className="shadow-checkoutCardheading">
          Shipping Address
        </Grid>
        {shippingaddress.map((field, index) => (
          <Grid item xs={12} lg={index == 0 || index == 1 ? 6 : 12} key={index}>
            <TextField
              className="Addressinputtxt"
              type="text"
              value={field.value}
              placeholder={field.label}
              onChange={field.onChange}
              size="small"
            />
          </Grid>
        ))}

        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleCheckbox} />}
            label="Billing Address Same as Above"
          />
          {!checked ? (
            <Grid container spacing={2}>
              <Grid item xs={12} className="shadow-checkoutCardheading">
                Billing Address
              </Grid>
              {billingaddress.map((field, index) => (
                <Grid
                  item
                  xs={12}
                  lg={index == 0 || index == 1 ? 6 : 12}
                  md={index == 0 || index == 1 ? 6 : 12}
                  key={index}
                >
                  <TextField
                    className="Addressinputtxt"
                    type="text"
                    value={field.value}
                    placeholder={field.label}
                    onChange={field.onChange}
                    size="small"
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default AddressCheckoutleft;
