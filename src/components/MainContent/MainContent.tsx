import styles from "./MainContent.module.css";
import { Aside } from "@/components/Aside/Aside";

export const MainContent = ({ children, hasAsideBlock }) => {
  return (
    <>
      {hasAsideBlock && <div className={styles.leftColumn}></div>}
      <main className={styles.mainContent}>{children}</main>
      {hasAsideBlock && <Aside />}
    </>
  );
};
