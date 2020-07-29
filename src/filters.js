export const formatDate = value => {
  const date = new Date(value);
  if (typeof date === "object" && !Number.isNaN(date.getDate())) {
    return `${date.toDateString()} ${date.toTimeString()}`;
  }
  return value;
};
