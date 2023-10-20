"use client";
import { createContext, useState } from "react";

interface UI {
  user: string;
  login: (user: string) => void;
  logout: () => void;
}

export const UIContext = createContext<UI>({
  user: "",
  login: (user: string) => {},
  logout: () => {},
});

interface ProviderProps {
  children: React.ReactNode;
}

export default function UIContextProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<string>("");

  return (
    <UIContext.Provider
      value={{ user, login: setUser, logout: () => setUser("") }}
    >
      {children}
    </UIContext.Provider>
  );
}
