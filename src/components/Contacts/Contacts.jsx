import React from "react";
// local
import s from "./Contacts.module.css";
import UserPhoto from "components/UserPhoto/UserPhoto";
import { formatDate } from "utils/formatDate";
import { sortContacts } from "utils/sortContacts";

export default function Contacts({ contacts, handleContactClick }) {
  const readyContacts = sortContacts(contacts);

  return (
    <ul className={s.contacts}>
      {readyContacts.map(({ id, userName, photoURL, messages }) => {
        if (!userName) {
          return null;
        }

        const index = messages.length - 1;
        return (
          <li
            onClick={() => handleContactClick(id, userName, photoURL, messages)}
            key={id}
            className={s.contact}
          >
            <UserPhoto photoURL={photoURL} size="middle" />
            <div className={s.contactWrap}>
              <h2 className={s.contactName}>{userName}</h2>
              <p className={s.contactMessage}>
                {messages[index] &&
                  messages[index].value.length <= 21 &&
                  messages[index].value}
                {messages[index] &&
                  messages[index].value.length > 21 &&
                  messages[index].value.slice(0, 21) + "..."}
              </p>
            </div>
            <p className={s.messageTime}>
              {messages[index] && formatDate(messages[index].createdAt)}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
