"use client";
import { useContext } from "react";
import Link from "next/link";
import styles from "./Ticket.module.css";
import Image from "next/image";
import { Card } from "../Card/Card";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementItemCount,
  decrementItemCount,
  setItemForRemove,
} from "@/store/slices/cartSlice";

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
  id,
  movieId,
  title,
  posterUrl,
  genre,
  rating,
  cinema,
  isCheckoutItem,
  openModal,
}) => {
  const dispatch = useDispatch();
  // const [count, setCount] = useState(0);

  // const incrementCount = useCallback(
  //   () => setCount((curCount) => curCount + 1),
  //   []
  // );
  // const decrementCount = useCallback(
  //   () => setCount((curCount) => curCount - 1),
  //   []
  // );
  const cartState = useSelector((state) => state.cart.items);
  const currentTicket = cartState.find((item) => item.id === id);
  const count = currentTicket === undefined ? 0 : currentTicket.count;
  const MAX_TICKETS = 30;
  const MIN_TICKETS = 0;

  const isDisabledIncrement = count === MAX_TICKETS;
  const isDisabledDecrement = count === MIN_TICKETS;

  const buttonClassIncrement =
    count === MAX_TICKETS
      ? styles.ticketButtonDisabled
      : styles.ticketButtonActive;

  const buttonClassDecrement =
    count === MIN_TICKETS
      ? styles.ticketButtonDisabled
      : styles.ticketButtonActive;

  return (
    <Card>
      <div className={styles.ticketWrap}>
        <Image
          width={100}
          height={140}
          src={posterUrl}
          alt={`постер фильма ${title}`}
          className={styles.imageWrap}
        />

        <div className={styles.filmDetails}>
          <Link href={`/films/${movieId}`}>
            <h2 className={styles.filmName}>
              {title}
              {/* <div className={styles.filmRating}>{rating}</div> */}
            </h2>
          </Link>

          <div>
            <span className={`${styles.text} ${styles.textBold}`}>Жанр: </span>
            <span className={`${styles.text} ${styles.textItalic}`}>
              {genre}
            </span>
          </div>
          <div>
            <span className={`${styles.text} ${styles.textBold}`}>
              Рейтинг:{" "}
            </span>
            <span className={`${styles.text} ${styles.textItalic}`}>
              {rating}
            </span>
          </div>
          <div>
            <span className={`${styles.text} ${styles.textBold}`}>
              Кинотеатр:{" "}
            </span>
            <span className={`${styles.text} ${styles.textItalic}`}>
              {cinema}
            </span>
          </div>
          {/* <div>
            <span className={`${styles.text} ${styles.textBold}`}>Сеанс: </span>
            <span className={`${styles.text} ${styles.textItalic}`}>
              {genre}
            </span>
          </div> */}
        </div>
        <div className={styles.ticketInteraction}>
          <IconButton
            handleClick={() => {
              if (isCheckoutItem) {
                if (count === 1) {
                  dispatch(setItemForRemove({ id }));
                  openModal();
                } else {
                  dispatch(decrementItemCount({ id }));
                }
              } else {
                dispatch(decrementItemCount({ id }));
              }
            }}
            iconHref={"#minus-icon"}
            isDisabled={isDisabledDecrement}
            buttonClass={buttonClassDecrement}
          />
          <span className={styles.ticketCountLabel}>{count}</span>
          <IconButton
            handleClick={() => {
              dispatch(incrementItemCount({ id }));
            }}
            iconHref={"#plus-icon"}
            isDisabled={isDisabledIncrement}
            buttonClass={buttonClassIncrement}
          />
          {isCheckoutItem && (
            <div className={styles.removeButtonWrapper}>
              <button onClick={openModal} className={styles.removeButton}>
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
