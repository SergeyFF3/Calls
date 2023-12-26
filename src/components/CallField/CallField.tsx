import { FC } from "react";
import "./CallField.scss";

interface ICallField {
  name: string;
  phone: string;
  callStatus: string;
}

export const CallField: FC<ICallField> = (props) => {
  const { name, phone, callStatus } = props;

  if (callStatus !== "Недозвон") return <p>{phone}</p>;

  return (
    <div className="call">
      <p className="call__name">{name}</p>
      <p className="call__phone">{phone}</p>
    </div>
  );
};
