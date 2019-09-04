<template>
	<div>
		<v-form
			ref='form'
			@keyup.native.enter='submit'
			lazy-validation
		>
			<v-text-field
				v-model='email'
				type='email'
				name='email'
				label='Email'
				id='login-field-email'
				required
				:rules='emailRules'
			/>
			<v-text-field
				v-model='password'
				type='password'
				name='password'
				label='Password'
				id='login-field-password'
				required
				:rules='passwordRules'
			/>
		</v-form>
		<v-btn
			id='login-btn-login'
			large
			color='success'
			block
			@click='submit'
			class='mt-5 mb-4'
			:loading='isBtnLoading'
		>
			Login
		</v-btn>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { LOGIN } from '@/stores/actionTypes';

// helpers
import RULES from '@/helpers/RuleHelpers';

export default {
	name: 'loginForm',
	data: function() {
		const { emailRules, passwordRules } = RULES.login;
		return {
			email: '',
			password: '',
			emailRules,
			passwordRules,
		};
	},
	computed: {
		...mapGetters([
			'isBtnLoading',
		]),
	},
	methods: {
		submit() {
			if (!this.$refs.form.validate()) return;

			const payload = {
				body: {
					email: this.email,
					password: this.password,
				}
			};

			this.$store.dispatch(LOGIN, payload)
			.then(() => this.$router.push('home'));
		},
	},
}
</script>

<style lang='scss' scoped>
	@import 'style.scss';
</style>