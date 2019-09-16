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
			<v-card>
				<v-card-title class='title'>
					Text Editor&nbsp;
					<span v-if='currentEditorDocumentId' class='caption'>
						{{ docSaveStatus ? 'Saving...' : `Updated at ${momentDate(data.updated_at)}` }}
					</span>
				</v-card-title>
				<v-card-text class='pa-0'>
					<Editor
						v-if='currentEditorDocumentId'
						id='app-doc-sec-editor'
						v-model='value'
						:init='editorInit'
						@onKeyUp='onChangeTextEditor'
					/>
					<div v-else class='che-doc-placeholder'></div>
				</v-card-text>
			</v-card>
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
import { mapGetters } from 'vuex';
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

import { momentDate } from '@/helpers/GeneralHelpers.js';

import {
	EDIT_DOCS,
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
			payload: {
				params: {},
			},
			currentEditorDocumentId: '',
			onChangeTimer: null,

			// tinymce editor component
			editorInit: {
				selector: 'textarea#app-doc-sec-editor',
				plugins: 'table link lists advlist charmap hr',
				toolbar: 'formatselect | fontselect | fontsizeselect | bold italic underline strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent',
				content_css: [
          '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
          '//www.tiny.cloud/css/codepen.min.css'
        ],
        skin_url: '/skins/ui/oxide',
        content_style: ".mce-content-body p { margin: 8px 0 8px 0 !important; }",
        removed_menuitems: 'newdocument',
        height: 515,
        statusbar: false,
        branding: false,
			},

			// Datatable component
			propsForDataTable: {
				headers,
				title: 'Document List',
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
	computed: {
		...mapGetters([
			'docSaveStatus',
		]),
	},
	methods: {
		momentDate,
		changePreview(dataObj) {
			this.value = dataObj.body;
			this.currentEditorDocumentId = dataObj._id;
			this.$forceUpdate();
		},
		onChangeTextEditor(val) {
			clearTimeout(this.onChangeTimer);

			this.onChangeTimer = setTimeout(() => {
				this.payload = {
					body: { body: this.value },
					params: { 
						document_id: this.currentEditorDocumentId,
						project_id: this.data._id,
					},
				};

				this.$store.dispatch(EDIT_DOCS, this.payload);
				this.editorStatus = 'done...';
			}, 700);
		},
		deleteLink(dataObj) {
			this.payload = {
				params: {
					document_id: dataObj._id,
					project_id: this.data._id,
				},
			};

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