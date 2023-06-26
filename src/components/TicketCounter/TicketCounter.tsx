import { useSelector, useDispatch } from "react-redux";
import {
  incrementItemCount,
  decrementItemCount,
  setItemForRemove,
} from "@/store/slices/cartSlice";
import styles from "./TicketCounter.module.css";

const IconButton = ({ handleClick, iconHref, isDisabled, buttonClass }) => {
  return (
    <button
      disabled={isDisabled}
      className={`${buttonClass} ${styles.ticketButton}`}
      onClick={handleClick}
    >
      <svg className={styles.ticketButtonIcon}>
        <use href={iconHref} />
      </svg>
    </button>
  );
};

export const TicketCounter = ({ isCheckoutItem, openModal, id }) => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart.items);
  const currentTicket = cartState.find((item) => item.id === id);
  const count = currentTicket === undefined ? 0 : currentTicket.count;
  const MAX_TICKETS = 30;
  const MIN_TICKETS = 0;

  const isDisabledIncrement = count === MAX_TICKETS;
  const isDisabledDecrement = count === MIN_TICKETS;

  const buttonClassIncrement =
    count === MAX_TICKETS
      ? styles.ticketButtonDisabled
      : styles.ticketButtonActive;

  const buttonClassDecrement =
    count === MIN_TICKETS
      ? styles.ticketButtonDisabled
      : styles.ticketButtonActive;

  return (
    <div className={styles.ticketInteraction}>
      <IconButton
        handleClick={() => {
          if (isCheckoutItem) {
            if (count === 1) {
              dispatch(setItemForRemove({ id }));
              openModal();
            } else {
              dispatch(decrementItemCount({ id }));
            }
          } else {
            dispatch(decrementItemCount({ id }));
          }
        }}
        iconHref={"#minus-icon"}
        isDisabled={isDisabledDecrement}
        buttonClass={buttonClassDecrement}
      />
      <span className={styles.ticketCountLabel}>{count}</span>
      <IconButton
        handleClick={() => {
          dispatch(incrementItemCount({ id }));
        }}
        iconHref={"#plus-icon"}
        isDisabled={isDisabledIncrement}
        buttonClass={buttonClassIncrement}
      />
      {isCheckoutItem && (
        <div className={styles.removeButtonWrapper}>
          <button
            onClick={() => {
              dispatch(setItemForRemove({ id }));
              openModal();
            }}
            className={styles.removeButton}
          >
            <svg className={styles.closeButtonIcon}>
              <use href="#close-icon" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};
