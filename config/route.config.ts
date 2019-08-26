// umi routes: https://umijs.org/zh/guide/router.html
import DemoRoute from './route.demoConfig';

const env = process.env.NODE_ENV;

const demoRoutes = env === 'development' ? DemoRoute : [];

const routes = [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      {
        path: '/welcome',
        name: 'welcome',
        icon: 'smile',
        component: './Welcome',
      },
      ...demoRoutes,
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];

export default routes;
