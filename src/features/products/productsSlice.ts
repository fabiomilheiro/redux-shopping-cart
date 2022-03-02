import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../app/api";
import { RootState } from "../../store/store";

export interface ProductsState {
  products: { [id: string]: Product };
}

const initialState: ProductsState = {
  products: {},
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchProductsSucceeded: (
      state: ProductsState,
      action: PayloadAction<Product[]>
    ) => {
      action.payload.forEach((product) => {
        state.products[product.id] = product;
      });
    },
  },
});

export const { fetchProductsSucceeded } = productsSlice.actions;

export default productsSlice.reducer;

const productsSelector = (state: RootState) => state.products;

export const getProducts = createSelector(
  productsSelector,
  (state: ProductsState) => state.products
);
