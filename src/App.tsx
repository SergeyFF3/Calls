import dayjs from "dayjs";
import { useEffect } from "react";
import "./App.scss";
import CallPeriod from "./components/CallPeriod";
import SelectTypeCall from "./components/SelectTypeCall";
import Table from "./components/Table";
import { useCallsContext } from "./context/CallsContext";
import { getCallsList } from "./services";

const today = dayjs().format("YYYY-MM-DD");

function App() {
  const { callsList, setCallsList, callType, timePeriod } = useCallsContext();

  useEffect(() => {
    getCallsList(timePeriod, today, callType).then((res) => setCallsList(res));
  }, [callType, timePeriod]);

  if (!callsList.length) {
    return <h1>Список звонков пуст</h1>;
  }

  return (
    <main className="app">
      <div className="app__content">
        <div className="app__setting">
          <SelectTypeCall />
          <CallPeriod />
        </div>
        <Table callsList={callsList} />
      </div>
    </main>
  );
}

export default App;
