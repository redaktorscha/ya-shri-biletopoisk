import styles from "./Card.module.css";

export const Card = ({children}) => {

// const gapClass = gap === 1.5 ? "gapMed" : "gapSm";
// const cardStyles = `${gapClass} ${styles.cardWrapper}`;

  return (
    <div className={`${styles.cardWrapper}`}>
      {children}
    </div>
  )
}


