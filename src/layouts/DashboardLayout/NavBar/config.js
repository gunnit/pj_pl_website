import React from 'react';
import { MLabel, MIcon } from '@material-extend';
import { PATH_APP } from 'routes/paths';

// ----------------------------------------------------------------------

const path = name => `/static/icons/navbar/${name}.svg`;

const ICONS = {
  // authenticator: <MIcon src={path('ic_authenticator')} />,
  // blog: <MIcon src={path('ic_blog')} />,
  // calendar: <MIcon src={path('ic_calendar')} />,
  // cart: <MIcon src={path('ic_cart')} />,
  // charts: <MIcon src={path('ic_charts')} />,
  // chat: <MIcon src={path('ic_chat')} />,
  // components: <MIcon src={path('ic_components')} />,
  dashboard: <MIcon src={path('ic_dashboard')} />,
  // editor: <MIcon src={path('ic_editor')} />,
  // elements: <MIcon src={path('ic_elements')} />,
  // error: <MIcon src={path('ic_error')} />,
  // mail: <MIcon src={path('ic_mail')} />,
  // map: <MIcon src={path('ic_map')} />,
  // page: <MIcon src={path('ic_page')} />,
  // user: <MIcon src={path('ic_user')} />,
  // upload: <MIcon src={path('ic_upload')} />,
  // copy: <MIcon src={path('ic_copy')} />,
  // carousel: <MIcon src={path('ic_carousel')} />,
  // language: <MIcon src={path('ic_language')} />
};


// Information to render navbar links
export default [
  {
    subheader: 'pipeline',
    items: [
      {
        title: 'processes',
        icon: ICONS.dashboard,
        href: PATH_APP.processes.dashboard,
        items: [
          {
            title: 'dashboard',
            href: PATH_APP.processes.dashboard
          },
          {
            title: 'ideas',
            href: PATH_APP.processes.idea
          },
          {
            title: 'pipeline',
            href: PATH_APP.processes.pipeline
          },
          {
            title: 'development',
            href: PATH_APP.processes.development
          },
          {
            title: 'production',
            href: PATH_APP.processes.production
          },
          {
            title: 'new process',
            href: PATH_APP.processes.new
          },
          {
            title: 'list of processes',
            href: PATH_APP.processes.list
          },
        ]
      }
    ]
  },
  {
    subheader: 'strategy',
    items: [
      {
        title: 'coe',
        icon: ICONS.dashboard,
        href: PATH_APP.coe.dashboard,
        items: [
          {
            title: 'vision',
            href: PATH_APP.coe.vision
          },
          {
            title: 'technology',
            href: PATH_APP.coe.technology
          },
          {
            title: 'control',
            href: PATH_APP.coe.control
          },
          {
            title: 'discover',
            href: PATH_APP.coe.discover
          },
          {
            title: 'deliver',
            href: PATH_APP.coe.deliver
          },
          {
            title: 'service',
            href: PATH_APP.coe.service
          },
          {
            title: 'people',
            href: PATH_APP.coe.people
          },
          {
            title: 'new assessment',
            href: PATH_APP.coe.assessment
          },
          {
            title: 'assessment list',
            href: PATH_APP.coe.assessmentList
          },
        ]
      }
    ]
  },
  {
    subheader: 'discovery',
    items: [
      {
        title: 'knowledge base',
        icon: ICONS.dashboard,
        // href: PATH_APP.discovery,
        items: [
          {
            title: 'liked processes',
            href: PATH_APP.discovery.likedProcesses
          },
          {
            title: 'process taxonomy',
            href: PATH_APP.discovery.taxonomy
          },
          {
            title: 'process search',
            href: PATH_APP.discovery.processSearch
          },
        ]
      }
    ]
  },

];
