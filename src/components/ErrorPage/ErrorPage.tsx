import "./ErrorPage.scss";

export const ErrorPage = () => {
  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="error-page">
      <h2 className="error-page__text">Произошла непредвиденная ошибка</h2>
      <button className="error-page__btn" onClick={reloadPage}>
        Обновить страницу
      </button>
    </div>
  );
};
