import { createContext, useContext, useEffect, useState } from "react";
const PopupContext = createContext();

const PopupProvider = ({ children }) => {
  const [openpopup, setopenpopup] = useState(false);

  return (
    <PopupContext.Provider
      value={{
        openpopup,
        setopenpopup,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

const usePoPupContext = () => {
  return useContext(PopupContext);
};

export { PopupContext, usePoPupContext, PopupProvider };
