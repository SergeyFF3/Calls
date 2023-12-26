import dayjs from "dayjs";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  SetStateAction,
  Dispatch,
} from "react";

export interface ICallSByDate {
  indexDay: number;
  date: string;
  count: number;
}

export interface ICallProps {
  id: number;
  date: string;
  data_notime: string;
  time: number;
  from_number: string;
  to_number: string;
  status: string;
  record: string;
  in_out: number;
  person_name: string;
  person_avatar: string;
}

interface CallsContextType {
  callsByDate: ICallSByDate[];
  callsList: ICallProps[];
  setCallsList: Dispatch<SetStateAction<ICallProps[]>>;
  callType: string;
  setCallType: Dispatch<SetStateAction<string>>;
  timePeriod: string;
  setTimePeriod: Dispatch<SetStateAction<string>>;
  sortCalls: string;
  setSortCalls: Dispatch<SetStateAction<string>>;
  order: string;
  setOrder: Dispatch<SetStateAction<string>>;
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
  const [callsList, setCallsList] = useState<ICallProps[]>([]);
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
