const example1 = () => import('@/views/example/example1.vue');
const example2 = () => import('@/views/example/example2.vue');

export default [
	{
		path: '/boilerplate/example1',
		name: 'boilerplateExample1',
		component: example1,
	},
	{
		path: '/boilerplate/example2',
		name: 'boilerplateExample2',
		component: example2,
	},
]