<template>
	<v-layout id='app-slide-sec' wrap>
		<v-flex xs12>
			<h1 class='mb-5'>Slides</h1>
		</v-flex>

		<v-flex lg5 xs12 class='pa-1'>
			<DataTable
				v-bind='propsForDataTable'
				:data='data'
				@openAddModal='isShowAddModal = true'
				@changePreview='changePreview'
				@onDeleting='deleteUrl'
			/>
		</v-flex>

		<v-flex lg7 xs12 class='pa-1 text-center'>
			<v-card>
				<v-card-title class='title'>Slide Preview</v-card-title>
				<v-card-text class='pa-0'>
					<iframe
						:src='iframeSrc'
						frameborder="0" 
						allowfullscreen="true" 
						mozallowfullscreen="true" 
						webkitallowfullscreen="true"
						class='che-iframe-slide'
					/>
				</v-card-text>
			</v-card>
		</v-flex>

		<AddSlideModal
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
import AddSlideModal from '@/modals/AddSlideModal.vue';
import ConfirmationModal from '@/modals/ConfirmationModal.vue';

import {
	DELETE_SLIDE,
} from '@/stores/actionTypes';

export default {
	name: 'appSlideSec',
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
				title: 'Slide List',
				dataType: 'slide',
			},

			// add slide modal component
			isShowAddModal: false,

			// confirmation modal component
			isShowConfModal: false,
			propsForConfModal: {
				title: 'Confirmation',
				body: 'Are you sure delete slide?',
				positifBtn: 'Delete',
				positifBtnColor: 'error',
				negatifBtn: 'Cancel',
			},
		};
	},
	computed: {},
	methods: {
		changePreview(dataObj) {
			// example: https://docs.google.com/presentation/d/e/2PACX-1vR88TjIbRcF2Dg9dgy5jIg1d071QcJ90kjiSm5YZ8cFPUxR21Y6nHb_9At0plgX0C90_DULFckgwh3h/embed?start=false&loop=false&delayms=3000
			this.iframeSrc = dataObj.slide_url;
		},
		deleteUrl(dataObj) {
			this.payload = {
				params: {
					slide_id: dataObj._id,
					project_id: this.data._id,
				},
			}

			this.isShowConfModal = true;
		},
		positifConfirm() {
			this.$store.dispatch(DELETE_SLIDE, this.payload);
			this.isShowConfModal = false;
		}
	},
	components: {
		DataTable,
		AddSlideModal,
		ConfirmationModal,
	}
};

const headers = [
	{ text: 'name', sortable: false, value: 'name' },
	{ text: 'created date' , sortable: false, value: 'created_at' },
	{ text: 'actions', sortable: false, value: 'actions' },
];
</script>
<style lang='scss' scoped>
	@import '../style.scss';
</style>