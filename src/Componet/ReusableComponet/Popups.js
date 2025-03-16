import React from "react";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";
import { useTheme } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import useMediaQuery from "@mui/material/useMediaQuery";
import Login from "../../Authentication/Login/Login";
import Pageloadcard from "./Pageloadcard";

import "./pageloadcard.css";
import { usePoPupContext } from "../../Context/PopupContext";
import Singin from "../../Authentication/Singin/Singin";
import Modal from "../../Pages/Productbycategory/Modal";
import Phone from "../../Pages/MYAcoount/PhoneNumber/Phone";
import PersonalDetails from "../../Pages/MYAcoount/PersonalDetails";
import Register from "../../Pages/MYAcoount/CRUD/Register";
import Resetpassword from "../../Authentication/Resetpassword/Resetpassword";
import Verification from "../../Authentication/Resetpassword/Verification";
import Logoutpage from "../../Pages/MYAcoount/Logoutpage";
import ProductEnquire from "../../Pages/Productbycategory/ProductEnquire";
import { PreorderRequest, ProductpriceMatch } from "../../Icons/Icons";
import Jerseyform from "../../Pages/Form/Jerseyform";
import Tapresult from "../Paybutton/Tapresult";

function Popups(props) {
  const theme = useTheme();
  const desktopview = useMediaQuery(theme.breakpoints.up("xs"));
  const laptop = useMediaQuery(theme.breakpoints.up("sm"));
  const { title, children, register, setRegiste, maxWidth } = props;
  const { openpopup, setopenpopup } = usePoPupContext();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  // const closePopup = () => {
  //   if (openpopup === "login") {
  //     localStorage.removeItem("isLoggedIn");
  //   }
  //   setopenpopup(false);
  // };
  const closePopup = (openpopup) => {
    if (openpopup === "login") {
      localStorage.removeItem("isLoggedIn");
    }
    if (openpopup.name === "loginuser") {
      localStorage.removeItem("ispricealertIn");
    }

    setopenpopup(false);
  };
  return (
    <div>
      <Dialog
        open={Boolean(openpopup)}
        onClose={closePopup}
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": desktopview
              ? {
                  maxWidth: props.maxWidth,
                  overflowY: "unset",
                  borderRadius: "15px",
                  // width:props.width
                  maxHeight: props.maxHeight,
                }
              : { overflowY: "unset", borderRadius: "12px" },
          },
        }}
        // maxWidth={props.maxwidth}
      >
        <DialogContent
          sx={{
            "&.MuiDialogContent-root": laptop
              ? {
                  padding: props.padding,
                }
              : "",
          }}
        >
          <CancelIcon
            className="cancelicon"
            onClick={
              closePopup
              // () => setopenpopup(false)
            }
            sx={{
              position: "absolute",
              backgroundColor: "transparent",

              right: "0px",
              zIndex: 1000,

              top: "1px",
            }}
          ></CancelIcon>
          {openpopup === "login" ? (
            <Login setopenpopup={setopenpopup} />
          ) : openpopup === "subscription" ? (
            <Pageloadcard setopenpopup={setopenpopup} />
          ) : openpopup.name === "loginuser" ? (
            <Login
              setopenpopup={setopenpopup}
              maxWidth="450px"
              productname={openpopup.productname}
            />
          ) : openpopup === "signin" ? (
            <Singin setopenpopup={setopenpopup} />
          ) : openpopup?.product?.product_id ? (
            <Modal product={openpopup} setopenpopup={setopenpopup} />
          ) : openpopup === "phone" ? (
            <Phone setopenpopup={setopenpopup} />
          ) : openpopup === "reset" ? (
            <Resetpassword setopenpopup={setopenpopup} />
          ) : openpopup === "verify" ? (
            <Verification setopenpopup={setopenpopup} maxWidth="450px" />
          ) : openpopup === "logout" ? (
            <Logoutpage setopenpopup={setopenpopup} />
          ) : openpopup === "personalDetails" ? (
            <PersonalDetails setopenpopup={setopenpopup} maxWidth="450px" />
          ) : openpopup?.name === "ProductEnquire" ? (
            <ProductEnquire
              setopenpopup={setopenpopup}
              maxWidth="450px"
              productname={openpopup.productname}
            />
          ) : openpopup?.name === "BadmintonJerseyOrderForm" ? (
            <Jerseyform
              setopenpopup={setopenpopup}
              product={openpopup}

              // maxWidth="450px"
              // productname={openpopup.productname}
            />
          ) : //tap reult page
          openpopup?.name === "Tappaymentresult" ? (
            <Tapresult
              setopenpopup={setopenpopup}
              maxWidth="450px"
              productname={openpopup.productname}
                                    />
                                    
          ) : openpopup?.name === "ProductPreorder" ? (
            <PreorderRequest
              setopenpopup={setopenpopup}
              maxWidth="450px"
              productname={openpopup.productname}
            />
          ) : openpopup?.name === "ProductpriceMatch" ? (
            <ProductpriceMatch
              setopenpopup={setopenpopup}
              productname={openpopup.productname}
            />
          ) : openpopup?.type ? (
            <Register
              setopenpopup={setopenpopup}
              maxWidth="450px"
              type={openpopup?.type}
            />
          ) : (
            ""
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Popups;
