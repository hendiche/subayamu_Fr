<template>
	<v-layout id='app-doc-sec' wrap>
		<v-flex xs12>
			<h1 class='mb-5'>Documents</h1>
		</v-flex>
		
		<v-flex lg7 xs12 class='pa-1'>
			<Editor
				v-model='value'
				:init='editorInit'
			/>
		</v-flex>
		<v-flex lg5 xs12 class='pa-1'>
			<DataTable v-bind='propsForDataTable' />
		</v-flex>
	</v-layout>
</template>

<script>
import DataTable from '@/components/home/DataTable.vue';

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


export default {
	name: 'appDocSec',
	props: {},
	data: function() {
		return {
			// this component
			value: '',

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
				items,
				title: 'Documents List',
			},
		};
	},
	computed: {},
	methods: {},
	components: {
		DataTable,
		Editor,
	},
};

const headers = [
	{ text: 'name', sortable: false, value: 'name' },
	{ text: 'start date', sortable: false, value: 'start_period' },
	{ text: 'end period', sortable: false, value: 'end_period' },
	{ text: 'actions', sortable: false, value: 'actions' },
];

const items = [
	{ name: 'project 1', start_period: '2019/03/03', end_period: '2019/03/03' },
	{ name: 'project 2', start_period: '2019/02/02', end_period: '2019/02/02' },
];
</script>
<style lang='scss' scoped>
	@import '../style.scss';
</style>