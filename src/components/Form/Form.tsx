"use client";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { Portal } from "@/components/Portal/Portal";
import { DropDownContext } from "@/contexts/DropDownContext";

import styles from "./Form.module.css";

const InputText = ({ filterName, title, placeholder, id }) => {
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
      <label className={styles.formLabel} htmlFor={id}>
        {title}
      </label>
      <input
        className={styles.formElement}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        id={id}
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

const DropDownSelect = ({ filterName, title, placeholder, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(placeholder);

  const toggleDropDown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const options = useMemo(
    () => ["Не выбрано", "action", "fantasy", "comedy", "horror"],
    []
  );

  const closeDropDown = useCallback(() => {
    setIsOpen(false);
    setValue(options[0]);
  }, [options]);

  const selectOption = useCallback((selected) => {
    setValue(selected);
    setIsOpen(false);
  }, []);

  const { classes } = useContext(DropDownContext);
  const cssClass = classes[id];

  const formElementClass = isOpen
    ? `${styles.formElement} ${styles.formElementActive}`
    : `${styles.formElement}`;

  return (
    <div className={styles.formControl}>
      <div className={styles.formLabel}>{title}</div>
      <div id={id} className={styles.dropDownInner}>
        <div className={formElementClass}>
          <div className={styles.placeholderWrapper}>
            <div className={styles.placeholder}>{value}</div>
            <button className={styles.dropDownButton} onClick={toggleDropDown}>
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
        <Portal selector={"aside"}>
          {isOpen && (
            <div className={`${styles.optionsList} ${cssClass}`}>
              {options.map((title) => (
                <OptionListElement
                  key={title}
                  title={title}
                  onSelect={selectOption}
                />
              ))}
            </div>
          )}
        </Portal>
      </div>
    </div>
  );
};

const FormControl = ({ type, filterName, title, placeholder, id }) => {
  if (type === "text") {
    return (
      <InputText
        filterName={filterName}
        title={title}
        placeholder={placeholder}
        id={id}
      />
    );
  }

  if (type === "select") {
    return (
      <DropDownSelect
        filterName={filterName}
        title={title}
        placeholder={placeholder}
        id={id}
      />
    );
  }

  return null;
};

export const Form = () => {
  const classes = {
    dd1: "pos1",
    dd2: "pos2",
  };

  return (
    <DropDownContext.Provider value={{ classes }}>
      <form onSubmit={(e) => e.preventDefault()} className={styles.formElem}>
        <FormControl
          type="text"
          filterName="name"
          title="Название"
          placeholder="Введите название"
          id="inp1"
        />

        <FormControl
          type="select"
          filterName="genre"
          title="Жанр"
          placeholder="Выберите жанр"
          id="dd1"
        />

        <FormControl
          type="select"
          filterName="cinema"
          title="Кинотеатр"
          placeholder="Выберите кинотеатр"
          id="dd2"
        />
      </form>
    </DropDownContext.Provider>
  );
};
