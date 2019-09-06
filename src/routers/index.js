const routes = [
  { path: '', redirect: '/login' },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/calendar',
    name: 'calendar',
    component: () => import('@/views/Calendar.vue'),
  },
];

export default [
  { path: '*', redirect: '/login' },
  { path: '', component: () => import('@/views/layouts/Base.vue'), children: routes },
  { 
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: { notRequiresAuth: true },
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import('@/views/Home.vue'),
  // },
];