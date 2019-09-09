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
			/>
		</v-flex>

		<v-flex lg7 xs12 class='pa-1 text-center'>
			<iframe
				src="https://www.youtube.com/embed/dj31N9me_rU" 
				frameborder="0" 
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
				class='che-iframe-video'
			/>
		</v-flex>

		<AddYoutubeLinkModal
			:modal='isShowAddModal'
			@close='isShowAddModal = false'
			:data='data'
		/>

	</v-layout>
</template>

<script>
import DataTable from '@/components/home/DataTable.vue';
import AddYoutubeLinkModal from '@/modals/AddYoutubeLinkModal.vue';

export default {
	name: 'appVideoSec',
	props: {
		data: Object,
	},
	data: function() {
		return {
			propsForDataTable: {
				headers,
				title: 'Video Link list',
				dataType: 'video',
			},

			isShowAddModal: false,
		};
	},
	computed: {},
	methods: {},
	components: {
		DataTable,
		AddYoutubeLinkModal,
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