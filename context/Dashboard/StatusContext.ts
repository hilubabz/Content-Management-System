"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactElement,
} from "react";

type StatusContextType = {
  status: string;
  setStatus: (u: string) => void;
  startDate: Date | undefined;
  setStartDate: (u: Date) => void;
  endDate: Date | undefined;
  setEndDate: (u: Date) => void;
  category: string;
  setCategory: (u: string) => void;
  getData: boolean;
  setGetData: (u: boolean) => void;
};

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export function StatusProvider({ children }: { children: ReactElement }) {
  const [status, setStatus] = useState<string>("all");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [category, setCategory] = useState<string>("all");
  const [getData, setGetData] = useState(false);
  return React.createElement(
    StatusContext.Provider,
    {
      value: {
        status,
        setStatus,
        startDate,
        setStartDate,
        endDate,
        setEndDate,
        category,
        setCategory,
        getData,
        setGetData,
      },
    },
    children,
  );
}

export function useStatus() {
  const ctx = useContext(StatusContext);
  if (!ctx) {
    throw new Error("useStatus must be used within a StatusProvider");
  }
  return ctx;
}
