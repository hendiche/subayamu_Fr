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
					v-for='(item, index) in getJoinedProjects'
					:key='item._id'
					class='pa-0 che-tab'
				>
					<v-btn
						v-if='getJoinedProjects.length - 1 == index'
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
					v-for='(item, index) in getJoinedProjects'
					:key='item._id'
				>
					<v-card flat tile>
						<v-card-text class='pa-0'>
							<AppDocSec />
							<v-divider />

							<AppSlideSec />
							<v-divider />
							
							<AppVideoSec />
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
import AppDocSec from './docSec/AppDocSec.vue';
import AppSlideSec from './slideSec/AppSlideSec.vue';
import AppVideoSec from './videoSec/AppVideoSec.vue';

import addTabModal from '@/modals/addTabModal.vue';

export default {
	name: 'appHome',
	props: {},
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
			'getJoinedProjects',
		]),
	},
	methods: {
		test(e) {
			console.log(e);
		},
		changeTab(e) {
			if (e == this.getJoinedProjects.length - 1) {
				return this.tab = this.oldTabIdx;
			}
			this.oldTabIdx = e;
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