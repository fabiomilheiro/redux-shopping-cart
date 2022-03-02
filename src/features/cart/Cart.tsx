import classnames from "classnames";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getProducts } from "../products/productsSlice";
import styles from "./Cart.module.css";
import {
  changeCartItemQuantity,
  checkoutRequested,
  getCartItems,
  removeFromCart,
} from "./cartSlice";

export function Cart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(getCartItems);
  const products = useAppSelector(getProducts);
  const checkout = useAppSelector((state) => state.cart.checkout);

  const tableStyles = classnames({
    [styles.table]: true,
    [styles.checkoutError]: checkout === "Error",
    [styles.checkoutLoading]: checkout === "Loading",
  });
  return (
    <main className="page">
      <h1>Shopping Cart</h1>
      <table className={tableStyles}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(cartItems).map(([id, quantity]) => (
            <tr>
              <td>{products[id].name}</td>
              <td>
                <input
                  type="text"
                  className={styles.input}
                  defaultValue={quantity}
                  onChange={(event) => {
                    const quantity = Number(event.target.value);
                    if (!isNaN(quantity)) {
                      dispatch(
                        changeCartItemQuantity({
                          id,
                          newQuantity: quantity,
                        })
                      );
                    }
                  }}
                />
              </td>
              <td>{(products[id].price * quantity).toFixed(2)}</td>
              <td>
                <button
                  aria-label={`Remove ${products[id].name} from Shopping Cart`}
                  onClick={() => dispatch(removeFromCart(id))}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td></td>
            <td className={styles.total}>${0.0}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(checkoutRequested());
        }}
      >
        <button className={styles.button} type="submit">
          Checkout
        </button>
      </form>
    </main>
  );
}
