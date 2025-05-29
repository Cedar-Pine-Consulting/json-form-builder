export const paramFormatter = (parmasObj = {}) => {
  const params = new URLSearchParams();

  const entries = Object.entries(parmasObj);

  entries.forEach(([key, value]) => {
    if (value !== undefined) {
      params.append(key, value);
    }
  });

  return params;
};

export const urlFormatter = (url, id = "", params = {}) =>
  `${url}${id !== "" ? `/${id}` : ""}?${paramFormatter(params).toString()}`;

export default { paramFormatter, urlFormatter };
