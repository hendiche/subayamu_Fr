<template>
	<v-container fluid class='pa-0'>
		<Alert />
		<AppLogin />
	</v-container>
</template>

<script>
import Alert from '@/components/Alert.vue';
import AppLogin from '@/components/login/AppLogin.vue';

export default {
	name: 'login',
	data: function() {
		return {};
	},
	computed: {},
	methods: {},
	components: {
		AppLogin,
		Alert,
	},
}
</script>