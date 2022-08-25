import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAuth,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithRedirect,
} from "firebase/auth";
// local
import { setUser } from "redux/authSlice";
import { ReactComponent as Google } from "../images/google.svg";
import s from "./LoginPage.module.css";

export default function LoginPage() {
  const dispatch = useDispatch();
  const [auth] = useState(getAuth());
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    getRedirectResult(auth).then((r) => {
      setFirstLoad(false);
      if (!r?.user) {
        return;
      }
      const { displayName, email, uid, photoURL } = r.user;
      dispatch(setUser({ displayName, email, uid, photoURL }));
    });
  }, [auth, dispatch]);

  const handleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };

  return (
    <div className={s.page}>
      <button className={s.google} onClick={handleLogin}>
        {firstLoad ? (
          <div className={s.spinner}></div>
        ) : (
          <Google className={s.logo} />
        )}
        GOOGLE
      </button>
    </div>
  );
}
