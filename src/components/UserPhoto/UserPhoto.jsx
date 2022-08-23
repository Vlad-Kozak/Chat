import React from "react";
import s from "./UserPhoto.module.css";

export default function UserPhoto({ photoURL }) {
  return <img className={s.image} src={photoURL} alt="user" />;
}
