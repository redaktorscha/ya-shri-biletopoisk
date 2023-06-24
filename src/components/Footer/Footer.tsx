"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Footer.module.css"

export const Footer = () => {
  const pathname = usePathname();
  return (
    <div className={styles.footerBlock}>
      <Link href={pathname !== "/info" ? "/info" : ""}>Вопросы-ответы</Link>
      <Link href={pathname !== "/about" ? "/about" : ""}>О нас</Link>
    </div>
  );
};