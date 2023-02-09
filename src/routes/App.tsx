import {
  MemoryRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

import CustomQueryClientProvider from 'containers/CustomQueryClientProvider';
import Layout from 'components/layout/Layout';

import { NAVIGATION_ROUTES, ROUTES } from 'constants/routes';

import 'styles/App.css';
import { useEffect } from 'react';
import MaterialUiThemeProvider from 'containers/MaterialUiThemeProvider';

const DefaultRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(ROUTES.HOME.path);
  }, [navigate]);

  return null;
};

export default function App() {
  return (
    <CustomQueryClientProvider>
      <MaterialUiThemeProvider>
        <Router>
          <Routes>
            {NAVIGATION_ROUTES.map(({ Component, ...route }) => (
              <Route
                {...route}
                element={
                  <Layout>
                    <Component />
                  </Layout>
                }
              />
            ))}
            <Route path="/" element={<DefaultRedirect />} />
          </Routes>
        </Router>
      </MaterialUiThemeProvider>
    </CustomQueryClientProvider>
  );
}
