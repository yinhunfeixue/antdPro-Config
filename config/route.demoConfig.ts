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
          {
            name: 'DemoFormTable',
            path: '/Demo/Components/DemoFormTable',
            component: './Demo/Components/DemoFormTable',
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
      {
        name: 'Style',
        path: 'Style',
        component: './Demo/StyleDemo',
      },
      {
        name: 'BestPractice',
        path: 'BestPractice',
        routes: [
          {
            name: 'StateWillChangeByProps',
            path: 'Demo/BestPractice/StateWillChangeByProps',
            component: './Demo/BestPractice/StateWillChangeByProps',
          },
          {
            name: 'ResetForReuse',
            path: 'Demo/BestPractice/ResetForReuse',
            component: './Demo/BestPractice/ResetForReuse',
          },
        ],
      },
    ],
  },
];
