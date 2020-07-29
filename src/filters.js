export const formatDate = value => {
  const date = new Date(value * 1000);
  if (typeof date === "object" && !Number.isNaN(date.getDate())) {
    return `${date.toDateString()} ${date.toTimeString()}`;
  }
  return value;
};

export const formatInputDate = value => {
  const d = new Date(value);
  if (typeof d === "object" && !Number.isNaN(d.getDate())) {
    let month = `${d.getMonth() + 1}`;
    let day = `${d.getDate()}`;
    const year = `${d.getFullYear()}`;

    if (month.length < 2) month = `0${month}`;
    if (day.length < 2) day = `0${day}`;
    return [year, month, day].join("-");
  }
  return value;
};
