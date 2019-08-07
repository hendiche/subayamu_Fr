import { shallowMount } from '@vue/test-utils'
import AppLogin from '../AppLogin.vue';

describe('AppLogin.vue', () => {
	test('test', () => {
		const wrapper = shallowMount(AppLogin);

		expect(true).toBe(true);
	});
})