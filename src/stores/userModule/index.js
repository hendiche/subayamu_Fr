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
import { LOGIN } from '@/stores/actionTypes';
import { userApi } from '@/apis/index';

const state = {
	token: localStorage.getItem('token') || '',
	user: localStorage.getItem('user') || {},
};

const getters = {
	userToken: (state) => {
		return state.token;
	},
	getJoinedProjects: (state) => {
		// return state.user.joined_projects;
		return [
			{
				_id: 'assa1',
				name: 'name',
			},
			{
				_id: 'dsad2',
				name: 'name2',
			},
			{
				_id: 'dsa3',
				name: 'name3',
			}
		];
	},
};

const mutations = {
	[SUCCESS_LOGIN_STORE] (state, payload) {
		state.token = payload.token;
		state.user = payload.user;
		localStorage.setItem('user', JSON.stringify(payload.user));
		localStorage.setItem('token', payload.token);
	},

	[LOGOUT] (state) {
		state.user = {};
		state.token = '';
		localStorage.removeItem('user');
		localStorage.removeItem('token');
	},
};

const actions = {
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