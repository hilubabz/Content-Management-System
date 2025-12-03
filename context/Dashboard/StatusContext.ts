"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactElement,
} from "react";

type StatusContextType = {
  status: string;
  setStatus: (u: string) => void;
};

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export function StatusProvider({ children }: { children: ReactElement }) {
  const [status, setStatus] = useState<string>("all");
  return React.createElement(
    StatusContext.Provider,
    { value: { status, setStatus } },
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
