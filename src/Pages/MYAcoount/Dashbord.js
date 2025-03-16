import React from "react";
import { useAuthContext } from "../../Context/AuthContext";

const Dashbord = ({ logout, activeTab }) => {
  const { user, getuserdata } = useAuthContext();

  // console.log(activeTab, "activetab");

  return (
    <div className="dashbord">
      <h3 className="flashsaletxt1">Dashboard</h3>
      Hello{" "}
      <span className="dashbold">
        {" "}
        {getuserdata?.token ? getuserdata?.first_name : ""}
      </span>{" "}
      (Not{" "}
      <span className="dashbold click_pointer" onClick={() => logout("logout")}>
        Customer? Logout
      </span>
      )
      <br />
      <br />
      From your account dashboard you can view your recent{" "}
      <span className="dashbold1 click_pointer" >Orders</span>, manage your{" "}
      <span className="dashbold1 click_pointer">Address</span> and{" "}
      <span className="dashbold1 click_pointer">Contact Number</span> and{" "}
      <span className="dashbold1 click_pointer">Change your password</span>
    </div>
  );
};

export default Dashbord;
