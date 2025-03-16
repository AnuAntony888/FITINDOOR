const filterReducer = (state, action) => {
  switch (action.type) {
    case "LOAD_FILTER_PRODUCTS":
      //console.log(state,"hai hello how are you");
      console.log(action?.payload, state, "plese dghfeyu");
      return {
        ...state,
        filter_products: action.payload ? [...action.payload] : [],
        all_products: action.payload ? [...action.payload] : [],
      };
    case "GET_SORT_VALUE":
      return {
        ...state,
        sorting_value: action.payload,
        //sorting_value: sort_value,
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        checkboxFilters: { category: [], brand_id: [], unit_price: 0 },
        filtered_value: { subCat: [], brand_id: [], maxPrice: 100000, minPrice: 0 },
        //sorting_value: sort_value,
      };
    case "SET_FILTERED_VALUE":
      return {
        ...state,
        filtered_value: {
          subCat: action.payload.subCat,
          brand_id: action.payload.brand_id,
          maxPrice: action.payload.maxPrice,
        },
        //sorting_value: sort_value,
      };

    case "SORTING_PRODUCTS":
      let newSortData;
      // let tempSortProduct = [...action.payload];

      const { filter_products, sorting_value } = state;
      let tempSortProduct = [...filter_products];

      const sortingProducts = (a, b) => {
        if (sorting_value === "lowest") {
          return a.unit_price - b.unit_price;
        }

        if (sorting_value === "highest") {
          return b.unit_pricee - a.unit_price;
        }

        if (sorting_value === "a-z") {
          return a?.name?.localeCompare(b?.name);
        }

        if (sorting_value === "z-a") {
          return b?.name?.localeCompare(a?.name);
        }
      };

      newSortData = tempSortProduct.sort(sortingProducts);

      return {
        ...state,
        filter_products: newSortData,
      };

    case "FILTER_PRODUCTS":
      let { all_products } = state;
      let tempFilterProduct = [...all_products];

      const { category, brand_id, unit_price } = state.filters;

      console.log(state, "allproductsvvvbnn");
      // if (category !== "all") {
      //   tempFilterProduct = tempFilterProduct.filter(
      //     (curElem) =>
      //       curElem?.product?.category.toLowercase() === category.toLowerCase()
      //   );
      // }

      if (category !== "all") {
        tempFilterProduct = tempFilterProduct.filter((curElem) => {
          return curElem?.product?.category === category;
        });
      }

      if (brand_id !== "all") {
        tempFilterProduct = tempFilterProduct.filter(
          (curElem) => curElem?.product?.brand_id === brand_id
        );
      }

      // if (unit_price === 0) {
      //   tempFilterProduct = tempFilterProduct.filter(
      //     (curElem) => curElem?.product?.unit_price === unit_price
      //   );
      // } else {
      //   tempFilterProduct = tempFilterProduct.filter(
      //     (curElem) => curElem?.product?.unit_price <= unit_price
      //   );
      // }

      console.log(tempFilterProduct, "console tempfilterdproduct");
      return {
        ...state,
        filter_products: tempFilterProduct,
      };

    case "UPDATE_FILTERS_VALUE":
      const { name, value } = action.payload;

      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
    case "UPDATE_CHECKBOX_FILTERS":
      let categoryFilterData = [...state.checkboxFilters.category];
      let brand_idFilterData = [...state.checkboxFilters.brand_id];
      let priceFilterData = state.checkboxFilters.unit_price;
      if (action.payload.checked) {
        //ceck ceytae brand id annekile
        if (action.payload.name === "brand_id") {
          //select brand id pus ceytu idukka
          brand_idFilterData.push(+action.payload.value);
        } else if (action.payload.name === "unit_price") {
          priceFilterData.push(+action.payload.value);
        } else if (action.payload.name === "category") {
          categoryFilterData.push(+action.payload.value);
        }
      } else {
        if (action.payload.name === "brand_id") {
          brand_idFilterData = brand_idFilterData.filter(
            (data) => data !== +action.payload.value
          );
        } else if (action.payload.name === "unit_price") {
          priceFilterData = +action.payload.value;
          return {
            ...state,
            checkboxFilters: {
              ...state.checkboxFilters,
              unit_price: priceFilterData,
            },
          };
        } else if (action.payload.name === "category") {
          categoryFilterData = categoryFilterData.filter(
            (data) => data !== +action.payload.value
          );
        }
      }
      return {
        ...state,
        checkboxFilters: {
          category: categoryFilterData,
          brand_id: brand_idFilterData,
          unit_price: priceFilterData,
        },
      };

    default:
      return state;
  }
};

export default filterReducer;
