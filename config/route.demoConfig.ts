export default [
  {
    path: '/Demo',
    name: 'Demo',
    routes: [
      {
        name: 'Components',
        path: '/Demo/Components',
        routes: [
          {
            name: 'DemoSearchTable',
            path: '/Demo/Components/DemoSearchTable',
            component: './Demo/Components/DemoSearchTable',
          },
          {
            name: 'DetailModelPage',
            path: '/Demo/Components/DetailModelPage',
            component: './Demo/Components/DetailModelPage',
          },
        ],
      },
      {
        name: 'Functions',
        path: '/Demo/Functions',
        routes: [
          {
            name: 'RenderForm',
            path: '/Demo/Functions/RenderForm',
            component: './Demo/Functions/RenderForm',
          },
          {
            name: 'RenderSelectOption',
            path: '/Demo/Functions/RenderSelectOption',
            component: './Demo/Functions/RenderSelectOption',
          },
          {
            name: 'RenderTree',
            path: '/Demo/Functions/RenderTree',
            component: './Demo/Functions/RenderTree',
          },
        ],
      },
    ],
  },
];
