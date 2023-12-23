import { useEffect, useRef, useState } from "react";
import { useCallsContext } from "../../context/CallsContext";
import "./SelectTypeCall.scss";

const options = ["", "1", "0"];

export const SelectTypeCall = () => {
  const { setCallType, callType } = useCallsContext();
  const [isOpen, setIsOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const switchCallType = (type: string) => {
    switch (type) {
      case "":
        return "Все типы";
      case "1":
        return "Входящие";
      case "0":
        return "Исходящие";
      default:
        return "Все типы";
    }
  };

  const currentType = switchCallType(callType);
  const stylesCurrentType = `select__p ${callType !== "" && "active"}`;
  const arrowIconStyles = isOpen ? "select__icon-rotate" : "select__icon";
  const listStyles = `select__list ${isOpen && "open"}`;

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };

  const clearFilters = () => {
    setCallType("");
  };

  const selectOption = (option: string) => {
    setCallType(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!listRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="select" ref={listRef}>
      <div className="select__header">
        <button className="select__btn" onClick={toggleHandler}>
          <p className={stylesCurrentType}>{currentType}</p>
          <i className={arrowIconStyles}></i>
        </button>
        {callType !== "" && (
          <button className="select__btn-clear" onClick={clearFilters}>
            <p className="select__p-clear">Сбросить фильтры</p>
            <i className="select__cross-icon"></i>
          </button>
        )}
      </div>
      <ul className={listStyles}>
        {options.map((option, index) => (
          <li key={index}>
            <a
              className={`select__item ${option === callType && "active"}`}
              onClick={() => selectOption(option)}
            >
              {switchCallType(option)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
