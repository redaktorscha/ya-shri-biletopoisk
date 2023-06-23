"use client";

import styles from "./Film.module.css";
import { Card } from "../Card/Card";
import { Text } from "../Text/Text";
import Image from "next/image";

const filmInfo = {
  genre: "Фэнтези",
  year: "2001",
  rating: "8",
  director: "Питер Джексон",
};

const keys = ["Жанр", "Год выпуска", "Рейтинг", "Режиссёр"];

const FilmDescription = () => {
  const InfoBlock = () => {
    return (
      <div className={styles.infoBlock}>
        {Object.values(filmInfo).map((value, index) => {
          return (
            <div key={index}>
              <span
                className={`${styles.text} ${styles.textBold}`}
              >{`${keys[index]}: `}</span>
              <span className={styles.text}>{value}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card>
      <div className={styles.filmDescriptionWrapper}>
        <div>
          <Image width={400} height={500} alt={""} src={"/poster_medium.png"} />
        </div>
        <div className={styles.filmDescription}>
          <h1 className={styles.headingPrimary}>
            Властелин колец: Братство кольца
          </h1>
          <InfoBlock />

          <h4 className={styles.headingSecondary}>Описание</h4>
          <Text>
            Сказания о Средиземье — это хроника Великой войны за Кольцо,
            длившейся не одну тысячу лет. Тот, кто владел Кольцом, получал
            неограниченную власть, но был обязан служить злу. Тихая деревня, где
            живут хоббиты. Придя на 111-й день рождения к своему старому другу
            Бильбо Бэггинсу, волшебник Гэндальф начинает вести разговор о
            кольце, которое Бильбо нашел много лет назад. Это кольцо
            принадлежало когда-то темному властителю Средиземья Саурону, и оно
            дает большую власть своему обладателю. Теперь Саурон хочет вернуть
            себе власть над Средиземьем. Бильбо отдает Кольцо племяннику Фродо,
            чтобы тот отнёс его к Роковой Горе и уничтожил.
          </Text>
        </div>
      </div>
    </Card>
  );
};

const FilmReview = () => {
  return (
    <Card>
      <Image width={100} height={100} src={""} alt="user pic" />
      <div className={styles.reviewWrapper}>
        <div className={styles.reviewUpper}>
          <div className={`${styles.text} ${styles.textBold}`}>UserName</div>
          <div className={styles.text}>
            <span>Оценка: </span>
            <span>8</span>
          </div>
        </div>
        <Text>
          По счастью мне довелось посмотреть фильм раньше, чем прочесть книгу.
          Это было около четырех лет назад, но тот момент я вспоминаю и по сей
          день. До него я не был фанатом Джона Толкина, как впрочем, и всего
          фентези в целом, однако стоило мне посмотреть первые десять минут
          фильма и оставшиеся пролетели на одном дыхании. Я словно погрузился в
          необычайный мир, где добро борется со злом, где зеленые рощи
          перемежаются с поросшими мхом статуями и древними развалинами, в мир,
          где пробираясь лесною тропой можно встретить остроухих неувядающих
          эльфов или мерзких орков – кому как повезет...
        </Text>
      </div>
    </Card>
  );
};

export const Film = () => {
  return (
    <div className={styles.filmWrapper}>
      <FilmDescription />
      <FilmReview />
      <FilmReview />
      <FilmReview />
    </div>
  );
};
