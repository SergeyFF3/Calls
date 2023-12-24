import dayjs from "dayjs";
import { ReactNode, createContext, useContext, useState } from "react";

interface CallsContextType {
  callsList: any[];
  setCallsList: (state: any) => void;
  callType: string;
  setCallType: (state: string) => void;
  timePeriod: string;
  setTimePeriod: (state: string) => void;
}

const CallsContextDefaultValues: CallsContextType = {
  callsList: [],
  setCallsList: () => {},
  callType: "",
  setCallType: () => {},
  timePeriod: "",
  setTimePeriod: () => {},
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

  const value = {
    callsList,
    setCallsList,
    callType,
    setCallType,
    timePeriod,
    setTimePeriod,
  };

  return (
    <CallsContext.Provider value={value}>{children}</CallsContext.Provider>
  );
}
export function useCallsContext() {
  return useContext(CallsContext);
}
