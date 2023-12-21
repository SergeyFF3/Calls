import TableRow from "../TableRow";
import "./Table.scss";

export const Table = ({ callsList }: { callsList: any }) => {
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
        {callsList.map((call: any) => (
          <TableRow key={call.id} call={call} />
        ))}
      </tbody>
    </table>
  );
};
