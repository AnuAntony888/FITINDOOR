import React from "react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
 import "react-phone-input-2/lib/style.css";
import Button from "@mui/material/Button";

import { usePhone } from "../../../client-api/LoginRegister";
import { Toastsucess } from "../../../Componet/ReusableComponet/toast/Toast";
import { useAuthContext } from "../../../Context/AuthContext";
import { useProfile } from "../../../client-api/Apiuserdetails";
const Phone = (props) => {
  const { setopenpopup } = props;
  const { user, getuserdata } = useAuthContext();
  const { data } = useProfile(getuserdata);
  const [phone, setphone] = useState(data?.profile?.phone?data?.profile?.phone:"");


    // console.log(phone,"phonestill")
  const { phonenumber } = usePhone(getuserdata);

  const handleApi = async () => {
    try {
      if (!phone) {
        Toastsucess("Please Enter Phone Number");

        return;
      }
      // await phonenumber(phone);
      await phonenumber({phone})
      Toastsucess("Sucessfully update PhoneNumber !", "sucess", "light");

      setopenpopup(false);
    } catch (error) {
      Toastsucess(error.message);
    }
    setphone("");
  };

  return (
    <div>
      <br />
      <br />

      <PhoneInput
        country={"ae"}
        onlyCountries={["ae", "sa"]}
        // value={phone.phone}
        // onChange={(phone) => setphone({ phone })}
           value={phone}
         onChange={(phone) => setphone( phone )}
      />
      <br />
      <Button
        variant="contained"
        className="saveadress"
        size="large"
        type="submit"
        onClick={handleApi}
      >
        Save Number
      </Button>
      <br />
      <br />
    </div>
  );
};

export default Phone;
