import Vue from 'vue'
import Vuex from 'vuex'

import { modules, state, getters, mutations, actions } from '@/stores/index';

Vue.use(Vuex)

export default new Vuex.Store({
	modules,
  state,
  getters,
  mutations,
  actions
})
