"use client";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { Portal } from "@/components/Portal/Portal";
import { DropDownContext } from "@/contexts/DropDownContext";
import { setActiveFilter } from "@/store/slices/filterSlice";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Form.module.css";

const InputText = ({ filterName, title, placeholder, id }) => {
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const dispatch = useDispatch();


  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (value !== "") {
      dispatch(setActiveFilter({ filterName, filterValue: value }));
    } else {
      dispatch(setActiveFilter({ filterName, filterValue: null }));
    }
  }, [dispatch, filterName, value]);

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
  const [defaultSelect, setDefaultSelect] = useState("");

  useEffect(() => {
    const defaultVal =
      filterName === "genre" ? "Выберите жанр" : "Выберите кинотеатр";

    setDefaultSelect(defaultVal);
  }, [filterName]);

  const dispatch = useDispatch();

  const toggleDropDown = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);


  const optionsGenre = useSelector((state) => state.genre);
  const optionsCinemaList = useSelector((state) => state.cinema).map(({name}) => name);

  const currentList = filterName === "genre" ? ["Не выбрано", ...optionsGenre] : ["Не выбрано", ...optionsCinemaList];

  const selectOption = useCallback(
    (selected, defaultValue) => {
      if (selected === "Не выбрано") {
        setValue(defaultValue);
      } else {
        setValue(selected);
      }
      setIsOpen(false);
    },
    []
  );

  useEffect(() => {
    if (value !== defaultSelect) {
      console.log(value);
      dispatch(setActiveFilter({ filterName, filterValue: value }));
    } else {
      dispatch(setActiveFilter({ filterName, filterValue: null }));
    }
  }, [defaultSelect, dispatch, filterName, value]);

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
              {currentList.map((option) => (
                <OptionListElement
                  key={option}
                  title={option}
                  onSelect={() => selectOption(option, defaultSelect)}
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
          filterName="title"
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
