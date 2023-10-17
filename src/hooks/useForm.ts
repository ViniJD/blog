const handleChangeValue = (values: any, name: string, value: string): any => {
  const auxValues = { ...values };
  auxValues[name].value = value;
  return auxValues;
};

const handleSetError = (
  values: any,
  name: string,
  hasError: boolean = false,
  errorMessage: string = ""
): any => {
  const auxValues = { ...values };
  auxValues[name].hasError = hasError;
  auxValues[name].errorMessage = errorMessage;
  return auxValues;
};

const verifyIfHasError = (values: any): boolean => {
  const keys = Object.keys(values);
  const hasError = keys.some(
    (key) => values[key].hasError === undefined || values[key].hasError === true
  );

  return hasError;
};

export { handleChangeValue, verifyIfHasError, handleSetError };
