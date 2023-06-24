import styles from "./MainSection.module.css";

export const MainSection = ({ children }) => {
  return (
    <section className={styles.mainSection}>
      {children}
    </section>
  );
};