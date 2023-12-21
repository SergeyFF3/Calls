import "./CallField.scss";

export const CallField = (props: any) => {
  const { name, phone, callStatus } = props;

  if (callStatus !== "Недозвон") return phone;

  return (
    <div className="call">
      <p className="call__name">{name}</p>
      <p className="call__phone">{phone}</p>
    </div>
  );
};
