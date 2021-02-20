import { PATH_APP } from './paths';
import React, { lazy } from 'react';
import { Redirect } from 'react-router-dom';
import AuthProtect from 'components/Auth/AuthProtect';
import DashboardLayout from 'layouts/DashboardLayout';
import ProcessDashboardView from 'views/custom/processes/ProcessDashboardView';
import ProcessIdeaView from 'views/custom/processes/ProcessIdeaView';
import ProcessPipelineView from '../views/custom/processes/ProcessPipelineView';
import ProcessDevelopmentView from '../views/custom/processes/ProcessDevelopmentView';
import ProcessProductionView from '../views/custom/processes/ProcessProductionView';
import NewProcessView from '../views/custom/processes/NewProcessView';
import ProcessListView from '../views/custom/processes/ProcessListView';
import ProcessDetailView from 'views/custom/processes/ProcessDetailView';
import UpdateProcessView from 'views/custom/processes/UpdateProcessView';
import VisionView from 'views/custom/coe/VisionView';
import AssessmentView from 'views/custom/coe/AssessmentView';
import AssessmentListView from 'views/custom/coe/AssessmentListView';
import LikedProcessesView from 'views/custom/discovery/LikedProcessesView';
import TaxonomyView from 'views/custom/discovery/TaxonomyView';
import ProcessSearchView from 'views/custom/discovery/ProcessSearchView';
import AutomationAssessmentView from 'views/custom/processes/AutomationAssessmentView';

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
      component: ProcessDashboardView,
    },
    {
      exact: true,
      path: PATH_APP.processes.dashboard,
      // Component JSX is in ProcessDashboardView/index.js, and index.js imports its components from the other files in the ProcessDashboardView folder
      component: ProcessDashboardView
    },
    {
      exact: true,
      path: PATH_APP.processes.idea,
      // Component JSX is in ProcessIdeaView/index.js, and index.js imports its components from the other files in the ProcessIdeaView folder
      // component: ProcessIdeaView,
      component: ProcessIdeaView,
      apiPath: '/ideas'
    },
    {
      exact: true,
      path: PATH_APP.processes.pipeline,
      // Component JSX is in ProcesssPipelineView/index.js, and index.js imports its components from the other files in the ProcessPipelineView folder
      component: ProcessPipelineView
    },
    {
      exact: true,
      path: PATH_APP.processes.development,
      // Component JSX is in ProcessDevelopmentView/index.js, and index.js imports its components from the other files in the ProcessDevelopmentView folder
      component: ProcessDevelopmentView
    },
    {
      exact: true,
      path: PATH_APP.processes.production,
      // Component JSX is in ProcessProductionView/index.js, and index.js imports its components from the other files in the ProcessProduction folder
      component: ProcessProductionView
    },
    {
      exact: true,
      path: PATH_APP.processes.new,
      // Component JSX is in NewProcessView/index.js, and index.js imports its components from the other files in the NewProcessView folder
      component: NewProcessView
    },
    {
      exact: true,
      path: PATH_APP.processes.list,
      // Component JSX is in ProcessListView/index.js, and index.js imports its components from the other files in the ProcessListView folder
      component: ProcessListView
    },
    {
      exact: true,
      path: PATH_APP.processes.details,
      component: ProcessDetailView
    },
    {
      exact: true,
      path: PATH_APP.processes.update,
      component: UpdateProcessView
    },
    {
      exact: true,
      path: PATH_APP.processes.automationAssessment,
      component: AutomationAssessmentView
    },

    // COE

    {
      exact: true,
      path: PATH_APP.coe.vision,
      component: VisionView
    },
    {
      exact: true,
      path: PATH_APP.coe.assessment,
      component: AssessmentView
    },
    {
      exact: true,
      path: PATH_APP.coe.assessmentList,
      component: AssessmentListView
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
      component: LikedProcessesView
    },
    {
      exact: true,
      path: PATH_APP.discovery.taxonomy,
      component: TaxonomyView
    },
    {
      exact: true,
      path: PATH_APP.discovery.processSearch,
      component: ProcessSearchView
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
