"use client";
import { useState, useCallback } from "react";
import { Ticket } from "@/components/Ticket/Ticket";
import { Text } from "@/components/Text/Text";
import styles from "./TicketSelection.module.css";
import { useSelector } from "react-redux";

export const TicketSelection = () => {
  const filterByTitle = useCallback(
    (arr, filter) => arr.filter(({ title }) => title.includes(filter)),
    []
  );

  const filterByGenre = useCallback(
    (arr, filter) => arr.filter(({ genre }) => genre === filter),
    []
  );

  let tickets = useSelector((state) => state.tickets) || [];

  const { cinema, genre, title } = useSelector((state) => state.filters) || {};

  if (genre) {
    tickets = filterByGenre(tickets, genre);
  }

  if (title) {
    tickets = filterByTitle(tickets, title);
  }

  return (
    <div className={styles.ticketsWrapper}>
      {!tickets.length && <Text>Загружаем...</Text>}
      {tickets.length > 0 &&
        tickets.map(
          ({ title, posterUrl, genre, id, rating, cinema, movieId }) => (
            <Ticket
              movieId={movieId}
              id={id}
              key={id}
              title={title}
              posterUrl={posterUrl}
              genre={genre}
              rating={rating}
              cinema={cinema}
              isCheckoutItem={false}
              openModal={null}
            />
          )
        )}
    </div>
  );
};
