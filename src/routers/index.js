
export default [
  { path: '*', redirect: '/login' },
  { path: '', redirect: '/login' },
  { 
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
    meta: { notRequiresAuth: true },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue'),
  },
];