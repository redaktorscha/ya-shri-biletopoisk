"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Header.module.css";
import { useSelector } from "react-redux";
import { cartTotalSelector } from "@/store/cartSelector";

export const Header = () => {
  const pathname = usePathname();
  const totalCount = useSelector(cartTotalSelector);

  return (
    <div className={styles.headerBlock}>
      <h1 className={styles.headerHeading}>
        <Link href={pathname !== "/" ? "/" : ""}>Билетопоиск</Link>
      </h1>
      <div className={styles.checkoutBlock}>
        <div className={styles.checkoutStatus}>{totalCount}</div>
        <Link
          href={pathname !== "/checkout" ? "/checkout" : ""}
          className={styles.checkoutLink}
        >
          <svg className={styles.checkoutIcon}>
            <use href="#checkout-icon" />
          </svg>
        </Link>
      </div>
    </div>
  );
};
