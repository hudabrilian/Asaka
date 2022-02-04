import { createContext, useContext } from "react";

type AuthContextType = {
  user: any;
  loggedIn: boolean;
  updateUser: (data: any) => void;
  updateLoggedIn: (data: any) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: {},
  loggedIn: false,
  updateUser: () => {},
  updateLoggedIn: () => {},
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};
