import { PATH_APP } from './paths';
import React from 'react';
import { Redirect } from 'react-router-dom';
import AuthProtect from 'components/Auth/AuthProtect';
import DashboardLayout from 'layouts/DashboardLayout';

// ----------------------------------------------------------------------

const AppRoutes = {
  path: PATH_APP.root,
  guard: AuthProtect,
  layout: DashboardLayout,
  routes: [
    {
      exact: true,
      path: PATH_APP.root,
      component: () => <Redirect to={PATH_APP.main.root} />
    },
    // ----------------------------------------------------------------------
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default AppRoutes;
