import styles from "./Aside.module.css";
import { Card } from "@/components/Card/Card";
import {Form} from "@/components/Form/Form";

export const Aside = () => {
  return (
    <aside className={styles.asideBlock}>
      <Card>
        <div className={styles.asideInner}>
          <h4 className={styles.asideHeading}>Фильтры</h4>
          <Form />
        </div>
      </Card>
    </aside>
  );
};
