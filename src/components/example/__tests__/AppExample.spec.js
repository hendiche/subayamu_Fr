import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Router from 'vue-router';
import Vuex from 'vuex';
import Vue from 'vue';
import Vuetify from 'vuetify';
import routers from '@/routers/index.js';

import AppExample from '../AppExample.vue'

Vue.use(Vuetify);
const localVue = createLocalVue();
localVue.use(Router);
localVue.use(Vuex);

describe('AppExample.vue', () => {
	let wrapper;

	beforeAll(() => {
		const propsData = {
			btnRouteName: "boilerplateExample2",
		};

		wrapper = mount(AppExample, {
			store: new Vuex.Store(),
			localVue,
			sync: false,
			router: new Router(),
			propsData,
		});
	});

  test('connecting vue-router for testing', () => {
  	expect(true).toBe(true);
  });

  test('connecting vuex for testing', () => {
  	expect(true).toBe(true);
  });

  test('using vuetify for testing', () => {
  	expect(true).toBe(true);
  });

  test('set "sync" for asynchronously render Vue component', () => {
  	expect(true).toBe(true);
  });

  test('set propsData', () => {
  	expect(wrapper.find('#btnboilerplateExample2').exists()).toBe(true);
  });

  test('click navigation button to call router', async () => {
  	const spy = jest.fn();
  	wrapper.vm.$router.push = spy;
  	wrapper.find('#btnboilerplateExample2').trigger('click');

  	await wrapper.vm.$nextTick();

  	expect(spy).toHaveBeenCalledWith({ name: 'boilerplateExample2' });
  });

})
