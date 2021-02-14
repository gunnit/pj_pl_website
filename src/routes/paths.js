// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS = {
  auth: '/auth',
  app: '/app',
  docs: '/docs',
  wiki: '/wiki',
};

export const PATH_PAGE = {
  auth: {
    root: ROOTS.auth,
    login: path(ROOTS.auth, '/login'),
    loginUnprotected: path(ROOTS.auth, '/login-unprotected'),
    register: path(ROOTS.auth, '/register'),
    registerUnprotected: path(ROOTS.auth, '/register-unprotected'),
    resetPassword: path(ROOTS.auth, '/reset-password'),
    verify: path(ROOTS.auth, '/verify')
  },
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
};

export const PATH_HOME = {
  about: '/about',
  dashboard: path(ROOTS.app, '/processes/dashboard'),
};

export const PATH_APP = {
  root: ROOTS.app,
  main: {
    root: path(ROOTS.app, '/dashboard'),
    dashboard: path(ROOTS.app, '/dashboard'),
    // ecommerce: path(ROOTS.app, '/dashboard/ecommerce'),
    // analytics: path(ROOTS.app, '/dashboard/analytics'),
  },
  processes: {
    dashboard: path(ROOTS.app, '/processes/dashboard'),
    idea: path(ROOTS.app, '/processes/idea'),
    pipeline: path(ROOTS.app, '/processes/pipeline'),
    development: path(ROOTS.app, '/processes/development'),
    production: path(ROOTS.app, '/processes/production'),
    new: path(ROOTS.app, '/processes/new'),
    list: path(ROOTS.app, '/processes/list'),
    // Will have specific process IDs
    details: path(ROOTS.app, '/processes/details'),
    update: path(ROOTS.app, '/processes/update')
  },
  coe: {
    vision: path(ROOTS.app, '/coe/vision'),
    technology: path(ROOTS.app, '/coe/technology'),
    control: path(ROOTS.app, '/coe/control'),
    discover: path(ROOTS.app, '/coe/discover'),
    deliver: path(ROOTS.app, '/coe/deliver'),
    service: path(ROOTS.app, '/coe/service'),
    people: path(ROOTS.app, '/coe/people'),
    assessment: path(ROOTS.app, '/coe/assessment'),
    assessmentList: path(ROOTS.app, '/coe/assessment-list'),
  },
  discovery: {
    likedProcesses: path(ROOTS.app, '/discovery/liked-processes'),
    taxonomy: path(ROOTS.app, '/discovery/taxonomy'),
    processSearch: path(ROOTS.app, '/discovery/process-search'),
  },
};


export const PATH_WIKI = {
  developVisionAndStrategy: path(ROOTS.wiki, '/develop-vision-and-strategy'),
}

export const PATH_DOCS = {
  root: ROOTS.docs,
}