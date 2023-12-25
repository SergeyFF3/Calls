import "./Arrow.scss";

export const Arrow = ({ isOpen }: { isOpen: boolean }) => {
  const arrowIconStyles = isOpen ? "icon-rotate" : "icon";

  return <i className={arrowIconStyles}></i>;
};
