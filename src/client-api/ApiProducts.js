import axios from "axios";
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "./APIcategory";
// my 2nd api call for single product
//  const API = "https://admin.myfamilyfitness.com/api/v1";

export function GetSingleProduct(product_slug, store_id) {
  const navigate = useNavigate();
  const getSingleProduct = async () => {
    const res = await axios.get(
      `${API}/fetch-single-products?product_slug=${product_slug}&store_id=${store_id}`
    );
    if (res?.data?.data === undefined || res?.data?.data === null) {
      // Redirect to the home page when there is no data
      navigate('/');

     
    }
    // console.log(res.data.data, "res of single product");
    return res.data.data;
  };
  const { data, error, isLoading } = useQuery(
    ["singleproducts", product_slug, store_id],
    getSingleProduct,
    {
      enabled: product_slug && store_id ? true : false,
      onSuccess: (data) => {
        // console.log(data, "dtatttt");
        //dtatttt
      },
    }
  );
  return { data, error, isLoading };
}

//Related product
export function GetRelatedProduct(product_id, store_id, page = 1) {
  const formData = new FormData();
  if (product_id) {
    formData.append("product_id", product_id);
  }
  if (store_id) {
    formData.append("store_id", store_id);
  }

  const getRelatedProduct = async ({ pageParam = page }) => {
    const res = await axios.post(
      `${API}/fetch-products?page=${pageParam}`,
      formData
    );
    // console.log(res, "res.data");
    return res.data.data;
  };
  const { data, error, isLoading } = useQuery(
    ["relatedproducts", product_id && store_id],
    getRelatedProduct,
    { enabled: product_id && store_id ? true : false }
  );
  return { data, error, isLoading };
}

//offerproducts

export function GetOfferProduct(page = 1, category_id) {
  const getOfferProduct = async ({ pageParam = page }) => {
    const res = await axios.get(
      `${API}/offerList?page=${pageParam}&category_id=${category_id}`
    );
    // console.log(res.data.data, "data");
    return res.data;
  };

  const { data, hasNextPage, fetchNextPage, isLoading, isFetching, error } =
    useInfiniteQuery(["OfferProduct", page, category_id], getOfferProduct, {
      getNextPageParam: (lastPage) => {
        // console.log(lastPage, "lastpage");

        if (lastPage?.data?.products?.length > 0) {
          return lastPage?.data?.products.length % lastPage?.meta?.per_page !==
            0
            ? undefined
            : lastPage.meta?.current_page + 1;
        }
        return undefined;
      },
      onSuccess: (data) => {},
    });

  return { data, hasNextPage, fetchNextPage, isLoading, isFetching, error };
}

//GetBrandListProduct

