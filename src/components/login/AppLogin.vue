<template>
	<v-layout id='app-login' class='che-login-bg' wrap>
		<div class="che-login-bg-opacity"></div>
		<v-flex lg4 offset-lg4 xs10 offset-xs1 class='che-login-center'>
			<v-card>
				<v-card-title primary-title>
					<h3 class="headline mb-0">LOGIN</h3>
				</v-card-title>
				<v-card-text>
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
				</v-card-text>
				<div class='che-login-copyright'>
					<p>Copyright {{ moment().format('YYYY') }} 奥多摩日本語学校. All rights reserved</p>
				</div>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';
import { LOGIN } from '@/stores/actionTypes';
// components

// helpers
import RULES from '@/helpers/RuleHelpers';

export default {
	name: 'appLogin',
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
		moment,
		submit() {
			if (!this.$refs.form.validate()) return;

			const payload = {
				body: {
					email: this.email,
					password: this.password,
				}
			};

			this.$store.dispatch(LOGIN, payload)
			.then(() => {
				this.$router.push('home');
			});
		}
	},
}
</script>
<style lang='scss' scoped>
	@import 'style.scss';
</style>