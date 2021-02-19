import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import HomeLayout from 'layouts/HomeLayout';
import LandingPageView from '../views/home/LandingPageView';
import ComponentsView from '../views/home/ComponentsView';
import AboutPageView from '../views/home/AboutPageView';
import FAQPageView from '../views/home/FAQPageView';


const HomeRoutes = {
  path: '*',
  layout: HomeLayout,
  routes: [
    {
      exact: true,
      path: '/',
      component: LandingPageView
    },
    {
      exact: true,
      path: '/components',
      component: ComponentsView
    },
    {
      exact: true,
      path: '/about',
      component: AboutPageView
    },
    {
      exact: true,
      path: '/faq',
      component: FAQPageView
    },
    {
      component: () => <Redirect to="/404" />
    }
  ]
};

export default HomeRoutes;
