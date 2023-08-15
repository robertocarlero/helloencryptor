import { PASSWORD_PATTERN } from 'constants/patterns';

export const USER_CREATE_FORM_SCHEMA = [
  {
    name: 'name',
    placeholder: 'Ex. John Doe',
    label: 'Name',
    required: true,
  },
  {
    name: 'password',
    placeholder: '**********',
    label: 'Password',
    type: 'password',
    required: true,
    pattern: PASSWORD_PATTERN,
    patternMessage:
      'The password must have a minimum of 8 characters, a maximum of 50 characters, at least one uppercase letter, at least one lowercase letter, at least one digit, at least 1 special character and cannot have blank spaces.',
    generate: true,
  },
  {
    name: 'confirm_password',
    placeholder: '**********',
    label: 'Confirm Password',
    type: 'password',
    required: true,
    match: 'password',
  },
];
