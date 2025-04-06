import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { API } from "./APIcategory";
import { useState } from "react";
import { Toastsucess } from "../Componet/ReusableComponet/toast/Toast";

const user = localStorage.getItem("user");

export function useCOD(getuserdata) {
  const CODHandler = async (formData) => {
    const res = await axios.post(`${API}/user/order-now`, formData, {
      method: "POST",

      headers: {
        Authorization: `Bearer ${getuserdata.token}`,
      },
    });

    return res.data.data;
  };

  const {
    mutateAsync: orderwithcod,
    isLoading: isorderLodaing,
    error: isordererror,
  } = useMutation(CODHandler, {
    onSuccess: (data) => {},
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { orderwithcod, isorderLodaing, isordererror };
}

/***********************************orderapi with guest************************************* */

export function useCODGuest() {
  const CODHandlerGust = async (formData) => {
    const res = await axios.post(`${API}/order-guest`, formData, {
      method: "POST",
      headers: {},
    });

    return res.data;
  };
  const {
    mutateAsync: orderwithcodguest,
    isLoading: isorderLodainggust,
    error: isordererrorgust,
  } = useMutation(CODHandlerGust, {
    onSuccess: (data) => {
      // console.log(data, "reponse data");
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { orderwithcodguest, isorderLodainggust, isordererrorgust };
}

export function GetsendSecrete(amount) {
  const getsendSecrete = async (formData) => {
    const res = await axios.post(
      `${API}/send-seccrete?amount=${amount}`,
      // `${API}/send-test-seccrete?amount=${amount}`,
      formData,
      {
        method: "POST",
      }
    );

    return res.data;
  };

  return { getsendSecrete };
}

//Coupon Code
export function useCouponcode(getuserdata) {
  const CouponcodeHandler = async (formData) => {
    const res = await axios.post(`${API}/user/checkCouponCode`, formData, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getuserdata.token}`,
      },
    });
    // console.log(res, "response of profile");
    return res.data;
  };

  const {
    mutateAsync: couponcode,
    isLoading: isCouponcodeLodaing,
    error: isCouponcodeerror,
  } = useMutation(CouponcodeHandler, {
    onSuccess: (data) => {
      if (data.statusCode === 401) {
        throw new Error(data.message);
      }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { couponcode, isCouponcodeLodaing, isCouponcodeerror };
}

/*******************guest Coupon Code*****************/
export function useGuestCouponcode() {
  const CouponcodeGuestHandler = async (formData) => {
    const res = await axios.post(`${API}/checkCouponCode-guest`, formData, {
      method: "POST",
      headers: {
        // Authorization: `Bearer ${getuserdata.token}`,
      },
    });
    // console.log(res, "response of profile");
    return res.data;
  };

  const {
    mutateAsync: couponguestcode,
    isLoading: isCouponcodeGuestLodaing,
    error: isCouponcodeGuesterror,
  } = useMutation(CouponcodeGuestHandler, {
    onSuccess: (data) => {
      if (data.statusCode === 401) {
        throw new Error(data.message);
      }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { couponguestcode, isCouponcodeGuestLodaing, isCouponcodeGuesterror };
}
/********************fetching data********************* */
export function Getfetchsettings() {
  const getFetchsettings = async () => {
    const res = await axios.get(
      // `https://admin.myfamilyfitness.com/api/v1/fetch-settings`
      `${API}/fetch-settings`
    );
    return res.data.data;
  };
  const { data, error, isLoading } = useQuery(
    "fetch-settigs",
    getFetchsettings
  );
  return { data, error, isLoading };
}

//call charge api throught server Tappayment

export function useTabPayment() {
  // const formData = new FormData();
  // const token = localStorage.getItem("paymentToken");

  // formData.append("tap_body", JSON.stringify(tapBody));
  const TabPayment = async (formData) => {
    try {
      const res = await axios.post(
        `
        https://admin.myfamilyfitness.com/api/v1/tab-charge`,
        formData
      );

      if (res.data.status === false) {
        const errorMessage = res.data.data.errors[0].description;
        // alert(errorMessage);
        Toastsucess(errorMessage);
        throw new Error(errorMessage);
      }

      return res.data.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const {
    mutateAsync: Tapcharge,
    isLoading: isTapchargeLoading,
    error: isTapchargeError,
  } = useMutation(TabPayment);

  return { Tapcharge, isTapchargeLoading, isTapchargeError };
}

export const useRetrieveACharge = (charge_id) => {
  const retrieveCharge = async () => {
    try {
      const res = await axios.post(
        `https://admin.myfamilyfitness.com/api/v1/tab-charge-get`,
        { charge_id }
      );
      return res.data.data;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const {
    mutateAsync: retrieveChargeMutate,
    data,
    isLoading,
    isError,
  } = useMutation(retrieveCharge);

  return { data, isLoading, isError, retrieveCharge: retrieveChargeMutate };
};
