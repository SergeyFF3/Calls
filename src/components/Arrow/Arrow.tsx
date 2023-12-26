import "./Arrow.scss";

export const Arrow = ({ isOpen }: { isOpen: boolean }) => {
  const arrowIconStyles = isOpen ? "icon" : "icon-rotate";

  return <i className={arrowIconStyles}></i>;
};
