"use client";
import styles from "./Card.module.css";

export const Card = ({children}) => {
  return (
    <div className={styles.cardWrapper}>
      {children}
    </div>
  )
}


