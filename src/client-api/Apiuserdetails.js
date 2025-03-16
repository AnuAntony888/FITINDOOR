import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { API } from "./APIcategory";

//Blog details

const user = localStorage.getItem("user");
export function GetAddress() {
  const getAddress = async () => {
    const res = await axios.get(`${API}/user/address`, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
        Authorization: `Bearer ${JSON.parse(user).token}`,
      },
    });
    return res.data.data;
  };

  const { data, error, isLoading } = useQuery("address", getAddress);
  return { data, error, isLoading };
}

//profiledetails
export function useProfile(getuserdata) {

  const profileHandler = async (params) => {
    const res = await axios.post(`${API}/user/profile`, params, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
        Authorization: `Bearer ${getuserdata?.token}`,
      },
    });
    return res.data.data;
  };
  const { data, error, isLoading } = useQuery("profile", profileHandler, {
    enabled: getuserdata?.token ? true : false,
  });
  return { data, error, isLoading };
}
/*********************************************** */
//order details

export function useOrderDetails(getuserdata) {
  const orderdetailsHandler = async () => {
    const res = await axios.post(`${API}/user/my-orders`, null, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
        Authorization: `Bearer ${getuserdata.token}`,
      },
    });
    return res.data.data;
  };
  const {
    data: orderlist,
    error: ordererror,
    isLoading: orderisLoading,
  } = useQuery("displyorderlist", orderdetailsHandler);
  return { orderlist, ordererror, orderisLoading };
}

//order details

export function useOrderDetailseachuser(getuserdata, limit = 1) {
  const orderdetailsHandlereachuser = async ({ pageParam = limit }) => {
    const res = await axios.post(
      `${API}/user/my-orders?limit=` + pageParam,
      null,
      {
        method: "POST",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
          Authorization: `Bearer ${getuserdata.token}`,
        },
      }
    );
    return res.data.data;
  };
  const {
    data: orderuser,
    error: orderusererror,
    isLoading: orderuserisLoading,
  } = useQuery("displyuserorder", orderdetailsHandlereachuser);
  return { orderuser, orderusererror, orderuserisLoading };
}

