// import state from './state';
// import getters from './getters';
// import mutations from './mutations';
// import actions from './actions';
import {
	SET_ALERT,
} from '@/stores/mutationTypes';
import {
	PROJECT_TABS,
	CREATE_PROJECT, 
	JOIN_PROJECT,
} from '@/stores/actionTypes';
import { 
	SET_PROJECTS,
	PAGE_LOADING_TRUE,
	PAGE_LOADING_FALSE,
} from '@/stores/mutationTypes';
import { homeApi } from '@/apis/index';

const state = {
	projectTabs: [],
};

const getters = {
	// return project tabs data
	projects: (state) => {
		return state.projectTabs;
	},
};

const mutations = {
	// after success get data from api, set project state data
	[SET_PROJECTS] (state, payload) {
		state.projectTabs = payload.projects;
		state.projectTabs.push({ _id: 'FOR_ADDING_BTN' });
	},

};

const actions = {
	// project tabs actions where call api of project tabs
	// after success, will store project tabs data
	async [PROJECT_TABS] ({ commit, dispatch, getters }) {
		commit(PAGE_LOADING_TRUE);
		const user = await getters.user;

		homeApi.getProjectTabs(user.active_organization)
		.then(res => {
			const payload = {
				projects: res,
			};

			commit(SET_PROJECTS, payload);
			commit(PAGE_LOADING_FALSE);
		})
		.catch(err => {
			console.log(err);
		})
	},

	// create project actions where will call post api of create project
	// first need to set project tabs data to empty array,
	// -> because if didnt reset it, there's bug in Vtabs
	// in same time at first also will get user data from getters
	// -> because need user active organization id as param of the api
	// after success will call get project tabs action
	async [CREATE_PROJECT] ({ commit, state, dispatch, getters }, payload) {
		commit(PAGE_LOADING_TRUE);
		state.projectTabs = [];
		const user = await getters.user;

		homeApi.addProject(user.active_organization, payload.body)
		.then(res => {
			console.log("==> creted", res);
			dispatch(PROJECT_TABS);
		})
		.catch(err => {
			console.log(err);
		})
	},

	// join project actions where will call post api of join project
	// first need to set project tabs data to empty array,
	// -> because if didn't reset it, there's bug in Vtabs
	// in same time at first also will get user data from getters
	// -> because need user active organization id as param of the api
	// after success will call get project tabs action
	async [JOIN_PROJECT] ({ commit, dispatch, getters }, payload) {
		commit(PAGE_LOADING_TRUE);
		state.projectTabs = [];
		const user = await getters.user;

		homeApi.joinProject(user.active_organization, payload.body)
		.then(res => {
			console.log('==> joined', res);
			dispatch(PROJECT_TABS);
		})
		.catch(err => {
			console.log(err);
		})
	},
};

export default {
	state,
	getters,
	mutations,
	actions,
}