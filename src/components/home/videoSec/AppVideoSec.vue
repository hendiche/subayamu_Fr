<template>
	<v-layout id='app-video-sec' wrap>
		<v-flex xs12>
			<h1 class='mb-5'>Video Links</h1>
		</v-flex>

		<v-flex lg5 xs12 class='pa-1'>
			<DataTable
				v-bind='propsForDataTable'
				:data='data'
				@openAddModal='isShowAddModal = true'
				@changePreview='changePreview'
				@onDeleting='deleteLink'
			/>
		</v-flex>

		<v-flex lg7 xs12 class='pa-1 text-center'>
			<iframe
				:src='iframeSrc' 
				frameborder='0' 
				allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
				allowfullscreen
				class='che-iframe-video'
			/>
		</v-flex>

		<AddYoutubeLinkModal
			:modal='isShowAddModal'
			@close='isShowAddModal = false'
			:data='data'
		/>

		<ConfirmationModal 
			:modal='isShowConfModal'
			v-bind='propsForConfModal'
			@close='isShowConfModal = false'
			@positifConfirm='positifConfirm'
		/>

	</v-layout>
</template>

<script>
import DataTable from '@/components/home/DataTable.vue';
import AddYoutubeLinkModal from '@/modals/AddYoutubeLinkModal.vue';
import ConfirmationModal from '@/modals/ConfirmationModal.vue';

import { substringYoutubeVideoId } from '@/helpers/GeneralHelpers';

import {
	DELETE_YOUTUBE_LINK,
} from '@/stores/actionTypes';

export default {
	name: 'appVideoSec',
	props: {
		data: Object,
	},
	data: function() {
		return {
			// this component
			iframeSrc: '',
			payload: {},

			// data table component
			propsForDataTable: {
				headers,
				title: 'Video Link list',
				dataType: 'video',
			},

			// add youtube link modal component
			isShowAddModal: false,

			// confirmation modal component
			isShowConfModal: false,
			propsForConfModal: {
				title: 'Confirmation',
				body: 'Are you sure delete youtube link?',
				positifBtn: 'Delete',
				positifBtnColor: 'error',
				negatifBtn: 'Cancel',
			},
		};
	},
	computed: {},
	methods: {
		changePreview(linkDataObj) {
			// example 'https://www.youtube.com/embed/dj31N9me_rU';
			const youtubeBaseEmbededSrc = 'https://www.youtube.com/embed/';
			const subbedUrl = substringYoutubeVideoId(linkDataObj.embeded_url);

			this.iframeSrc = youtubeBaseEmbededSrc + subbedUrl;
		},
		deleteLink(linkDataObj) {
			this.payload = {
				params: {
					youtube_id: linkDataObj._id,
					project_id: this.data._id,
				},
			}

			this.isShowConfModal = true;
		},
		positifConfirm() {
			this.$store.dispatch(DELETE_YOUTUBE_LINK, this.payload);
			this.isShowConfModal = false;
		}
	},
	components: {
		DataTable,
		AddYoutubeLinkModal,
		ConfirmationModal,
	}
};

const headers = [
	{ text: 'name', sortable: false, value: 'name' },
	{ text: 'created date', sortable: false, value: 'created_at' },
	{ text: 'actions', sortable: false, value: 'actions' },
];
</script>

<style scoped lang='scss'>
	@import '../style.scss';
</style>