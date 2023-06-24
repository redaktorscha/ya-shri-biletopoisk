"use client";
"use client";
import { useCallback, useState } from "react";
import { Card } from "@/components/Card/Card";
import { Text } from "@/components/Text/Text";
import { Modal } from "@/components/Modal/Modal";
import { ModalContext } from "@/contexts/ModalContext";
import { Ticket } from "@/components/Ticket/Ticket";
import Image from "next/image";
import styles from "./Checkout.module.css";

const Total = () => {
  return (
    <div className={styles.checkoutTotal}>
      <span className={styles.checkoutText}>Итого билетов:</span>
      <span className={styles.checkoutText}>7</span>
    </div>
  );
};

export const Checkout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const filmDetails = {
    filmName: "Властелин колец: Братство кольца",
    filmGenre: "Фэнтези",
  };

  // const tickets = [
  //   filmDetails,
  //   filmDetails,
  //   filmDetails,
  //   filmDetails,
  //   filmDetails,
  // ];

  const tickets = [];

  const hasTickets = tickets.length > 0;

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <div className={styles.checkoutWrapper}>
        {hasTickets && (
          <div className={styles.checkoutWrapper}>
            {tickets.map(({ filmName, filmGenre }, index) => (
              <Ticket
                key={index}
                filmName={filmName}
                filmGenre={filmGenre}
                isCheckoutItem
                clickHandler={openModal}
              />
            ))}
          </div>
        )}
        {!hasTickets && (
          <div className={styles.emptyCheckoutBlock}>
            <div className={styles.emptyCheckoutInner}>
              <Card>
                <Text>В вашей корзине нет билетов...</Text>
                <Image
                  src="/empty.png"
                  width={400}
                  height={220}
                  alt="no tickets"
                />
              </Card>
            </div>
          </div>
        )}
        {hasTickets && (
          <Card>
            <Total />
          </Card>
        )}
        {isModalOpen && <Modal />}
      </div>
    </ModalContext.Provider>
  );
};
