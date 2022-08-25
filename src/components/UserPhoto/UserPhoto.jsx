import React from "react";
import s from "./UserPhoto.module.css";

export default function UserPhoto({ photoURL, size }) {
  return (
    <img
      className={size === "small" ? s.smallImage : s.middleImage}
      src={photoURL}
      alt="user"
    />
  );
}
