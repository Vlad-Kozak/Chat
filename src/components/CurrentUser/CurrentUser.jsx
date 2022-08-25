import React from "react";
import { useDispatch } from "react-redux";
// local
import s from "./CurrentUser.module.css";
import UserPhoto from "components/UserPhoto/UserPhoto";
import { ReactComponent as ChatLogo } from "../../images/chat.svg";
import { ReactComponent as SignoutLogo } from "../../images/signout.svg";
import { removeUser } from "redux/authSlice";

export default function CurrentUser({
  currentUser,
  contactsIsHidden,
  setContactsIsHidden,
}) {
  const dispatch = useDispatch();
  return (
    <div className={s.currentUser}>
      <div className={s.userPhotoWrap}>
        <UserPhoto photoURL={currentUser.photoURL} size="middle" />
      </div>
      <h2 className={s.userName}>{currentUser.displayName}</h2>
      <button onClick={() => dispatch(removeUser())} className={s.signOutBtn}>
        <SignoutLogo className={s.signOutLogo} />
      </button>
      <button
        onClick={() => setContactsIsHidden(!contactsIsHidden)}
        className={s.chatBtn}
      >
        <ChatLogo className={s.chatLogo} />
      </button>
    </div>
  );
}
