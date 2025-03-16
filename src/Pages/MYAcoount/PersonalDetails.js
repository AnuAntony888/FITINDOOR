import React, { useContext, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";

import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import {
  useProfile,
  Userpersonalinformation,
} from "../../client-api/Apiuserdetails";
import { useAuthContext } from "../../Context/AuthContext";
import { Toastsucess } from "../../Componet/ReusableComponet/toast/Toast";
import Textfieldreuse from "../../Componet/ReusableComponet/Textfieldreuse";

const PersonalDetails = (props) => {
  const { getuserdata } = useAuthContext();
  const { personalinfoofuser } = Userpersonalinformation(getuserdata);
  const { data, error, isLoading } = useProfile(getuserdata);
  // console.log(data, "data");

  const [first_name, setfirst_name] = useState(data?.profile.first_name);
  const [last_name, setlast_name] = useState(data?.profile.last_name);

  const [gender, setgender] = React.useState(data?.profile.gender);

  const handleChange = (event) => {
    setgender(event.target.value);
  };
  const [dob, setdob] = useState(data?.profile.dob);
  const [email, setemail] = useState(data?.profile.email);
  const [trn_no, settrn_no] = useState(data?.profile.trn_no);

  const handlesetfirst_name = (e) => {
    setfirst_name(e.target.value);
  };
  const handlesetlast_name = (e) => {
    setlast_name(e.target.value);
  };
  const handlesetdob = (e) => {
    setdob(e.target.value);
  };

  const handlesetemail = (e) => {
    setemail(e.target.value);
  };

  const handlesettrn_no = (e) => {
    settrn_no(e.target.value);
  };
  const { setopenpopup } = props;

  const handleApi = async () => {
    try {
      // if (!first_name || !last_name || !email) {
      //   Toastsucess("Please fill your Personal Details");
      //   return;
      // }

      // Validate the email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(email);

      if (!first_name || !last_name || !isValidEmail) {
        Toastsucess(
          "Please fill your Personal Details or provide a valid email address"
        );
        return;
      }

      await personalinfoofuser({
        first_name,
        last_name,
        gender,
        dob,
        email,
        trn_no,
      });
      setopenpopup(false);
      Toastsucess("Personal Details Updated successfully!", "sucess", "light");
    } catch (error) {
      Toastsucess(error.message);
    }
    setopenpopup(false);
  };
  // console.log(email.split('@')[1]=== 'dummy.com'?null:email,"email console")
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const fields = [
    { label: "First Name*", value: first_name, onChange: handlesetfirst_name },
    { label: "Last Name*", value: last_name, onChange: handlesetlast_name },
    {
      label: "Email*",
      value: email.split("@")[1] === "dummy.com" ? null : email,
      onChange: handlesetemail,
    },
  ];

  const fields2 = [
    { label: "Date Of Birth", value: dob, onChange: handlesetdob },
    { label: "trn_no", value: trn_no, onChange: handlesettrn_no },
  ];
  return (
    <div>
      <Grid container spacing={2} className="addressform" sx={{ pt: "10px" }}>
        <Grid xs={12} className="addnewaddheading">
          <h4>Personal Information</h4>
        </Grid>
        {fields.map((field, index) => (
          <Grid xs={12} key={index} sx={{ pb: "10px" }}>
            <p className="addressformtitle cha_p">{field.label}</p>
            <Textfieldreuse
              size="small"
              className="Addressinputtxt"
              type="text"
              value={field.value}
              onChange={field.onChange}
            />
          </Grid>
        ))}

        <Grid xs={12} sx={{ pb: "10px" }}>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-form-control-label-placement"
              name="position"
              value={gender}
              onChange={handleChange}
            >
              {/* Use map to generate Radio buttons */}
              {genderOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={
                    <Radio
                      sx={{
                        color: "grey.900",
                        "&.Mui-checked": {
                          color: "grey.900",
                        },
                      }}
                    />
                  }
                  label={option.label}
                  checked={gender === option.value}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>

        {fields2.map((field, index) => (
          <Grid xs={12} key={index} sx={{ pb: "10px" }}>
            <p className="addressformtitle cha_p">{field.label}</p>

            <Textfieldreuse
              size="small"
              className="Addressinputtxt"
              type="text"
              value={field.value}
              onChange={field.onChange}
            />
          </Grid>
        ))}
        <Grid xs={12}>
          <br />
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

export default PersonalDetails;
