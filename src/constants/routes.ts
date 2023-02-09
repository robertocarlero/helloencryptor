import { House, Key, People, Upload } from '@mui/icons-material';

import { Home, ImportPasswords, Passwords, Users } from 'views';

export const ROUTES = {
  HOME: {
    title: 'Home',
    Icon: House,
    path: '/home',
    Component: Home,
  },
  IMPORT_PASSWORDS: {
    title: 'Import Passwords',
    Icon: Upload,
    path: '/import',
    Component: ImportPasswords,
  },
  PASSWORDS: {
    title: 'Passwords',
    Icon: Key,
    path: '/passwords',
    Component: Passwords,
  },
  USERS: {
    title: 'Users',
    Icon: People,
    path: '/users',
    Component: Users,
  },
};

export const NAVIGATION_ROUTES = Object.entries(ROUTES).map(([key, value]) => ({
  name: key,
  key,
  ...value,
}));
