"use client";
import { useCallback, useState, useEffect } from "react";
import { Ticket } from "@/components/Ticket/Ticket";
import { Text } from "@/components/Text/Text";
import styles from "./TicketSelection.module.css";
import { useSelector } from "react-redux";
import { useGetMoviesInCinemaQuery } from "@/services/dataApi";

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

  const filters = useSelector((state) => state.filters) || {};
  const { cinema, title, genre } = filters;

  const cinemas = useSelector((state) => state.cinema) || [];
  const curCinema = cinemas.find(({ name }) => name === cinema) || null;
  const id = curCinema?.id || "";
  const { data, isLoading } = useGetMoviesInCinemaQuery(id);

  if (data) {
    tickets = data.map(
      ({
        title,
        posterUrl,
        releaseYear,
        description,
        genre,
        id,
        rating,
        director,
      }) => {
        return {
          title,
          posterUrl,
          releaseYear,
          description,
          genre,
          rating,
          director,
          movieId: id,
          id,
          cinema,
        };
      }
    );
  }


  if (genre) {
    tickets = filterByGenre(tickets, genre);
  }

  if (title) {
    tickets = filterByTitle(tickets, title);
  }

  return (
    <div className={styles.ticketsWrapper}>
      {(!tickets.length || isLoading) && <Text>Загружаем...</Text>}
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
