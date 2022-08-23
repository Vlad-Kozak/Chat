import UserPhoto from "components/UserPhoto/UserPhoto";
import React from "react";
import { formatDate } from "utils/formatDate";
// local
import s from "./Contacts.module.css";

export default function Contacts({ contacts, handleContactClick }) {
  const sortContacts = [...contacts].sort((a, b) => {
    const indexA = a.messages.length - 1;
    const indexB = b.messages.length - 1;
    return b.messages[indexB].createdAt - a.messages[indexA].createdAt;
  });
  console.log(sortContacts);
  return (
    <ul className={s.contacts}>
      {sortContacts.map(({ uid, displayName, photoURL, messages }) => {
        if (!displayName) {
          return null;
        }

        const index = messages.length - 1;
        return (
          <li
            onClick={() => handleContactClick(uid, displayName, photoURL)}
            key={uid}
            className={s.contact}
          >
            <UserPhoto photoURL={photoURL} />
            <div className={s.contactWrap}>
              <h2 className={s.contactName}>{displayName}</h2>
              <p className={s.contactMessage}>
                {index && messages[index].value}
              </p>
            </div>
            <p className={s.messageTime}>
              {index && formatDate(messages[index].createdAt)}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
