"use client";

import { useGetMovieQuery } from "@/services/dataApi";
import { useGetMovieReviewsQuery } from "@/services/dataApi";
import { usePathname } from "next/navigation";
import styles from "./Film.module.css";
import { Card } from "@/components/Card/Card";
import { Text } from "@/components/Text/Text";
import { TicketCounter } from "@/components/TicketCounter/TicketCounter";
import Image from "next/image";

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
    id,
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
          <TicketCounter isCheckoutItem={false} openModal={null} id={id} />
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
