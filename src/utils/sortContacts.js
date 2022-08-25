export const sortContacts = (contacts) => {
  let emptyContacts = [];
  let completedContacts = [];
  contacts.forEach((el) => {
    if (el.messages.length > 0) {
      completedContacts.push(el);
    } else {
      emptyContacts.push(el);
    }
  });
  const sortedCompletedContacts = [...completedContacts].sort((a, b) => {
    const indexA = a.messages.length - 1;
    const indexB = b.messages.length - 1;
    return b.messages[indexB].createdAt - a.messages[indexA].createdAt;
  });
  return [...sortedCompletedContacts, ...emptyContacts];
};
