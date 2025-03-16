import axios from "axios";
import { API } from "./APIcategory";
import { useQuery } from "react-query";
//home_section1
export function ProductBanner1() {
  const ProductBanner1 = async () => {
    const res = await axios.post(
      
      `${API}/fetch-products?best_seller=1&limit=3`,
      {
        method: "POST",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
      );
      // console.log(res?.data?.data)
    return res?.data?.data;
  };
  const { data, error, isLoading } = useQuery(
    "ProductBanner1",
    ProductBanner1
  );
  return { data, error, isLoading };
}


//best seller
export function BestSellingProduct() {
    const BestSellingProduct = async () => {
      const res = await axios.post(
        
        `${API}/fetch-products?best_seller&limit=4`,
        {
          method: "POST",
  
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
        );
        // console.log(res?.data?.data)
      return res?.data?.data;
    };
    const { data, error, isLoading } = useQuery(
      "bestselling",
      BestSellingProduct
    );
    return { data, error, isLoading };
}
  




//Hotdeal
export function HotdealProduct() {
  const HotdealProduct1 = async () => {
    const res = await axios.post(
      
      `${API}/fetch-products?hot_deal&limit=3`,
      {
        method: "POST",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
      );
      // console.log(res?.data?.data)
    return res?.data?.data;
  };
  const { data, error, isLoading } = useQuery(
    "HotdealProduct1",
    HotdealProduct1
  );
  return { data, error, isLoading };
}


//testimonal
export function Testmonial() {
  const Testmonialdata= async () => {
    const res = await axios.get(`${API}/fetch-testimonials`);

    return res.data.data;
  };
  const { data, error, isLoading } = useQuery("testimonaial", Testmonialdata);
  return { data, error, isLoading };
}