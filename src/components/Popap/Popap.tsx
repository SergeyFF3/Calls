import { FC } from "react";
import "./Popap.scss";

interface IPopap {
  itemsList: string[];
  currentItem: string;
  selectOption: (option: string) => void;
  isOpen: boolean;
  position: string;
}

export const Popap: FC<IPopap> = (props) => {
  const { itemsList, currentItem, selectOption, isOpen, position } = props;

  const listStyles = `${position} ${isOpen && "open"}`;

  return (
    <ul className={listStyles}>
      {itemsList.map((item, index) => (
        <li key={index}>
          <a
            className={`item ${item === currentItem && "active"}`}
            onClick={() => selectOption(item)}
          >
            {item}
          </a>
        </li>
      ))}
    </ul>
  );
};
