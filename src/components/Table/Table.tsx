import { useState } from "react";
import { ICallProps, useCallsContext } from "../../context/CallsContext";
import Arrow from "../Arrow";
import TableRow from "../TableRow";
import "./Table.scss";

export const Table = ({ callsList }: { callsList: ICallProps[] }) => {
  const {
    setOrder,
    setSortCalls,
    isOpenDate,
    setIsOpenDate,
    isOpenDuration,
    setIsOpenDuration,
  } = useCallsContext();

  const sortByDate = () => {
    setIsOpenDate(!isOpenDate);
    setIsOpenDuration(false);

    if (isOpenDate) {
      setSortCalls("date");
      setOrder("DESC");
    }
    if (!isOpenDate) {
      setSortCalls("date");
      setOrder("ASC");
    }
  };

  const sortByDuration = () => {
    setIsOpenDuration(!isOpenDuration);
    setIsOpenDate(false);

    if (isOpenDuration) {
      setSortCalls("duration");
      setOrder("DESC");
    }
    if (!isOpenDuration) {
      setSortCalls("duration");
      setOrder("ASC");
    }
  };

  return (
    <table className="table">
      <thead className="table__header">
        <tr className="table__header-row">
          <th className="table__header-col">Тип</th>
          <th className="table__header-col">
            <a className="table__link" onClick={sortByDate}>
              <p>Время</p>
              <i className="table__arrow">
                <Arrow isOpen={isOpenDate} />
              </i>
            </a>
          </th>
          <th className="table__header-col">Сотрудник</th>
          <th className="table__header-col">Звонок</th>
          <th className="table__header-col">Источник</th>
          <th className="table__header-col">Оценка</th>
          <th className="table__header-col">
            <a className="table__link" onClick={sortByDuration}>
              <p>Длительность</p>
              <i className="table__arrow">
                <Arrow isOpen={isOpenDuration} />
              </i>
            </a>
          </th>
        </tr>
      </thead>
      <tbody className="table__body">
        {callsList.map((call, index) => (
          <TableRow key={call.id} call={call} index={index} />
        ))}
      </tbody>
    </table>
  );
};
