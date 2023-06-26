"use client";
import { Card } from "@/components/Card/Card";
import { Text } from "@/components/Text/Text";
import { Portal } from "@/components/Portal/Portal";
import styles from "./Modal.module.css";
import { ModalContext } from "@/contexts/ModalContext";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem } from '@/store/slices/cartSlice';


const ModalButton = ({ onClick, variant, title }) => {
  const buttonClass = {
    outline: `${styles.modalButtonOutline} ${styles.modalButton}`,
    solid: `${styles.modalButtonSolid} ${styles.modalButton}`,
  };

  return <button onClick={onClick} className={buttonClass[variant]}>{title}</button>;
};

export const Modal = () => {
  const { closeModal } = useContext(ModalContext);
  const dispatch = useDispatch();
  const ticketForRemoveId = useSelector((state) => state.cart.itemForRemoveId);

  return (
    <Portal selector="body">
      <div
        role="button"
        className={styles.modalBackdrop}
        onClick={closeModal}
      >
        <div className={styles.modalWrapper}>
          <Card>
            <div className={styles.modalWrapperInner}>
              <div className={styles.modalUpper}>
                <h3 className={styles.modalHeading}>Удаление билета</h3>
                <button onClick={closeModal} className={styles.modalCloseButton}>
                  <svg className={styles.closeButtonIcon}>
                    <use href="#close-icon" />
                  </svg>
                </button>
              </div>
              <div className={styles.modalText}>
                <Text>Вы уверены, что хотите удалить билет?</Text>
              </div>
              <div className={styles.modalBottom}>
                <ModalButton onClick={() => dispatch(deleteItem({ id: ticketForRemoveId }))} variant="solid" title="Да"/>
                <ModalButton onClick={closeModal} variant="outline" title="Нет"/>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Portal>
  );
};
