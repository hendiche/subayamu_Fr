<template>
	<v-data-table
		:headers='headers'
		:items='items'
		:items-per-page='5'
		class='elevation-1'
		:key='dataType'
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

		<template v-slot:item.name='{ item }'>
			<div>
				<span v-if='item._id == selectedPreviewId'>
					<v-icon left color='primary'>fas fa-eye</v-icon>
				</span>
				{{ item.name }}
			</div>
		</template>

		<template v-slot:item.created_at='{ item }'>
			<div>{{ momentDate(item.created_at) }}</div>
		</template>

		<template v-slot:item.actions='{ item }'>
			<div>
				<span class='che-pointer'>
					<v-icon
						left 
						@click='onChangePreview(item)'
					>
						far fa-object-ungroup
					</v-icon>
				</span>
				<span class='che-pointer'>
					<v-icon right @click='onDeleteLink(item)'>fas fa-trash-alt</v-icon>
				</span>
			</div>
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
		return {
			selectedPreviewId: '',
		};
	},
	computed: {
		...mapGetters([
			'docsList',
			'slideList',
			'videoList',
		]),

		items() {
			let listItem = [];

			// condition get the list items from getters, for documents
			if (this.dataType === 'docs') {
				listItem = this.docsList(this.data._id);
			}

			// condition get the list items from getters, for slides
			if (this.dataType === 'slide') {
				listItem = this.slideList(this.data._id);
			}

			// condition get the list items from getters, for videos
			if (this.dataType === 'video') {
				listItem = this.videoList(this.data._id);
			}

			// set default preview from list item
			this.onChangePreview(listItem[0]);

			return listItem;
		},
	},
	methods: {
		momentDate,
		onChangePreview(item = {}) {
			this.selectedPreviewId = item._id;
			this.$emit('changePreview', item);
		},
		onDeleteLink(item) {
			this.$emit('onDeleting', item);
		},
	},
};
</script>

<style lang='scss' scoped>
	.che-pointer {
		cursor: pointer;
	}
</style>