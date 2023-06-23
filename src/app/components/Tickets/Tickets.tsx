"use client";
import { useState, useCallback } from "react";
import styles from "./Tickets.module.css";
import Image from "next/image";
import { Card } from "../Card/Card";


const IconButton = ({ handleClick, iconHref, isDisabled, buttonClass }) => {
  return (
    <button disabled={isDisabled} className={`${buttonClass} ${styles.ticketButton}`} onClick={handleClick}>
      <svg className={styles.ticketButtonIcon}>
        <use href={iconHref} />
      </svg>
    </button>
  );
};

const Ticket = ({filmName, filmGenre}) => {

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
      <div className={styles.ticketPicWrap}>
        <Image
          width={100}
          height={120}
          src="/poster_small.png"
          alt={`постер фильма`}
          className={styles.ticketPic}
        />
      </div>
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
        <div className={styles.closeButtonWrapper}>
          <button className={styles.closeButton}>
            <svg className={styles.closeButtonIcon}>
              <use href="#close-icon" />
            </svg>
          </button>
        </div>
      </div>
    </Card>
  );
};

export const Tickets = () => {

  const filmDetails = {
    filmName: "Властелин колец: Братство кольца",
    filmGenre: "Фэнтези",
  };


  const tickets = [
    filmDetails, filmDetails,filmDetails,filmDetails,filmDetails
  ];

  return (
    <div className={styles.ticketsWrapper}>
      {
        tickets.map(({filmName, filmGenre}) => (
          <Ticket filmName={filmName} filmGenre={filmGenre}/>
        ))
      }
    </div>
  );
};

