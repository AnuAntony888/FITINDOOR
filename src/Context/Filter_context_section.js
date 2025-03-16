import { createContext, useContext, useReducer, useEffect } from "react";

import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

export function sortofdata(sorting_value, sortdatassss) {
  const sortingProducts = (a, b) => {
    if (sorting_value === "Sorting option") {
      return sortdatassss;
    }
    if (sorting_value === "lowest") {
      return a.product.unit_price - b.product.unit_price;
    }

    if (sorting_value === "highest") {
      return b.product.unit_price - a.product.unit_price;
    }

    if (sorting_value === "a-z") {
      return a.product.name.localeCompare(b.product.name);
    }

    if (sorting_value === "z-a") {
      return b.product.name.localeCompare(a.product.name);
    }
  };
  return sortdatassss?.sort(sortingProducts);
}

export const FilterContextProvider = ({ children }) => {
  const initialState = {
    filter_products: [],
    all_products: [],
    sorting_value: "none",
    checkboxFilters: { category: [], brand_id: [], unit_price: 0 },
    filtered_value: { subCat: [], brand_id: [], maxPrice: 10000, minPrice: 0 },
    filters: {
      category: "all",
      subcat: "all",
      brand_id: "all",
      maxPrice: 0,
      minPrice: 0,
      unit_price: 0,
    },
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  // to set the grid view
  const setGridView = () => {
    return dispatch({ type: "SET_GRID_VIEW" });
  };

  // sorting function
  const sorting = (event) => {
    let userValue = event.target.value;
    dispatch({ type: "GET_SORT_VALUE", payload: userValue });
  };

  // update the filter values
  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    let checked = event.target.checked;
    console.log(name, "filterchecked");
    console.log(value, "filterchecked");
    console.log(checked, "filterchecked");
    dispatch({
      type: "UPDATE_CHECKBOX_FILTERS",
      payload: { name, value, checked },
    });
  };

  // to clear the filter
  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
  };

  return (
    <FilterContext.Provider
      value={{ ...state, sorting, dispatch, updateFilterValue, clearFilters }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