export function GetBrandListProduct(brand_id, limit = 24) {
  const getBrandListProduct = async ({ pageParam = limit }) => {
    const res = await axios.post(
      `${API}/fetch-products?brand_id=${brand_id}&limit=` + pageParam,
      {
        method: "POST",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    return res.data;
  };

  const { data, hasNextPage, fetchNextPage, isLoading, isFetching, error } =
    useInfiniteQuery(["BrandListProduct", brand_id], getBrandListProduct, {
      getNextPageParam: (lastPage) => {
        // console.log(lastPage?.data?.products?.length % limit, "lastpage");
        // console.log(lastPage, "lastpage");
        if (lastPage?.data?.products?.length > 0) {
          return lastPage?.data?.products?.length % limit !== 0
            ? undefined
            : lastPage?.data?.products?.length + limit;
        }
        return undefined;
      },
      onSuccess: (data) => {},
    });

  return { data, hasNextPage, fetchNextPage, isLoading, isFetching };
}
//pageparm from usequery

//api left side filter

export function GetfetchfilterCat(Type, id) {
  const formData = new FormData();
  if (Type === 3) {
    formData.append("child_cat_id", id);
  }
  if (Type === 2) {
    formData.append("sub_cat_id", id);
  }
  if (Type === 1) {
    formData.append("cat_id", id);
  }
  const getfetchfilterCat = async () => {
    const res = await axios.post(`${API}/fetch-filterCat`, formData, {
      method: "POST",
    });
    // console.log(res, "amount for stripe");
    return res.data;
  };
  const {
    data: fetchfilterCat,
    error: errorMessage,
    isLoading: fetchfilterCatLoading,
  } = useQuery(["getfetchfilterCat", id, Type], getfetchfilterCat, {
    enabled: id && Type ? true : false,
  });
  return { fetchfilterCat, errorMessage, fetchfilterCatLoading };
}
/*********************categorie wise product**********************/
//categorie wise product

export function GetProductByCategories(
  limit = 26,
  Type,
  id,

  checkboxFilters,
  price,
  sorting_value,
  offer
) {
  const formData = new FormData();

  if (Type === 3) {
    formData.append(" child_category_id", id);
  }
  if (Type === 2) {
    formData.append("sub_category_id", id);
  }
  if (Type === 1) {
    formData.append("category_id", id);
  }

  if (checkboxFilters?.category?.length > 0) {
    for (let i = 0; i < checkboxFilters.category.length; i++) {
      if (Type === 2) {
        formData.append("search_childcat[]", checkboxFilters.category[i]);
      } else {
        formData.append("search_subcat[]", checkboxFilters.category[i]);
      }
    }
  }
  if (checkboxFilters?.brand_id?.length > 0) {
    for (let i = 0; i < checkboxFilters.brand_id.length; i++) {
      formData.append("search_brand[]", checkboxFilters.brand_id[i]);
    }
  }
  if (price > 0) {
    formData.append("search_price", price);
  }
  if (sorting_value !== "none") {
    switch (sorting_value) {
      case "price-low":
        formData.append("priceOrder", "asc");
        break;
      case "price-high":
        formData.append("priceOrder", "desc");
        break;
      case "name-asc":
        formData.append("nameOrder", "asc");
        break;
      case "name-desc":
        formData.append("nameOrder", "desc");
        break;

      default:
        break;
    }
  }
  if (offer) {
    formData.append("offer", 1);
  }
  const getProductByCategories = async ({ pageParam = limit }) => {
    const res = await axios.post(
      `${API}/search-products?limit=` + pageParam,
      formData,
      {
        method: "POST",
      }
    );
    return res.data;
  };

  const { data, hasNextPage, fetchNextPage, isLoading, isFetching, error } =
    useInfiniteQuery(
      [
        "ProductByCategories",
        Type,
        id,
        checkboxFilters.category,
        checkboxFilters.brand_id,
        price,
        sorting_value,
        offer,
      ],
      getProductByCategories,
      {
        enabled: id && Type ? true : false,
        //       }
        // ,
        //       {
        getNextPageParam: (lastPage) => {
          // console.log(lastPage?.data?.length % limit, "lastpage eeeeee");
          // console.log("lastpage get nextpage");
          if (lastPage?.data && lastPage?.data?.length > 0) {
            return lastPage?.data?.length % limit !== 0
              ? undefined
              : lastPage?.data?.length + limit;
          }
          return undefined;
        },
        onSuccess: (data) => {},
      }
    );
  // console.log(hasNextPage, "image.png");
  return { data, hasNextPage, fetchNextPage, isLoading, isFetching };
}

/*********************url fetch category**********************/

//url fetch category
export function GetUrlCat(slug) {
  const navigate = useNavigate();
  const formData = new FormData();

  if (slug) {
    formData.append("slug", slug);
  }
  const geturlCat = async () => {
    const res = await axios.post(`${API}/fetch-singleCat`, formData, {
      method: "POST",
    });
        if (res?.data?.data?.category === undefined || res?.data?.data?.category === null) {
      // Redirect to the home page when there is no data
      navigate('/');
    
    }
    // console.log(res, "amount for stripe");
    return res.data;
  };
  const {
    data: urlCat,
    error: errorurl,
    isLoading: urlCatLoading,
  } = useQuery(["geturlCat", slug], geturlCat, {
    enabled: slug ? true : false,
  });
  return { urlCat, errorurl, urlCatLoading };
}

//offerfilter
//api left side filter

export function GetofferCat(cat_id) {
  const formData = new FormData();

  if (cat_id) {
    formData.append("cat_id", cat_id);
  }
  const getofferfilterCat = async () => {
    const res = await axios.post(`${API}/fetch-filterCat`, formData, {
      method: "POST",
    });
    // console.log(res, "amount for stripe");
    return res.data;
  };
  const {
    data: fetchfilterCat,
    error: errorMessage,
    isLoading: fetchfilterCatLoading,
  } = useQuery(["getGetofferCat", cat_id], getofferfilterCat, {
    enabled: cat_id ? true : false,
  });
  return { fetchfilterCat, errorMessage, fetchfilterCatLoading };
}

//outofstock

export function GetoutOfstock() {
  const OutOfstock = async (formData) => {
    const res = await axios.post(`${API}/outOfstock`, formData, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Accept: "application/json",
      },
    });

    return res.data;
  };

  const {
    mutateAsync: outOfstock,
    isLoading: isoutOfstockLodaing,
    error: isoutOfstockerror,
  } = useMutation(OutOfstock, {
    onSuccess: (data) => {},
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { outOfstock, isoutOfstockLodaing, isoutOfstockerror };
}

//abandonCarts
export function useAbandonCarts(getuserdata) {
  const AbandonCarts = async (formData) => {
    const res = await axios.post(`${API}/user/abandonCarts`, formData, {
      method: "POST",

      headers: {
        // "Content-type": "application/json; charset=UTF-8",
        // Accept: "application/json",
        Authorization: `Bearer ${getuserdata.token}`,
      },
    });
    // console.log(res, "response of profile");
    return res.data.data;
  };

  const {
    mutateAsync: abandonCarts,
    isLoading: isabandonCartsLodaing,
    error: isabandonCartserror,
  } = useMutation(AbandonCarts, {
    onSuccess: (data) => {},
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { abandonCarts, isabandonCartsLodaing, isabandonCartserror };
}

//productenquiry

export function ProductEnquiry() {
  const QueryClient = useQueryClient();
  const formData = new FormData();

  const productenquiryform = async ({
    name,
    email,
    phone,
    message,
    productname,
    type
  }) => {
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);
    formData.append("productname", productname);
    formData.append("type", type);

    const res = await axios.post(
      `${API}/productenquiry
    `,
      formData,
      {
        method: "POST",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
      }
    );

    return res.data.data;
  };

  const {
    mutateAsync: enquiryform,
    error: enquiryformerror,
    isLoading: enquiryformisLoading,
  } = useMutation(productenquiryform, {
    onSuccess: (data) => {},
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { enquiryform, enquiryformerror, enquiryformisLoading };
}

//Request Price Match

export function RequestPriceMatch() {
  const QueryClient = useQueryClient();
  const formData = new FormData();

  const productPriceMatchform = async ({
    name,
    email,
    phone,
    message,
    productname,
    type,
    product_url,
  }) => {
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("message", message);
    formData.append("productname", productname);
    formData.append("type", type);
    formData.append("product_url", product_url);
    const res = await axios.post(
      `${API}/productPriceMatch

    `,
      formData,
      {
        method: "POST",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
      }
    );

    return res.data.data;
  };

  const {
    mutateAsync: productPriceMatch,
    error: productPriceMatcherror,
    isLoading: productPriceMatchisLoading,
  } = useMutation(productPriceMatchform, {
    onSuccess: (data) => {},
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return {
    productPriceMatch,
    productPriceMatcherror,
    productPriceMatchisLoading,
  };
}

//priceDropAlert

export function PriceDropAlert(getuserdata) {
  const formData = new FormData();
  const priceDropAlertform = async ({ user_id,token, sku }) => {
    formData.append("user_id", user_id);
    formData.append("sku", sku);
    const res = await axios.post(`${API}/user/priceDropAlert`, formData, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getuserdata?.token||token}`,
      },
    });
    console.log(res.data, "response of profile");
    return res.data.data;
  };
  const {
    mutateAsync: dropAlert,
    error: dropAlerterror,
    isLoading: dropAlertisLoading,
  } = useMutation(priceDropAlertform, {
    onSuccess: (data) => {
      // Handle successful response here if needed.
    },
    onError: (error) => {
      // You don't need to throw an error here. The error will be available in dropAlerterror.
      console.error(error);
    },
  });

  return { dropAlert, dropAlerterror, dropAlertisLoading };
}
