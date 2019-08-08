<template>
	<v-layout wrap>
		<v-flex xs6>asd</v-flex>
		<v-flex xs6>{{ data1 }}</v-flex>
		<v-flex xs6>{{ data2 }}</v-flex>
		<v-flex>
			<v-btn :id='`btn${btnRouteName}`' @click='nextPage'>navigate</v-btn>
		</v-flex>
	</v-layout>
</template>

<script>
export default {
	name: 'example',
	props: {
		btnRouteName: String,
	},
	data: function() {
		return {
			data1: 'data 1',
			data2: 'data 2',
		};
	},
	computed: {},
	methods: {
		nextPage() {
			this.$router.push({
				name : this.btnRouteName,
			});
		}
	},
};
</script>