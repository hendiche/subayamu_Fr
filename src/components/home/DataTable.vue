<template>
	<v-data-table
		:headers='headers'
		:items='items'
		:items-per-page='5'
		class='elevation-1'
	>
		<template v-slot:top>
			<v-layout wrap class='pa-3'>
				<v-flex xs6 class='text-left'>
					<h2>{{ title }}</h2>
				</v-flex>
				<v-flex xs6 class='text-right'>
					<v-btn small color='success'>
						Add
						<v-icon small right>fas fa-plus</v-icon>
					</v-btn>
				</v-flex>
			</v-layout>
		</template>
	</v-data-table>
</template>

<script>
export default {
	name: 'DataTable',
	props: {
		headers: Array,
		items: Array,
		title: String,
	},
	data: function() {
		return {};
	},
	computed: {},
	methods: {},
};
</script>