"use client";
import { Card } from "../Card/Card";
import { Text } from "../Text/Text";
import { Portal } from "../Portal/Portal";
import styles from "./Modal.module.css";
import { ModalContext } from "../../contexts/ModalContext";
import { useContext } from "react";

const ModalButton = ({ variant, title }) => {
  const buttonClass = {
    outline: `${styles.modalButtonOutline} ${styles.modalButton}`,
    solid: `${styles.modalButtonSolid} ${styles.modalButton}`,
  };

  return <button className={buttonClass[variant]}>{title}</button>;
};

export const Modal = () => {
  const { closeModal } = useContext(ModalContext);
  console.log(closeModal.toString());
  return (
    <Portal>
      <div
        role="button"
        className={styles.modalBackdrop}
        onClick={() => closeModal(false)}
      >
        <div className={styles.modalWrapper}>
          <Card>
            <div className={styles.modalWrapperInner}>
              <div className={styles.modalUpper}>
                <h3 className={styles.modalHeading}>Удаление билета</h3>
                <button onClick={() => closeModal(false)} className={styles.modalCloseButton}>
                  <svg className={styles.closeButtonIcon}>
                    <use href="#close-icon" />
                  </svg>
                </button>
              </div>
              <div className={styles.modalText}>
                <Text>Вы уверены, что хотите удалить билет?</Text>
              </div>
              <div className={styles.modalBottom}>
                <ModalButton variant="solid" title="Да"/>
                <ModalButton variant="outline" title="Нет"/>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Portal>
  );
};
