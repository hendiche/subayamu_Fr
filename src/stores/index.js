import {
	SET_ALERT,
} from '@/stores/mutationTypes';

import userModule from '@/stores/userModule/index';

const modules = {
	userModule,
}

const state = {
	alertObj: {
		showAlert: false,
		msg: '',
		msgArr: [],
	},
};

const getters = {
	getAlertObj: (state) => {
		return state.alertObj;
	},
};

const mutations = {
	[SET_ALERT] (state, payload) {
		state.alertObj.showAlert = true;
		state.alertObj.msg = payload.msg;
		state.alertObj.msgArr = payload.msgArr;
	},
};

const actions = {};

export {
	modules,
	state,
	getters,
	mutations,
	actions
}