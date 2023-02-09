export const PASSWORD_CREATE_FORM_SCHEMA = [
  {
    name: 'name',
    placeholder: 'Ex. Twitter',
    label: 'Name',
    required: true,
  },
  {
    name: 'user_id',
    placeholder: 'Select an user...',
    label: 'User',
    type: 'select',
    options: [],
    required: true,
  },
  {
    name: 'site',
    placeholder: 'Ex. https://twitter.com',
    label: 'Site',
  },
  {
    name: 'password',
    placeholder: '**********',
    label: 'Password',
    type: 'password',
    required: true,
    generate: true,
  },
  {
    name: 'confirm_password',
    placeholder: '**********',
    label: 'Confirm password',
    type: 'password',
    required: true,
    match: 'password',
  },
];
