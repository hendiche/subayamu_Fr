<template>
	<div>
		<v-alert
			:value='alertObj.showAlert'
			type='error'
			prominent
			border='top'
			dismissible
			class='che-alert-error'
		>
			<div v-if='alertObj.msg'>{{ alertObj.msg }}</div>
			<ul v-if='alertObj.msgArr.length'>
				<li v-for='item in alertObj.msgArr' :key='item'>{{ item }}</li>
			</ul>
		</v-alert>
	</div>
</template>

<script>
export default {
	name: 'AppAlert',
	props: {},
	data: function() {
		return {};
	},
	computed: {
		alertObj() {
			return this.$store.getters.getAlertObj;
		}
	}
}
</script>

<style lang='scss' scoped>
	.che-alert-error {
		z-index: 1;
	}
</style>