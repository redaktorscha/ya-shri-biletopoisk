import { Ticket } from "@/components/Ticket/Ticket";
import styles from "./TicketSelection.module.css";

export const TicketSelection = () => {
  const filmDetails = {
    filmName: "Властелин колец: Братство кольца",
    filmGenre: "Фэнтези",
  };

  const tickets = [
    filmDetails,
    filmDetails,
    filmDetails,
    filmDetails,
    filmDetails,
  ];

  return (
    <div className={styles.ticketsWrapper}>
      {
        tickets.map(({ filmName, filmGenre }, index) => (
          <Ticket
            key={index}
            filmName={filmName}
            filmGenre={filmGenre}
            isCheckoutItem = {false}
            clickHandler={null}
          />
        ))}
    </div>
  );
};
