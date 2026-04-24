"use client";

import {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

import { useSessionStorage } from "@/shared";
import { fakeUser } from "@/shared/data";

import { IProfile } from "../types";

interface UserContextType {
  user: IProfile;
  setUser: Dispatch<SetStateAction<IProfile>>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useSessionStorage("user", fakeUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
