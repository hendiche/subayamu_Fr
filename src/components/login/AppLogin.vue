<template>
	<v-layout id='app-login' class='che-login-bg' wrap>
		<div class="che-login-bg-opacity"></div>
		<v-flex lg4 offset-lg4 xs10 offset-xs1 class='che-login-center'>
			<v-card>
				<v-card-text>
					<v-tabs grow>
						<v-tab>LOGIN</v-tab>
						<v-tab>REGISTER</v-tab>

						<v-tab-item>
							<LoginForm />
						</v-tab-item>
							
						<v-tab-item>
							<RegisterForm />
						</v-tab-item>
					</v-tabs>
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
import LoginForm from './LoginForm.vue';
import RegisterForm from './RegisterForm.vue';

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
	components: {
		LoginForm,
		RegisterForm,
	}
}
</script>
<style lang='scss' scoped>
	@import 'style.scss';
</style>