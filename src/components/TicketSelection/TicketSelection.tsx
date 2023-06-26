"use client";
import { useState, useEffect, useCallback } from "react";
import {
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetCinemasQuery,
} from "@/services/dataApi";
import { setTickets } from "@/store/slices/ticketsSlice";
import { setCinemaList } from "@/store/slices/cinemaSlice";
import { Ticket } from "@/components/Ticket/Ticket";
import { Text } from "@/components/Text/Text";
import styles from "./TicketSelection.module.css";
import { useSelector, useDispatch } from "react-redux";

export const TicketSelection = () => {
  // const [movies, setMovies] = useState([]);
  // const [tickets, setTickets] = useState([]);
  // const [cinemas, setCinemas] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [hasError, setHasError] = useState(false);
  const dispatch = useDispatch();
  let tickets = [];
  let cinemaList = [];

  const getCinemaList = (cinemas) => cinemas.map(({ name }) => name);

  const getTickets = (movies, cinemas) => {
    const tickets = [];
    movies.forEach(
      ({
        title,
        posterUrl,
        releaseYear,
        description,
        genre,
        id,
        rating,
        director,
        reviewIds,
      }) => {
        const ticket = {
          title,
          posterUrl,
          releaseYear,
          description,
          genre,
          rating,
          director,
          movieId: id,
          id,
        };
        const curCinemas = cinemas.filter(({ movieIds }) =>
          movieIds.includes(id)
        );
        curCinemas.forEach((cinema) =>
          tickets.push({ ...ticket, cinema: cinema.name })
        );
      }
    );
    return tickets;
  };

  const {
    data: movieData,
    isLoading: isLoadingMovies,
    isError: hasMoviesError,
  } = useGetMoviesQuery();

  const {
    data: cinemaData,
    isLoading: isLoadingCinemas,
    isError: hasCinemasError,
  } = useGetCinemasQuery();

  const isLoading = isLoadingMovies || isLoadingCinemas;
  const isError = hasMoviesError || hasCinemasError;
  
  // const filterState = useSelector((state) => state.filters);
  // const activeFilters = Object.keys(filterState).filter(
  //   (key) => filterState[key] !== null
  // );

  // useEffect(() => {
  //   if (tickets.length > 0) {
  //     dispatch(setTickets({ tickets }));
  //   }
  // });
  if (cinemaData && movieData) {
    tickets = getTickets(movieData, cinemaData);
    cinemaList = getCinemaList(cinemaData);
    dispatch(setTickets({ tickets }));
    dispatch(setCinemaList({ cinemaList }));
  }

  if (isError) {
    return <Text>Что-то пошло не так...</Text>;
  }

  if (isLoading) {
    return <Text>Загружаем...</Text>;
  }

  // Object.keys(filters).forEach((filterName) => {
  //   tickets.filter((ticket) => ticket[filter] === filterState[filter]);
  // })

  // useEffect(() => {
  //   if (isLoadingMovies || isLoadingCinemas) {
  //     setIsLoading(true);
  //   }
  // }, [isLoadingCinemas, isLoadingMovies]);

  // useEffect(() => {
  //   if (hasMoviesError || hasCinemasError) {
  //     setHasError(true);
  //   }
  // }, [hasCinemasError, hasMoviesError]);

  // useEffect(() => {
  //   if (movieData && cinemaData) {
  //     setMovies(movieData);
  //     setCinemas(cinemaData);
  //     setTickets(() => getTickets());

  //     setIsLoading(false);
  //   }
  // }, [movieData, cinemaData, getTickets]);

  return (
    <div className={styles.ticketsWrapper}>
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
