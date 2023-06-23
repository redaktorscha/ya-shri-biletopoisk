import { Tickets } from "../Tickets/Tickets";
import { Card } from "../Card/Card";
import styles from "./Basket.module.css";

const Total = () => {
  return (
    <div className={styles.basketTotal}>
      <span className={styles.basketText}>Итого билетов:</span>
      <span className={styles.basketText}>7</span>
    </div>
  );
};

export const Basket = () => {
  return (
    <div className={styles.basketWrapper}>
      <Tickets />
      <Card>
        <Total />
      </Card>
    </div>
  );
};