/*********************oldorderdetails**********************/
export function useOldEachOrderDetails(getuserdata, order_id) {
  const oldorderdetailsHandler = async () => {
    const formData = new FormData();
    formData.append("order_id", order_id);
    const res = await axios.post(`${API}/user/order-details`, formData, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getuserdata.token}`,
      },
    });
    // console.log(res.data.data, "response of profile");
    return res.data.data;
  };

  const {
    data: oldorderlist,
    error: oldordererror,
    isLoading: oldorderisLoading,
  } = useQuery(["oldorderdetailslist", order_id], oldorderdetailsHandler, {
    enabled: order_id ? true : false,
  });
  return { oldorderlist, oldordererror, oldorderisLoading };
}

/*********************guestorderdetails**********************/
export function useGuestOrderDetails(order_id) {
  const guestorderdetailsHandler = async () => {
    const formData = new FormData();
    formData.append("order_id", order_id);
    const res = await axios.post(`${API}/order-details-guest`, formData, {
      method: "POST",
      headers: {},
    });
    console.log(res.data.data, "response of profile");
    return res.data.data;
  };

  const {
    data: guestorderlist,
    error: guestordererror,
    isLoading: guestorderisLoading,
  } = useQuery(["guestorderdetailslist", order_id], guestorderdetailsHandler, {
    enabled: order_id ? true : false,
  });
  return { guestorderlist, guestordererror, guestorderisLoading };
}

/*********************************** */
//wishlist

export function UserWhishList(getuserdata) {
  const QueryClient = useQueryClient();
  const formData = new FormData();
  const wishListofuser = async (product_id) => {
    formData.append("product_id", product_id);
    const res = await axios.post(`${API}/user/add-wishlist`, formData, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getuserdata.token}`,
      },
    });
    return res.data.data;
  };

  const {
    mutateAsync: wishofuser,
    error: wishofusererror,
    isLoading: wishofuserisLoading,
  } = useMutation(wishListofuser, {
    onSuccess: (data) => {
      QueryClient.invalidateQueries("displywishlist");
      // if (data.statusCode === 401) {
      //   throw new Error(data.errorMessage?.password[0]);
      // }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { wishofuser, wishofusererror, wishofuserisLoading };
}

//getwishlist
export function UsergetwishList(getuserdata) {
  const getwishListHandler = async () => {
    const res = await axios.get(
      `${API}/user/get-wishlist`,

      {
        method: "GET",

        headers: {
          // "Content-type": "application/json; charset=UTF-8",
          // Accept: "application/json",
          Authorization: `Bearer ${getuserdata?.token}`,
        },
      }
    );

    // console.log(res.data.data, "response of profile");

    return res.data.data;
  };

  const { data, error, isLoading } = useQuery(
    "displywishlist",
    getwishListHandler,
    { enabled: Boolean(getuserdata?.token) }
  );
  return { data, error, isLoading };
}

//delete wishlist user

export function DeleteWhishList(getuserdata, product_id) {
  const QueryClient = useQueryClient();
  const formData = new FormData();
  formData.append("product_id", product_id);
  // console.log(product_id, "image.png");
  const deletewishListofuser = async () => {
    const res = await axios.post(`${API}/user/remove-wishlist`, formData, {
      method: "POST",

      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        // Accept: "application/json",
        Authorization: `Bearer ${getuserdata.token}`,
      },
    });

    // console.log(res.data.data, "response of profile");

    return res.data.data;
  };

  const {
    mutateAsync: deletewish,
    error: deletewisherror,
    isLoading: deletewishisLoading,
  } = useMutation(deletewishListofuser, {
    onSuccess: (data) => {
      QueryClient.invalidateQueries("displywishlist");
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { deletewish, deletewisherror, deletewishisLoading };
}

//user Address
export function UserAdress(getuserdata) {
  const QueryClient = useQueryClient();
  const formData = new FormData();

  const AddressField = async ({
    address,
    country,
    city,
    pincode,
    phone,
    company,
    type,
  }) => {
    formData.append("address", address);
    formData.append("country", country);
    formData.append("city", city);
    formData.append("pincode", pincode);
    formData.append("phone", phone);
    formData.append("company", company);
    formData.append("type", type);
    const res = await axios.post(`${API}/user/address`, formData, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${getuserdata.token}`,
      },
    });

    return res.data.data;
  };

  const {
    mutateAsync: addressofuser,
    error: addressofusererror,
    isLoading: addressofuserisLoading,
  } = useMutation(AddressField, {
    onSuccess: (data) => {
      QueryClient.invalidateQueries("addressFielduser");
      QueryClient.invalidateQueries("profile");
      // if (data.statusCode === 401) {
      //   throw new Error(data.errorMessage?.password[0]);
      // }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { addressofuser, addressofusererror, addressofuserisLoading };
}

//user personal information
export function Userpersonalinformation(getuserdata) {
  const QueryClient = useQueryClient();
  const formData = new FormData();

  const Personalinfomation = async ({
    first_name,
    last_name,
    gender,
    dob,
    email,
    trn_no,
  }) => {
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("gender", gender);
    formData.append("dob", dob);
    formData.append("email", email);
    formData.append("trn_no", trn_no);
    const res = await axios.post(`${API}/user/updatePersonal`, formData, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${getuserdata.token}`,
      },
    });

    return res.data.data;
  };

  const {
    mutateAsync: personalinfoofuser,
    error: personalinfoofusererror,
    isLoading: personalinfoofuserisLoading,
  } = useMutation(Personalinfomation, {
    onSuccess: (data) => {
      QueryClient.invalidateQueries("Personalinfomationuser");
      QueryClient.invalidateQueries("profile");
      // if (data.statusCode === 401) {
      //   throw new Error(data.errorMessage?.password[0]);
      // }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return {
    personalinfoofuser,
    personalinfoofusererror,
    personalinfoofuserisLoading,
  };
}

//user Contactus

export function UserdropDetails() {
  const formData = new FormData();

  const justdropdetails = async ({ name, email, message, phone }) => {
    formData.append("name", name);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("phone", phone);
    const res = await axios.post(`${API}/contactus`, formData, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    });

    return res.data.data;
  };

  const {
    mutateAsync: Justdropdetails,
    error: Justdropdetailsusererror,
    isLoading: JustdropdetailsuserisLoading,
  } = useMutation(justdropdetails, {
    onSuccess: (data) => {},
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return {
    Justdropdetails,
    Justdropdetailsusererror,
    JustdropdetailsuserisLoading,
  };
}
