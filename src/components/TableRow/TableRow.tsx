import dayjs from "dayjs";

export const TableRow = ({ call }: { call: any }) => {
  const day = dayjs(call.date).format("HH:mm");

  return (
    <tr>
      <td>-</td>
      <td>{day}</td>
      <td>
        <img src={call.person_avatar} alt="avatar" />
      </td>
      <td>{call.from_number}</td>
      <td>-</td>
      <td>-</td>
      <td>{call.time || "-"}</td>
    </tr>
  );
};
