import { useEffect, useState } from "react";
import "./App.scss";
import Table from "./components/Table";
import { getList } from "./services";

function App() {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    getList().then((res) => setCalls(res));
  }, []);

  if (!calls.length) {
    return <h1>Список звонков пуст</h1>;
  }

  return (
    <main className="app">
      <Table calls={calls} />
    </main>
  );
}

export default App;
