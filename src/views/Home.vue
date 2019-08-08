<template>
	<v-container fluid>
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
