"use client";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";

import styles from "./Form.module.css";

const InputText = ({ filterName, title, placeholder }) => {
  const [value, setValue] = useState("");
  // const [isActive, setIsActive] = useState(false);
  // const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // const formElementClass = (isActive || isFocused)
  //   ? `${styles.formElement} ${styles.formElementActive}`
  //   : `${styles.formElement}`;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // useEffect(() => {
  //   if (value !== "") {
  //     setIsActive(true);
  //   } else {
  //     setIsActive(false);
  //   }
  // }, [value]);

  return (
    <div className={styles.formControl}>
      <label className={styles.formLabel} htmlFor={title}>
        {title}
      </label>
      <input
        className={styles.formElement}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        id={title}
        placeholder={placeholder}
        value={value}
        ref={inputRef}
      />
    </div>
  );
};

const OptionListElement = ({ title, onSelect }) => {
  return (
    <button onClick={onSelect} className={styles.optionElem}>
      {title}
    </button>
  );
};

const DropDownSelect = ({ filterName, title, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(placeholder);

  const toggleDropDown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen])

  const options = useMemo(
    () => ["Не выбрано", "action", "fantasy", "comedy", "horror"],
    []
  );

  const closeDropDown = useCallback(() => {
    console.log('isOpen', isOpen);
    setIsOpen(false);
    setValue(options[0]);
  }, [options]);

  const selectOption = useCallback((selected) => {
    setValue(selected);
    setIsOpen(false);
  }, []);

  const formElementClass = isOpen
    ? `${styles.formElement} ${styles.formElementActive}`
    : `${styles.formElement}`;

  return (
    <div className={styles.formControl}>
      <div className={styles.formLabel}>{title}</div>
      <div className={styles.dropDownInner}>
        <div className={formElementClass}>
          <div className={styles.placeholderWrapper}>
            <div className={styles.placeholder}>{value}</div>
            <button
              className={styles.dropDownButton}
              onClick={toggleDropDown}
            >
              {isOpen && (
                <svg className={styles.dropDownButtonIcon}>
                  <use href={"#icon-up-sm"} />
                </svg>
              )}
              {!isOpen && (
                <svg className={styles.dropDownButtonIcon}>
                  <use href={"#icon-down-sm"} />
                </svg>
              )}
            </button>
          </div>
        </div>
        {isOpen && <div className={styles.optionsList}>
          {options.map((title) => (
            <OptionListElement
              key={title}
              title={title}
              onSelect={selectOption}
            />
          ))}
        </div>}
      </div>
    </div>
  );
};

const FormControl = ({ type, filterName, title, placeholder }) => {
  if (type === "text") {
    return (
      <InputText
        filterName={filterName}
        title={title}
        placeholder={placeholder}
      />
    );
  }

  if (type === "select") {
    return (
      <DropDownSelect
        filterName={filterName}
        title={title}
        placeholder={placeholder}
      />
    );
  }

  return null;
};

export const Form = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()} className={styles.formElem}>
      <FormControl
        type="text"
        filterName="name"
        title="Название"
        placeholder="Введите название"
      />
      <FormControl
        type="select"
        filterName="genre"
        title="Жанр"
        placeholder="Выберите жанр"
      />
      <FormControl
        type="select"
        filterName="cinema"
        title="Кинотеатр"
        placeholder="Выберите кинотеатр"
      />
    </form>
  );
};
