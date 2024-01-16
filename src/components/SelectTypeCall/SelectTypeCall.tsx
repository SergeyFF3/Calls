import { useEffect, useRef, useState } from "react";
import { useCallsContext } from "../../context/CallsContext";
import Arrow from "../Arrow";
import Popap from "../Popap";
import "./SelectTypeCall.scss";

const options = ["Все типы", "Входящие", "Исходящие"];

export const SelectTypeCall = () => {
  const {
    setCallType,
    setSortCalls,
    setOrder,
    setTimePeriod,
    setIsOpenDate,
    setIsOpenDuration,
    threeDaysPeriod,
    isLoading,
    setIsLoading,
  } = useCallsContext();
  const [isOpen, setIsOpen] = useState(false);
  const [currentType, setCurrentType] = useState(options[0]);
  const listRef = useRef<HTMLDivElement>(null);

  const switchCallType = (type: string) => {
    switch (type) {
      case "Все типы":
        setCallType("");
        break;
      case "Входящие":
        setCallType("1");
        break;
      case "Исходящие":
        setCallType("0");
        break;
      default:
        setCallType("");
        break;
    }
  };

  const stylesCurrentType = `select__p ${
    currentType !== "Все типы" && "active"
  }`;

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };

  const clearFilters = () => {
    setIsLoading(true);
    setCallType("");
    setCurrentType("Все типы");
    setTimePeriod(threeDaysPeriod);
    setSortCalls("date");
    setOrder("DESC");
    setIsOpenDate(false);
    setIsOpenDuration(false);
  };

  const selectOption = (option: string) => {
    if (option !== currentType) {
      setIsLoading(true);
      switchCallType(option);
      setCurrentType(option);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!listRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="select" ref={listRef}>
      <div className="select__header">
        <button
          className="select__btn"
          onClick={toggleHandler}
          disabled={isLoading}
        >
          <p className={stylesCurrentType}>{currentType}</p>
          <span className="select__arrow">
            <Arrow isOpen={isOpen} />
          </span>
        </button>
        {currentType !== "Все типы" && (
          <button
            className="select__btn-clear"
            onClick={clearFilters}
            disabled={isLoading}
          >
            <p className="select__p-clear">Сбросить фильтры</p>
            <i className="select__cross-icon"></i>
          </button>
        )}
      </div>
      <Popap
        itemsList={options}
        currentItem={currentType}
        selectOption={selectOption}
        isOpen={isOpen}
        position="left"
      />
    </div>
  );
};
