import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import firebase from "firebase/compat/app";
import FIREBASE_AUTHENTICATION from "../utils/firebase";
import { getAnalytics, logEvent } from "firebase/analytics";

interface AuthProviderProps {
  children?: React.ReactNode;
}

// use later
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  const signUp = (email: string, password: string) => {
    FIREBASE_AUTHENTICATION.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("[SignUP]", res);
        const analytics = getAnalytics();
        logEvent(analytics, "sign_up");
      })
      .catch((err) => {
        console.log("Oops! login failed  Try again");
      });
  };

  const signIn = (email: string, password: string) => {
    FIREBASE_AUTHENTICATION.auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log("[SignIn]", res);
        const analytics = getAnalytics();
        logEvent(analytics, "login");
      })
      .catch((err) => {
        console.log("Oops! login failed  Try again");
      });
  };

  const signOut = () => {
    FIREBASE_AUTHENTICATION.auth().signOut();
  };

  const signInWithGoogle = () => {
    var google_auth = new FIREBASE_AUTHENTICATION.auth.GoogleAuthProvider();
    FIREBASE_AUTHENTICATION.auth()
      .signInWithPopup(google_auth)
      .then((res) => res)
      .catch((err) => {
        console.log("Oops! login failed  Try again");
      });
  };

  const value = {
    user,
    signUp,
    signIn,
    signOut,
    signInWithGoogle,
  };

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTHENTICATION.auth().onAuthStateChanged(
      (firebaseUser) => {
        setUser(firebaseUser);
      }
    );

    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
