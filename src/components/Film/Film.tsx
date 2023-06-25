"use client";

import { useGetMovieQuery } from "@/services/movieApi";
import { useSelector } from "react-redux";
import { useGetMovieReviewsQuery } from "@/services/reviewApi";
import { usePathname } from "next/navigation";
import styles from "./Film.module.css";
import { Card } from "../Card/Card";
import { Text } from "../Text/Text";
import Image from "next/image";

// const InfoBlock = () => {
//   return (
//     <div className={styles.infoBlock}>
//       {Object.keys(filmFields).map((key) => {
//         return (
//           <div key={key}>
//             <span
//               className={`${styles.text} ${styles.textBold}`}
//             >{`${key}: `}</span>
//             <span className={styles.text}>{value}</span>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

const InfoBlock = ({ title, text }) => {
  return (
    <div>
      <span
        className={`${styles.text} ${styles.textBold}`}
      >{`${title}: `}</span>
      <span className={styles.text}>{text}</span>
    </div>
  );
};

const FilmDescription = ({
  movie: {
    title,
    posterUrl,
    releaseYear,
    description,
    genre,
    rating,
    director,
  },
}) => {
  return (
    <Card>
      <div className={styles.filmDescriptionWrapper}>
        <Image
          className={styles.imageWrap}
          width={400}
          height={500}
          alt={`постер фильма ${title}`}
          src={posterUrl}
        />

        <div className={styles.filmDescription}>
          <h1 className={styles.headingPrimary}>{title}</h1>
          <div className={styles.infoBlock}>
            <InfoBlock title={"Жанр"} text={genre} />
            <InfoBlock title={"Год выпуска"} text={releaseYear} />
            <InfoBlock title={"Рейтинг"} text={rating} />
            <InfoBlock title={"Режиссер"} text={director} />
          </div>
          <h4 className={styles.headingSecondary}>Описание</h4>
          <Text>{description}</Text>
        </div>
      </div>
    </Card>
  );
};

const FilmReview = ({ name, text, rating }) => {
  return (
    <Card>
      <div className={styles.reviewWrapper}>
        <div className={styles.userPic}>
          <Image width={32} height={32} src={"/photo.svg"} alt="avatar" />
        </div>
        <div className={styles.reviewTextWrapper}>
          <div className={styles.reviewUpper}>
            <div className={`${styles.text} ${styles.textBold}`}>{name}</div>
            <div className={styles.text}>
              <span className={styles.text}>Оценка: </span>
              <span className={`${styles.text} ${styles.textBold}`}>
                {rating}
              </span>
            </div>
          </div>
          <Text>{text}</Text>
        </div>
      </div>
    </Card>
  );
};

export const Film = () => {
  const movieId = usePathname().slice("/films/".length);

  const {
    data: movieData,
    isLoading: isMovieLoading,
    error: isMovieError,
  } = useGetMovieQuery(movieId);

  const {
    data: reviewData,
    isLoading: isReviewLoading,
    error: isReviewError,
  } = useGetMovieReviewsQuery(movieId);

  // const selectMoviesSlice = (state) => state.movies;
  // const selectReviewsSlice = (state) => state.reviews;

  // const getMovieReviews = (state, id) => selectReviewsSlice(state)[id];
  // const getMovieData = (state, id) => selectMoviesSlice(state)[id];

  // const movieReviews = useSelector((state) => getMovieReviews(state, movieId));
  // const movieData = useSelector((state) => getMovieData(state, movieId));

  if (isMovieError || isReviewError) {
    return <div>Что-то пошло не так...</div>;
  }

  if (isMovieLoading || isReviewLoading) {
    return <div>Загружаем...</div>;
  }

  return (
    <div className={styles.filmWrapper}>
      <FilmDescription movie={movieData} />
      <>
        {reviewData.map(({ id, name, text, rating }) => (
          <FilmReview key={id} name={name} text={text} rating={rating} />
        ))}
      </>
    </div>
  );
};
