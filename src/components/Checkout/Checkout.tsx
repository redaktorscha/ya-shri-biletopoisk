"use client";
import { useCallback, useState } from "react";
import { Card } from "../Card/Card";
import { Modal } from "../Modal/Modal";
import { ModalContext } from "../../contexts/ModalContext";
import { Ticket } from "../Tickets/Tickets";
import styles from "./Basket.module.css";

const Total = () => {
  return (
    <div className={styles.basketTotal}>
      <span className={styles.basketText}>Итого билетов:</span>
      <span className={styles.basketText}>7</span>
    </div>
  );
};

const Tickets = () => {
  const filmDetails = {
    filmName: "Властелин колец: Братство кольца",
    filmGenre: "Фэнтези",
  };

  const tickets = [
    filmDetails,
    filmDetails,
    filmDetails,
    filmDetails,
    filmDetails,
  ];

  return (
    <div className={styles.ticketsWrapper}>
      {tickets.map(({ filmName, filmGenre }, index) => (
        <Ticket key={index} filmName={filmName} filmGenre={filmGenre} isBasketItem={false} clickHandler={null} />
      ))}
    </div>
  );
};

export const Basket = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const filmDetails = {
    filmName: "Властелин колец: Братство кольца",
    filmGenre: "Фэнтези",
  };

  const tickets = [
    filmDetails,
    filmDetails,
    filmDetails,
    filmDetails,
    filmDetails,
  ];

  return (
    <ModalContext.Provider value={{openModal, closeModal}}>
      <div className={styles.basketWrapper}>
        <div className={styles.ticketsWrapper}>
          {tickets.map(({ filmName, filmGenre }, index) => (
            <Ticket
              key={index}
              filmName={filmName}
              filmGenre={filmGenre}
              isBasketItem
              clickHandler={openModal}
            />
          ))}
        </div>
        <Card>
          <Total />
        </Card>
        {isModalOpen && <Modal />}
      </div>
    </ModalContext.Provider>
  );
};
