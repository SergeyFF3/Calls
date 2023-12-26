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
  const {
    callsList,
    setCallsList,
    callType,
    timePeriod,
    sortCalls,
    order,
    callsByDate,
  } = useCallsContext();

  callsList.forEach((call, index) => {
    let existingDateIndex = callsByDate.findIndex(
      (item) => item.date === call.date_notime
    );

    let count = 1;
    if (existingDateIndex !== -1) {
      callsByDate[existingDateIndex].count++;
    } else {
      callsByDate.push({
        indexDay: index,
        date: call.date_notime,
        count,
      });
    }
  });

  useEffect(() => {
    getCallsList(timePeriod, today, callType, sortCalls, order).then((res) =>
      setCallsList(res)
    );
  }, [callType, timePeriod, sortCalls, order]);

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
