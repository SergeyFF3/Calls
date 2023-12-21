import { useEffect, useState } from "react";
import "./EvaluationOfCall.scss";

interface IEstimation {
  state: string;
  styles: string;
}

export const EvaluationOfCall = ({ phone }: { phone: string }) => {
  const [estimation, setEstimation] = useState<IEstimation>();

  const switchEstimation = () => {
    switch (phone.slice(-1)) {
      case "1":
        setEstimation({
          state: "Скрипт не использован",
          styles: "style-script",
        });
        break;
      case "4" || "5":
        setEstimation({ state: "Отлично", styles: "style-excellent" });
        break;
      case "8":
        setEstimation({ state: "Хорошо", styles: "style-good" });
        break;
      case "7" || "9":
        setEstimation({ state: "Плохо", styles: "style-badly" });
        break;
      default:
        setEstimation({ state: "", styles: "" });
    }
  };

  useEffect(() => {
    switchEstimation();
  }, []);

  if (!estimation) {
    return null;
  }

  return <div className={estimation.styles}>{estimation.state}</div>;
};
