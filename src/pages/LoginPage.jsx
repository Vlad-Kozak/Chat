import React from "react";
import { useDispatch } from "react-redux";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// local
import { setUser } from "redux/authSlice";
import { ReactComponent as Google } from "../images/google.svg";
import s from "./LoginPage.module.css";

export default function LoginPage() {
  const dispatch = useDispatch();

  const handleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((r) => {
      if (!r.user) {
        return;
      }
      const { displayName, email, uid, photoURL } = r.user;
      dispatch(setUser({ displayName, email, uid, photoURL }));
    });
  };

  return (
    <div className={s.page}>
      <button className={s.google} onClick={handleLogin}>
        <Google className={s.logo} />
        GOOGLE
      </button>
    </div>
  );
}
