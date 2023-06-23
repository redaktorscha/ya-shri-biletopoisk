"use client";

import styles from "./Film.module.css";
import { Card } from "../Card/Card";
import Image from "next/image";

const FilmDescription = () => {
  return (
    <Card>
      <div>
        <Image width={400} height={500} alt={""} src={"/poster_medium"} />
      </div>
      <div className={styles.filmDescription}>
        <h2>Властелин колец: Братство кольца</h2>
        <div>
          <span>Жанр: </span>
          <span>Фэнтези</span>
        </div>
        <div>
          <span>Жанр: </span>
          <span>Фэнтези</span>
        </div>
        <div>
          <span>Жанр: </span>
          <span>Фэнтези</span>
        </div>
        <div>
          <span>Жанр: </span>
          <span>Фэнтези</span>
        </div>
        <h4>Описание</h4>
        <p>Сказания о Средиземье — это хроника Великой войны за Кольцо, длившейся не одну тысячу лет. Тот, кто владел Кольцом, получал неограниченную власть, но был обязан служить злу. Тихая деревня, где живут хоббиты. Придя на 111-й день рождения к своему старому другу Бильбо Бэггинсу, волшебник Гэндальф начинает вести разговор о кольце, которое Бильбо нашел много лет назад. Это кольцо принадлежало когда-то темному властителю Средиземья Саурону, и оно дает большую власть своему обладателю. Теперь Саурон хочет вернуть себе власть над Средиземьем. Бильбо отдает Кольцо племяннику Фродо, чтобы тот отнёс его к Роковой Горе и уничтожил.</p>
      </div>
    </Card>
  );
};

const FilmReview = () => {
  return <Card>
    <Image />
    <div>
    Роман
    </div>
    <p>
    По счастью мне довелось посмотреть фильм раньше, чем прочесть книгу. Это было около четырех лет назад, но тот момент я вспоминаю и по сей день. До него я не был фанатом Джона Толкина, как впрочем, и всего фентези в целом, однако стоило мне посмотреть первые десять минут фильма и оставшиеся пролетели на одном дыхании. Я словно погрузился в необычайный мир, где добро борется со злом, где зеленые рощи перемежаются с поросшими мхом статуями и древними развалинами, в мир, где пробираясь лесною тропой можно встретить остроухих неувядающих эльфов или мерзких орков – кому как повезет...
    </p>
  </Card>;
};

export const Film = () => {
  return <div className={styles.filmWrapper}>
    <FilmDescription />
  </div>;
};