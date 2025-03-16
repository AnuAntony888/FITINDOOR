import { useLocation } from "react-router-dom";
import { GetUrlCat } from "../client-api/ApiProducts";

export function useSlug(){
    const location = useLocation();
    const newURL = location.pathname;
    console.log(newURL);
    const splitURL = newURL.toString().split("/");
    console.log(splitURL[2], " const");
  
    console.log(location.pathname, "location.state");
    const { urlCat, errorurl, urlCatLoading } = GetUrlCat(splitURL[2]);
    console.log(urlCat, "location.state");
    return {urlCat};
}
