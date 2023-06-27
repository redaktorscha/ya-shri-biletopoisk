"use client";
import Link from "next/link";
import styles from "./Ticket.module.css";
import Image from "next/image";
import { Card } from "@/components/Card/Card";
import { TicketCounter } from "@/components/TicketCounter/TicketCounter";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementItemCount,
  decrementItemCount,
  setItemForRemove,
} from "@/store/slices/cartSlice";

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
            <h2 className={styles.filmName}>{title}</h2>
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
        </div>
        <TicketCounter
          isCheckoutItem={isCheckoutItem}
          openModal={openModal}
          id={id}
        />
      </div>
    </Card>
  );
};
