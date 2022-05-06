import React from "react";
import firebase from "firebase/compat/app";

type TAuthContextProps = {
  user: firebase.User | null;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signInWithGoogle: () => void;
};

export const AuthContext = React.createContext<TAuthContextProps>({
  user: null,
  signUp: (email: string, password: string) => {},
  signIn: (email: string, password: string) => {},
  signOut: () => {},
  signInWithGoogle: () => {},
});
