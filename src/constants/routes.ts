import { Home, ImportPasswords, Passwords, Users } from 'views';

export const ROUTES = {
  HOME: {
    title: 'Home',
    icon: '🏠',
    path: '/home',
    Component: Home,
  },
  IMPORT_PASSWORDS: {
    title: 'Import Passwords',
    icon: '🏠',
    path: '/import',
    Component: ImportPasswords,
  },
  PASSWORDS: {
    title: 'Passwords',
    icon: '🏠',
    path: '/passwords',
    Component: Passwords,
  },
  USERS: {
    title: 'Users',
    icon: '🏠',
    path: '/users',
    Component: Users,
  },
};

export const NAVIGATION_ROUTES = Object.entries(ROUTES).map(([key, value]) => ({
  name: key,
  key,
  ...value,
}));
