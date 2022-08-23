import React from "react";
// local
import UserPhoto from "components/UserPhoto/UserPhoto";
import { ReactComponent as BurgerLogo } from "../../images/burger.svg";
import { ReactComponent as SignoutLogo } from "../../images/signout.svg";
import { ReactComponent as SearchLogo } from "../../images/search.svg";
import s from "./CurrentUser.module.css";

export default function CurrentUser({ currentUser, setSearchValue }) {
  return (
    <div className={s.currentUser}>
      <div className={s.userWrap}>
        <UserPhoto photoURL={currentUser.photoURL} />
        <h2 className={s.userName}>{currentUser.displayName}</h2>
        <button className={s.signOutBtn}>
          <SignoutLogo className={s.signOutLogo} />
        </button>
        <button className={s.burgerBtn}>
          <BurgerLogo className={s.signOutLogo} />
        </button>
      </div>
      <div className={s.searchWrap}>
        <SearchLogo className={s.searchLogo} />
        <input
          className={s.searchInput}
          name="searchValue"
          onChange={(e) => setSearchValue(e.currentTarget.value)}
          type="text"
          placeholder="Search or start new chat"
        />
      </div>
    </div>
  );
}
