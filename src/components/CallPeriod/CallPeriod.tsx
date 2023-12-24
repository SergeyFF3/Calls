import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { useCallsContext } from "../../context/CallsContext";
import "./CallPeriod.scss";

const periods: string[] = ["3 дня", "Неделя", "Месяц", "Год"];

export const CallPeriod = () => {
  const { setTimePeriod } = useCallsContext();
  const [currentPeriod, setCurrentPeriod] = useState(periods[0]);
  const [isOpen, setIsOpen] = useState(false);
  const periodRef = useRef<HTMLDivElement>(null);

  const listStyles = `period__list ${isOpen && "open"}`;
  let currentPeriodIndex = periods.indexOf(currentPeriod);

  const switchPeriod = (period: string) => {
    switch (period) {
      case "3 дня":
        const threeDays = dayjs().subtract(2, "days").format("YYYY-MM-DD");
        setTimePeriod(threeDays);
        break;
      case "Неделя":
        const week = dayjs().subtract(6, "days").format("YYYY-MM-DD");
        setTimePeriod(week);
        break;
      case "Месяц":
        const daysInMonth = dayjs().daysInMonth();
        const month = dayjs()
          .subtract(daysInMonth, "days")
          .format("YYYY-MM-DD");
        setTimePeriod(month);
        break;
      case "Год":
        const year = dayjs().subtract(364, "days").format("YYYY-MM-DD");
        setTimePeriod(year);
        break;
      default:
        const defaultPeriod = dayjs().subtract(2, "days").format("YYYY-MM-DD");
        setTimePeriod(defaultPeriod);
        break;
    }
  };

  const toggleHandler = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    switchPeriod(option);
    setCurrentPeriod(option);
    setIsOpen(false);
  };

  const nextPeriodHandler = () => {
    if (currentPeriodIndex < periods.length - 1) {
      currentPeriodIndex++;
      setCurrentPeriod(periods[currentPeriodIndex]);
      setTimePeriod(currentPeriod);
    }
  };

  const backPeriodHandler = () => {
    if (currentPeriodIndex > 0) {
      currentPeriodIndex--;
      setCurrentPeriod(periods[currentPeriodIndex]);
      setTimePeriod(currentPeriod);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (!periodRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={periodRef} className="period">
      <button className="period__arrow-btn" onClick={backPeriodHandler}>
        <i className="period__arrow-left"></i>
      </button>
      <button onClick={toggleHandler} className="period__btn">
        <i className="period__calendar-icon"></i>
        <div className="period__time">{currentPeriod}</div>
      </button>
      <div>
        <ul className={listStyles}>
          {periods.map((period, index) => (
            <li key={index}>
              <a
                className={`select__item ${
                  period === currentPeriod && "active"
                }`}
                onClick={() => selectOption(period)}
              >
                {period}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <button className="period__arrow-btn" onClick={nextPeriodHandler}>
        <i className="period__arrow-right"></i>
      </button>
    </div>
  );
};
