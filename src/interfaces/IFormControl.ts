export interface IFormValues {
  [key: string]: IForm;
}

export interface IForm {
  value: string;
  hasError?: boolean;
  errorMessage?: string;
}
