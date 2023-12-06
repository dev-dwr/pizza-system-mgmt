"use client";
import { createContext, useCallback, useEffect, useState } from "react";
import { Role } from "../utils/types";

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

  const login = useCallback((user: string, role?: Role) => {
    localStorage.setItem("user", user);
    setUser(user);
    setEmployee(role === Role.EMPLOYEE);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("user");
    setUser("");
  }, []);

  return (
    <UIContext.Provider value={{ user, employee, login, logout }}>
      {children}
    </UIContext.Provider>
  );
}
