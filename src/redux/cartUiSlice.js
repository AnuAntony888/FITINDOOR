import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart_items: localStorage.getItem("cart_items")
    ? JSON.parse(localStorage.getItem("cart_items"))
    : [],
  product_item: 1,
  cartTotalAmount: 0,
};

const cartUiSlice = createSlice({
  name: "cartUi",
  initialState: initialState,

  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload, "action pay cart items");
      const itemInCart = state.cart_items.some(
        (item) =>
          item?.product?.product_id === action.payload[0].product?.product_id
      );

      if (itemInCart) {
        const item = state.cart_items.find(
          (item) =>
            item?.product?.product_id === action.payload[0].product?.product_id
        );
        if (state.product_item) {
          item.cartCount = item.cartCount + state.product_item;
          return;
        }
        if (item?.product?.quantity_label === item.cartCount) {
          return;
        }
        item.cartCount++;
      } else {
        state.cart_items.push({
          ...action.payload[0],
          cartCount: state.product_item,
        });
      }

      localStorage.setItem("cart_items", JSON.stringify(state.cart_items));
    },

    increaseCart: (state, action) => {
      const item = state.cart_items.find(
        (item) =>
          item?.product?.product_id === action.payload.product?.product_id
      );
      if (item?.product?.quantity_label === item.cartCount) {
        return;
      }
      //console.log(item.cartCount, "itemm");
      //console.log(item?.product?.quantity_label, "itemm");
      item.cartCount++;
      localStorage.setItem("cart_items", JSON.stringify(state.cart_items));
    },

    decreaseCart: (state, action) => {
      const item = state.cart_items.find(
        (item) =>
          item?.product?.product_id === action.payload.product?.product_id
      );

      if (item.cartCount > 1) {
        item.cartCount--;
      } else if (item.cartCount === 1) {
        const removeCart = state.cart_items.filter(
          (item) =>
            item?.product?.product_id !== action.payload.product?.product_id
        );
        state.cart_items = removeCart;
        localStorage.setItem("cart_items", JSON.stringify(state.cart_items));
      }
    },

    increaseProduct: (state, action) => {
      state.product_item++;
    },

    removeProductFromCart: (state, action) => {
      console.log(action.payload, "removeProductFRomCART");
      const removeCart = state.cart_items.filter(
        (item) =>
          item?.product?.product_id !== action.payload.product?.product_id
      );
      state.cart_items = removeCart;
      localStorage.setItem("cart_items", JSON.stringify(state.cart_items));
    },

    decreaseProduct: (state, action) => {
      if (state.product_item >= 1) {
        state.product_item--;
      }
    },
    resetProduct: (state, action) => {
      state.product_item = 1;
    },

    calculateCartTotal: (state, action) => {
      const cartTotal = state.cart_items.reduce((cartTotal, cart_items) => {
        const { product, cartCount } = cart_items;
        const itemTotal = product.discount_price
          ? product.discount_price * cartCount
          : product.unit_price * cartCount;

        return cartTotal + itemTotal;
      }, 0);
      state.cartTotalAmount = cartTotal;
      if (cartTotal !== 0) {
        localStorage.setItem("cartTotal", cartTotal);
      } else {
        localStorage.removeItem("cartTotal");
      }
      //  state.cartTotalCount = quantity
    },
  },
});

export const {
  addToCart,
  increaseCart,
  decreaseCart,
  removeCart,
  increaseProduct,
  decreaseProduct,
  resetProduct,
  calculateCartTotal,
  removeProductFromCart,
} = cartUiSlice.actions;
export default cartUiSlice.reducer;
