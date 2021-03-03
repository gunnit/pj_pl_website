import { PATH_APP } from './paths';
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthProtect from 'components/Auth/AuthProtect';
import DashboardLayout from 'layouts/DashboardLayout';
// import ProcessIdeaView from 'views/custom/processes/ProcessIdeaView';

// ----------------------------------------------------------------------

const AppRoutes = {
  path: PATH_APP.root,
  guard: AuthProtect,
  layout: DashboardLayout,
  routes: [
    // MAIN DASHBOARD
    // ----------------------------------------------------------------------
    {
      exact: true,
      path: PATH_APP.main.dashboard,
      component: lazy(() => import('../views/custom/processes/ProcessDashboardView'))
    },
    {
      exact: true,
      path: PATH_APP.processes.dashboard,
      // Component JSX is in ProcessDashboardView/index.js, and index.js imports its components from the other files in the ProcessDashboardView folder
      component: lazy(() => import('views/custom/processes/ProcessDashboardView'))
    },
    {
      exact: true,
      path: PATH_APP.processes.idea,
      // Component JSX is in ProcessIdeaView/index.js, and index.js imports its components from the other files in the ProcessIdeaView folder
      // component: ProcessIdeaView,
      component: lazy(() => import('views/custom/processes/ProcessIdeaView')),
      apiPath: '/ideas'
    },
    {
      exact: true,
      path: PATH_APP.processes.pipeline,
      // Component JSX is in ProcesssPipelineView/index.js, and index.js imports its components from the other files in the ProcessPipelineView folder
      component: lazy(() => import('views/custom/processes/ProcessPipelineView'))
    },
    {
      exact: true,
      path: PATH_APP.processes.development,
      // Component JSX is in ProcessDevelopmentView/index.js, and index.js imports its components from the other files in the ProcessDevelopmentView folder
      component: lazy(() => import('views/custom/processes/ProcessDevelopmentView'))
    },
    {
      exact: true,
      path: PATH_APP.processes.production,
      // Component JSX is in ProcessProductionView/index.js, and index.js imports its components from the other files in the ProcessProduction folder
      component: lazy(() => import('views/custom/processes/ProcessProductionView'))
    },
    {
      exact: true,
      path: PATH_APP.processes.new,
      // Component JSX is in NewProcessView/index.js, and index.js imports its components from the other files in the NewProcessView folder
      component: lazy(() => import('../views/custom/processes/NewProcessView'))
    },
    {
      exact: true,
      path: PATH_APP.processes.list,
      // Component JSX is in ProcessListView/index.js, and index.js imports its components from the other files in the ProcessListView folder
      component: lazy(() => import('../views/custom/processes/ProcessListView'))
    },
    {
      exact: true,
      path: PATH_APP.processes.details,
      component: lazy(() => import('../views/custom/processes/ProcessDetailView'))
    },
    {
      exact: true,
      path: PATH_APP.processes.update,
      component: lazy(() => import('../views/custom/processes/UpdateProcessView'))
    },

    // COE

    {
      exact: true,
      path: PATH_APP.coe.vision,
      component: lazy(() => import('../views/custom/coe/VisionView'))
    },
    {
      exact: true,
      path: PATH_APP.coe.assessment,
      component: lazy(() => import('../views/custom/coe/AssessmentView'))
    },
    {
      exact: true,
      path: PATH_APP.coe.assessmentList,
      component: lazy(() => import('../views/custom/coe/AssessmentListView'))
    },
    {
      exact: true,
      path: PATH_APP.coe.technology,
      component: lazy(() => import('../views/custom/coe/ComingSoonView'))
    },
    {
      exact: true,
      path: PATH_APP.coe.control,
      component: lazy(() => import('../views/custom/coe/ComingSoonView'))
    },
    {
      exact: true,
      path: PATH_APP.coe.discover,
      component: lazy(() => import('../views/custom/coe/ComingSoonView'))
    },
    {
      exact: true,
      path: PATH_APP.coe.deliver,
      component: lazy(() => import('../views/custom/coe/ComingSoonView'))
    },
    {
      exact: true,
      path: PATH_APP.coe.service,
      component: lazy(() => import('../views/custom/coe/ComingSoonView'))
    },
    {
      exact: true,
      path: PATH_APP.coe.people,
      component: lazy(() => import('../views/custom/coe/ComingSoonView'))
    },
    {
      exact: true,
      path: PATH_APP.root,
      component: () => <Redirect to={PATH_APP.main.root} />
    },


    // Discovery

    {
      exact: true,
      path: PATH_APP.discovery.likedProcesses,
      component: lazy(() => import('../views/custom/discovery/LikedProcessesView'))
    },
    {
      exact: true,
      path: PATH_APP.discovery.taxonomy,
      component: lazy(() => import('../views/custom/discovery/TaxonomyView'))
    },
    {
      exact: true,
      path: PATH_APP.discovery.processSearch,
      component: lazy(() => import('../views/custom/discovery/ProcessSearchView'))
    },
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
