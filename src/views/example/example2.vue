<template>
	<v-container>
		<AppExample
			btnRouteName='boilerplateExample1'
		/>
	</v-container>
</template>

<script>
import AppExample from '@/components/example/AppExample.vue';

export default {
	name: 'example2',
	data: function() {
		return {
			data1: 'asda',
			data2: 'http://www.mocky.io/v2/5cf091db300000700000b988',
		};
	},
	computed: {},
	methods: {},
	components: {
		AppExample,
	},
}
</script>