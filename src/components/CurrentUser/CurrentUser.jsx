import React from "react";
// local
import UserPhoto from "components/UserPhoto/UserPhoto";
import { ReactComponent as ChatLogo } from "../../images/chat.svg";
import { ReactComponent as SignoutLogo } from "../../images/signout.svg";
import s from "./CurrentUser.module.css";
import { useDispatch } from "react-redux";
import { removeUser } from "redux/authSlice";

export default function CurrentUser({
  currentUser,
  contactsIsHidden,
  setContactsIsHidden,
}) {
  const dispatch = useDispatch();

  const handleChatBtnClick = () => {
    setContactsIsHidden(!contactsIsHidden);
  };

  const handleSignOutBtnClick = () => {
    dispatch(removeUser());
  };

  return (
    <div className={s.currentUser}>
      <div className={s.userPhotoWrap}>
        <UserPhoto photoURL={currentUser.photoURL} />
      </div>
      <h2 className={s.userName}>{currentUser.displayName}</h2>
      <button onClick={handleSignOutBtnClick} className={s.signOutBtn}>
        <SignoutLogo className={s.signOutLogo} />
      </button>
      <button onClick={handleChatBtnClick} className={s.chatBtn}>
        <ChatLogo className={s.chatLogo} />
      </button>
    </div>
  );
}
