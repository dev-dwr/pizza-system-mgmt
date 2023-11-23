"use client";
import { FamilyRestroom } from "@mui/icons-material";
import { createContext, useCallback, useEffect, useState } from "react";

interface UI {
  user: string;
  employee: boolean;
  login: (user: string) => void;
  logout: () => void;
}

export const UIContext = createContext<UI>({
  user: "",
  employee: false,
  login: (user: string) => {},
  logout: () => {},
});

interface ProviderProps {
  children: React.ReactNode;
}

export default function UIContextProvider({ children }: ProviderProps) {
  const [user, setUser] = useState("");
  const [employee, setEmployee] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) setUser(token);
  }, []);

  const login = useCallback((user: string) => {
    localStorage.setItem("user", user);
    setUser(user);
  }, []);

  return (
    <UIContext.Provider
      value={{ user, employee, login, logout: () => setUser("") }}
    >
      {children}
    </UIContext.Provider>
  );
}
