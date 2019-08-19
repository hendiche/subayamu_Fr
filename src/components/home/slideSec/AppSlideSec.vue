<template>
	<v-layout id='app-slide-sec' wrap>
		<v-flex xs12>
			<h1 class='mb-5'>Slides</h1>
		</v-flex>

		<v-flex lg7 xs12 class='pa-1'>
			<iframe
				src="https://docs.google.com/presentation/d/e/2PACX-1vR88TjIbRcF2Dg9dgy5jIg1d071QcJ90kjiSm5YZ8cFPUxR21Y6nHb_9At0plgX0C90_DULFckgwh3h/embed?start=false&loop=false&delayms=3000"
				frameborder="0" 
				allowfullscreen="true" 
				mozallowfullscreen="true" 
				webkitallowfullscreen="true"
				class='che-iframe-slide'
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
	name: 'appSlideSec',
	props: {},
	data: function() {
		return {
			propsForDataTable: {
				headers,
				items,
				title: 'Slides List',
			}
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
	{ text: 'created date' , sortable: false, value: 'created_at' },
	{ text: 'actions', sortable: false, value: 'actions' },
];

const items = [
	{ name: 'slide 1', created_at: '2019/03/03', },
	{ name: 'slide 2', created_at: '2019/03/03', },
];
</script>
<style lang='scss' scoped>
	@import '../style.scss';
</style>