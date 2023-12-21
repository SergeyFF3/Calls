import { useCallsContext } from "../../context/CallsContext";

export const SelectTypeCall = () => {
  const { setTypeCall, typeCall } = useCallsContext();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeCall(event.target.value as string);
  };

  return (
    <select value={typeCall} onChange={handleChange}>
      <option value="">Все типы</option>
      <option value="1">Входящие</option>
      <option value="0">Исходящие</option>
    </select>
  );
};
