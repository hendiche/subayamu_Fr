import Vue from 'vue'
import Router from 'vue-router'
import store from './store';
import { RESET_ALERT } from '@/stores/mutationTypes';

import routes from '@/routers/index';
Vue.use(Router);

const router = new Router({
	mode: 'history',
	routes,
});

const getUserAuth = async () => {
	return new Promise(async (resolve) => {
		const token = await store.getters.userToken;
		resolve(token);
	});
}

router.beforeEach((to, from, next) => {
	const noReqAuth = to.meta.notRequiresAuth;

	store.commit(RESET_ALERT);
	getUserAuth()
	.then(userAuth => {
		// check route if meta obj is exists, then check if 'noReqAuth' == false required *(both should true)
		// check if user dont have token, then redirect to login;
		if (to.meta && !noReqAuth) {
			if (!userAuth) {
				next({ name: 'login' });
			}
		}

		// check if user trying to access login while having token(logged in) redirect user to home page
		if (to.name === 'login' && userAuth) {
			next({ name: 'home' });
		}

		next();
	});
});

export default router