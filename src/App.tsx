import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "./App.scss";
import CallPeriod from "./components/CallPeriod";
import Loader from "./components/Loader";
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
    setIsLoading,
  } = useCallsContext();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  callsList?.forEach((call, index) => {
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

  const fetchCallsList = async () => {
    const list = await getCallsList(
      timePeriod,
      today,
      callType,
      sortCalls,
      order
    )
      .then((res) => res)
      .finally(() => setIsLoading(false));

    setCallsList(list);
    setIsFirstLoad(false);
  };

  useEffect(() => {
    fetchCallsList();
  }, [callType, timePeriod, sortCalls, order]);

  if (isFirstLoad)
    return (
      <div className="wrapper">
        <Loader />
      </div>
    );

  if (!callsList?.length) {
    return (
      <div className="wrapper">
        <h1>Список звонков пуст</h1>
      </div>
    );
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
