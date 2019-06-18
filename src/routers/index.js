import exampleRoutes from './example';

import Home from '@/views/Home.vue'
const defaultExample = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
];
export default [
  { path: '*', redirect: '/login' },
  { path: '', redirect: '/login' },
  { 
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue'),
  },
	...defaultExample,
	...exampleRoutes,
];