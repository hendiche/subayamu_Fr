<template>
	<v-layout id='app-home' wrap>
		<v-flex>
			<v-tabs
				v-model='tab'
				fixed-tabs
				background-color="indigo"
				dark
				show-arrows
				hide-slider
				center-active
				class='che-home-tabs'
				@change='changeTab'
			>
				<v-tabs-slider />
				<v-tab
					v-for='(item, index) in projects'
					:key='item._id'
					class='pa-0 che-tab'
				>
					<v-btn
						v-if='projects.length - 1 == index'
						block
						x-large
						color='indigo'
						depressed
						@click='showAddTabModal = true'
					>
						<i class="fas fa-plus"></i>
					</v-btn>
					<span v-else>{{ item.name }}</span>
				</v-tab>
			</v-tabs>
			<div class='che-home-tab-spacer'></div>
			<v-tabs-items v-model='tab'>
				<v-tab-item
					v-for='(item, index) in projects'
					:key='item._id'
				>
					<v-card flat tile>
						<v-card-title>
							<h1>{{ item.name }}</h1>
							<span>({{ item.project_code }})</span>
						</v-card-title>
						<v-card-text class='pa-0'>
							<AppDocSec
								:data='projects[oldTabIdx]'
							/>
							<v-divider />

							<AppSlideSec
								:data='projects[oldTabIdx]'
							/>
							<v-divider />
							
							<AppVideoSec
								:data='projects[oldTabIdx]'
							/>
							<v-divider />
						</v-card-text>
					</v-card>
				</v-tab-item>
			</v-tabs-items>
		</v-flex>

		<addTabModal
			:modal='showAddTabModal'
			@close='showAddTabModal = false'
		/>
	</v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

// components
import AppDocSec from './docSec/AppDocSec.vue';
import AppSlideSec from './slideSec/AppSlideSec.vue';
import AppVideoSec from './videoSec/AppVideoSec.vue';
import addTabModal from '@/modals/addTabModal.vue';

import { PROJECT_TABS, PROJECT_CONTENT } from '@/stores/actionTypes';

export default {
	name: 'appHome',
	props: {},
	beforeCreate() {
		this.$store.dispatch(PROJECT_TABS);
	},
	data: function() {
		return {
			tab: null,
			oldTabIdx: -1,

			// add tab modal component
			showAddTabModal: false,
		};
	},
	computed: {
		...mapGetters([
			'projects',
		]),
	},
	methods: {
		test(e) {
			console.log(e);
		},
		changeTab(e) {
			if (e == this.projects.length - 1) {
				return this.tab = this.oldTabIdx;
			}
			this.oldTabIdx = e;

			const payload = {
				params: { project_id: this.projects[this.oldTabIdx]._id },
			};

			this.$store.dispatch(PROJECT_CONTENT, payload);
		},
	},
	components: {
		AppDocSec,
		AppSlideSec,
		AppVideoSec,
		addTabModal,
	}
}
</script>
<style lang='scss' scoped>
	@import 'style.scss';
</style>