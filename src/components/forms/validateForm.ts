 import { fields, formChangePass, formsApp } from './constants/constants';


export const validatefield = (field: string, value: string) => {
  console.log("field", field);
  console.log("value", value);
  // console.log("fields[field].required", (fields[field].required && (!value || value.toString().trim() === '')));

  if (fields[field].required && (!value || value.toString().trim() === ''))
    return 'Requerido';

  if (value && !fields[field].regex.test(value)) return fields[field].msgError;

  return null;
};

export const validateForm = (form: any, formName: string) => {
  let validationErrors: any;

  const formFields = formsApp[formName];

  for (const field of formFields) {
    const formField = form[field];

    validationErrors = {
      ...validationErrors,
      [field]: validatefield(field, formField),
    };
  }

  if (
    form['password'] !== form['confPassword'] &&
    formChangePass.includes(formName)
  ) {
    validationErrors = {
      ...validationErrors,
      confPass: 'La contraseña no coincide',
    };
  }

  return validationErrors;
};