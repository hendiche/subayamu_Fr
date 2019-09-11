import {
	SET_ALERT,
	BTN_LOADING_TRUE,
	BTN_LOADING_FALSE,
	RESET_ALERT,
	PAGE_LOADING_TRUE,
	PAGE_LOADING_FALSE,
} from '@/stores/mutationTypes';

import userModule from '@/stores/userModule/index';
import homeModule from '@/stores/homeModule/index';

const modules = {
	userModule,
	homeModule,
}

const state = {
	alertObj: {
		showAlert: false,
		success: null,
		msg: '',
		msgArr: [],
	},
	isBtnLoading: false,
	isLoadingPage: false,
};

const getters = {
	// return alert data
	getAlertObj: (state) => {
		return state.alertObj;
	},
	// return if button is loading state of true or not
	isBtnLoading: (state) => {
		return state.isBtnLoading;
	},
	// return if page is loading state of true or not
	isLoadingPage: (state) => {
		return state.isLoadingPage;
	}
};

const mutations = {
	// set data for alert
	[SET_ALERT] (state, payload) {
		state.alertObj.showAlert = true;
		state.alertObj.success = payload.success;
		state.alertObj.msg = payload.msg;
		state.alertObj.msgArr = payload.msgArr;
	},

	// reset alert state data for alert
	[RESET_ALERT] (state) {
		state.alertObj.showAlert = false,
		state.alertObj.msg = '',
		state.alertObj.msgArr = [];
	},

	// set button loading state to true
	[BTN_LOADING_TRUE] (state) {
		state.isBtnLoading = true;
	},

	// set button loading state to false
	[BTN_LOADING_FALSE] (state) {
		state.isBtnLoading = false;
	},

	// set page loading state to true
	[PAGE_LOADING_TRUE] (state) {
		state.isLoadingPage = true
	},

	// set page loading state to false
	[PAGE_LOADING_FALSE] (state) {
		state.isLoadingPage = false
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