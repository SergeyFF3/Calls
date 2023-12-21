import "./CallField.scss";

export const CallField = (props: any) => {
  const { name, phone, statusCall } = props;

  if (statusCall !== "Недозвон") return phone;

  return (
    <div className="call">
      <p className="call__name">{name}</p>
      <p className="call__phone">{phone}</p>
    </div>
  );
};
