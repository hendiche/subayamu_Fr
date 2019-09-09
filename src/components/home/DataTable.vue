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
					<v-btn small color='success' @click='$emit("openAddModal")'>
						Add
						<v-icon small right>fas fa-plus</v-icon>
					</v-btn>
				</v-flex>
			</v-layout>
		</template>

		<template v-slot:item.created_at='{ item }'>
			<div>{{ momentDate(item.created_at) }}</div>
		</template>
	</v-data-table>
</template>

<script>
import { mapGetters } from 'vuex';

import { 
	momentDate,
} from '@/helpers/GeneralHelpers';

export default {
	name: 'DataTable',
	props: {
		headers: Array,
		title: String,
		dataType: String,
		data: Object,
	},
	data: function() {
		return {};
	},
	computed: {
		...mapGetters([
			'videoList',
		]),

		items() {
			if (this.dataType === 'video') {
				return this.videoList(this.data._id);
			}
		},
	},
	methods: {
		momentDate,
	},
};
</script>