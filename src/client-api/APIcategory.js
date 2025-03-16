import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";

export const API = "https://admin.myfamilyfitness.com/api/v1";
  // export const API = "https://admin.mydemostore.site/api/v1";
//GetSubcategories
export function GetSubcategories() {
  const getSubcategories = async () => {
    const res = await axios.post(
      `${API}/get-subcategories`,

      {
        method: "POST",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    return res.data.data;
  };
  const {
    data: datasubcategory,
    error: errorsubcategory,
    isLoading: isLoadingsubcategory,
  } = useQuery("subcategories", getSubcategories);
  return { datasubcategory, errorsubcategory, isLoadingsubcategory };
}


// export const abc=async()=>{ try {
//   const res = await axios.post(
//     `${API}/get-subcategories`,

//     {
//       method: "POST",

//       headers: {
//         "Content-type": "application/json; charset=UTF-8",
//       },
//     }
//   );
//   return res.data.data;
// }
// catch (error) {
//   throw new Error("error");
// }}
// export async function abc ()  {

//     try {
//       const res = await axios.post(
//         `${API}/get-subcategories`,

//         {
//           method: "POST",

//           headers: {
//             "Content-type": "application/json; charset=UTF-8",
//           },
//         }
//       );
//       return res.data.data;
//     }
//     catch (error) {
//       throw new Error("error");
//     }
//   }










export function ShopBycategories(params = { in_home: 1 }) {
  const getShopBycategories = async () => {
    const res = await axios.post(`${API}/fetch-customCat`, params, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return res.data.data;
  };
  const { data, error, isLoading } = useQuery(
    "ShopBycategories",
    getShopBycategories
  );
  return { data, error, isLoading };
}

export function ShowHomeShopBycategories(params = { show_incat: 1 }) {
  const getShowHomeShopBycategories = async () => {
    const res = await axios.post(`${API}/fetch-customCat`, params, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return res.data.data;
  };
  const { data, error, isLoading } = useQuery(
    "ShowHomeShopBycategories",
    getShowHomeShopBycategories
  );
  return { data, error, isLoading };
}
