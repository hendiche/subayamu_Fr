import {
	SET_ALERT,
	BTN_LOADING_TRUE,
	BTN_LOADING_FALSE,
	RESET_ALERT,
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
	isBtnLoading: false,
};

const getters = {
	getAlertObj: (state) => {
		return state.alertObj;
	},
	isBtnLoading: (state) => {
		return state.isBtnLoading;
	},
};

const mutations = {
	[SET_ALERT] (state, payload) {
		state.alertObj.showAlert = true;
		state.alertObj.msg = payload.msg;
		state.alertObj.msgArr = payload.msgArr;
	},

	[BTN_LOADING_TRUE] (state) {
		state.isBtnLoading = true;
	},

	[BTN_LOADING_FALSE] (state) {
		state.isBtnLoading = false;
	},

	[RESET_ALERT] (state) {
		state.alertObj.showAlert = false,
		state.alertObj.msg = '',
		state.alertObj.msgArr = [];
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