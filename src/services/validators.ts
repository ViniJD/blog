const requiredValidator = (value: string, inputName: string) => {
  if (value.length === 0) return `O campo ${inputName} é obrigatório`;

  return "";
};

const minLengthValidator = (
  value: string,
  inputName: string,
  minLenght: number = 6
) => {
  if (value.length < minLenght)
    return `O campo ${inputName} é deve conter no mínimo ${minLenght} caracteres`;

  return "";
};

const maxLengthValidator = (
  value: string,
  inputName: string,
  maxLenght: number = 10
) => {
  if (value.length < maxLenght)
    return `O campo ${inputName} é deve conter no máximo ${maxLenght} caracteres`;

  return "";
};

export { requiredValidator, minLengthValidator, maxLengthValidator };
