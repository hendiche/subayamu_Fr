<template>
	<v-container>
		<AppExample
			btnRouteName='boilerplateExample2'
		/>
	</v-container>
</template>

<script>
import AppExample from '@/components/example/AppExample.vue';

export default {
	name: 'example1',
	data: function() {
		return {};
	},
	computed: {},
	methods: {},
	components: {
		AppExample,
	},
}
</script>