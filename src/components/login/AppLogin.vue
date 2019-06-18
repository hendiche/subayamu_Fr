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
							v-model='username'
							name='username'
							label='Username'
							id='login-field-username'
							required
						/>
						<v-text-field
							v-model='password'
							type='password'
							name='password'
							label='Password'
							id='login-field-password'
							required
						/>
					</v-form>
					<div class="text-xs-right">
						<a href="#">Forgot Password?</a>
					</div>
					<v-btn
						id='login-btn-login'
						large
						color='success'
						block
						@click='submit'
						class='mt-5 mb-4'
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
// components

// helpers

export default {
	name: 'appLogin',
	props: {},
	data: function() {
		return {
			username: '',
			password: '',
		};
	},
	computed: {},
	methods: {
		moment,
		submit() {
			if (!this.$refs.form.validate()) return;

			const payload = {
				username: this.username,
				password: this.password,
			};

			console.log(payload);
		}
	},
}
</script>
<style lang='scss' scoped>
	@import 'style.scss';
</style>