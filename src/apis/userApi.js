import api from '@/api';

class UserApi {
	async login (body) {
		return api.fetch({
			url: 'login',
			method: 'POST',
			body,
		});
	}
}

const userApi = new UserApi();
export default userApi;