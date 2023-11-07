"use client";
import { createContext, useCallback, useEffect, useState } from "react";

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
      value={{ user, login, logout: () => setUser("") }}
    >
      {children}
    </UIContext.Provider>
  );
}
