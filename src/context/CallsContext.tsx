import { ReactNode, createContext, useContext, useState } from "react";

interface CallsContextType {
  callsList: any[];
  setCallsList: (state: any) => void;
  callType: string;
  setCallType: (state: string) => void;
}

const CallsContextDefaultValues: CallsContextType = {
  callsList: [],
  setCallsList: () => {},
  callType: "",
  setCallType: () => {},
};

const CallsContext = createContext<CallsContextType>(CallsContextDefaultValues);

type Props = {
  children: ReactNode;
};

export function CallsProvider({ children }: Props) {
  const [callsList, setCallsList] = useState([]);
  const [callType, setCallType] = useState<string>("");

  const value = {
    callsList,
    setCallsList,
    callType,
    setCallType,
  };

  return (
    <CallsContext.Provider value={value}>{children}</CallsContext.Provider>
  );
}
export function useCallsContext() {
  return useContext(CallsContext);
}
