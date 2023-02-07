export const PASSWORD_CREATE_FORM_SCHEMA = [
  {
    name: 'name',
    placeholder: 'Ej. Twitter',
    label: 'Nombre',
    required: true,
  },
  {
    name: 'user_id',
    placeholder: 'Selecciona un usuario...',
    label: 'Usuario',
    type: 'select',
    options: [],
    required: true,
  },
  {
    name: 'site',
    placeholder: 'Ej. https://twitter.com',
    label: 'Sitio',
  },
  {
    name: 'password',
    placeholder: '**********',
    label: 'Contraseña',
    type: 'password',
    required: true,
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
