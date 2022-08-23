import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// local
import s from "./Chat.module.css";
import Contacts from "components/Contacts/Contacts";
import CurrentUser from "components/CurrentUser/CurrentUser";
import UserPhoto from "components/UserPhoto/UserPhoto";
import { formatDateLocal } from "utils/formatDate";
import { getAnswer, sendMessage } from "redux/chatSlice";
import { getMessage } from "service/chucknorrisAPI";
import { getRandomValue } from "utils/randomValue";

export default function Chat() {
  const dispatch = useDispatch();
  const [currentContact, setCurrentContact] = useState(null);
  const [message, setMessage] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const currentUser = useSelector((state) => state.auth);
  const contacts = useSelector((state) => state.chat.contacts);

  const handleContactClick = (uid, displayName, photoURL) => {
    setCurrentContact({ uid, displayName, photoURL });
  };

  const handleSendMessage = async () => {
    if (message.length === 0) {
      return;
    }

    await dispatch(sendMessage({ uid: currentContact.uid, message }));
    setMessage("");

    const answer = await getMessage();
    await setTimeout(
      () => dispatch(getAnswer({ uid: currentContact.uid, message: answer })),
      getRandomValue(10000, 15000)
    );
  };

  return (
    <div className={s.chat}>
      <div className={s.userMenu}>
        <CurrentUser
          currentUser={currentUser}
          setSearchValue={setSearchValue}
        />
        <Contacts
          contacts={Object.values(contacts).filter((el) =>
            el.displayName.toLowerCase().includes(searchValue.toLowerCase())
          )}
          handleContactClick={handleContactClick}
        />
      </div>
      <div className={s.chat}>
        {currentContact ? (
          <>
            <div className={s.currentContact}>
              <UserPhoto photoURL={currentContact.photoURL} />
              <h2>{currentContact.displayName}</h2>
            </div>
            <ul className={s.messages}>
              {contacts[currentContact.uid].messages.map(
                ({ sender, value, createdAt }) => {
                  return (
                    <li
                      className={
                        sender === "user" ? s.userMessage : s.contactMessage
                      }
                      key={createdAt}
                    >
                      <p>{value}</p>
                      <p>{formatDateLocal(createdAt)}</p>
                    </li>
                  );
                }
              )}
            </ul>
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.currentTarget.value)}
              placeholder="Type your message"
            />
            <button onClick={handleSendMessage} type="button">
              Send
            </button>
          </>
        ) : (
          <div>choose who you would like to write to</div>
        )}
      </div>
    </div>
  );
}
