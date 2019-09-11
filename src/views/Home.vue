<template>
	<v-container fluid class='pa-0'>
		<AppHome />
	</v-container>
</template>

<script>
import AppHome from '@/components/home/AppHome.vue';

export default {
	name: 'home',
	data: function() {
		return {};
	},
	computed: {},
	methods: {},
	components: {
		AppHome,
	}
}
</script>
