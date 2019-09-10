// import state from './state';
// import getters from './getters';
// import mutations from './mutations';
// import actions from './actions';
import {
	SET_ALERT,
} from '@/stores/mutationTypes';
import { 
	SET_PROJECTS,
	PAGE_LOADING_TRUE,
	PAGE_LOADING_FALSE,
} from '@/stores/mutationTypes';
import {
	PROJECT_TABS,
	CREATE_PROJECT, 
	JOIN_PROJECT,
	PROJECT_CONTENT,
	PROJECT_CONTENT_DOCS,
	ADD_DOCS,
	DELETE_DOCS,
	PROJECT_CONTENT_LINK,
	ADD_YOUTUBE_LINK,
	DELETE_YOUTUBE_LINK,
} from '@/stores/actionTypes';
import { homeApi } from '@/apis/index';

const state = {
	projectTabs: [],
	homeContent: {},
};

const getters = {
	// return project tabs data
	projects: (state) => {
		return state.projectTabs;
	},
	// return project docs list where key object of project_id
	docsList: (state) => (project_id) => {
		if (state.homeContent[project_id]) {
			return state.homeContent[project_id].docs;
		}

		return [];
	},
	// return project video list where key object of project_id
	videoList: (state) => (project_id) => {
		if (state.homeContent[project_id]) {
			return state.homeContent[project_id].link;
		}

		return [];
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

	// project content actions where will call post api of get document, get slides, get links
	// first will check if the tab/project already have the data or not, if there's then no need to call api
	// -> because it will take a lot of loading and internet resource
	// after success will store to state homeContent
	async [PROJECT_CONTENT] ({ commit, dispatch, state }, payload) {
		if (state.homeContent[payload.params.project_id]) return

		commit(PAGE_LOADING_TRUE);
		const tmpPayload = {
			...payload,
			dispatchType: 'CONTENT',
		};
		const docs = dispatch(PROJECT_CONTENT_DOCS, tmpPayload);
		const youtubeLink = dispatch(PROJECT_CONTENT_LINK, tmpPayload);

		Promise.all([docs, youtubeLink])
		.then(allRes => {
			console.log("all res", allRes);
			const tmpData = {
				...state.homeContent,
				[payload.params.project_id] : {
					docs: allRes[0],
					link: allRes[1],
					slide: ['asd', 'asd'],
				}
			};

			state.homeContent = tmpData;
			commit(PAGE_LOADING_FALSE);
		})
		.catch(allErr => {
			console.log(allErr, "cannot get content");
		});
	},

	// TODO: put comment about this actions here
	async [ADD_DOCS] ({ commit, dispatch }, payload) {
		commit(PAGE_LOADING_TRUE);

		homeApi.addDocument(payload.body)
		.then(res => {
			console.log('==> add document', res);
			commit(SET_ALERT, res);
			dispatch(PROJECT_CONTENT_DOCS, payload);
		})
		.catch(err => {
			console.log('error add document');
		})
	},

	// TODO: put comment about this actions here
	async [DELETE_DOCS] ({ commit, dispatch }, payload) {
		commit(PAGE_LOADING_TRUE);

		homeApi.deleteDocument(payload.params.document_id)
		.then(res => {
			console.log('==> deleted document', res);
			commit(SET_ALERT, res);
			dispatch(PROJECT_CONTENT_DOCS, payload);
		})
		.catch(err => {
			console.log(err, 'error delete document');
		})
	},

	// TODO: put comment about this actions here
	async [ADD_YOUTUBE_LINK] ({ commit, dispatch }, payload) {
		commit(PAGE_LOADING_TRUE);

		homeApi.addYoutubeLink(payload.body)
		.then(res => {
			console.log('==> add youtube link', res);
			commit(SET_ALERT, res);
			dispatch(PROJECT_CONTENT_LINK, payload);
		})
		.catch(err => {
			console.log(err, 'error add youtube link');
		})
	},

	// TODO: put comment about this actions here
	async [DELETE_YOUTUBE_LINK] ({ commit, dispatch }, payload) {
		commit(PAGE_LOADING_TRUE);

		homeApi.deleteYoutubeLink(payload.params.youtube_id)
		.then(res => {
			console.log('==> deleted', res);
			commit(SET_ALERT, res);
			dispatch(PROJECT_CONTENT_LINK, payload);
		})
		.catch(err => {
			console.log(err, 'error delete youtube link');
		})
	},

	// TODO: make this reuse when refresh one section only
	// TODO: put comment about this actions here
	async [PROJECT_CONTENT_DOCS] ({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			homeApi.documents(payload.params.project_id)
			.then(res => {
				if (payload.dispatchType === 'CONTENT') return resolve(res);

				const tmpData = state.homeContent;
				tmpData[payload.params.project_id].docs = res;
				state.homeContent = tmpData;
				commit(PAGE_LOADING_FALSE);
			})
			.catch(err => {
				console.log('err get docs', err);
				reject(err);
			});
		});
	},

	// TODO: make this reuse when refresh one section only
	// TODO: put comment about this actions here
	async [PROJECT_CONTENT_LINK] ({ commit, state }, payload) {
		return new Promise((resolve, reject) => {
			homeApi.youtubeLink(payload.params.project_id)
			.then(res => {
				if (payload.dispatchType === 'CONTENT') return resolve(res);

				const tmpData = state.homeContent;
				tmpData[payload.params.project_id].link = res;
				state.homeContent = tmpData;
				commit(PAGE_LOADING_FALSE);
			})
			.catch(err => {
				reject(err);
			});
		});
	},

};

export default {
	state,
	getters,
	mutations,
	actions,
}