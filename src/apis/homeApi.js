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

	async documents(project_id) {
		return api.fetch({
			url: 'projects/docs/' + project_id,
			method: 'GET'
		});
	}

	async addDocument(body) {
		return api.fetch({
			url: 'projects/docs/add',
			method: 'POST',
			body,
		});
	}

	async deleteDocument(document_id) {
		return api.fetch({
			url: 'projects/docs/' + document_id,
			method: 'DELETE',
		});
	}

	async slides(project_id) {
		return api.fetch({
			url: 'projects/slide/' + project_id,
			method: 'GET'
		});
	}

	async addSlide(body) {
		return api.fetch({
			url: 'projects/slide/add',
			method: 'POST',
			body,
		});
	}

	async deleteSlide(slide_id) {
		return api.fetch({
			url: 'projects/slide/' + slide_id,
			method: 'DELETE',
		});
	}

	async youtubeLink(project_id) {
		return api.fetch({
			url: 'projects/youtube/' + project_id,
			method: 'GET'
		});
	}

	async addYoutubeLink(body) {
		return api.fetch({
			url: 'projects/youtube/add',
			method: 'POST',
			body,
		});
	}

	async deleteYoutubeLink(youtube_id) {
		return api.fetch({
			url: 'projects/youtube/' + youtube_id,
			method: 'DELETE'
		});
	}
	
}

const homeApi = new HomeApi();
export default homeApi;