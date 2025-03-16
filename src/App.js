import React from "react";
import { useState } from "react";
import "./App.css";
import Header from "./Componet/Header/Header";

import { BrowserRouter as Router } from "react-router-dom";
import CartToggile from "./Componet/CartToggile/CartToggile";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";

import { FloatingWhatsApp } from "react-floating-whatsapp";
import PopupComponentList from "./Componet/ReusableComponet/PopupComponentList";
import { usePoPupContext } from "./Context/PopupContext";
import FooterContent from "./Componet/Footer/FooterContent";

function App() {
  const showCart = useSelector((state) => state.carttoggle.cartIsVisible);

  const {
    openpopup,
    setopenpopup,

    fromCart,
    setFromCart,
  } = usePoPupContext();
  return (
    <>
      <Router>
        <div className="App">
          <Header />

          {showCart && (
            <CartToggile
              setopenpopup={setopenpopup}
              setFromCart={setFromCart}
            />
          )}

    
          <FooterContent />
        </div>
        <ToastContainer />
        <PopupComponentList />
      </Router>
    </>
  );
}

export default App;
