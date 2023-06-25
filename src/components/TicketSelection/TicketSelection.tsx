"use client";
import { useState, useEffect, useCallback } from "react";
import { useGetMoviesQuery, useGetMovieQuery } from "@/services/movieApi";
import { useGetCinemasQuery } from "@/services/cinemaApi";
import { Ticket } from "@/components/Ticket/Ticket";
import { Text } from "@/components/Text/Text";
import styles from "./TicketSelection.module.css";
import { useSelector } from "react-redux";

export const TicketSelection = () => {
  const [movies, setMovies] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const getTickets = useCallback(() => {
    return movies.reduce((acc, movie) => {
      const currentCinemas = cinemas.filter(({ movieIds }) =>
        movieIds.includes(movie.id)
      );
      const curTickets = currentCinemas.map(({ name }) => ({
        ...movie,
        cinema: name,
      }));
      acc.push(...curTickets);
      return acc;
    }, []);
  }, [movies, cinemas]);

  const {
    data: movieData,
    isLoading: isLoadingMovies,
    error: hasMoviesError,
  } = useGetMoviesQuery();

  const {
    data: cinemaData,
    isLoading: isLoadingCinemas,
    error: hasCinemasError,
  } = useGetCinemasQuery();

  useEffect(() => {
    if (isLoadingMovies || isLoadingCinemas) {
      setIsLoading(true);
    }
  }, [isLoadingCinemas, isLoadingMovies]);

  useEffect(() => {
    if (hasMoviesError || hasCinemasError) {
      setHasError(true);
    }
  }, [hasCinemasError, hasMoviesError]);

  useEffect(() => {
    if (movieData && cinemaData) {
      setMovies(movieData);
      setCinemas(cinemaData);
      setTickets(() => getTickets());

      setIsLoading(false);
    }
  }, [movieData, cinemaData, getTickets]);

  return (
    <div className={styles.ticketsWrapper}>
      {isLoading && <Text>Загружаем...</Text>}
      {hasError && <Text>Что-то пошло не так...</Text>}
      {tickets.length > 0 &&
        tickets.map(({ title, posterUrl, genre, id, rating, cinema }) => (
          <Ticket
            id={id}
            key={id}
            title={title}
            posterUrl={posterUrl}
            genre={genre}
            rating={rating}
            cinema={cinema}
            isCheckoutItem={false}
            clickHandler={null}
          />
        ))}
    </div>
  );
};
