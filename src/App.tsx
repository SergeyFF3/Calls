import dayjs from "dayjs";
import { useEffect } from "react";
import "./App.scss";
import SelectTypeCall from "./components/SelectTypeCall";
import Table from "./components/Table";
import { useCallsContext } from "./context/CallsContext";
import { getCallsList } from "./services";

function App() {
  const { callsList, setCallsList, typeCall } = useCallsContext();

  const today = new Date();
  const todayFormatted = dayjs(today).format("YYYY-MM-DD");

  const threeDays = today.setDate(today.getDate() - 2);
  const threeDaysFormatted = dayjs(threeDays).format("YYYY-MM-DD");

  useEffect(() => {
    getCallsList(threeDaysFormatted, todayFormatted, typeCall).then((res) =>
      setCallsList(res)
    );
  }, [typeCall]);

  if (!callsList.length) {
    return <h1>Список звонков пуст</h1>;
  }

  return (
    <main className="app">
      <SelectTypeCall />
      <Table callsList={callsList} />
    </main>
  );
}

export default App;
