import dayjs from "dayjs";
import { useEffect } from "react";
import "./App.scss";
import SelectTypeCall from "./components/SelectTypeCall";
import Table from "./components/Table";
import { useCallsContext } from "./context/CallsContext";
import { getCallsList } from "./services";

function App() {
  const { callsList, setCallsList, callType } = useCallsContext();

  const today = new Date();
  const todayFormatted = dayjs(today).format("YYYY-MM-DD");

  const threeDays = today.setDate(today.getDate() - 2);
  const threeDaysFormatted = dayjs(threeDays).format("YYYY-MM-DD");

  useEffect(() => {
    getCallsList(threeDaysFormatted, todayFormatted, callType).then((res) =>
      setCallsList(res)
    );
  }, [callType]);

  if (!callsList.length) {
    return <h1>Список звонков пуст</h1>;
  }

  return (
    <main className="app">
      <div className="app__content">
        <SelectTypeCall />
        <Table callsList={callsList} />
      </div>
    </main>
  );
}

export default App;
