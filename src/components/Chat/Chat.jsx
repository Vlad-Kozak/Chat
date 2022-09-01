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
import { getMessage } from "service/chucknorrisAPI";
import { getRandomValue } from "utils/randomValue";
import { createContact } from "utils/createContact";

export default function Chat() {
  const [currentContact, setCurrentContact] = useState(null);
  const [message, setMessage] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [contactsIsHidden, setContactsIsHidden] = useState(true);
  const [isMessageWasSending, setIsMessageWasSending] = useState(false);
  const [isSendingBlocked, setIsSendingBlocked] = useState(false);
  const [timerId, setTimerId] = useState(false);

  const { data = [] } = useGetContactsQuery();
  const [editContact] = useEditContactMutation();
  const currentUser = useSelector((state) => state.auth);

  const handleContactClick = (id, userName, photoURL, messages) => {
    setCurrentContact({ id, userName, photoURL, messages });
    setContactsIsHidden(true);
  };

  const handleSendMessage = async () => {
    if (message.trim().length === 0) {
      return;
    }
    const newCurrentContact = createContact(currentContact, "user", message);
    setCurrentContact(newCurrentContact);
    await editContact({
      id: currentContact.id,
      contact: newCurrentContact,
    });
    setMessage("");
    clearTimeout(timerId);
    setTimerId(
      setTimeout(
        () => setIsMessageWasSending(true),
        getRandomValue(10000, 15000)
      )
    );
    setIsSendingBlocked(true);
    setTimeout(() => setIsSendingBlocked(false), 500);
  };

  const sendAnswer = async () => {
    const answer = await getMessage();
    const newCurrentContact = createContact(currentContact, "contact", answer);
    await editContact({
      id: currentContact.id,
      contact: newCurrentContact,
    });
    setCurrentContact(newCurrentContact);
  };

  if (isMessageWasSending) {
    sendAnswer();
    setIsMessageWasSending(false);
  }

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
      <div className={s.messagesBlock}>
        {currentContact && (
          <div className={s.currentContact}>
            <UserPhoto photoURL={currentContact.photoURL} size="small" />
            <h2 className={s.currentContactName}>{currentContact.userName}</h2>
          </div>
        )}
        {currentContact && (
          <div className={s.messagesWrap}>
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
                    <p className={s.messageTime}>
                      {formatDateLocal(createdAt)}
                    </p>
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
              autoComplete="off"
              className={s.sendInput}
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.currentTarget.value)}
              placeholder="Type your message"
            />
            <button
              disabled={isSendingBlocked ? true : false}
              className={s.sendBtn}
              type="submit"
            >
              {isSendingBlocked ? (
                <div className={s.spinner}></div>
              ) : (
                <SendLogo className={s.sendLogo} />
              )}
            </button>
          </form>
        )}
        {!currentContact && (
          <div className={s.emptyChat}>
            Choose who you would like to write to
          </div>
        )}
      </div>
    </div>
  );
}
