import TableRow from "../TableRow";

export const Table = ({ calls }: { calls: any }) => {
  return (
    <table className="app__table">
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
        {calls.map((call: any) => (
          <TableRow key={call.id} call={call} />
        ))}
      </tbody>
    </table>
  );
};
