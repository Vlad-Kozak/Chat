export const formatDateLocal = (time) => {
  const date = new Date(time);
  return date.toLocaleString();
};

export const formatDate = (time) => {
  const date = new Date(time);
  return date.toDateString().slice(3);
};
