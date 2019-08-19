<template>
	<v-layout id='app-video-sec' wrap>
		<v-flex xs12>
			<h1 class='mb-5'>Video Links</h1>
		</v-flex>

		<v-flex lg7 xs12 class='pa-1'>
			<iframe
				src="https://www.youtube.com/embed/dj31N9me_rU" 
				frameborder="0" 
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
				class='che-iframe-video'
			/>
		</v-flex>
		<v-flex lg5 xs12 class='pa-1'>
			<DataTable v-bind='propsForDataTable' />
		</v-flex>
	</v-layout>
</template>

<script>
import DataTable from '@/components/home/DataTable.vue';

export default {
	name: 'appVideoSec',
	props: {},
	data: function() {
		return {
			propsForDataTable: {
				headers,
				items,
				title: 'Video Link list',
			},
		};
	},
	computed: {},
	methods: {},
	components: {
		DataTable,
	}
};

const headers = [
	{ text: 'name', sortable: false, value: 'name' },
	{ text: 'created date', sortable: false, value: 'created_at' },
	{ text: 'actions', sortable: false, value: 'actions' },
];

const items = [
	{ name: 'link 1', created_at: '2019/03/03' },
	{ name: 'link 2', created_at: '2019/03/03' },
	{ name: 'link 2', created_at: '2019/03/03' },
	{ name: 'link 2', created_at: '2019/03/03' },
	{ name: 'link 2', created_at: '2019/03/03' },
	{ name: 'link 2', created_at: '2019/03/03' },
];
</script>

<style scoped lang='scss'>
	@import '../style.scss';
</style>