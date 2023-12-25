import TableRow from "../TableRow";
import "./Table.scss";

interface ICallSByDate {
  indexDay: number;
  date: string;
  count: number;
}

export const Table = ({ callsList }: { callsList: any }) => {
  let callsByDate: ICallSByDate[] = [];

  callsList.forEach((call: any, index: number) => {
    let existingDateIndex = callsByDate.findIndex(
      (item) => item.date === call.date_notime
    );
    let count = 1;
    if (existingDateIndex !== -1) {
      callsByDate[existingDateIndex].count++;
    } else {
      callsByDate.push({
        indexDay: index,
        date: call.date_notime,
        count,
      });
    }
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Тип</th>
          <th>Время</th>
          <th>Сотрудник</th>
          <th>Звонок</th>
          <th>Источник</th>
          <th>Оценка</th>
          <th>Длительность</th>
        </tr>
      </thead>
      <tbody>
        {callsList.map((call: any, index: number) => (
          <TableRow
            key={call.id}
            call={call}
            callsByDate={callsByDate}
            index={index}
          />
        ))}
      </tbody>
    </table>
  );
};
