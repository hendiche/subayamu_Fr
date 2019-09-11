<template>
	<v-layout id='app-doc-sec' wrap>
		<v-flex xs12>
			<h1 class='mb-5'>Documents</h1>
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

		<v-flex lg7 xs12 class='pa-1'>
			<Editor
				v-model='value'
				:init='editorInit'
			/>
		</v-flex>

		<AddDocsModal
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
// tinymce
import tinymce from 'tinymce/tinymce';
import Editor from '@tinymce/tinymce-vue';
import 'tinymce/themes/silver/theme';
import 'tinymce/plugins/table';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/hr';

import DataTable from '@/components/home/DataTable.vue';
import AddDocsModal from '@/modals/AddDocsModal.vue';
import ConfirmationModal from '@/modals/ConfirmationModal.vue';

import {
	DELETE_DOCS,
} from '@/stores/actionTypes';

export default {
	name: 'appDocSec',
	props: {
		data: Object,
	},
	data: function() {
		return {
			// this component
			value: '',
			payload: {},

			// tinymce editor component
			editorInit: {
				plugins: 'table link lists advlist charmap hr',
				toolbar: 'formatselect | fontselect | fontsizeselect | bold italic underline strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent |',
				content_css: [
          '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
          '//www.tiny.cloud/css/codepen.min.css'
        ],
        skin_url: '/skins/ui/oxide',
        removed_menuitems: 'newdocument',
        height: 515,
        statusbar: false,
        branding: false,
			},

			// Datatable component
			propsForDataTable: {
				headers,
				title: 'Documents List',
				dataType: 'docs',
			},

			// add document modal component
			isShowAddModal: false,

			// confimation modal component
			isShowConfModal: false,
			propsForConfModal: {
				title: 'Confirmation',
				body: 'Are you sure delete document?',
				positifBtn: 'Delete',
				positifBtnColor: 'error',
				negatifBtn: 'Cancel',
			},
		};
	},
	computed: {},
	methods: {
		changePreview(linkDataObj) {
			this.value = linkDataObj.body;
		},
		deleteLink(linkDataObj) {
			this.payload = {
				params: {
					document_id: linkDataObj._id,
					project_id: this.data._id,
				},
			}

			this.isShowConfModal = true;
		},
		positifConfirm() {
			this.$store.dispatch(DELETE_DOCS, this.payload);
			this.isShowConfModal = false;
		}
	},
	components: {
		DataTable,
		Editor,
		AddDocsModal,
		ConfirmationModal,
	},
};

const headers = [
	{ text: 'name', sortable: false, value: 'name' },
	{ text: 'created date', sortable: false, value: 'created_at' },
	{ text: 'actions', sortable: false, value: 'actions' },
];
</script>
<style lang='scss' scoped>
	@import '../style.scss';
</style>