import Vue from 'vue'
import Router from 'vue-router'
import AuthLayout from '../components/auth/AuthLayout'
import AppLayout from '../components/admin/AppLayout'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Router, VueAxios, axios)

const EmptyParentComponent = {
  template: '<router-view></router-view>',
}

const demoRoutes = []
if (process.env.NODE_ENV === 'development' || process.env.VUE_APP_INCLUDE_DEMOS) {
  const vueBookRoutes = require('./vueBookRoutes').default
  vueBookRoutes.forEach(route => demoRoutes.push(route))
}

export default new Router({
  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes: [
    ...demoRoutes,
    {
      path: '*',
      redirect: { name: 'dashboard' },
    },
    {
      path: '/auth',
      component: AuthLayout,
      children: [
        {
          name: 'login',
          path: 'login',
          component: () => import('../components/auth/login/Login.vue'),
        },
        {
          name: 'signup',
          path: 'signup',
          component: () => import('../components/auth/signup/Signup.vue'),
        },
        {
          name: 'recover-password',
          path: 'recover-password',
          component: () => import('../components/auth/recover-password/RecoverPassword.vue'),
        },
        {
          path: '',
          redirect: { name: 'login' },
        },
      ],
    },

    {
      name: 'Admin',
      path: '/admin',
      component: AppLayout,
      children: [
        {
          name: 'dashboard',
          path: 'studentlist',
          component: () => import('../components/dashboard/Dashboard.vue'),
          default: true,
        },
        {
          name: 'statistics',
          path: 'statistics',
          component: EmptyParentComponent,
          children: [
            {
              name: 'charts',
              path: 'charts',
              component: () => import('../components/pages/404-pages/VaPageNotFoundCustom.vue'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/inputs',
              },
            },
            {
              name: 'progress-bars',
              path: 'progress-bars',
              component: () => import('../components/pages/404-pages/VaPageNotFoundCustom.vue'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Medium-Editor',
              },
            },
          ],
        },

        {
          name: 'forms',
          path: 'addstudent',
          component: EmptyParentComponent,
          children: [
            {
              name: 'form-elements',
              path: 'form',
              component: () => import('../components/forms/form-elements/FormElements.vue'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/inputs',
              },
            },
            {
              name: 'medium-editor',
              path: 'addemployee',
              component: () => import('../components/pages/404-pages/VaPageNotFoundCustom.vue'),
              meta: {
                wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Medium-Editor',
              },
            },
          ],
        },

      ],
    },
  ],
})
