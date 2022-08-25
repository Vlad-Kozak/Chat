export const createContact = (currentContact, sender, value) => {
  return {
    id: currentContact.id,
    userName: currentContact.userName,
    photoURL: currentContact.photoURL,
    messages: [
      ...currentContact.messages,
      {
        sender,
        value,
        createdAt: Date.now(),
      },
    ],
  };
};
