import { createContext, useContext, useEffect, useState } from "react";
import { useProfile } from "../client-api/Apiuserdetails";
import { useAuthContext } from "./AuthContext";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    pincode: "",
    address2: "",
    city2: "",
    pincode2: "",
    type: "",
    addresstype: "",
    flagperson: "",
    flagphone: "",
  });

  const { getuserdata } = useAuthContext();
  const {
    data: userdat,
    error: usererror,
    isLoading: userislodaing,
  } = useProfile(getuserdata);
  // console.log(userdat, userdat?.profile?.phone, "userdata");

  useEffect(() => {
    // Use optional chaining to safely access nested properties
    // setUser({
    //   first_name: userdat?.profile?.first_name || "",
    //   last_name: userdat?.profile?.last_name || "",
    //   email: userdat?.profile?.email || "",
    //   phone: userdat?.profile?.phone || "",
    //   address: userdat?.address?.[0]?.address || "",
    //   country: userdat?.address?.[0]?.country || "",
    //   city: userdat?.address?.[0]?.city || "",
    //   pincode: userdat?.address?.[0]?.pincode || "",
    //   address2: userdat?.address?.[0]?.address2 || "",
    //   city2: userdat?.address?.[0]?.city2 || "",
    //   pincode2: userdat?.address?.[0]?.pincode2 || "",
    // });

    const guestData = JSON.parse(localStorage.getItem("guestuserData")) || {};

    setUser({
      first_name: userdat?.profile?.first_name || guestData.first_name || "",
      last_name: userdat?.profile?.last_name || guestData.last_name || "",
      email: userdat?.profile?.email || guestData.email || "",
      phone: userdat?.profile?.phone || guestData.phone || "",
      address: userdat?.address?.[0]?.address || guestData.address || "",
      country: userdat?.address?.[0]?.country || guestData.country || "",
      city: userdat?.address?.[0]?.city || guestData.city || "",
      pincode: userdat?.address?.[0]?.pincode || guestData.pincode || "",
      address2: userdat?.address?.[0]?.address2 || guestData.address2 || "",
      city2: userdat?.address?.[0]?.city2 || guestData.city2 || "",
      pincode2: userdat?.address?.[0]?.pincode2 || guestData.pincode2 || "",
    });
  }, [userdat]);
  console.log(user, "user");
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, useUserContext, UserProvider };
