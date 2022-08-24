import React from "react";
// local
import s from "./SearchContacts.module.css";
import { ReactComponent as SearchLogo } from "../../images/search.svg";

export default function SearchContacts({ setSearchValue }) {
  return (
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
  );
}
