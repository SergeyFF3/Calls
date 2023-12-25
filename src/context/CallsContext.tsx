import dayjs from "dayjs";
import { ReactNode, createContext, useContext, useState } from "react";

interface ICallSByDate {
  indexDay: number;
  date: string;
  count: number;
}

interface CallsContextType {
  callsByDate: ICallSByDate[];
  callsList: any[];
  setCallsList: (state: any) => void;
  callType: string;
  setCallType: (state: string) => void;
  timePeriod: string;
  setTimePeriod: (state: string) => void;
  sortCalls: string;
  setSortCalls: (state: string) => void;
  order: string;
  setOrder: (state: string) => void;
}

const CallsContextDefaultValues: CallsContextType = {
  callsByDate: [],
  callsList: [],
  setCallsList: () => {},
  callType: "",
  setCallType: () => {},
  timePeriod: "",
  setTimePeriod: () => {},
  sortCalls: "",
  setSortCalls: () => {},
  order: "",
  setOrder: () => {},
};

const CallsContext = createContext<CallsContextType>(CallsContextDefaultValues);

type Props = {
  children: ReactNode;
};

const threeDays = dayjs().subtract(2, "days").format("YYYY-MM-DD");

export function CallsProvider({ children }: Props) {
  const [callsList, setCallsList] = useState([]);
  const [callType, setCallType] = useState<string>("");
  const [timePeriod, setTimePeriod] = useState<string>(threeDays);
  const [sortCalls, setSortCalls] = useState<string>("date");
  const [order, setOrder] = useState<string>("DESC");

  let callsByDate: ICallSByDate[] = [];

  const value = {
    callsByDate,
    callsList,
    setCallsList,
    callType,
    setCallType,
    timePeriod,
    setTimePeriod,
    sortCalls,
    setSortCalls,
    order,
    setOrder,
  };

  return (
    <CallsContext.Provider value={value}>{children}</CallsContext.Provider>
  );
}
export function useCallsContext() {
  return useContext(CallsContext);
}
