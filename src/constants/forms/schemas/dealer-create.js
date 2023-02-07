export const USER_CREATE_FORM_SCHEMA = [
  {
    name: 'name',
    placeholder: 'Ej. Jhon Doe',
    label: 'Nombre',
    required: true,
  },
  {
    name: 'password',
    placeholder: '**********',
    label: 'Contraseña',
    type: 'password',
    required: true,
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,50}$/,
    patternMessage:
      'La contraseña debe tener, mínimo 8 caracteres, máximo 50 caracteres, al menos una letra mayúscula, al menos una letra minúscula, al menos un dígito, al menos 1 caracter especial y no puede tener espacios en blanco',
  },
  {
    name: 'confirm_password',
    placeholder: '**********',
    label: 'Confirmar Contraseña',
    type: 'password',
    required: true,
    match: 'password',
  },
];
