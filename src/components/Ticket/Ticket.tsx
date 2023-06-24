"use client";
import { useState, useCallback } from "react";
import styles from "./Ticket.module.css";
import Image from "next/image";
import { Card } from "../Card/Card";
const IconButton = ({ handleClick, iconHref, isDisabled, buttonClass }) => {
  return (
    <button
      disabled={isDisabled}
      className={`${buttonClass} ${styles.ticketButton}`}
      onClick={handleClick}
    >
      <svg className={styles.ticketButtonIcon}>
        <use href={iconHref} />
      </svg>
    </button>
  );
};

export const Ticket = ({
  filmName,
  filmGenre,
  isCheckoutItem,
  clickHandler,
}) => {
  const [count, setCount] = useState(0);

  const incrementCount = useCallback(
    () => setCount((curCount) => curCount + 1),
    []
  );
  const decrementCount = useCallback(
    () => setCount((curCount) => curCount - 1),
    []
  );

  const MAX_TICKETS = 30;
  const MIN_TICKETS = 0;

  const isDisabledIncrement = count === MAX_TICKETS;
  const isDisabledDecrement = count === MIN_TICKETS;

  const buttonClassIncrement =
    count === MAX_TICKETS
      ? styles.ticketButtonDisabled
      : styles.ticketButtonActive;
  const buttonClassDecrement =
    count > MAX_TICKETS
      ? styles.ticketButtonDisabled
      : styles.ticketButtonDisabled;

  return (
    <Card>
      <div className={styles.ticketWrap}>
        <Image
          width={100}
          height={120}
          src="/poster_small.png"
          alt={`постер фильма`}
        />

        <div className={styles.filmDetails}>
          <h2 className={styles.filmName}>{filmName}</h2>
          <span className={styles.filmGenre}>{filmGenre}</span>
        </div>
        <div className={styles.ticketInteraction}>
          <IconButton
            handleClick={decrementCount}
            iconHref={"#minus-icon"}
            isDisabled={isDisabledDecrement}
            buttonClass={buttonClassDecrement}
          />
          <span className={styles.ticketCountLabel}>{count}</span>
          <IconButton
            handleClick={incrementCount}
            iconHref={"#plus-icon"}
            isDisabled={isDisabledIncrement}
            buttonClass={buttonClassIncrement}
          />
          {isCheckoutItem && (
            <div className={styles.closeButtonWrapper}>
              <button onClick={clickHandler} className={styles.closeButton}>
                <svg className={styles.closeButtonIcon}>
                  <use href="#close-icon" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

// const Tickets = () => {
//   const filmDetails = {
//     filmName: "Властелин колец: Братство кольца",
//     filmGenre: "Фэнтези",
//   };

//   const tickets = [
//     filmDetails,
//     filmDetails,
//     filmDetails,
//     filmDetails,
//     filmDetails,
//   ];

//   return (
//     <div className={styles.ticketsWrapper}>
//       {tickets.map(({ filmName, filmGenre }, index) => (
//         <Ticket
//           key={index}
//           filmName={filmName}
//           filmGenre={filmGenre}
//           isCheckoutItem={false}
//           clickHandler={null}
//         />
//       ))}
//     </div>
//   );
// };
