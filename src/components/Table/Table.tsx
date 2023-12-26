import { ICallProps, useCallsContext } from "../../context/CallsContext";
import Arrow from "../Arrow";
import Loader from "../Loader";
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
    isLoading,
    setIsLoading,
  } = useCallsContext();

  const sortByDate = () => {
    setIsLoading(true);
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
    setIsLoading(true);
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

  if (isLoading) {
    return (
      <div className="table-loader">
        <Loader />
      </div>
    );
  }

  return (
    <table className="table">
      <thead className="table__header">
        <tr className="table__header-row">
          <th className="table__header-col">Тип</th>
          <th className="table__header-col">
            <a className="table__link" onClick={sortByDate}>
              <p>Время</p>
              <span className="table__arrow">
                <Arrow isOpen={isOpenDate} />
              </span>
            </a>
          </th>
          <th className="table__header-col">Сотрудник</th>
          <th className="table__header-col">Звонок</th>
          <th className="table__header-col">Источник</th>
          <th className="table__header-col">Оценка</th>
          <th className="table__header-col">
            <a className="table__link" onClick={sortByDuration}>
              <p>Длительность</p>
              <span className="table__arrow">
                <Arrow isOpen={isOpenDuration} />
              </span>
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
