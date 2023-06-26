"use client";
import { useCallback, useState } from "react";
import { Card } from "@/components/Card/Card";
import { Modal } from "@/components/Modal/Modal";
import { ModalContext } from "@/contexts/ModalContext";
import { Ticket } from "@/components/Ticket/Ticket";
import Image from "next/image";
import styles from "./Checkout.module.css";
import { useSelector } from "react-redux";
import { cartTotalSelector } from "@/store/cartSelector";

const Total = () => {
  const totalCount = useSelector(cartTotalSelector);
  return (
    <div className={styles.checkoutTotal}>
      <span className={styles.checkoutText}>Итого билетов:</span>
      <span className={styles.checkoutText}>{totalCount}</span>
    </div>
  );
};

export const Checkout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = useCallback(() => setIsModalOpen(true), []);
  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const tickets = useSelector((state) => state.tickets);
  const cart = useSelector((state) => state.cart.items);

  const cartIndexes = cart.map(({ id }) => id);
  const ticketsInCart = tickets.filter(({ id }) => cartIndexes.includes(id));
  const hasTickets = ticketsInCart.length > 0;

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      <div className={styles.checkoutWrapper}>
        {hasTickets && (
          <>
            {ticketsInCart.map(
              ({ id, movieId, title, posterUrl, genre, rating, cinema }) => (
                <Ticket
                  key={title}
                  id={id}
                  movieId={movieId}
                  title={title}
                  posterUrl={posterUrl}
                  genre={genre}
                  rating={rating}
                  cinema={cinema}
                  isCheckoutItem
                  openModal={openModal}
                />
              )
            )}
          </>
        )}
        {!hasTickets && (
          <div className={styles.emptyCheckoutBlock}>
            <div className={styles.emptyCheckoutInner}>
              <h1>В вашей корзине нет билетов...</h1>
              <Image
                src="/popcorn.png"
                width={400}
                height={220}
                alt="no tickets"
              />
            </div>
          </div>
        )}
        {hasTickets && (
          <div className={styles.totalWrapper}>
            <Card>
              <Total />
            </Card>
          </div>
        )}
        {isModalOpen && <Modal />}
      </div>
    </ModalContext.Provider>
  );
};
