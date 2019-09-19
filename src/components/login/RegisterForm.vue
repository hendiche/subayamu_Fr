<template>
	<div>
		<v-form
			ref='form'
			@keyup.native.enter='submit'
			lazy-validation
			:key='counting'
		>
			<v-text-field
				v-model='name'
				name='name'
				label='Name'
				id='register-field-name'
				required
				:rules='nameRules'
			/>
			<v-text-field
				v-model='email'
				type='email'
				name='email'
				label='Email'
				id='register-field-email'
				required
				:rules='emailRules'
			/>
			<v-text-field
				v-model='password'
				type='password'
				name='password'
				label='Password'
				id='register-field-password'
				required
				:rules='passwordRules'
			/>
		</v-form>
		<v-btn
			large
			color='success'
			block
			@click='submit'
			class='mt-5 mb-4'
			:loading='isBtnLoading'
		>
			Register
		</v-btn>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { REGISTER } from '@/stores/actionTypes';

// helpers
import RULES from '@/helpers/RuleHelpers';

export default {
	name: 'registerForm',
	data: function() {
		const { nameRules, emailRules, passwordRules } = RULES.register;
		return {
			name: '',
			email: '',
			password: '',
			nameRules,
			emailRules,
			passwordRules,
			counting: 0,
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
					name: this.name,
					email: this.email,
					password: this.password,
				}
			};

			this.$store.dispatch(REGISTER, payload)
			.then(() => {
				this.name = '';
				this.email = '';
				this.password = '';
				this.counting += 1;
			});
		},
	},
}
</script>
<style lang='scss' scoped>
	@import 'style.scss';
</style>