import api from '@/api';

class HomeApi {
	async getProjectTabs(orgz_id) {
		return api.fetch({
			url: 'projects/' + orgz_id,
			method: 'GET',
		});
	}

	async addProject(orgz_id, body) {
		return api.fetch({
			url: 'projects/add/' + orgz_id,
			method: 'POST',
			body,
		});
	}

	async joinProject(orgz_id, body) {
		return api.fetch({
			url: 'projects/join/' + orgz_id,
			method: 'POST',
			body,
		});
	}
	
}

const homeApi = new HomeApi();
export default homeApi;