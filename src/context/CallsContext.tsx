import { ReactNode, createContext, useContext, useState } from "react";

interface CallsContextType {
  callsList: any[];
  setCallsList: (state: any) => void;
  typeCall: string;
  setTypeCall: (state: string) => void;
}

const CallsContextDefaultValues: CallsContextType = {
  callsList: [],
  setCallsList: () => {},
  typeCall: "",
  setTypeCall: () => {},
};

const CallsContext = createContext<CallsContextType>(CallsContextDefaultValues);

type Props = {
  children: ReactNode;
};

export function CallsProvider({ children }: Props) {
  const [callsList, setCallsList] = useState([]);
  const [typeCall, setTypeCall] = useState<string>("");

  const value = {
    callsList,
    setCallsList,
    typeCall,
    setTypeCall,
  };

  return (
    <CallsContext.Provider value={value}>{children}</CallsContext.Provider>
  );
}
export function useCallsContext() {
  return useContext(CallsContext);
}
