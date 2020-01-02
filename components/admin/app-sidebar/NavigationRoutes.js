export const navigationRoutes = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'Students\' List',
      meta: {
        iconClass: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'statistics',
      displayName: 'menu.statistics',
      meta: {
        iconClass: 'vuestic-iconset-statistics',
      },
      disabled: true,
      children: [
        {
          name: 'charts',
          displayName: 'menu.charts',
        },
        {
          name: 'progress-bars',
          displayName: 'menu.progressBars',
        },
      ],
    },
    {
      name: 'forms',
      displayName: 'Add Person',
      meta: {
        iconClass: 'vuestic-iconset-forms',
      },
      disabled: true,
      children: [
        {
          name: 'form-elements',
          displayName: 'Add Student',
        },
        {
          name: 'medium-editor',
          displayName: 'Add Employee',
        },
      ],
    },
  ],
}
