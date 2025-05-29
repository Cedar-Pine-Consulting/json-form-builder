import dayjs from "dayjs";

// helper to merge date+time
const mergeDateTime = (date, time) =>
  date.hour(time.hour()).minute(time.minute()).second(time.second());

const formatPhone = (phone) => {
  if (!phone) return "-";
  const cleaned = `${phone}`.replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) return `(${match[1]}) ${match[2]} - ${match[3]}`;
  return phone;
};

const formatAddress = (address) =>
  address
    ? `${address?.address1}${
        address?.address2 ? ` ${address.address2},` : ","
      } ${address?.city}, ${address?.state} ${address?.zipcode}`
    : "-";

const formatDateOfBirth = (client) =>
  client
    ? `${dayjs(client.dateOfBirth).format("MMMM D, YYYY")} (${dayjs().diff(
        dayjs(client.dateOfBirth),
        "year"
      )} years old)`
    : "-";

const formatTitle = (title) => {
  if (!title) return "-";
  const titleCase = String(title)
    .replace(/[-_]+/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return titleCase;
};

const formatCamelCaseToTitleCase = (text) => {
  if (!text) return;
  const words = text
    .replace(/([A-Z])/g, " $1")
    .trim()
    .split(" ");

  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  const titleCase = words
    // .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return titleCase;
};

const formatCurrency = (amount) => {
  if (!amount) return "-";
  return `$${Number(amount)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
};

export {
  formatPhone,
  formatAddress,
  formatDateOfBirth,
  formatTitle,
  formatCamelCaseToTitleCase,
  formatCurrency,
  mergeDateTime,
};
