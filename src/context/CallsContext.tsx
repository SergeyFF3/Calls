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
  date_notime: string;
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
  threeDaysPeriod: string;
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
  isOpenDate: boolean;
  setIsOpenDate: Dispatch<SetStateAction<boolean>>;
  isOpenDuration: boolean;
  setIsOpenDuration: Dispatch<SetStateAction<boolean>>;
}

const CallsContextDefaultValues: CallsContextType = {
  threeDaysPeriod: "",
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
  isOpenDate: false,
  setIsOpenDate: () => {},
  isOpenDuration: false,
  setIsOpenDuration: () => {},
};

const CallsContext = createContext<CallsContextType>(CallsContextDefaultValues);

type Props = {
  children: ReactNode;
};

const threeDaysPeriod = dayjs().subtract(2, "days").format("YYYY-MM-DD");

export function CallsProvider({ children }: Props) {
  const [callsList, setCallsList] = useState<ICallProps[]>([]);
  const [callType, setCallType] = useState<string>("");
  const [timePeriod, setTimePeriod] = useState<string>(threeDaysPeriod);
  const [sortCalls, setSortCalls] = useState<string>("date");
  const [order, setOrder] = useState<string>("DESC");
  const [isOpenDate, setIsOpenDate] = useState<boolean>(false);
  const [isOpenDuration, setIsOpenDuration] = useState<boolean>(false);

  let callsByDate: ICallSByDate[] = [];

  const value = {
    threeDaysPeriod,
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
    isOpenDate,
    setIsOpenDate,
    isOpenDuration,
    setIsOpenDuration,
  };

  return (
    <CallsContext.Provider value={value}>{children}</CallsContext.Provider>
  );
}
export function useCallsContext() {
  return useContext(CallsContext);
}
