import NProgress from 'nprogress';
import AppRoutes from './AppRoutes';
import { PATH_PAGE } from './paths';
import HomeRoutes from './HomeRoutes';
import LoadingScreen from 'components/LoadingScreen';
import GuestProtect from 'components/Auth/GuestProtect';
import { Switch, Route, Redirect } from 'react-router-dom';
import React, { Suspense, Fragment, lazy, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoginView from 'views/auth/LoginView';
import RegisterBetaView from 'views/auth/RegisterBetaView';
import ResetPasswordView from 'views/auth/ResetPasswordView';
import VerifyCodeView from 'views/auth/VerifyCodeView';
import Page404View from 'views/errors/Page404View';



// ----------------------------------------------------------------------

const nprogressStyle = makeStyles(theme => ({
  '@global': {
    '#nprogress': {
      pointerEvents: 'none',
      '& .bar': {
        top: 0,
        left: 0,
        height: 2,
        width: '100%',
        position: 'fixed',
        zIndex: theme.zIndex.snackbar,
        backgroundColor: theme.palette.primary.main,
        boxShadow: `0 0 2px ${theme.palette.primary.main}`
      },
      '& .peg': {
        right: 0,
        opacity: 1,
        width: 100,
        height: '100%',
        display: 'block',
        position: 'absolute',
        transform: 'rotate(3deg) translate(0px, -4px)',
        boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`
      }
    }
  }
}));

function RouteProgress(props) {
  nprogressStyle();

  NProgress.configure({
    speed: 500,
    showSpinner: false
  });

  useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.start();
    };
  }, []);



  return <Route {...props} />;
}

// Imported in App.js to render the page
export function renderRoutes(routes = []) {

  return (
    // <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Layout = route.layout || Fragment;
        const Component = route.component;
        const Guard = route.guard || Fragment;
        return (
          <RouteProgress
            key={i}
            path={route.path}
            exact={route.exact}
            render={props => (
              <Guard>
                <Layout>
                  {route.routes ? (
                    renderRoutes(route.routes)
                  ) : (
                      <Component {...props} />
                    )}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
    // </Suspense>
  );
}

const routes = [
  // Others Routes
  {
    exact: true,
    guard: GuestProtect,
    path: PATH_PAGE.auth.login,
    component: LoginView
  },
  {
    exact: true,
    path: PATH_PAGE.auth.loginUnprotected,
    component: LoginView
  },
  {
    exact: true,
    guard: GuestProtect,
    path: PATH_PAGE.auth.register,
    component: RegisterBetaView
  },
  {
    exact: true,
    path: PATH_PAGE.auth.registerUnprotected,
    component: RegisterBetaView
  },
  {
    exact: true,
    path: PATH_PAGE.auth.resetPassword,
    component: ResetPasswordView
  },
  {
    exact: true,
    path: PATH_PAGE.auth.verify,
    component: VerifyCodeView
  },
  {
    exact: true,
    path: '/404',
    component: Page404View
  },
  {
    exact: true,
    path: PATH_PAGE.auth.root,
    component: () => <Redirect to={PATH_PAGE.auth.login} />
  },

  // App Routes
  AppRoutes,

  // Home Routes
  HomeRoutes
];

export default routes;
