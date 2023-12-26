import { ReactNode } from "react";
import "./RowLabel.scss";

export const RowLabel = ({
  children,
  order,
}: {
  children: ReactNode;
  order?: string;
}) => (
  <tr className={`row ${order}`}>
    <td>
      <p>{children}</p>
    </td>
  </tr>
);
