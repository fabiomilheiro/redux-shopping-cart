import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import styles from "./CartLink.module.css";
import { getCartItemCount } from "./cartSlice";

export function CartLink() {
  const cartItemCount = useAppSelector(getCartItemCount);
  return (
    <Link to="/cart" className={styles.link}>
      <span className={styles.text}>
        🛒&nbsp;&nbsp;{cartItemCount ? cartItemCount : "Cart"}
      </span>
    </Link>
  );
}
