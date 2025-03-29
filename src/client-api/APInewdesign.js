import axios from "axios";
import { API } from "./APIcategory";
import { useMutation, useQuery } from "react-query";
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



//testimonal
export function Section3() {
  const section3= async () => {
    const res = await axios.post(`${API}/fetch-home-section?section_type=3`);
// console.log(res,"res")
    return res.data.data;
  };
  const { data, error, isLoading } = useQuery("section3", section3);
  return { data, error, isLoading };
}




//sectin 1






export function Section1() {
  const formData = new FormData();
  formData.append("section_type[]", 1); // Corrected key

  const getSection1 = async () => {
    const res = await axios.post(`${API}/fetch-home-section`, formData, {
      method: "POST",
    });
    console.log(res.data.data,"section1");
    return res.data.data;
  };

  const {
    data: section1,
    error: issection1,
    isLoading: issection1Error ,
  } = useQuery(["getSection1"], getSection1 );
  return { section1,issection1,issection1Error};

 
}


export function Section2() {
  const formData = new FormData();
  formData.append("section_type[]", 2);
  formData.append("section_type[]", 3);
  const getSection2 = async () => {
    const res = await axios.post(`${API}/fetch-home-section`, formData, {
      method: "POST",
    });
    console.log(res.data?.data,"section1");
    return res.data?.data;
  };

  const {
    data: section2,
    error: issection2,
    isLoading: issection2Error ,
  } = useQuery(["getSection2"], getSection2 );
  return { section2,issection2,issection2Error};

 
}
