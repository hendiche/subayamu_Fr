import axios from 'axios';
import store from './store';
import { LOGOUT } from '@/stores/actionTypes';
import router from './router';

const DOMAIN = process.env.VUE_APP_DOMAIN;

class Api {
	async fetch(options) {
		const axiosObj = {
			method: options.method || 'GET',
			url: DOMAIN + options.url,
		};

		const token = localStorage.getItem('token') || '';

		if (token) axiosObj.headers = { 'x-access-token': 'Bearer ' + token };

		if (options.domain) axiosObj.url = options.domain + options.url;

		if (options.method.toLowerCase() === 'post' || options.method.toLowerCase() === 'put') axiosObj.data = options.body;

		if (options.query) axiosObj.url = await this._appendQueryToUrl(axiosObj.url, options.query);

		console.log('=> axios object, ', axiosObj);
		try {
			const response = await axios(axiosObj);
			console.log('=> success response: ', response);
			return response.data;
		} catch (err) {
			console.log('=> error response: ', err);
			if (err.response.status === 401 || err.response.status === 403) {
				store.dispatch(LOGOUT)
				.then(() => { router.push({ name : 'login'}) });
			} else {
				throw err.response.data;
			}
		}
	}

	async _appendQueryToUrl(url, queries) {
		return new Promise(resolve => {
			let firstAppend = false;
			Object.keys(queries).forEach((key) => {
				if (queries[key]) {
					if (!firstAppend)  {
						url += '?';
						firstAppend = true;
					} else {
						url += '&';
					}
					url = `${url}${key}=${queries[key]}`;
				}
			});
			resolve(url);
		});
	}
}

export default new Api();