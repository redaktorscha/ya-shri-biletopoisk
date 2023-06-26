"use client";

import { useCallback, useState, useContext } from "react";
import { AccordionContext } from "@/contexts/AccordionContext";

import styles from "./QABlock.module.css";
import { Card } from "@/components/Card/Card";
import { Text } from "@/components/Text/Text";

const questionsAnswers = [
  {
    id: 1,
    question: "Что такое Билетопоиск?",
    answer:
      "Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов.",
  },
  {
    id: 2,
    question: "Какой компании принадлежит Билетопоиск?",
    answer: "Ответили в личке.",
  },
  {
    id: 3,
    question: "Как купить билет на Билетопоиск?",
    answer: "Ответили в личке.",
  },
  {
    id: 4,
    question: "Как оставить отзыв на Билетопоиск?",
    answer: "Ответили в личке.",
  },
];

const Accordion = ({ children }) => {
  const [activeItemId, setActiveItemId] = useState(null);

  const switchActiveItem = useCallback(
    (itemId) => {
      const newId = itemId === activeItemId ? null : itemId;
      setActiveItemId(newId);
    },
    [activeItemId]
  );

  return (
    <AccordionContext.Provider value={{ activeItemId, switchActiveItem }}>
      <div className={styles.accordionWrapperInner}>{children}</div>
    </AccordionContext.Provider>
  );
};

Accordion.Panel = function AccordionPanel({ text }) {
  return (
    <div className={styles.accordionItemPanel}>
      <Text>{text}</Text>
    </div>
  );
};

Accordion.Button = function AccordionButton({ clickHandler, isOpen }) {
  return (
    <button className={styles.accordionButton} onClick={clickHandler}>
      {isOpen && (
        <svg className={styles.accordionButtonIcon}>
          <use href={"#icon-up"} />
        </svg>
      )}
      {!isOpen && (
        <svg className={styles.accordionButtonIcon}>
          <use href={"#icon-down"} />
        </svg>
      )}
    </button>
  );
};

Accordion.Item = function AccordionItem({ id, question, answer }) {
  const { activeItemId, switchActiveItem } = useContext(AccordionContext);

  return (
    <Card>
      <div className={styles.accordionItemWrapper}>
        <div className={styles.accordionItemHeadingWrapper}>
          <h4 className={styles.accordionItemHeading}>{question}</h4>
          <Accordion.Button
            clickHandler={() => switchActiveItem(id)}
            isOpen={activeItemId === id}
          />
        </div>
        {activeItemId === id && <Accordion.Panel text={answer} />}
      </div>
    </Card>
  );
};

export const QABlock = () => {
  return (
    <div className={styles.accordionWrapper}>
      <Card>
        <h1>Вопросы-ответы</h1>
      </Card>
      <Accordion>
        {/* <Accordion.Item
          id={1}
          question={"Что такое Билетопоиск?"}
          answer={
            "Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов."
          }
        />
        <Accordion.Item
          id={2}
          question={"Что такое Билетопоиск?"}
          answer={
            "Мы — крупнейший сервис о кино в рунете. На нем вы сможете посмотреть фильмы и сериалы, купить билеты в кино, узнать рейтинги популярных видео и интересные факты, поставить фильмам оценки, написать рецензии и дополнить описание фильмов."
          }
        /> */}
        {questionsAnswers.map(({ id, question, answer }) => (
          <Accordion.Item
            key={question}
            id={id}
            question={question}
            answer={answer}
          />
        ))}
      </Accordion>
    </div>
  );
};
