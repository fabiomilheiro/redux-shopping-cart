import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

type Checkout = "Ready" | "Loading" | "Error";
export interface CartState {
  items: {
    [productId: string]: number;
  };
  checkout: Checkout;
}

const initialState: CartState = {
  items: {},
  checkout: "Ready",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<string>) => {
      const id = action.payload;
      if (!state.items[id]) {
        state.items[id] = 1;
      } else {
        state.items[id]++;
      }
    },
    removeFromCart: (state: CartState, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.items[id];
    },
    changeCartItemQuantity: (
      state: CartState,
      action: PayloadAction<{ id: string; newQuantity: number }>
    ) => {
      const { id, newQuantity } = action.payload;

      if (newQuantity > 0) {
        state.items[id] = newQuantity;
      } else {
        delete state.items[id];
      }
    },
    checkoutRequested: (state: CartState, action: PayloadAction) => {
      state.checkout = "Loading";
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  changeCartItemQuantity,
  checkoutRequested,
} = cartSlice.actions;

export default cartSlice.reducer;

const cartSelector = (state: RootState) => state.cart;

export const getCartItemCount = createSelector(
  cartSelector,
  (state: CartState) => {
    console.log("Getting cart item count");
    return Object.values(state.items).reduce((acc, current) => {
      return acc + current;
    }, 0);
  }
);

export const getCartItems = createSelector(
  cartSelector,
  (state: CartState) => state.items
);
