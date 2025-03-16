import React, { useState } from "react";

import { usePoPupContext } from "../../Context/PopupContext";
import Popup from "./Popups";

const PopupComponentList = () => {
  const { openpopup } = usePoPupContext();
  const popupWidth =
    // openpopup === "subscription"
    //   ? "900px"
    //   : openpopup.product?.product_id
    //   ? "700px"
    //   : "450px";
    openpopup === "subscription"
      ? "900px"
      : openpopup === "logout"
      ? "700px"
      : openpopup.name === "BadmintonJerseyOrderForm"
      ? "700px"
      : openpopup?.name === "ProductpriceMatch"
      ? "500px"
      : openpopup.product?.product_id
      ? "700px"
      : "450px";
  if (!openpopup) return null;
  return (
    <Popup
      maxWidth={popupWidth}
      {...(openpopup === "subscription" && { padding: 0 })}
      {...(openpopup === "logout" && {padding:0})}
    />
  );
};

export default PopupComponentList;
