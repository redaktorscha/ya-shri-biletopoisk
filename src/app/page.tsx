// import Image from 'next/image'
"use client";
import { useState, useEffect, useCallback } from "react";
import { setTickets } from "@/store/slices/ticketsSlice";
import { setCinemaList } from "@/store/slices/cinemaSlice";
import { setGenreList } from "@/store/slices/genreSlice";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Suspense } from "react";
import styles from "./page.module.css";
import { MainContent } from "@/components/MainContent/MainContent";
import { TicketSelection } from "@/components/TicketSelection/TicketSelection";
import { Text } from "@/components/Text/Text";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();

  const getCinemaList = (cinemas) =>
    cinemas.map(({ name, id }) => ({
      name,
      id,
    }));

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

  useEffect(() => {
    const init = async () => {
      const baseUrl = "http://localhost:3001/api/";
      const moviesRoute = [baseUrl, "movies"].join("/");
      const cinemasRoute = [baseUrl, "cinemas"].join("/");

      try {
        const responseMovies = await axios.get(moviesRoute);
        const responseCinemas = await axios.get(cinemasRoute);

        const [{ data: movieData }, { data: cinemaData }] = await Promise.all([
          responseMovies,
          responseCinemas,
        ]);

        if (movieData && cinemaData) {
          const cinemaList = getCinemaList(cinemaData);
          const tickets = getTickets(movieData, cinemaData);
          const genreList = [...new Set(movieData.map(({ genre }) => genre))];
          dispatch(setGenreList({ genreList }));
          dispatch(setCinemaList({ cinemaList }));
          dispatch(setTickets({ tickets }));
          setIsLoading(false);
        }
      } catch (e) {
        setIsError(true);
      }
    };

    init();
  }, [dispatch]);

  if (isError) {
    return <Text>Что-то пошло не так...</Text>;
  }

  if (isLoading) {
    return <Text>Загружаем...</Text>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainContent hasAsideBlock>
        <TicketSelection />
      </MainContent>
    </Suspense>
  );
}
