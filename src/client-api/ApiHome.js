import axios from "axios";
import { useQuery, useInfiniteQuery, useMutation } from "react-query";
import { API } from "./APIcategory";

export const imagemain = `https://ik.imagekit.io/thmmwwbpc/banner/images/`;
// `https://admin.myfamilyfitness.com/uploads/banner/images/`;

// console.log(API,"anu api")
export function GetTopBrands() {
  const getTopBrands = async () => {
    const res = await axios.get(`${API}/brandList?limit=24`);
    return res.data.data.data;
  };
  const { data, error, isLoading } = useQuery("hometopbrand", getTopBrands);
  return { data, error, isLoading };
}

{
  /***************Topbrand pages************************ */
}
export function GetAllBrandsList(page = 1) {
  const getAllBrandsList = async ({ pageParam = page }) => {
    const res = await axios.get(`${API}/brandList?page=${pageParam}`);
    // console.log(res.data.data);
    return res.data.data;
  };

  const { data, hasNextPage, fetchNextPage, isLoading, isFetching, error } =
    useInfiniteQuery(["AllBrandsList", page], getAllBrandsList, {
      getNextPageParam: (lastPage) => {
        // console.log(lastPage, "lastpage");

        if (lastPage?.data.length > 0) {
          return lastPage?.data.length % lastPage.per_page !== 0
            ? undefined
            : lastPage.current_page + 1;
        }
        return undefined;
      },
      onSuccess: (data) => {},
    });

  return { data, hasNextPage, fetchNextPage, isLoading, isFetching, error };
}
{
  /**********************************************************************/
}

export function ListBrandsList(product, limit = 8, page = 1) {
  const inHomeParam = product === "Homebrandpage" ? "in_home=1" : "in_home=0";
  const productContext = product === "Homebrandpage" ? "limit" : "page";
  const param = product === "Homebrandpage" ? limit : page;
  const getListBrandsList = async ({ pageParam = param }) => {
    const res = await axios.get(
      `${API}/brandList?${productContext}=${pageParam}&${inHomeParam}`
    );

    return res.data.data;
  };

  const { data, hasNextPage, fetchNextPage, isLoading, isFetching, error } =
    useInfiniteQuery(
      ["ListBrandsList", product, limit, page],
      getListBrandsList,
      {
        getNextPageParam: (lastPage) => {
          if (lastPage?.data.length > 0) {
            return lastPage?.data.length % lastPage.per_page !== 0
              ? undefined
              : lastPage.current_page + 1;
          }
          return undefined;
        },
        onSuccess: (data) => {},
      }
    );

  return { data, hasNextPage, fetchNextPage, isLoading, isFetching, error };
}

{
  /********************onselling in Home page******************** */
}

