const requiredValidator = (value: string) => {
  if (value.length === 0) return `O campo é obrigatório`;

  return "";
};

const minLengthValidator = (value: string, minLenght: number = 6) => {
  if (value.length < minLenght)
    return `O campo deve conter no mínimo ${minLenght} caracteres`;

  return "";
};

const maxLengthValidator = (value: string, maxLenght: number = 10) => {
  if (value.length > maxLenght)
    return `O campo deve conter no máximo ${maxLenght} caracteres`;

  return "";
};

export { requiredValidator, minLengthValidator, maxLengthValidator };
