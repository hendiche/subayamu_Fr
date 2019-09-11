<template>
	<div>
		<v-alert
			v-if='alertObj.success'
			:value='alertObj.showAlert'
			type='success'
			prominent
			border='top'
			dismissible
			class='che-alert-success'
		>
			<div v-if='alertObj.msg'>{{ alertObj.msg }}</div>
			<ul v-if='alertObj.msgArr.length'>
				<li v-for='item in alertObj.msgArr' :key='item'>{{ item }}</li>
			</ul>	
		</v-alert>

		<v-alert
			v-else
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
	.che-alert-error,
	.che-alert-success {
		z-index: 1;
	}
</style>