export function SellingProduct() {
  const getonSellingProduct = async () => {
    const res = await axios.post(
      // `https://myfamilyfitness.com/api/v1/fetch-products?best_seller=1&limit=12`,
      `${API}/fetch-products?best_seller=1&limit=12`,
      {
        method: "POST",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    return res.data.data;
  };
  const { data, error, isLoading } = useQuery(
    "sellingproductonhome",
    getonSellingProduct
  );
  return { data, error, isLoading };
}
/******************search Product**********************************/

export function GetSearchproducthome(state, limit = 10) {
  const getSearchproducthome = async (signal) => {
    const res = await axios.post(
      `${API}/search-products?keyword=${state}&limit=` + limit,
      {
        method: "POST",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      },
      { signal }
    );
    return res.data.data;
  };
  const { data, error, isLoading } = useQuery(
    ["searchproducthome", state],
    ({ signal }) => getSearchproducthome(signal),
    { enabled: state ? true : false }
  );
  return { data, error, isLoading };
}

/******************search Product list**********************************/
export function GetSearchproducthomelist(state, limit = 24) {
  const getSearchproducthomelist = async ({ pageParam = limit }) => {
    const res = await axios.post(
      // `https://myfamilyfitness.com/api/v1/search-products?keyword=${state}&limit=`
      `${API}/search-products?keyword=${state}&limit=` + pageParam,
      {
        method: "POST",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );
    return res.data.data;
  };

  const { data, hasNextPage, fetchNextPage, isLoading, isFetching } =
    useInfiniteQuery(
      ["searchproducthomelist", state],
      getSearchproducthomelist,
      {
        getNextPageParam: (lastPage) => {
          // console.log(lastPage, "lastpage eeeeee");
          // console.log("lastpage get nextpage");
          if (lastPage && lastPage.length > 0) {
            return lastPage.length % limit !== 0
              ? undefined
              : lastPage.length + limit;
          }
          return undefined;
        },
        onSuccess: (data) => {},
      }
    );
  return { data, hasNextPage, fetchNextPage, isLoading, isFetching };
}

//fetaturedproduct home product treanding

export function OtherProductList(value = 0, product, limit = 10) {
  const productContext = product === "trending" ? "&trending=1" : "&featured=1";
  const getOtherProductList = async (signal) => {
    if (value !== 0) {
      const categoryQuery = Array.isArray(value)
        ? // ? `child_category_id=${(JSON.stringify(value))}`

          value.map((id) => `child_category_id[]=${id}`).join("&")
        : `child_category_id=${value}`;

      const res = await axios.post(
        // `${API}/search-products?child_category_id=${value}${productContext}&limit=` +
        `${API}/search-products?${categoryQuery}${productContext}&limit=` +
          limit,
        {
          method: "POST",

          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        },
        { signal }
      );
      return res.data.data;
    }
  };
  const { data, error, isLoading } = useQuery(
    ["otherProductList", value, product],
    ({ signal }) => getOtherProductList(signal),
    // getOtherProductList,
    { enabled: value ? true : false }
  );
  return { data, error, isLoading };
}
{
  /***********************************************************************************/
}
//FetchCustom_feature
export function CustomCategory(product) {
  const customCategoryContext =
    // product === "trending" ? { trending: 1 } : { featured: 1 };

    product === "trending" ? { trending: 1 } : 
    product === "featured" ? { featured: 1 } : 
    product === "best_seller" ? { best_seller: 1 } : {};
  const getCustomCategory = async () => {
    const res = await axios.post(
      `${API}/fetch-customCat`,
      customCategoryContext,
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
    data: dataCustomCategory,
    error: errorCustomCategory,
    isLoading: isLoadingCustomCategory,
  } = useQuery(["customCategory", product], getCustomCategory);
  return { dataCustomCategory, errorCustomCategory, isLoadingCustomCategory };
}

//footer
export function GetFooterlink() {
  const getFooterlink = async () => {
    const res = await axios.get(`${API}/Pages`);
    return res.data.data;
  };
  const { data, error, isLoading } = useQuery("footerlink", getFooterlink);
  return { data, error, isLoading };
}
//blog
export function GetBlog(limit = 20) {
  const getblog = async ({ pageParam = limit }) => {
    const res = await axios.get(`${API}/blogList?limit=` + pageParam);

    return res.data.data;
  };

  const { data, hasNextPage, fetchNextPage, isLoading, isFetching } =
    useInfiniteQuery("blog", getblog, {
      getNextPageParam: (lastPage) => {
        if (lastPage?.blogs.length > 0) {
          return lastPage?.blogs.length % limit !== 0
            ? undefined
            : lastPage?.blogs.length + limit;
        }
        return undefined;
      },
      onSuccess: (data) => {},
    });
  return { data, hasNextPage, fetchNextPage, isLoading, isFetching };
}

//Blog details

export function BlogDetails(slug) {
  const getBlogDetails = async () => {
    const res = await axios.post(`${API}/viewBlog-details?slug=${slug}`, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return res.data.data;
  };

  const { data, error, isLoading } = useQuery(
    ["blogDetails", slug],
    getBlogDetails,
    { enabled: slug ? true : false }
  );
  return { data, error, isLoading };
}

//privacy policy

export function GetPrivacypolicy(slug) {
  const getprivacypolicy = async () => {
    const res = await axios.post(`${API}/singlePages?slug=${slug}`, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    return res.data.data;
  };

  const { data, error, isLoading } = useQuery(
    ["privacypolicy", slug],
    getprivacypolicy,
    { enabled: slug ? true : false }
  );
  return { data, error, isLoading };
}

//Meta social-home
export const Seo_snipet = (type) => {
  const Snipet = async () => {
    const res = await axios.get(`${API}/seo-snipet?type=${type}`);
    return res.data.data;
  };

  const {
    data: snipet,
    error: snipet_homeerror,
    isLoading: snipet_homeerrorisloding,
  } = useQuery(`Snipet-${type}`, Snipet);

  return { snipet, snipet_homeerror, snipet_homeerrorisloding };
};

// BadmintonJerseyOrderForm
export function useBadmintonJerseyOrderForm() {
  const BadmintonJerseyOrderForm = async (formData) => {
    const res = await axios.post(`${API}/BadmintonJerseyOrderForm`, formData, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    // console.log(res, "response of profile");
    return res.data.data;
  };

  const {
    mutateAsync: JerseyOrderForm,
    isLoading: isJerseyOrderFormLodaing,
    error: isJerseyOrderFormerror,
  } = useMutation(BadmintonJerseyOrderForm, {
    onSuccess: (data) => {},
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { JerseyOrderForm, isJerseyOrderFormLodaing, isJerseyOrderFormerror };
}

//
export function Getjerseyseccrete(
  amount,
  firstname,
  lastname,
  email,
  phone,
  selectedLocation
) {
  const formData = new FormData();
  formData.append("description", email);

  formData.append("shipping[name]", firstname);

  formData.append("shipping[address][line1]", lastname);

  formData.append("shipping[address][postal_code]", email);

  formData.append(
    "shipping[address][city]",

    phone
  );
  formData.append(
    "shipping[address][state]",

    selectedLocation
  );
  formData.append("shipping[address][country]", "US");
  const getjerseyseccrete = async () => {
    const res = await axios.post(
      `${API}/send-seccrete?amount=${amount}`,
      //  `${API}/send-test-seccrete?amount=${amount}`,
      formData,
      {
        method: "POST",
      }
    );

    return res.data;
  };

  return { getjerseyseccrete };
}

//vaha

export function useVahaForm() {
  const VahaForm = async (formData) => {
    const res = await axios.post(`${API}/vaha-form`, formData, {
      method: "POST",

      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    // console.log(res, "response of profile");
    return res.data.data;
  };

  const {
    mutateAsync: vahaforms,
    isLoading: isVahaFormLodaing,
    error: isVahaFormrror,
  } = useMutation(VahaForm, {
    onSuccess: (data) => {},
    onError: (error) => {
      throw new Error(error.message);
    },
  });
  return { vahaforms, isVahaFormLodaing, isVahaFormrror };
}
