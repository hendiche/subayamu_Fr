// import state from './state';
// import getters from './getters';
// import mutations from './mutations';
// import actions from './actions';
import {
	SUCCESS_LOGIN_STORE,
	LOGOUT,
	SET_ALERT,
	BTN_LOADING_TRUE,
	BTN_LOADING_FALSE,
} from '@/stores/mutationTypes';
import { LOGIN, REGISTER } from '@/stores/actionTypes';
import { userApi } from '@/apis/index';

const state = {
	token: localStorage.getItem('token') || '',
	user: JSON.parse(localStorage.getItem('user')) || {},
};

const getters = {
	// return user data from state that get from local storage
	user: (state) => {
		return state.user;
	},
	// return user token for auth
	userToken: (state) => {
		return state.token;
	},
};

const mutations = {
	// after success login, store user data and token to local storage
	[SUCCESS_LOGIN_STORE] (state, payload) {
		state.token = payload.token;
		state.user = payload.user;
		localStorage.setItem('user', JSON.stringify(payload.user));
		localStorage.setItem('token', payload.token);
	},

	// logout and remove all logged user data, also remove from local storage
	[LOGOUT] (state) {
		state.user = {};
		state.token = '';
		localStorage.removeItem('user');
		localStorage.removeItem('token');
	},
};

const actions = {
	// login action where call api of login and return promise 
	// after success, will store user login data
	[LOGIN] ({ commit }, payload) {
		commit(BTN_LOADING_TRUE);
		return new Promise((resolve) => {
			userApi.login(payload.body)
			.then(res => {
				commit(SUCCESS_LOGIN_STORE, res);
				commit(BTN_LOADING_FALSE);
				resolve(true);
			})
			.catch(err => {
				commit(SET_ALERT, err);
				commit(BTN_LOADING_FALSE);
				console.log(err);
			});
		});
	},

	// register actions where will call api of register and
	// after success, will set alert
	[REGISTER] ({ commit }, payload) {
		commit(BTN_LOADING_TRUE);
		userApi.register(payload.body)
		.then(res => {
			commit(SET_ALERT, res);
			commit(BTN_LOADING_FALSE);
		})
		.catch(err => {
			commit(SET_ALERT, err);
			commit(BTN_LOADING_FALSE);
			console.log(err);
		});
	},

	[LOGOUT] ({ commit }) {
		return new Promise((resolve) => {
			commit(LOGOUT);
			resolve(true);
		});
	}
};

export default {
	state,
	getters,
	mutations,
	actions,
};