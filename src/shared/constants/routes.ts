const AUTH_ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
} as const;

const APP_ROUTES = {
  ASSETS: '/app/assets',
  HOME: '/app/home',
  LOGS: '/app/logs',
  MARKETPLACE: '/app/marketplace',
  SETTINGS: '/app/settings',
  TEMPLATES: '/app/templates',
  WORKFLOW: '/app/workflow',
  WORKFLOW_DETAIL: (workflowId: string) => `/app/workflow/${workflowId}`,
} as const;

const SUPPORT_ROUTES = {
  DOCS: '/docs',
  SUPPORT: '/support',
} as const;

const ROUTES = {
  app: APP_ROUTES,
  auth: AUTH_ROUTES,
  support: SUPPORT_ROUTES,
} as const;

export { APP_ROUTES, AUTH_ROUTES, ROUTES, SUPPORT_ROUTES };
