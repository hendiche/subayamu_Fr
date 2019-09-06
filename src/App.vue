<template>
	<v-app>
		<v-content>
			<router-view/>

			<v-overlay :value="isLoadingPage" opacity='0.9'>
				<v-progress-circular indeterminate size="200"></v-progress-circular>
			</v-overlay>
		</v-content>
	</v-app>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'App',
	data () {
		return {
			//
		}
	},
	computed: {
		...mapGetters([
			'isLoadingPage',
		]),
	},
}
</script>
