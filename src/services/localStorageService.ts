const getItem = (key: string): any => {
  const item = localStorage.getItem(key);
  return item !== undefined && item !== "undefined" && item !== null
    ? JSON.parse(item)
    : null;
};

const setItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};

export { getItem, setItem, removeItem };
