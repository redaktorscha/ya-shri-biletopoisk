"use client"
import styles from "./Text.module.css";

export const Text = ({ children }) => {
  return <p className={styles.textPrimary}>{children}</p>;
};
