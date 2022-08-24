import React, { useState } from "react";
import { useSelector } from "react-redux";
// local
import s from "./Chat.module.css";
import Contacts from "components/Contacts/Contacts";
import CurrentUser from "components/CurrentUser/CurrentUser";
import UserPhoto from "components/UserPhoto/UserPhoto";
import SearchContacts from "components/SearchContacts/SearchContacts";
import { ReactComponent as SendLogo } from "../../images/send.svg";
import { formatDateLocal } from "utils/formatDate";
import { useEditContactMutation, useGetContactsQuery } from "redux/contactsAPI";

export default function Chat() {
  const [currentContact, setCurrentContact] = useState(null);
  const [message, setMessage] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [contactsIsHidden, setContactsIsHidden] = useState(true);

  const { data = [] } = useGetContactsQuery();
  const [editContact] = useEditContactMutation();
  const currentUser = useSelector((state) => state.auth);

  const handleContactClick = (id, userName, photoURL, messages) => {
    setCurrentContact({ id, userName, photoURL, messages });
    setContactsIsHidden(true);
  };

  const handleSendMessage = async () => {
    if (message.length === 0) {
      return;
    }

    const newCurrentContact = {
      id: currentContact.id,
      userName: currentContact.userName,
      photoURL: currentContact.photoURL,
      messages: [
        ...currentContact.messages,
        {
          sender: "user",
          value: message,
          createdAt: Date.now(),
        },
      ],
    };

    setCurrentContact(newCurrentContact);
    await editContact({
      id: currentContact.id,
      contact: newCurrentContact,
    });
    setMessage("");
  };

  return (
    <div className={s.chat}>
      <div className={s.userMenu}>
        <CurrentUser
          currentUser={currentUser}
          setContactsIsHidden={setContactsIsHidden}
          contactsIsHidden={contactsIsHidden}
        />
        <div
          className={contactsIsHidden ? s.contactsWrap : s.contactsWrapActive}
        >
          <SearchContacts setSearchValue={setSearchValue} />
          <Contacts
            contacts={Object.values(data).filter((el) =>
              el.userName.toLowerCase().includes(searchValue.toLowerCase())
            )}
            handleContactClick={handleContactClick}
          />
        </div>
      </div>
      {currentContact && (
        <div className={s.currentContact}>
          <UserPhoto photoURL={currentContact.photoURL} />
          <h2 className={s.currentContactName}>{currentContact.userName}</h2>
        </div>
      )}
      {currentContact && (
        <div className={s.messagesBlock}>
          <ul className={s.messages}>
            {currentContact.messages.map(({ sender, value, createdAt }) => {
              return (
                <li
                  className={
                    sender === "user" ? s.userMessage : s.contactMessage
                  }
                  key={createdAt}
                >
                  <p className={s.messageValue}>{value}</p>
                  <p className={s.messageTime}>{formatDateLocal(createdAt)}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {currentContact && (
        <form
          className={s.sendForm}
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            className={s.sendInput}
            type="text"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            placeholder="Type your message"
          />
          <button
            onClick={handleSendMessage}
            className={s.sendBtn}
            type="button"
          >
            <SendLogo className={s.sendLogo} />
          </button>
        </form>
      )}
      {!currentContact && (
        <div className={s.emptyChat}>Choose who you would like to write to</div>
      )}
    </div>
  );
}
